import asyncio
import json
import re
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
SCRIPT_MD = ROOT / "script_en.md"
AUDIO_DIR = ROOT / "public" / "audio"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

VOICE = "en-US-ChristopherNeural"

SEGMENT_RE = re.compile(r"^\[(\d{2})\]\s+(.*)$")


def extract_segments() -> list[tuple[str, str]]:
    segments: list[tuple[str, str]] = []
    for line in SCRIPT_MD.read_text(encoding="utf-8").splitlines():
        m = SEGMENT_RE.match(line.strip())
        if m:
            segments.append((m.group(1), m.group(2)))
    return segments


async def synth(seg_id: str, text: str) -> None:
    out_path = AUDIO_DIR / f"seg_{seg_id}.mp3"
    communicate = edge_tts.Communicate(text, VOICE, rate="+2%")
    await communicate.save(str(out_path))


def ffprobe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", str(path),
        ],
        capture_output=True, text=True, check=True,
    )
    return float(result.stdout.strip())


async def main() -> None:
    segments = extract_segments()
    print(f"Found {len(segments)} segments")
    durations: dict[str, float] = {}
    for seg_id, text in segments:
        await synth(seg_id, text)
        dur = ffprobe_duration(AUDIO_DIR / f"seg_{seg_id}.mp3")
        durations[seg_id] = round(dur, 3)
        print(f"  [{seg_id}] {dur:.2f}s  ({len(text)} chars)")

    (ROOT / "scripts" / "durations.json").write_text(
        json.dumps(durations, indent=2), encoding="utf-8"
    )
    print("Saved durations.json")


if __name__ == "__main__":
    asyncio.run(main())

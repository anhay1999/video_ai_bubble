import json
import re
import subprocess
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent
SCRIPT_MD = ROOT / "script_en.md"
AUDIO_DIR = ROOT / "public" / "audio"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

VOICE = "am_echo"
SEGMENT_RE = re.compile(r"^\[(\d{2})\]\s+(.*)$")


def extract_segments() -> list[tuple[str, str]]:
    segments: list[tuple[str, str]] = []
    for line in SCRIPT_MD.read_text(encoding="utf-8").splitlines():
        m = SEGMENT_RE.match(line.strip())
        if m:
            segments.append((m.group(1), m.group(2)))
    return segments


def ffprobe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", str(path),
        ],
        capture_output=True, text=True, check=True,
    )
    return float(result.stdout.strip())


def main() -> None:
    kokoro = Kokoro(str(ROOT / "models" / "kokoro-v1.0.onnx"), str(ROOT / "models" / "voices-v1.0.bin"))
    segments = extract_segments()
    print(f"Found {len(segments)} segments, voice={VOICE}")
    durations: dict[str, float] = {}
    for seg_id, text in segments:
        samples, sr = kokoro.create(text, voice=VOICE, speed=1.0, lang="en-us")
        wav_path = AUDIO_DIR / f"seg_{seg_id}.wav"
        sf.write(str(wav_path), samples, sr)

        mp3_path = AUDIO_DIR / f"seg_{seg_id}.mp3"
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(wav_path), "-codec:a", "libmp3lame", "-qscale:a", "2", str(mp3_path)],
            capture_output=True, check=True,
        )
        wav_path.unlink()

        dur = ffprobe_duration(mp3_path)
        durations[seg_id] = round(dur, 3)
        print(f"  [{seg_id}] {dur:.2f}s  ({len(text)} chars)")

    (ROOT / "scripts" / "durations_kokoro.json").write_text(
        json.dumps(durations, indent=2), encoding="utf-8"
    )
    print("Saved durations_kokoro.json")


if __name__ == "__main__":
    main()

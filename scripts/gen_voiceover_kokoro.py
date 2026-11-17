import argparse
import json
import re
import subprocess
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent
SEGMENT_RE = re.compile(r"^\[(\d{2})\]\s+(.*)$")


def extract_segments(script_md: Path) -> list[tuple[str, str]]:
    segments: list[tuple[str, str]] = []
    for line in script_md.read_text(encoding="utf-8").splitlines():
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
    parser = argparse.ArgumentParser(description="Generate Kokoro TTS voiceover for a video's script_en.md")
    parser.add_argument("--video", default="ai-bubble", help="video slug under videos/<slug>/ and public/audio/<slug>/")
    parser.add_argument("--voice", default="am_echo", help="Kokoro voice name")
    args = parser.parse_args()

    script_md = ROOT / "videos" / args.video / "script_en.md"
    audio_dir = ROOT / "public" / "audio" / args.video
    audio_dir.mkdir(parents=True, exist_ok=True)

    kokoro = Kokoro(str(ROOT / "models" / "kokoro-v1.0.onnx"), str(ROOT / "models" / "voices-v1.0.bin"))
    segments = extract_segments(script_md)
    print(f"Found {len(segments)} segments for video='{args.video}', voice={args.voice}")
    durations: dict[str, float] = {}
    for seg_id, text in segments:
        samples, sr = kokoro.create(text, voice=args.voice, speed=1.0, lang="en-us")
        wav_path = audio_dir / f"seg_{seg_id}.wav"
        sf.write(str(wav_path), samples, sr)

        mp3_path = audio_dir / f"seg_{seg_id}.mp3"
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(wav_path), "-codec:a", "libmp3lame", "-qscale:a", "2", str(mp3_path)],
            capture_output=True, check=True,
        )
        wav_path.unlink()

        dur = ffprobe_duration(mp3_path)
        durations[seg_id] = round(dur, 3)
        print(f"  [{seg_id}] {dur:.2f}s  ({len(text)} chars)")

    out_json = ROOT / "videos" / args.video / "durations.json"
    out_json.write_text(json.dumps(durations, indent=2), encoding="utf-8")
    print(f"Saved {out_json}")


if __name__ == "__main__":
    main()

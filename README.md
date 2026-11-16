# AI Bubble — "In 2024, Silicon Valley Was Warned. In 2026, The Bill Arrived."

Remotion video project. Doodle-style explainer on AI infrastructure capex/depreciation/debt, narrated in English.

## Structure

- `script_en.md` — voiceover script (16 numbered segments `[01]`-`[16]`) + full citation table
- `timeline.md` — original shot list / pacing plan
- `src/` — Remotion composition (`scenes.ts` defines every scene + timing, `components/` has the 4 reusable visual templates: DoodleDataCard, QuoteCard, KineticText, AnalogyScene)
- `scripts/` — Python helpers (voiceover generation, image extraction/cropping)
- `public/images/` — cropped source-citation screenshots (Gartner, BCG, Alphabet, Meta, Burry, Goldman Sachs, Meta bond) — committed, small
- `public/audio/` — generated voiceover mp3s — **not committed**, regenerate (see below)
- `models/` — Kokoro TTS model binaries — **not committed** (311MB + 25MB, exceeds GitHub's file limit), download separately
- `assets/` — raw/scratch material (PDF export, uncropped screenshots, reference thumbnails) — **not committed**

## Setup

```bash
npm install

# Python env for voiceover generation (uses uv)
uv venv .venv
uv pip install --python .venv kokoro-onnx soundfile numpy pillow pymupdf

# Download Kokoro TTS model files into models/
mkdir -p models
curl -L -o models/kokoro-v1.0.onnx https://github.com/nazdridoy/kokoro-tts/releases/download/v1.0.0/kokoro-v1.0.onnx
curl -L -o models/voices-v1.0.bin https://github.com/nazdridoy/kokoro-tts/releases/download/v1.0.0/voices-v1.0.bin

# Generate voiceover (reads script_en.md, writes public/audio/seg_XX.mp3)
.venv/Scripts/python.exe scripts/gen_voiceover_kokoro.py
```

Voice used: Kokoro `am_echo`. To change voice, edit `VOICE` in `scripts/gen_voiceover_kokoro.py`, regenerate, then update each segment's `durationSec` in `src/scenes.ts` to match the new audio lengths (ffprobe duration is printed by the script).

## Render

```bash
npm run dev     # remotion studio, live preview
npm run build    # renders out/ai_bubble_bill_arrived.mp4 (1080p)
```

To get a smaller file for quick sharing:

```bash
ffmpeg -i out/ai_bubble_bill_arrived.mp4 -vf scale=1280:720 -c:v libx264 -preset slow -b:v 500k -maxrate 600k -bufsize 1000k -c:a aac -b:a 96k out/compressed.mp4
```

## Citations

Every data point and quote card is sourced — see the table at the bottom of `script_en.md`.

# Casual Finance Format

Remotion project for the "Casual Finance" explainer style: doodle-vs-dry-finance contrast, narrative essay pacing (Paradox Hook → Debunk → Micro-metaphor → Systemic Trap), English TTS narration.

This repo is **one format, many videos**. The engine and visual components below are shared by every video; each video's own content lives in its own folder and never touches another video's files. If you start building a *different* format (e.g. a Matt Wolfe-style channel), that's a **separate repo** — never add it here, to avoid mixing visual languages.

## Structure

```
src/
  engine.ts            # shared types + timing helpers (FPS, SubScene, SegmentScene...)
  Video.tsx            # FormatVideo — generic renderer, takes any video's `segments`
  Root.tsx             # registers one <Composition> per video — add new videos here
  components/          # the format's visual language (reused by every video):
                        #   DoodleDataCard, QuoteCard, KineticText, AnalogyScene, TitleCard
  fonts.ts, theme.ts    # format-level styling
  videos/
    ai-bubble/
      Video.tsx         # wires FormatVideo + this video's scenes.ts
      scenes.ts         # this video's `segments` content (timing, text, image/audio refs)

videos/
  ai-bubble/
    script_en.md        # voiceover script + citation table
    timeline.md          # shot list / pacing notes
    durations.json       # measured TTS segment durations (from gen_voiceover_kokoro.py)
    crop_images.py        # one-off: crops this video's source screenshots

public/
  images/ai-bubble/      # cropped citation screenshots used by QuoteCard — committed
  audio/ai-bubble/        # generated voiceover mp3s — NOT committed, regenerate (below)

models/                  # Kokoro TTS model binaries — NOT committed (311MB+25MB), download below
assets/                  # scratch/raw material (PDF export, uncropped screenshots) — NOT committed
```

## Adding a new video to this format

1. `mkdir videos/<slug>` and `mkdir src/videos/<slug>`
2. Write `videos/<slug>/script_en.md` (same `[01]`, `[02]`... segment format as `ai-bubble`'s)
3. Create `src/videos/<slug>/scenes.ts` exporting `segments: SegmentScene[]` (reuse the same `SubScene` types from `../../engine` — `data`, `quote`, `kinetic`, `analogy`, `title`)
4. Create `src/videos/<slug>/Video.tsx`:
   ```tsx
   import { FormatVideo } from "../../Video";
   import { getTotalDurationFrames } from "../../engine";
   import { segments } from "./scenes";
   export const MyVideo = () => <FormatVideo segments={segments} />;
   export const TOTAL_DURATION_FRAMES = getTotalDurationFrames(segments);
   ```
5. Register it in `src/Root.tsx` as another `<Composition id="MyVideo" .../>`
6. Generate voiceover: `.venv/Scripts/python.exe scripts/gen_voiceover_kokoro.py --video <slug>`
7. Drop citation screenshots into `public/images/<slug>/` (write a one-off crop script like `videos/ai-bubble/crop_images.py` if needed)

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

# Generate voiceover for a given video (reads videos/<slug>/script_en.md)
.venv/Scripts/python.exe scripts/gen_voiceover_kokoro.py --video ai-bubble
```

Voice used: Kokoro `am_echo`. To change it, pass `--voice <name>`, regenerate, then update that video's `durationSec` values in its `scenes.ts` to match (ffprobe duration is printed by the script).

## Render

```bash
npx remotion studio                                              # live preview, pick composition by id
npx remotion render src/index.ts AIBubble out/ai-bubble.mp4       # render a specific video by its Composition id
```

For a smaller file to share quickly:

```bash
ffmpeg -i out/ai-bubble.mp4 -vf scale=1280:720 -c:v libx264 -preset slow -b:v 500k -maxrate 600k -bufsize 1000k -c:a aac -b:a 96k out/compressed.mp4
```

## Citations

Every data point and quote card is sourced — see the table at the bottom of each video's `script_en.md`.

// Casual Finance format — generic engine, shared across every video in this repo.
// Per-video content (the `segments` array) lives under src/videos/<slug>/scenes.ts.

export const FPS = 30;

export const secToFrames = (s: number) => Math.round(s * FPS);

// Split a total frame count into N chunks by ratio, exact sum preserved.
export const splitFrames = (total: number, ratios: number[]): number[] => {
  const sum = ratios.reduce((a, b) => a + b, 0);
  const raw = ratios.map((r) => (r / sum) * total);
  const floored = raw.map((v) => Math.floor(v));
  let remainder = total - floored.reduce((a, b) => a + b, 0);
  const result = [...floored];
  let i = 0;
  while (remainder > 0) {
    result[i % result.length] += 1;
    remainder -= 1;
    i += 1;
  }
  return result;
};

export type SubScene =
  | { type: "data"; value: string; label: string; source: string; accent?: string; morphTo?: { value: string; label: string } }
  | { type: "quote"; image: string; who: string; source: string }
  | { type: "kinetic"; lines: string[]; variant?: "normal" | "cta" | "end" }
  | { type: "analogy"; icons: string[]; caption: string; morphIcons?: string[]; morphCaption?: string }
  | { type: "title"; lineNormal: string; lineAccent: string; subtitle: string; icon?: string };

export type SegmentScene = {
  id: string;
  audio: string | null; // path relative to public/audio/, e.g. "ai-bubble/seg_01.mp3"; null = silent (title card)
  durationSec: number;
  subRatios: number[];
  subScenes: SubScene[];
};

export const getTotalDurationFrames = (segments: SegmentScene[]): number =>
  segments.reduce((acc, seg) => acc + secToFrames(seg.durationSec), 0);

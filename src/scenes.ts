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
  | { type: "analogy"; icons: string[]; caption: string; morphIcons?: string[]; morphCaption?: string };

export type SegmentScene = {
  id: string;
  audio: string | null; // filename in public/audio, null = silent (title card)
  durationSec: number;
  subRatios: number[];
  subScenes: SubScene[];
};

export const segments: SegmentScene[] = [
  {
    id: "title",
    audio: null,
    durationSec: 3,
    subRatios: [1],
    subScenes: [{ type: "kinetic", lines: [] }], // overridden by TitleCard in Video.tsx
  },
  {
    id: "seg_01",
    audio: "seg_01.mp3",
    durationSec: 19.5,
    subRatios: [1, 1],
    subScenes: [
      {
        type: "data",
        value: "$89B",
        label: "Nvidia Data Center revenue — one quarter, +117% YoY",
        source: "NVIDIA CFO Commentary, Q2 FY2027",
        accent: "#E8491D",
      },
      {
        type: "data",
        value: "$356B",
        label: "That quarter, annualized — one company's run-rate",
        source: "Derived: $89.0B × 4",
        accent: "#2F5FD6",
      },
    ],
  },
  {
    id: "seg_02",
    audio: "seg_02.mp3",
    durationSec: 12.12,
    subRatios: [1],
    subScenes: [
      {
        type: "kinetic",
        lines: ["Looks like the AI economy is booming harder than ever.", "Except for one thing: the opposite is true."],
      },
    ],
  },
  {
    id: "seg_03",
    audio: "seg_03.mp3",
    durationSec: 30.29,
    subRatios: [1, 1],
    subScenes: [
      {
        type: "data",
        value: "$600B",
        label: "AI needs this much revenue a year just to break even — Sequoia, 2024",
        source: "sequoiacap.com — \"AI's $600B Question\"",
        accent: "#E8491D",
      },
      {
        type: "data",
        value: "$600B → $3T",
        label: "Late 2026: the gap didn't close. It ballooned.",
        source: "TechCrunch, Jul 9 2026 (Cahn / Sequoia)",
        accent: "#2F5FD6",
      },
    ],
  },
  {
    id: "seg_04",
    audio: "seg_04.mp3",
    durationSec: 9.66,
    subRatios: [1],
    subScenes: [
      { type: "kinetic", lines: ["Excuse #1:", "\"They're just in the proof-of-concept phase.\""] },
    ],
  },
  {
    id: "seg_05",
    audio: "seg_05.mp3",
    durationSec: 19.97,
    subRatios: [1, 1],
    subScenes: [
      {
        type: "quote",
        image: "quote_gartner.png",
        who: "Gartner",
        source: "gartner.com, press release, 2024-07-29",
      },
      {
        type: "quote",
        image: "quote_bcg.png",
        who: "Boston Consulting Group",
        source: "BCG AI Radar, 2024",
      },
    ],
  },
  {
    id: "seg_06",
    audio: "seg_06.mp3",
    durationSec: 34.9,
    subRatios: [0.19, 0.81],
    subScenes: [
      { type: "kinetic", lines: ["Excuse #2:", "\"Moore's Law will make chips cheaper.\""] },
      {
        type: "analogy",
        icons: ["🧠", "💽", "⚡"],
        caption: "AI's marginal cost isn't software. It's silicon, scarce memory, and raw electricity.",
        morphIcons: ["☢️"],
        morphCaption: "Companies are now buying entire nuclear plants just to feed their server clusters.",
      },
    ],
  },
  {
    id: "seg_07",
    audio: "seg_07.mp3",
    durationSec: 29.78,
    subRatios: [0.65, 0.35],
    subScenes: [
      {
        type: "quote",
        image: "quote_alphabet.png",
        who: "Alphabet 10-K analysis",
        source: "levelheadedinvesting.com",
      },
      {
        type: "data",
        value: "-$3.9B / +$3B",
        label: "One paperwork change. Depreciation cut, profit inflated. (Alphabet, 2023)",
        source: "levelheadedinvesting.com",
        accent: "#E8491D",
      },
    ],
  },
  {
    id: "seg_08",
    audio: "seg_08.mp3",
    durationSec: 18.56,
    subRatios: [0.6, 0.4],
    subScenes: [
      {
        type: "quote",
        image: "quote_ledger.png",
        who: "Meta FY2025 ledger",
        source: "wiresift.com/ai-server-depreciation",
      },
      {
        type: "data",
        value: "4.3%",
        label: "of Meta's entire annual profit — from one accounting change",
        source: "wiresift.com/ai-server-depreciation",
        accent: "#2F5FD6",
      },
    ],
  },
  {
    id: "seg_09",
    audio: "seg_09.mp3",
    durationSec: 29.73,
    subRatios: [1],
    subScenes: [
      {
        type: "analogy",
        icons: ["🖥️", "🏎️"],
        caption: "Alex buys a $30,000 H100. Technologically, it ages like a Ferrari turning into a tractor.",
        morphIcons: ["🚜", "📄"],
        morphCaption: "But Big Tech gets to decide, on paper, it's still fine for 5-6 years instead of 3.",
      },
    ],
  },
  {
    id: "seg_10",
    audio: "seg_10.mp3",
    durationSec: 20.84,
    subRatios: [0.6, 0.4],
    subScenes: [
      {
        type: "quote",
        image: "quote_burry.png",
        who: "Michael Burry, Nov 2025",
        source: "levelheadedinvesting.com",
      },
      {
        type: "data",
        value: "$176B",
        label: "understated depreciation, 2026-2028 — >20% profit overstatement",
        source: "levelheadedinvesting.com",
        accent: "#E8491D",
      },
    ],
  },
  {
    id: "seg_11",
    audio: "seg_11.mp3",
    durationSec: 15.45,
    subRatios: [1],
    subScenes: [
      { type: "kinetic", lines: ["Depreciation is just paper.", "The real question: where's the actual cash coming from?", "Not profit. Debt."], variant: "cta" },
    ],
  },
  {
    id: "seg_12",
    audio: "seg_12.mp3",
    durationSec: 18.73,
    subRatios: [0.55, 0.45],
    subScenes: [
      {
        type: "quote",
        image: "quote_goldman.png",
        who: "Goldman Sachs",
        source: "ppc.land",
      },
      {
        type: "data",
        value: "$500B",
        label: "in AI-related debt issued industry-wide by Aug 2026",
        source: "ppc.land — Goldman Sachs Research",
        accent: "#2F5FD6",
      },
    ],
  },
  {
    id: "seg_13",
    audio: "seg_13.mp3",
    durationSec: 15.83,
    subRatios: [0.55, 0.45],
    subScenes: [
      {
        type: "quote",
        image: "quote_metabond.png",
        who: "Meta bond filing",
        source: "ppc.land",
      },
      {
        type: "data",
        value: "2065",
        label: "Meta's AI debt matures the year today's babies retire.",
        source: "ppc.land",
        accent: "#E8491D",
      },
    ],
  },
  {
    id: "seg_14",
    audio: "seg_14.mp3",
    durationSec: 29.86,
    subRatios: [1],
    subScenes: [
      {
        type: "kinetic",
        lines: [
          "Not one CEO's fault.",
          "Stock prices reward spending. They punish stopping first.",
          "A structural trap — and the next generation pays the bill.",
        ],
      },
    ],
  },
  {
    id: "seg_15",
    audio: "seg_15.mp3",
    durationSec: 17.77,
    subRatios: [1],
    subScenes: [
      {
        type: "kinetic",
        lines: ["The data was always in plain sight.", "Markets never run on coincidence.", "Hit subscribe."],
        variant: "cta",
      },
    ],
  },
  {
    id: "seg_16",
    audio: "seg_16.mp3",
    durationSec: 32.04,
    subRatios: [1],
    subScenes: [
      {
        type: "kinetic",
        lines: [
          "Overspending on AI without measuring the return?",
          "Self-hosted local LLMs (vLLM) + AI unit-economics tooling",
          "can tell you what's actually profitable before you scale.",
        ],
        variant: "end",
      },
    ],
  },
];

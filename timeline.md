# Shot List / Timeline — "In 2026, The Bill Arrived"

Style: doodle/hand-drawn cartoon elements over a dry, heavy finance topic (contrast is the visual hook — per original brief). 16:9, English VO, captions burned in.

Legend — Visual type:
- **DOODLE-DATA**: big animated number/stat card, doodle-style icon accents (reusable Remotion component)
- **QUOTE-SHOT**: one of the 7 screenshots already captured in the doc, framed + slow zoom (Ken Burns) + source chip at bottom
- **KINETIC-TEXT**: narration-driven animated typography, no image, used for connective/narrative beats
- **ANALOGY**: illustrated scene built from doodle icons (no photo needed)

| # | VO seg | ~Sec | Visual type | Asset / content | Source chip (on-screen) |
|---|--------|------|-------------|------------------|--------------------------|
| 1 | Title card | 0-3 | KINETIC-TEXT | Title: "In 2024, Silicon Valley Was Warned. In 2026, The Bill Arrived." doodle AI-chip icon spinning | — |
| 2 | [01] | 3-9 | DOODLE-DATA | Counter: $89B → "Nvidia Data Center revenue, one quarter" | NVIDIA CFO Commentary, Q2 FY27 |
| 3 | [01] | 9-14 | DOODLE-DATA | Counter: +117% YoY, then morph to $356B/yr run-rate | same (derived ×4) |
| 4 | [02] | 14-20 | KINETIC-TEXT | "Looks like a boom... except the opposite is true" (doodle question-mark) | — |
| 5 | [03] | 20-30 | DOODLE-DATA | Counter: $600B (2024, Sequoia) | sequoiacap.com/article/ais-600b-question |
| 6 | [03] | 30-38 | DOODLE-DATA | Counter morphs $600B → $3T, clock-ticking doodle icon | TechCrunch, Jul 9 2026 (Cahn/Sequoia) |
| 7 | [04] | 38-43 | KINETIC-TEXT | "Excuse #1: just a pilot phase" doodle thought-bubble | — |
| 8 | [05] | 43-52 | QUOTE-SHOT | `kix.8dwnh07hjtoe` (Gartner 30% abandoned) | Gartner, 2024-07-29 |
| 9 | [05] | 52-60 | QUOTE-SHOT | `kix.thad7iigbi3d` (BCG 66% dissatisfied) | BCG AI Radar, 2024 |
| 10 | [06] | 60-66 | KINETIC-TEXT | "Excuse #2: Moore's Law" doodle crossed-out | — |
| 11 | [06] | 66-78 | ANALOGY | Doodle icons: silicon chip, HBM stick, power plant — "physical cost, not software cost" | — |
| 12 | [07] | 78-90 | QUOTE-SHOT | `kix.tn81fx5pcb02` (Alphabet depreciation article) | levelheadedinvesting.com |
| 13 | [07] | 90-96 | DOODLE-DATA | -$3.9B depreciation / +$3B profit (Alphabet, 2023) | same |
| 14 | [08] | 96-106 | QUOTE-SHOT | `kix.2ne4zo3qa94c` (Meta depreciation article) | wiresift.com/ai-server-depreciation |
| 15 | [08] | 106-112 | DOODLE-DATA | -$2.92B dep / +$2.59B net income (+4.3%) Meta FY25 | same |
| 16 | [09] | 112-128 | ANALOGY | Doodle: H100 box $30K → Ferrari morphing into tractor, "3yr real life vs 6yr on paper" | — |
| 17 | [10] | 128-140 | QUOTE-SHOT | `kix.cmqd638hguzx` (Burry estimate) | levelheadedinvesting.com |
| 18 | [10] | 140-146 | DOODLE-DATA | $176B understated depreciation, >20% profit inflation (2026-28) | same |
| 19 | [11] | 146-154 | KINETIC-TEXT | "Not profit. Debt." doodle dollar-sign w/ chain | — |
| 20 | [12] | 154-164 | QUOTE-SHOT | `kix.1pp16e82od41` (Goldman debt article) | ppc.land |
| 21 | [12] | 164-170 | DOODLE-DATA | $500B AI debt issued / $200B Big-5 bonds (2x 2025) | same |
| 22 | [13] | 170-180 | QUOTE-SHOT | `kix.wx2ldh4bi3cz` (Meta bond article) | ppc.land |
| 23 | [13] | 180-188 | DOODLE-DATA | €9B @ 6.4% → matures 2065, doodle baby→retiree timeline | same |
| 24 | [14] | 188-204 | KINETIC-TEXT | "Not one CEO's fault. A structural trap." doodle hamster-wheel icon | — |
| 25 | [15] | 204-216 | KINETIC-TEXT | CTA: subscribe, doodle bell icon pulsing | — |
| 26 | [16] | 216-236 | KINETIC-TEXT | Soft pitch: local LLM/vLLM + unit-economics tooling, end card w/ handle | — |

**Total runtime estimate: ~3:55–4:00** (pacing ~English VO 140-150 wpm on ~560 words + pauses/visual beats)

## Build order (fits in a focused session)
1. `DoodleDataCard` component — big number + label + source chip, enter/exit animation (reused 10×)
2. `QuoteShot` component — image + Ken Burns zoom + source chip (reused 7×, one per existing screenshot)
3. `KineticText` component — word-by-word or line reveal (reused 8×)
4. `AnalogyScene` component — icon composition, 2 variants (physical-cost icons; H100→Ferrari→tractor)
5. Root `Video.tsx` sequencing all 26 scenes via `<Series>`, durations from table above
6. Swap in: VO audio track (TTS render of script_en.md), background music bed, captions (burned-in, driven by same VO segments)

## Open items before final render
- Voice: pick a TTS voice (not yet chosen) — needed to get exact per-segment timing instead of the second-estimates above
- Background music: none selected yet
- 7 screenshots: need to be exported from the Google Doc as image files into this project folder (`assets/quote_01.png` ... `quote_07.png`) — doc only has them inline, not yet pulled as files

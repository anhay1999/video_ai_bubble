import React from "react";
import { Composition } from "remotion";
import { FPS } from "./engine";
import { AIBubbleVideo, TOTAL_DURATION_FRAMES as AI_BUBBLE_FRAMES } from "./videos/ai-bubble/Video";

// One <Composition> per video. Every video shares the same Casual Finance
// engine/components (src/Video.tsx, src/components/) — only the content
// under src/videos/<slug>/ differs. Add new videos here as they're made.
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AIBubble"
        component={AIBubbleVideo}
        durationInFrames={AI_BUBBLE_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

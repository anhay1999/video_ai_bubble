import React from "react";
import { Composition } from "remotion";
import { AIBubbleVideo, TOTAL_DURATION_FRAMES } from "./Video";
import { FPS } from "./scenes";

export const Root: React.FC = () => {
  return (
    <Composition
      id="AIBubble"
      component={AIBubbleVideo}
      durationInFrames={TOTAL_DURATION_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};

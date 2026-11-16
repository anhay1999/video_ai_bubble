import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { SourceChip } from "./SourceChip";
import { dataFont, doodleFont } from "../fonts";
import { theme } from "../theme";

export const DoodleDataCard: React.FC<{
  value: string;
  label: string;
  source: string;
  accent?: string;
  morphTo?: { value: string; label: string };
}> = ({ value, label, source, accent = theme.red, morphTo }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const scale = interpolate(enter, [0, 1], [0.7, 1]);
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const showMorph = morphTo && frame > durationInFrames * 0.55;
  const morphProgress = morphTo
    ? spring({
        frame: frame - Math.floor(durationInFrames * 0.55),
        fps,
        config: { damping: 16 },
      })
    : 0;

  const displayValue = showMorph
    ? morphTo!.value
    : value;
  const displayLabel = showMorph ? morphTo!.label : label;

  return (
    <div style={{ flex: 1, position: "relative" }}>
      <Background />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <div
          style={{
            fontFamily: dataFont,
            fontWeight: 700,
            fontSize: 150,
            color: accent,
            letterSpacing: -2,
            transform: showMorph ? `scale(${0.9 + morphProgress * 0.15})` : undefined,
            transition: "none",
          }}
        >
          {displayValue}
        </div>
        <div
          style={{
            fontFamily: doodleFont,
            fontSize: 42,
            color: theme.ink,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {displayLabel}
        </div>
      </div>
      <SourceChip text={source} />
    </div>
  );
};

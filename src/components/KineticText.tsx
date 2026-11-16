import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { dataFont, doodleFont } from "../fonts";
import { theme } from "../theme";

export const KineticText: React.FC<{
  lines: string[];
  variant?: "normal" | "cta" | "end";
}> = ({ lines, variant = "normal" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
          gap: 20,
          padding: "0 140px",
        }}
      >
        {lines.map((line, i) => {
          const start = i * 8;
          const opacity = interpolate(frame, [start, start + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const rise = interpolate(frame, [start, start + 12], [24, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isLast = i === lines.length - 1;
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${rise}px)`,
                fontFamily: isLast && variant !== "normal" ? doodleFont : dataFont,
                fontWeight: isLast ? 700 : 600,
                fontSize: isLast ? 64 : 48,
                color:
                  variant === "cta" && isLast
                    ? theme.red
                    : variant === "end" && isLast
                      ? theme.blue
                      : theme.ink,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

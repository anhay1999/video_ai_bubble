import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { dataFont, scriptFont } from "../fonts";
import { theme } from "../theme";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const iconSpin = interpolate(frame, [0, 90], [0, 360]);

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
          gap: 32,
          opacity,
        }}
      >
        <div style={{ fontSize: 110, transform: `rotate(${iconSpin}deg)` }}>💾</div>
        <div
          style={{
            fontFamily: dataFont,
            fontWeight: 700,
            fontSize: 56,
            color: theme.ink,
            textAlign: "center",
            maxWidth: 1200,
            lineHeight: 1.25,
          }}
        >
          In 2024, Silicon Valley Was Warned.
          <br />
          <span style={{ color: theme.red }}>In 2026, The Bill Arrived.</span>
        </div>
        <div style={{ fontFamily: scriptFont, fontSize: 34, color: theme.blue }}>
          the math nobody wants to run
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { SourceChip } from "./SourceChip";
import { doodleFont } from "../fonts";
import { theme } from "../theme";

export const QuoteCard: React.FC<{
  image: string; // filename in public/images
  who: string;
  source: string;
}> = ({ image, who, source }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const scaleIn = interpolate(frame, [0, 10], [0.97, 1], { extrapolateRight: "clamp" });
  // very subtle Ken Burns — image is shown with "contain" so nothing is ever cropped
  const zoom = interpolate(frame, [0, durationInFrames], [1.0, 1.02], {
    extrapolateRight: "clamp",
  });

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
          padding: "36px 36px 120px",
          opacity,
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: `3px solid ${theme.ink}`,
            borderRadius: 20,
            boxShadow: "14px 14px 0 rgba(0,0,0,0.08)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            transform: `scale(${scaleIn})`,
          }}
        >
          <Img
            src={staticFile(`images/${image}`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: `scale(${zoom})`,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 128,
            right: 56,
            fontFamily: doodleFont,
            fontSize: 28,
            color: theme.blue,
            background: theme.paper,
            padding: "4px 16px",
            borderRadius: 999,
          }}
        >
          — {who}
        </div>
      </div>
      <SourceChip text={source} />
    </div>
  );
};

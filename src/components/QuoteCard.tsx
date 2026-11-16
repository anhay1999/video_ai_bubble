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
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const slide = interpolate(frame, [0, 12], [30, 0], { extrapolateRight: "clamp" });
  // slow Ken Burns zoom across the shot
  const zoom = interpolate(frame, [0, durationInFrames], [1.04, 1.12], {
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
          padding: "70px 180px 130px",
          opacity,
          transform: `translateY(${slide}px)`,
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: `3px solid ${theme.ink}`,
            borderRadius: 24,
            padding: 16,
            boxShadow: "12px 12px 0 rgba(0,0,0,0.08)",
            overflow: "hidden",
            maxHeight: "72%",
          }}
        >
          <div style={{ overflow: "hidden", borderRadius: 12 }}>
            <Img
              src={staticFile(`images/${image}`)}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                maxHeight: "60vh",
                objectFit: "cover",
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontFamily: doodleFont,
            fontSize: 30,
            color: theme.blue,
            marginTop: 20,
          }}
        >
          — {who}
        </div>
      </div>
      <SourceChip text={source} />
    </div>
  );
};

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { dataFont, doodleFont } from "../fonts";
import { theme } from "../theme";

export const AnalogyScene: React.FC<{
  icons: string[];
  caption: string;
  morphIcons?: string[];
  morphCaption?: string;
}> = ({ icons, caption, morphIcons, morphCaption }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const showMorph = morphIcons && frame > durationInFrames * 0.55;
  const activeIcons = showMorph ? morphIcons! : icons;
  const activeCaption = showMorph ? morphCaption! : caption;

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
          gap: 48,
        }}
      >
        <div style={{ display: "flex", gap: 56 }}>
          {activeIcons.map((icon, i) => {
            const pop = spring({
              frame: frame - i * 6,
              fps,
              config: { damping: 10, mass: 0.5 },
            });
            const scale = interpolate(pop, [0, 1], [0, 1]);
            return (
              <div
                key={icon + i}
                style={{
                  fontSize: 140,
                  transform: `scale(${scale})`,
                  filter: "drop-shadow(6px 6px 0 rgba(0,0,0,0.12))",
                }}
              >
                {icon}
              </div>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: doodleFont,
            fontSize: 44,
            color: theme.ink,
            textAlign: "center",
            maxWidth: 1100,
          }}
        >
          {activeCaption}
        </div>
      </div>
    </div>
  );
};

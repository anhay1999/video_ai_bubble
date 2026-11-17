import React from "react";
import { Audio, Series, staticFile } from "remotion";
import { secToFrames, SegmentScene, splitFrames, SubScene } from "./engine";
import { DoodleDataCard } from "./components/DoodleDataCard";
import { QuoteCard } from "./components/QuoteCard";
import { KineticText } from "./components/KineticText";
import { AnalogyScene } from "./components/AnalogyScene";
import { TitleCard } from "./components/TitleCard";

const SubSceneRenderer: React.FC<{ sub: SubScene }> = ({ sub }) => {
  switch (sub.type) {
    case "data":
      return (
        <DoodleDataCard
          value={sub.value}
          label={sub.label}
          source={sub.source}
          accent={sub.accent}
          morphTo={sub.morphTo}
        />
      );
    case "quote":
      return <QuoteCard image={sub.image} who={sub.who} source={sub.source} />;
    case "kinetic":
      return <KineticText lines={sub.lines} variant={sub.variant} />;
    case "analogy":
      return (
        <AnalogyScene
          icons={sub.icons}
          caption={sub.caption}
          morphIcons={sub.morphIcons}
          morphCaption={sub.morphCaption}
        />
      );
    case "title":
      return (
        <TitleCard
          lineNormal={sub.lineNormal}
          lineAccent={sub.lineAccent}
          subtitle={sub.subtitle}
          icon={sub.icon}
        />
      );
    default:
      return null;
  }
};

// Generic "Casual Finance" format engine — reused by every video in this repo.
// Pass that video's own `segments` array (see src/videos/<slug>/scenes.ts).
export const FormatVideo: React.FC<{ segments: SegmentScene[] }> = ({ segments }) => {
  return (
    <Series>
      {segments.map((seg) => {
        const totalFrames = secToFrames(seg.durationSec);
        const subFrames = splitFrames(totalFrames, seg.subRatios);

        return (
          <Series.Sequence key={seg.id} durationInFrames={totalFrames} layout="none">
            <div style={{ position: "absolute", inset: 0, display: "flex" }}>
              <Series>
                {seg.subScenes.map((sub, i) => (
                  <Series.Sequence key={i} durationInFrames={subFrames[i]} layout="none">
                    <SubSceneRenderer sub={sub} />
                  </Series.Sequence>
                ))}
              </Series>
            </div>
            {seg.audio ? <Audio src={staticFile(`audio/${seg.audio}`)} /> : null}
          </Series.Sequence>
        );
      })}
    </Series>
  );
};

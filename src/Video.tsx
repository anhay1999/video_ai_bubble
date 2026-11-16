import React from "react";
import { Audio, Series, staticFile } from "remotion";
import { FPS, secToFrames, segments, splitFrames, SubScene } from "./scenes";
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
    default:
      return null;
  }
};

export const AIBubbleVideo: React.FC = () => {
  return (
    <Series>
      {segments.map((seg) => {
        const totalFrames = secToFrames(seg.durationSec);
        const subFrames = splitFrames(totalFrames, seg.subRatios);

        if (seg.id === "title") {
          return (
            <Series.Sequence key={seg.id} durationInFrames={totalFrames} layout="none">
              <TitleCard />
            </Series.Sequence>
          );
        }

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

export const TOTAL_DURATION_FRAMES = segments.reduce(
  (acc, seg) => acc + secToFrames(seg.durationSec),
  0
);

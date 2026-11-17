import React from "react";
import { FormatVideo } from "../../Video";
import { getTotalDurationFrames } from "../../engine";
import { segments } from "./scenes";

export const AIBubbleVideo: React.FC = () => <FormatVideo segments={segments} />;

export const TOTAL_DURATION_FRAMES = getTotalDurationFrames(segments);

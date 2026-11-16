import React from "react";
import { doodleFont } from "../fonts";
import { theme } from "../theme";

export const SourceChip: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 48,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: doodleFont,
        fontSize: 26,
        color: theme.ink,
        background: "#FFFFFF",
        border: `2px solid ${theme.ink}`,
        borderRadius: 999,
        padding: "8px 28px",
        opacity: 0.85,
      }}
    >
      Source: {text}
    </div>
  );
};

import React from "react";
import type { Style } from "@sceneparts/core";

// Vintage storybook style: flat shapes, thick dark outline, warm paper, dusky skies, slab headlines.
// Fonts: Alfa Slab One (titles), Rubik (body), Special Elite (typewriter) – load them in your renderer for the full look.
export const C = {
  night: "#121A2C", navy: "#1E2A47", dusk: "#3B3F6E", dawn: "#E9A27A", mustard: "#F2B544", glow: "#FFD983",
  cream: "#F4EAD5", paper: "#EADBBE", paperDark: "#D9C49C", ink: "#1B1712", brick: "#B5452F", brickDark: "#7E2E22",
  teal: "#2E7D7A", sepia: "#8A6A45", stone: "#4A4E5E", stoneDark: "#2C2F3B", modernA: "#0F1020", modernB: "#3A2E7A",
};
export const titleFont = "'Alfa Slab One', Rockwell, 'Roboto Slab', Georgia, serif";
export const bodyFont = "Rubik, 'Helvetica Neue', Arial, sans-serif";
export const typeFont = "'Special Elite', 'Courier New', monospace";

/** Slab headline: cream words with a thick ink outline, accent line in mustard. */
export const Slab: React.FC<{ x: number; y: number; lines: string[]; accent?: string; size?: number; pop?: number }> = ({ x, y, lines, accent, size = 92, pop = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${pop})`}>
    {lines.map((l, i) => (
      <text key={i} x={0} y={(i - (lines.length - 1) / 2) * size * 1.08} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={l === accent ? C.mustard : C.cream} stroke={C.ink} strokeWidth={size * 0.16} paintOrder="stroke" strokeLinejoin="round" letterSpacing={1}>{l}</text>
    ))}
  </g>
);

const style: Style = {
  id: "storybook",
  ink: C.ink,
  accent: C.mustard,
  font: titleFont,
  paper: { base: C.paper, fibre: C.paperDark, stain: "#c9b088" },
  title: (p) => <Slab {...p} />,
};
export default style;

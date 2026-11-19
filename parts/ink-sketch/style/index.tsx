import React from "react";
import type { Style } from "@sceneparts/core";

// Ink sketch style: hand-drawn black ink line on warm off-white paper, one loose watercolour accent wash.
// Parts draw outlines in INK, fill with PAPER (hides overlaps) and add soft washes with <Wash>.
// The engine adds the line wobble (boil), so no boil is set here.

export const INK = "#1f1c1a";
export const PAPER = "#f7f2e7";
export const ACCENT = "#e86f51";
export const LW = 7;

export const WASH: Record<string, string> = {
  coral: "#e8836a", red: "#c9463d", orange: "#e9963f", yellow: "#f0cf5a", green: "#7fae6a", teal: "#4f9c97",
  blue: "#5b86c4", navy: "#34497a", violet: "#8c6bb3", pink: "#eb9ab5", brown: "#8a6246", grey: "#9a9790", black: "#3a3634",
};
export const SKIN: Record<string, string> = { light: "#f6dcc4", fair: "#ecc49f", tan: "#d9a077", medium: "#bb8059", brown: "#8d5a3b", dark: "#5e3b26" };
export const HAIR: Record<string, string> = {
  black: "#2a2624", brown: "#6e4a2e", auburn: "#8f3f22", blonde: "#e2c070", red: "#c4582f", grey: "#a9a7a2",
  white: "#d6d2c8", blue: "#5b86c4", pink: "#eb9ab5", green: "#7fae6a", purple: "#8c6bb3",
};
// Pixel-art palette chars map to their nearest ink-sketch wash so translated presets keep their meaning.
const PAL_MAP: Record<string, string> = {
  k: INK, w: PAPER, g: WASH.grey, d: "#5d5a55", r: WASH.red, o: WASH.orange, y: WASH.yellow, e: WASH.green,
  f: "#4a6e45", c: "#8fbfe0", b: WASH.blue, n: WASH.navy, p: WASH.violet, m: WASH.pink, u: WASH.brown, x: "#c59a6a",
};

/** Resolve a colour param: a named wash / skin / hair, a pixel-art palette char, or a hex colour. */
export const col = (v: string | undefined, fallback: string, named?: Record<string, string>) => {
  if (!v || v === "none") return fallback;
  if (named && named[v]) return named[v];
  if (WASH[v]) return WASH[v];
  if (v.length === 1 && PAL_MAP[v]) return PAL_MAP[v];
  return v;
};

/** SVG props for an ink line. */
export const line = (w = LW) => ({ fill: "none", stroke: INK, strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });
/** Props for a loose wash (fill colour at ~0.55 opacity). */
export const wash = (color: string) => ({ fill: color, opacity: 0.55, stroke: "none" });

/** A loose, mis-registered watercolour fill, offset from the line it belongs to. */
export const Wash: React.FC<{ d: string; color: string; dx?: number; dy?: number; o?: number }> = ({ d, color, dx = 6, dy = 5, o = 0.6 }) => (
  <path d={d} fill={color} opacity={o} stroke="none" transform={`translate(${dx} ${dy})`} />
);

/** Hand-lettered title: Caveat-style words in ink with a scribbled accent wash behind the accent line. */
export const titleFont = "'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive";
export const Title: React.FC<{ x: number; y: number; lines: string[]; accent?: string; size?: number; pop?: number }> = ({ x, y, lines, accent, size = 120, pop = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${pop})`}>
    {lines.map((l, i) => {
      const cy = (i - (lines.length - 1) / 2) * size * 1.05;
      const hi = l === accent;
      return (
        <g key={i}>
          {hi ? <path d={`M ${-size * 2.4} ${cy + size * 0.02} Q 0 ${cy - size * 0.26} ${size * 2.4} ${cy - size * 0.04} Q 0 ${cy + size * 0.16} ${-size * 2.2} ${cy + size * 0.1} Z`} fill={ACCENT} opacity={0.45} /> : null}
          <text x={0} y={cy} textAnchor="middle" dominantBaseline="middle" fontFamily={titleFont} fontSize={size} fill={INK}>{l}</text>
        </g>
      );
    })}
  </g>
);

/** Single hand-drawn ground line with a few short hatch strokes beneath it. */
const Ground: React.FC<{ y: number }> = ({ y }) => (
  <g {...line(LW)}>
    <path d={`M -20 ${y} Q 120 ${y - 8} 300 ${y + 3} T 620 ${y - 2} T 1100 ${y + 4}`} />
    {[140, 230, 360, 470, 560, 690, 790, 880, 980].map((x, i) => (
      <path key={i} d={`M ${x} ${y + 18 + (i % 2) * 6} l ${-22 - (i % 3) * 6} ${14}`} strokeWidth={LW * 0.6} />
    ))}
  </g>
);

const style: Style = {
  id: "ink-sketch",
  ink: INK,
  accent: ACCENT,
  font: titleFont,
  paper: { base: PAPER, fibre: "#e9e0cc", stain: "#ddd0b4" },
  decor: { groundY: 1600, ground: (y: number) => <Ground y={y} /> },
  title: (p) => <Title {...p} />,
};
export default style;

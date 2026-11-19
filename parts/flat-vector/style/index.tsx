import React from "react";
import type { Style } from "@sceneparts/core";

// Flat vector style: clean modern explainer look. Solid fills, no outlines, one darker shade for depth,
// rounded shapes, soft pastel backgrounds. Font: Poppins (load it in your renderer for the full look).
export const C = {
  ink: "#1F2433", inkSoft: "#3A4157", white: "#FFFFFF", paper: "#F4F1EA", sky: "#CFE6F5", skyDeep: "#8EC5E8",
  blue: "#3D6FE0", blueDark: "#2A50AE", navy: "#253058", teal: "#1FA39A", tealDark: "#167A73", green: "#4BB46A", greenDark: "#348A4F",
  lime: "#A8D85A", yellow: "#FFC83D", yellowDark: "#E0A21F", orange: "#FF8A3D", red: "#E8503F", redDark: "#B53A2E",
  pink: "#F27BA6", purple: "#7B5CD6", purpleDark: "#5A40A8", brown: "#8A5A3C", brownDark: "#5E3B26", sand: "#E9D3A9",
  grey: "#9AA3B5", greyLight: "#DDE2EA", greyDark: "#5D6578", shadow: "rgba(31,36,51,0.16)",
};
/** Six skin tones, light to dark. */
export const SKIN = { light: "#FCD9C0", fair: "#F2C29E", tan: "#E0A77C", medium: "#C68558", brown: "#9A6240", dark: "#6B412A" } as const;
export type SkinName = keyof typeof SKIN;
export const skinColour = (s?: string) => (s && s in SKIN ? SKIN[s as SkinName] : s || SKIN.fair);
/** Hair colours by name (or pass any hex). */
export const HAIR = { black: "#22201F", brown: "#5B3A26", auburn: "#8C3B22", blonde: "#E3B65A", grey: "#A9A9AE", white: "#ECEAE4", red: "#C2532B", blue: "#3D6FE0", pink: "#F27BA6" } as const;
export const hairColour = (h?: string) => (h && h in HAIR ? HAIR[h as keyof typeof HAIR] : h || HAIR.brown);
/** Darken a #rrggbb colour by k (0..1). Used for the one shade every flat part gets. */
export const shade = (hex: string, k = 0.18) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(v * (1 - k)))).toString(16).padStart(2, "0");
  return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
};
export const font = "Poppins, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

/** Bold rounded title: white words on a soft shadow, accent line in yellow. */
export const Title: React.FC<{ x: number; y: number; lines: string[]; accent?: string; size?: number; pop?: number }> = ({ x, y, lines, accent, size = 96, pop = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${pop})`}>
    {lines.map((l, i) => {
      const ly = (i - (lines.length - 1) / 2) * size * 1.12;
      return (
        <g key={i}>
          <text x={6} y={ly + 8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={size} fill={C.ink} opacity={0.25}>{l}</text>
          <text x={0} y={ly} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={size} fill={l === accent ? C.yellow : C.white}>{l}</text>
        </g>
      );
    })}
  </g>
);

const style: Style = {
  id: "flat-vector",
  ink: C.ink,
  accent: C.blue,
  font,
  paper: { base: C.paper },
  decor: {
    skyY: 0,
    groundY: 1600,
    sky: () => <rect x={0} y={0} width={1080} height={1920} fill={C.sky} />,
    ground: (y: number) => (
      <g>
        <rect x={0} y={y} width={1080} height={1920 - y} fill="#BFD9A8" />
        <rect x={0} y={y} width={1080} height={14} fill="#A9CC8E" />
      </g>
    ),
  },
  title: (p) => <Title {...p} />,
};
export default style;

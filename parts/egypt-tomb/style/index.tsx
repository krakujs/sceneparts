import React from "react";
import type { Style } from "@sceneparts/core";

// Egypt tomb-painting style: pigments, papyrus paper, star band above, zigzag ground band below, cartouche title.
export const INK = "#1a1410";
export const P = {
  ochre: "#d9a441", // women / goddess skin, lion fur
  red: "#b5523b", // men's skin (Egyptian convention)
  blue: "#1f5c7a",
  lapis: "#2c4f9e",
  green: "#2f8a5e",
  scarlet: "#c8413a",
  linen: "#efe6cf",
  gold: "#e8a33c",
  black: "#1a1410",
  sand: "#e3c27e",
  water: "#2f6f9e",
};
const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export const Frieze: React.FC<{ y: number; kind: "sky" | "ground"; f?: number }> = ({ y, kind }) =>
  kind === "sky" ? (
    <g>
      <rect x={-100} y={y} width={1280} height={64} fill={P.lapis} {...S} />
      {Array.from({ length: 16 }).map((_, i) => {
        const cx = 20 + i * 72, cy = y + 32;
        return <path key={i} d={`M${cx} ${cy - 20} L${cx + 6} ${cy - 6} L${cx + 20} ${cy - 6} L${cx + 9} ${cy + 4} L${cx + 13} ${cy + 18} L${cx} ${cy + 9} L${cx - 13} ${cy + 18} L${cx - 9} ${cy + 4} L${cx - 20} ${cy - 6} L${cx - 6} ${cy - 6} Z`} fill={P.gold} />;
      })}
      <rect x={-100} y={y + 64} width={1280} height={14} fill={P.scarlet} {...S} strokeWidth={5} />
    </g>
  ) : (
    <g>
      <rect x={-100} y={y} width={1280} height={18} fill={INK} />
      <rect x={-100} y={y + 18} width={1280} height={40} fill={P.scarlet} />
      {Array.from({ length: 30 }).map((_, i) => <path key={i} d={`M${-100 + i * 48} ${y + 58} L${-76 + i * 48} ${y + 18} L${-52 + i * 48} ${y + 58}`} fill={P.blue} />)}
      <rect x={-100} y={y + 58} width={1280} height={10} fill={INK} />
    </g>
  );

// decorative pseudo-hieroglyph column (not real text)

export const Cartouche: React.FC<{ x: number; y: number; lines: string[]; accent?: string; font?: string; size?: number; pop?: number }> = ({ x, y, lines, accent, font = "Georgia, serif", size = 84, pop = 1 }) => {
  const w = Math.max(...lines.map((l) => l.length)) * size * 0.66 + 120;
  const h = lines.length * size * 1.12 + 70;
  return (
    <g transform={`translate(${x} ${y}) scale(${pop})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={P.linen} {...S} strokeWidth={12} />
      <rect x={-w / 2 + 16} y={-h / 2 + 16} width={w - 32} height={h - 32} rx={(h - 32) / 2} fill="none" stroke={P.gold} strokeWidth={6} />
      <rect x={w / 2 - 2} y={-h / 2 + 10} width={22} height={h - 20} fill={INK} />
      {lines.map((l, i) => (
        <text key={i} x={0} y={-h / 2 + 35 + size * 0.9 + i * size * 1.12} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={size} fill={l === accent ? P.scarlet : INK} letterSpacing={2}>{l}</text>
      ))}
    </g>
  );
};


const style: Style = {
  id: "egypt-tomb",
  ink: INK,
  accent: P.scarlet,
  font: "Georgia, 'Times New Roman', serif",
  paper: { base: "#e6cb94", fibre: "#b8925a", stain: "#a0703a" },
  decor: { sky: (y) => <Frieze y={y} kind="sky" />, ground: (y) => <Frieze y={y} kind="ground" />, skyY: 70, groundY: 1520 },
  title: (p) => <Cartouche {...p} />,
  defs: (
    <radialGradient id="egypt-aura">
      <stop offset="0" stopColor="#ffb347" stopOpacity="0.9" />
      <stop offset="0.5" stopColor="#ff5a2a" stopOpacity="0.35" />
      <stop offset="1" stopColor="#ff5a2a" stopOpacity="0" />
    </radialGradient>
  ),
};
export default style;

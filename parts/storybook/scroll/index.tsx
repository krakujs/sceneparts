import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Scroll: parchment scroll with wooden rollers, partly unrolled (open 0..1), faint lines and no text. Stands on (x, y) at the bottom roller.
export const Scroll: React.FC<{ x: number; y: number; s?: number; f?: number; open?: number; parchment?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, open = 0.6, parchment = C.cream, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const k = Math.max(0, Math.min(1, open));
  const len = 40 + 500 * k;
  const top = -60 - len;
  const lines = Array.from({ length: Math.floor(len / 44) }, (_, i) => -60 - 40 - i * 44);
  const roll = (cy: number) => (
    <g>
      <rect x={-224} y={cy - 26} width={448} height={52} rx={26} fill={C.sepia} {...o} />
      <path d={`M -200 ${cy - 16} L 200 ${cy - 16}`} stroke="#FFFFFF" strokeWidth={5} opacity={0.35} strokeLinecap="round" />
    </g>
  );
  const sway = Math.sin(f / 40) * 0.6;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={260} ry={16} fill="#000" opacity={0.18} />
      <g transform={`rotate(${sway} 0 -30)`}>
        {/* unrolled parchment hanging between the rollers */}
        <rect x={-180} y={top + 26} width={360} height={len - 26 + 4} fill={parchment} stroke={C.ink} strokeWidth={6} />
        <path d={`M -170 ${top + 40} L -170 ${-60}`} stroke="#FFFFFF" strokeWidth={6} opacity={0.4} strokeLinecap="round" />
        {lines.map((ly, i) => <path key={i} d={`M -130 ${ly} L ${i % 3 === 0 ? 90 : 130} ${ly}`} stroke={C.sepia} strokeWidth={4} opacity={0.4} strokeLinecap="round" />)}
        {/* rolled top and bottom */}
        {roll(top + 4)}
        <rect x={-190} y={top - 22} width={380} height={40} rx={18} fill={parchment} {...o} />
        <circle cx={-210} cy={top - 2} r={16} fill={C.sepia} {...o} />
        <circle cx={210} cy={top - 2} r={16} fill={C.sepia} {...o} />
        {roll(-30)}
        <circle cx={-224} cy={-30} r={20} fill={C.sepia} {...o} />
        <circle cx={224} cy={-30} r={20} fill={C.sepia} {...o} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Scroll x={p.x} y={p.y} s={p.s} f={p.f} open={p.open} parchment={p.parchment} flip={p.flip} />;
}

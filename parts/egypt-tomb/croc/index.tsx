import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Croc: React.FC<{ x: number; y: number; s?: number; open?: boolean; f?: number; flip?: boolean; gold?: boolean }> = ({ x, y, s = 1, open, f = 0, flip, gold }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d={`M-380 -20 Q-200 -90 0 -80 L260 -70 Q300 -60 300 -40 L${open ? 300 : 300} -30 L40 -10 Q-200 10 -380 -20 Z`} fill="#4f7a3a" {...S} />
    {open && <path d="M300 -40 L120 -40 L290 0 Z" fill="#7a1010" {...S} strokeWidth={5} />}
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-300 + i * 60} -78 l15 -24 l15 24`} fill="#3a5f2a" stroke={INK} strokeWidth={4} />)}
    {[-200, 60].map((lx, i) => <path key={i} d={`M${lx} -15 l${-20 + Math.sin(f * 0.6 + i) * 15} 50 l30 0`} fill="none" stroke={INK} strokeWidth={14} strokeLinecap="round" />)}
    <circle cx={120} cy={-82} r={14} fill="#ffd36a" {...S} strokeWidth={4} />
    {gold && <circle cx={150} cy={-60} r={14} fill="none" stroke={P.gold} strokeWidth={8} />}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Croc x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} open={p.open} f={p.f} flip={p.flip} gold={p.gold} />;
}

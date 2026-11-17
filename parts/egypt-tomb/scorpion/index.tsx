import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Scorpion: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean }> = ({ x, y, s = 1, f = 0, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M${-30 + i * 20} -20 l-25 ${20 + (i % 2) * 6} M${-30 + i * 20} -20 l20 ${22 + ((i + 1) % 2) * 6}`} stroke={INK} strokeWidth={6} />)}
    <ellipse cx={0} cy={-30} rx={60} ry={24} fill="#7a4a1a" {...S} />
    <path d={`M-55 -35 Q-120 -60 -110 -130 Q-100 ${-180 - Math.sin(f * 0.4) * 10} -50 -160`} fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" />
    <path d={`M-55 -35 Q-120 -60 -110 -130 Q-100 ${-180 - Math.sin(f * 0.4) * 10} -50 -160`} fill="none" stroke="#7a4a1a" strokeWidth={12} strokeLinecap="round" />
    <path d="M-50 -160 l20 10 l-14 14 Z" fill="#c8102e" {...S} strokeWidth={4} />
    <path d="M55 -30 q40 -30 60 -10 q-10 10 -30 4 M55 -30 q40 10 60 0" fill="#7a4a1a" {...S} strokeWidth={5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Scorpion x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip} />;
}

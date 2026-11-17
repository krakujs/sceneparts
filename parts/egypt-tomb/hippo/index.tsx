import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Hippo: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; c?: string }> = ({ x, y, s = 1, f = 0, flip, c = "#8a7f8c" }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d="M-260 -60 Q-260 -260 0 -260 Q180 -260 240 -200 Q330 -180 330 -110 Q320 -60 260 -60 L240 0 L180 0 L170 -60 L-120 -60 L-130 0 L-190 0 L-200 -60 Z" fill={c} {...S} />
    <circle cx={160} cy={-215} r={10} fill={INK} />
    <path d="M150 -255 q10 -30 30 -8" fill={c} {...S} strokeWidth={5} />
    <ellipse cx={305} cy={-150} rx={8} ry={5} fill={INK} />
    <path d={`M-30 -200 q${Math.sin(f * 0.2) * 4} 40 0 80`} stroke={INK} strokeWidth={3} opacity={0.4} fill="none" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Hippo x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip} c={p.c} />;
}

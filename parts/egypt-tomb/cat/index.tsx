import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Cat: React.FC<{ x: number; y: number; s?: number; c?: string; f?: number }> = ({ x, y, s = 1, c = "#26201c", f = 0 }) => (
  // seated cat in profile (facing right), like the bronze Bastet cats
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M-60 0 Q-80 -120 -30 -200 L-20 -260 Q-10 -300 20 -300 L35 -340 L45 -295 L60 -340 L66 -290 Q90 -270 80 -240 Q70 -215 40 -215 L40 -150 Q70 -60 40 0 Z`} fill={c} {...S} />
    <path d={`M-60 -10 Q-130 ${-20 + Math.sin(f * 0.3) * 10} -110 -80`} fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" />
    <path d={`M-60 -10 Q-130 ${-20 + Math.sin(f * 0.3) * 10} -110 -80`} fill="none" stroke={c} strokeWidth={10} strokeLinecap="round" />
    <circle cx={50} cy={-265} r={7} fill="#7be07a" stroke={INK} strokeWidth={3} />
    <circle cx={8} cy={-235} r={12} fill="none" stroke={P.gold} strokeWidth={6} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Cat x={p.x} y={p.y} s={p.s} c={p.c} f={p.f} />;
}

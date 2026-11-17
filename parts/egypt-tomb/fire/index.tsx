import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Fire: React.FC<{ x: number; y: number; s?: number; f?: number }> = ({ x, y, s = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M-80 0 Q-90 -120 -30 -180 Q-20 -120 0 -110 Q10 ${-230 - Math.sin(f * 0.7) * 30} 60 -260 Q50 -170 90 -120 Q110 -50 80 0 Z`} fill="#ff7a1f" {...S} strokeWidth={6} />
    <path d={`M-40 0 Q-40 -70 0 -100 Q20 ${-140 - Math.cos(f * 0.9) * 20} 40 -150 Q60 -80 40 0 Z`} fill="#ffd36a" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Fire x={p.x} y={p.y} s={p.s} f={p.f} />;
}

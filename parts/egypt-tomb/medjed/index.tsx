import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const MedjedShape: React.FC<{ x: number; y: number; s?: number; f?: number; beam?: number }> = ({ x, y, s = 1, f = 0, beam = 0 }) => (
  // Medjed as drawn in the Greenfield Papyrus: a domed cloak with eyes and two feet
  <g transform={`translate(${x} ${y + Math.sin(f * 0.25) * 8}) scale(${s})`}>
    {beam > 0 && <path d={`M60 -360 L${600 * beam} ${-380 - 60 * beam} L${600 * beam} ${-300 + 60 * beam} Z`} fill="#ffd36a" opacity={0.7} />}
    <path d="M-150 -40 Q-170 -520 0 -540 Q170 -520 150 -40 Z" fill="#f2efe6" stroke={INK} strokeWidth={10} />
    <path d="M-150 -40 L150 -40" stroke={INK} strokeWidth={10} />
    <g><path d="M-10 -360 Q40 -400 90 -360 Q40 -330 -10 -360 Z" fill="#fff" stroke={INK} strokeWidth={8} /><circle cx={40} cy={-362} r={14} fill={INK} /><path d="M-14 -395 Q40 -425 96 -395" stroke={INK} strokeWidth={10} fill="none" /></g>
    <path d="M-60 -40 L-60 0 L0 0 M50 -40 L50 0 L110 0" fill="none" stroke={INK} strokeWidth={14} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <MedjedShape x={p.x} y={p.y} s={p.s} f={p.f} beam={p.beam} />;
}

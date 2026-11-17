import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Mummy: React.FC<{ x: number; y: number; s?: number; r?: number; f?: number; eyes?: boolean }> = ({ x, y, s = 1, r = 0, f = 0, eyes }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-80 0 L-100 -560 Q-110 -720 0 -730 Q110 -720 100 -560 L80 0 Z" fill="#efe6cf" {...S} />
    {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M-100 ${-60 - i * 55} L100 ${-90 - i * 55 + (i % 2) * 20}`} stroke="#b8a882" strokeWidth={6} />)}
    {eyes && <g><circle cx={-25} cy={-640} r={9} fill={INK} /><circle cx={25} cy={-640} r={9} fill={INK} /></g>}
    <path d={`M100 -500 l${30 + Math.sin(f * 0.3) * 10} 60`} stroke="#efe6cf" strokeWidth={10} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Mummy x={p.x} y={p.y} s={p.s} r={p.r} f={p.f} eyes={p.eyes} />;
}

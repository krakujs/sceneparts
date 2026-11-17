import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Nilometer: React.FC<{ x: number; y: number; level: number; f?: number }> = ({ x, y, level, f = 0 }) => (
  // stairs into the river with cubit marks; level 0..1 = water height
  <g transform={`translate(${x} ${y})`}>
    <path d="M-300 0 L-300 -700 L300 -700 L300 0 Z" fill="#d9b77a" {...S} />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-300 + i * 75} ${-700 + i * 87} L${-300 + i * 75} ${-613 + i * 87} L${-225 + i * 75} ${-613 + i * 87}`} fill="none" stroke={INK} strokeWidth={8} />)}
    {Array.from({ length: 14 }).map((_, i) => <g key={i}><path d={`M240 ${-40 - i * 46} L300 ${-40 - i * 46}`} stroke={INK} strokeWidth={6} /><text x={200} y={-30 - i * 46} fontSize={28} fontFamily="Georgia, serif" fill={INK} textAnchor="end">{i + 1}</text></g>)}
    <rect x={-300} y={-700 * level} width={600} height={700 * level} fill={P.water} opacity={0.85} />
    <path d={Array.from({ length: 14 }).map((_, i) => `${i ? "L" : "M"}${-300 + i * 46} ${-700 * level + (i % 2 ? -10 : 10) + Math.sin(f * 0.3) * 4}`).join(" ")} fill="none" stroke={INK} strokeWidth={6} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Nilometer x={p.x} y={p.y} level={p.level} f={p.f} />;
}

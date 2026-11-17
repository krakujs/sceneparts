import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Senet: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-140} width={600} height={140} fill="#c9874a" {...S} />
    {Array.from({ length: 3 }).map((_, r) => Array.from({ length: 10 }).map((__, c) => (
      <rect key={`${r}${c}`} x={-290 + c * 58} y={-132 + r * 44} width={54} height={40} fill={(r + c) % 2 ? "#e8c27e" : "#b5652c"} stroke={INK} strokeWidth={3} />
    )))}
    {[[-232, -112, P.linen], [-58, -68, INK], [116, -24, P.linen], [174, -112, INK]].map(([px, py, col], i) => <path key={i} d={`M${px} ${py} q14 -40 28 0 Z`} fill={col as string} {...S} strokeWidth={4} />)}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Senet x={p.x} y={p.y} s={p.s} />;
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Column: React.FC<{ x: number; y: number; h?: number; s?: number }> = ({ x, y, h = 900, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-h} width={140} height={h} fill="#e8d7a8" {...S} />
    <path d={`M-110 ${-h} Q0 ${-h - 160} 110 ${-h} Z`} fill={P.green} {...S} />
    {[0, 1, 2].map((i) => <path key={i} d={`M-70 ${-h + 80 + i * 26} L70 ${-h + 80 + i * 26}`} stroke={P.scarlet} strokeWidth={8} />)}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Column x={p.x} y={p.y} h={p.h} s={p.s} />;
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Throne: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-160 0 L160 0 L160 -360 L-160 -360 Z" fill={P.lapis} {...S} />
    <path d="M-160 -360 L-160 -620 L-90 -620 L-90 -360" fill={P.lapis} {...S} />
    {Array.from({ length: 4 }).map((_, r) => Array.from({ length: 5 }).map((__, c) => (
      <path key={`${r}${c}`} d={`M${-140 + c * 60} ${-60 - r * 75} q25 -40 50 0`} fill="none" stroke={P.gold} strokeWidth={7} />
    )))}
    <rect x={-170} y={-12} width={340} height={24} fill={P.gold} {...S} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Throne x={p.x} y={p.y} s={p.s} />;
}

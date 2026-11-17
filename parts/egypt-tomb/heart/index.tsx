import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Heart: React.FC<{ x?: number; y?: number; s?: number; c?: string }> = ({ x = 0, y = 0, s = 1, c = P.scarlet }) => (
  // the Egyptian "ib" heart: a small jar with handles
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-40 -60 Q-60 -20 -40 20 Q0 50 40 20 Q60 -20 40 -60 Q0 -75 -40 -60 Z" fill={c} {...S} />
    <path d="M-40 -55 q-25 -10 -25 15 M40 -55 q25 -10 25 15" fill="none" {...S} strokeWidth={6} />
    <rect x={-22} y={-82} width={44} height={20} fill={c} {...S} strokeWidth={5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Heart x={p.x} y={p.y} s={p.s} c={p.c} />;
}

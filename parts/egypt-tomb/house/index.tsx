import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const House: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 1, c = "#c9874a" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-120 0 L120 0 L110 -220 L-110 -220 Z" fill={c} {...S} />
    <path d="M-120 -220 L120 -220 L120 -250 L-120 -250 Z" fill="#a8683a" {...S} />
    <path d="M-30 0 L-30 -110 L30 -110 L30 0" fill={INK} />
    <rect x={50} y={-180} width={36} height={22} fill={INK} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <House x={p.x} y={p.y} s={p.s} c={p.c} />;
}

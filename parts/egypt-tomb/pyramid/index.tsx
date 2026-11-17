import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Pyramid: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-300 0 L0 -330 L300 0 Z" fill="#e3c27e" {...S} />
    <path d="M0 -330 L80 0 L300 0 Z" fill="#c9a067" {...S} />
    <path d="M-40 -286 L0 -330 L40 -286 Z" fill={P.gold} {...S} strokeWidth={5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Pyramid x={p.x} y={p.y} s={p.s} />;
}

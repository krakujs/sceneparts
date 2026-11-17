import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Feather: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M0 0 Q-40 -120 10 -260 Q50 -130 20 0 Z" fill={P.linen} {...S} />
    <path d="M10 -250 L12 0" stroke={INK} strokeWidth={5} />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M12 ${-40 - i * 40} l-24 -20 M12 ${-40 - i * 40} l20 -18`} stroke={INK} strokeWidth={3} />)}
  </g>
);

// balance: beam tilts by `tip` degrees (positive = left pan lower). left / right = what sits in each pan.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Feather x={p.x} y={p.y} s={p.s} r={p.r} />;
}

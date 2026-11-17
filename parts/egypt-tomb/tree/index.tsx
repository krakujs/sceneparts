import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Tree: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-30} y={-420} width={60} height={420} fill="#7a5a3a" {...S} />
    <ellipse cx={0} cy={-520} rx={190} ry={140} fill={P.green} {...S} />
    {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-120 + i * 60} cy={-500 - (i % 2) * 50} r={14} fill="#c8413a" stroke={INK} strokeWidth={4} />)}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Tree x={p.x} y={p.y} s={p.s} />;
}

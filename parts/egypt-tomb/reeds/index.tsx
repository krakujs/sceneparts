import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Reeds: React.FC<{ x: number; y: number; n?: number; s?: number }> = ({ x, y, n = 5, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }).map((_, i) => {
      const dx = (i - (n - 1) / 2) * 40;
      return (
        <g key={i}>
          <path d={`M${dx} 0 L${dx + (i - n / 2) * 8} -300`} stroke={P.green} strokeWidth={10} />
          <path d={`M${dx + (i - n / 2) * 8 - 40} -340 L${dx + (i - n / 2) * 8} -300 L${dx + (i - n / 2) * 8 + 40} -340 Q${dx + (i - n / 2) * 8} -380 ${dx + (i - n / 2) * 8 - 40} -340 Z`} fill={P.green} {...S} strokeWidth={6} />
        </g>
      );
    })}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Reeds x={p.x} y={p.y} n={p.n} s={p.s} />;
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Boat: React.FC<{ x: number; y: number; s?: number; sun?: boolean; f?: number }> = ({ x, y, s = 1, sun = true, f = 0 }) => (
  <g transform={`translate(${x} ${y + Math.sin(f * 0.15) * 6}) scale(${s})`}>
    <path d="M-420 -60 Q-380 40 0 40 Q380 40 420 -60 L380 -40 Q300 0 0 0 Q-300 0 -380 -40 Z" fill="#b5652c" {...S} />
    <path d="M-420 -60 q-30 -60 -10 -110 M420 -60 q30 -60 10 -110" fill="none" {...S} strokeWidth={14} />
    <rect x={-120} y={-150} width={240} height={150} fill={P.linen} {...S} />
    <path d="M-120 -150 L120 -150 L100 -175 L-100 -175 Z" fill={P.green} {...S} strokeWidth={6} />
    {sun && <g><circle cx={0} cy={-280} r={95} fill={P.scarlet} {...S} /><circle cx={0} cy={-280} r={78} fill="none" stroke={P.gold} strokeWidth={8} /></g>}
  </g>
);

// giant serpent (Apophis): body along a sine wave from x0 to x1 at y, head at the right end

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Boat x={p.x} y={p.y} s={p.s} sun={p.sun} f={p.f} />;
}

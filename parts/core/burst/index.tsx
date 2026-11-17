import React from "react";
import type { PartProps } from "@sceneparts/core";

export const Burst: React.FC<{ x: number; y: number; r: number; c: string; n?: number; rot?: number }> = ({ x, y, r, c, n = 16, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {Array.from({ length: n }).map((_, i) => (
      <path key={i} d={`M0 0 L${r * Math.cos((i / n) * 6.283 - 0.08)} ${r * Math.sin((i / n) * 6.283 - 0.08)} L${r * Math.cos((i / n) * 6.283 + 0.08)} ${r * Math.sin((i / n) * 6.283 + 0.08)} Z`} fill={c} opacity={0.55} />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Burst x={p.x} y={p.y} r={p.r} c={p.c ?? p.style.accent} n={p.n} rot={p.spin * p.f} />;
}

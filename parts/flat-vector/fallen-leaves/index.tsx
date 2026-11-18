/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Low pile of autumn leaves in orange, red and yellow lying on the ground. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const LEAF = "M 0 0 C -46 -18 -52 -60 0 -96 C 52 -60 46 -18 0 0 Z";
// [x, y, angle, scale, colour index]
const PILE: [number, number, number, number, number][] = [
  [-230, -40, -70, 0.9, 0], [-150, -20, 30, 1.0, 1], [-60, -50, -20, 1.1, 2], [40, -30, 60, 1.0, 0], [150, -50, -40, 0.95, 1],
  [250, -20, 75, 0.85, 2], [-120, -90, 10, 1.0, 2], [0, -100, -85, 0.95, 1], [100, -110, 25, 0.9, 0], [-200, -120, 55, 0.8, 1],
];
const PALETTE = ["#F08A3E", "#E8503F", "#FFC83D"];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const pop = p.anim === "pop" ? Math.min(1, f / 20) : 1;
  const first = p.color && p.color !== "none" ? p.color : PALETTE[0];
  const cols = [first, PALETTE[1], PALETTE[2]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={24} fill={C.shadow} />
      <g transform={`scale(${f1(pop)})`}>
      {PILE.map(([lx, ly, a, k, ci], i) => {
        const c = cols[ci];
        return (
          <g key={i} transform={`translate(${lx} ${ly}) rotate(${a}) scale(${f1(k * 1.6)})`}>
            <path d={LEAF} fill={shade(c, 0.22)} />
            <path d="M 0 -4 L 0 -88" stroke={shade(c, 0.4)} strokeWidth={4} strokeLinecap="round" />
          </g>
        );
      })}
      </g>
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bunting: a string swagged between two points (quadratic curve), with triangular pennant flags hung from it.
// Origin = centre of the attach height. The ends are at x +- 400, y; the swag sags about 300 px lower.
const f1 = (v: number) => v.toFixed(1);
const HALF = 400, SAG = 300, N = 11;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 420;
  const c1 = p.color && p.color !== "none" ? p.color : C.red;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  // quadratic from (-HALF,0) via control (0, 2*SAG) to (HALF,0): point at t
  const qAt = (t: number) => ({ x: -HALF + 2 * HALF * t, y: 4 * SAG * t * (1 - t) });
  const flags = Array.from({ length: N }, (_, i) => {
    const t = (i + 0.5) / N;
    const q = qAt(t);
    const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 70 + i * 0.7) * 7 : 0;
    const w = 88, h = 120;
    return (
      <g key={i} transform={`translate(${f1(q.x)} ${f1(q.y)}) rotate(${f1(sway)})`}>
        <path d={`M ${-w / 2} 0 L ${w / 2} 0 L 0 ${h} Z`} fill={i % 2 ? c2 : c1} />
        <path d={`M 0 ${h * 0.55} L ${w * 0.3} 0 L ${w / 2} 0 L 0 ${h * 0.55} Z`} fill={shade(i % 2 ? c2 : c1, 0.15)} opacity={0.5} />
      </g>
    );
  });
  // the string: a quadratic curve through the flag points, plus small hooks at the ends
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <path d={`M ${-HALF} 0 Q 0 ${2 * SAG} ${HALF} 0`} fill="none" stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
      {flags}
      <circle cx={-HALF} cy={0} r={12} fill={C.greyDark} />
      <circle cx={HALF} cy={0} r={12} fill={C.greyDark} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Single blue teardrop with a white highlight and a darker side. Origin = centre of the drop.
// anim "fall": the drop falls in a fading loop; "pop" scales it in.
const DROP = "M 0 -200 C 30 -140 110 -50 110 40 A 110 110 0 0 1 -110 40 C -110 -50 -30 -140 0 -200 Z";
const SIDE = "M 0 -200 C 30 -140 110 -50 110 40 A 110 110 0 0 1 0 150 Z";
const ease = (f: number, n: number) => { const t = Math.min(1, Math.max(0, f / n)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const ph = anim === "fall" ? (f % 60) / 60 : 0;
  const dy = anim === "fall" ? -80 + 160 * ph : 0;
  const op = anim === "fall" ? Math.sin(Math.PI * ph) : 1;
  const sc = anim === "pop" ? ease(f, 20) : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${dy.toFixed(1)}) scale(${sc.toFixed(3)})`} opacity={op.toFixed(3)}>
        <path d={DROP} fill={col} />
        <path d={SIDE} fill={shade(col, 0.2)} />
        <ellipse cx={-44} cy={-6} rx={22} ry={50} transform="rotate(-18 -44 -6)" fill="#FFFFFF" opacity={0.85} />
        <circle cx={-30} cy={-132} r={10} fill="#FFFFFF" opacity={0.7} />
      </g>
    </g>
  );
}

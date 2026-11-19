/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tiny seedling: two round leaves on a short stem coming out of a soil mound. Origin = bottom centre of the mound.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const green = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 4 * Math.sin((f * 2 * Math.PI) / 80) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <path d="M -150 0 C -140 -40 -90 -60 0 -60 C 90 -60 140 -40 150 0 Z" fill={shade("#8A5A3C", 0.1)} />
      <path d="M -120 -10 C -100 -36 -60 -44 0 -44 C 60 -44 100 -36 120 -10 Z" fill={C.brown} />
      <g transform={`rotate(${f1(sw)}) scale(${f1(pop * 1.35)})`}>
        <path d="M -6 -50 Q -4 -120 0 -150" stroke={green} strokeWidth={12} strokeLinecap="round" fill="none" />
        <g transform="translate(-4 -150) rotate(-40)">
          <ellipse cx={-40} cy={0} rx={50} ry={34} fill={green} />
          <path d="M -6 0 L -76 0" stroke={shade(green, 0.3)} strokeWidth={5} strokeLinecap="round" />
        </g>
        <g transform="translate(4 -150) rotate(40)">
          <ellipse cx={40} cy={0} rx={50} ry={34} fill={shade(green, 0.12)} />
          <path d="M 6 0 L 76 0" stroke={shade(green, 0.35)} strokeWidth={5} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

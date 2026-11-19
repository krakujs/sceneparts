/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tulip: cup-shaped bloom on a straight stem with two long leaves. Origin = bottom of the stem.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const cup = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const lsw = anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 75 + 1.2) : 0;
  const hy = -420;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={80} ry={12} fill={C.shadow} />
      <g transform={`rotate(${f1(sw)})`}>
        <path d={`M 0 0 L 0 ${hy + 40}`} stroke={C.green} strokeWidth={16} strokeLinecap="round" />
        <g transform={`rotate(${f1(-22 + lsw)})`}>
          <path d="M 0 0 C -40 -90 -50 -220 0 -330 C 40 -220 40 -90 0 0 Z" fill={C.green} transform="translate(-4 -20) scale(1 0.9)" />
        </g>
        <g transform={`rotate(${f1(20 - lsw)})`}>
          <path d="M 0 0 C -40 -90 -50 -200 0 -300 C 40 -200 40 -90 0 0 Z" fill={shade(C.green, 0.15)} transform="translate(4 -20) scale(1 0.9)" />
        </g>
        <g transform={`translate(0 ${hy}) scale(${f1(pop * 1.45)})`}>
          <path d="M -60 -10 L -66 -110 C -40 -90 40 -90 66 -110 L 60 -10 C 40 40 -40 40 -60 -10 Z" fill={cup} />
          <path d="M 0 -95 L 0 20" stroke={shade(cup, 0.2)} strokeWidth={6} />
          <path d="M 0 -100 C 14 -60 14 -20 0 20 C -14 -20 -14 -60 0 -100 Z" fill={shade(cup, 0.1)} />
          <path d="M -60 -10 L -66 -110 C -56 -104 -50 -100 -36 -104 L -26 -2 Z" fill={shade(cup, 0.12)} />
          <path d="M 60 -10 L 66 -110 C 56 -104 50 -100 36 -104 L 26 -2 Z" fill={shade(cup, 0.12)} />
        </g>
      </g>
    </g>
  );
}

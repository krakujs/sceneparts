/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// White funnel-shaped lily: six pointed petals, orange stamens, on a tall stem with narrow leaves. Origin = bottom of the stem.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const petal = "M 0 0 C -46 -30 -50 -120 0 -180 C 50 -120 46 -30 0 0 Z";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const white = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const hy = -640;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={14} fill={C.shadow} />
      <g transform={`rotate(${f1(sw)})`}>
        <path d={`M 0 0 Q 18 ${hy / 2} 0 ${hy + 40}`} stroke={C.green} strokeWidth={12} fill="none" strokeLinecap="round" />
        <path d="M 4 -120 C 60 -200 80 -330 40 -420 C 0 -330 -20 -220 4 -120 Z" fill={C.green} />
        <path d="M 10 -200 C -50 -280 -70 -380 -40 -460 C 0 -370 10 -280 10 -200 Z" fill={shade(C.green, 0.15)} />
        <g transform={`translate(0 ${hy}) scale(${f1(pop)})`}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={petal} fill={i % 2 ? shade(white, 0.08) : white} transform={`rotate(${i * 60 + 30}) translate(0 -2)`} />
          ))}
          <path d="M 0 0 L 0 -40" stroke={C.sand} strokeWidth={6} strokeLinecap="round" />
          {[[-22, -150], [22, -150], [0, -170]].map(([sx, sy], i) => (
            <g key={i}>
              <line x1={0} y1={-10} x2={sx * 0.6} y2={sy + 10} stroke={C.sand} strokeWidth={4} />
              <circle cx={sx * 0.6} cy={sy + 10} r={11} fill={C.orange} />
            </g>
          ))}
          {[-30, 30].map((sx, i) => (
            <g key={`b${i}`}>
              <line x1={0} y1={-6} x2={sx} y2={-110} stroke={C.sand} strokeWidth={3} />
              <circle cx={sx} cy={-110} r={9} fill={C.orange} />
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Red rose: spiral bloom on a thorny stem with leaves. Origin = bottom of the stem.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const leaf = (c: string) => (
  <g>
    <path d="M 0 0 C -60 -20 -70 -80 0 -120 C 70 -80 60 -20 0 0 Z" fill={c} />
    <path d="M 0 0 C 60 -20 70 -80 0 -120 C 20 -70 18 -30 0 0 Z" fill={shade(c, 0.2)} />
  </g>
);
const thorn = (x: number, y: number, r: number) => <path d={`M ${x} ${y} L ${x + r} ${y - r * 0.4} L ${x + r * 0.2} ${y - r * 0.9} Z`} fill={C.greenDark} />;

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const hy = -440;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={90} ry={12} fill={C.shadow} />
      <g transform={`rotate(${f1(sw)})`}>
        <path d={`M 0 0 Q 16 ${hy / 2} 0 ${hy + 60}`} stroke={C.greenDark} strokeWidth={14} strokeLinecap="round" fill="none" />
        {thorn(-6, -120, 26)}{thorn(6, -260, -24)}{thorn(-6, -360, 24)}
        <g transform="translate(0 -180) rotate(-50) scale(0.9)">{leaf(C.green)}</g>
        <g transform="translate(6 -300) rotate(55) scale(0.85)">{leaf(shade(C.green, -0.1))}</g>
        <g transform={`translate(0 ${hy}) scale(${f1(pop * 1.45)})`}>
          <path d="M -70 0 C -80 -40 -40 -70 0 -60 C 40 -70 80 -40 70 0 C 60 40 -60 50 -70 0 Z" fill={shade(red, 0.25)} />
          <path d="M -60 -30 C -50 -80 40 -90 60 -30 C 70 10 30 30 0 20 C -30 30 -66 10 -60 -30 Z" fill={red} />
          <path d="M -30 -20 C -30 -55 25 -60 30 -22 C 34 6 -6 18 -20 0 C -28 -6 -30 -12 -30 -20 Z" fill={shade(red, 0.15)} />
          <path d="M -12 -14 C -12 -34 12 -36 14 -16 C 16 2 -4 8 -12 -14 Z" fill={shade(red, 0.3)} />
          <path d="M -68 0 C -80 30 -40 60 0 60 C 40 60 80 30 68 0 C 60 30 -40 40 -68 0 Z" fill={shade(red, 0.12)} />
        </g>
        <path d="M -40 -435 L -26 -440 L -36 -425 Z" fill={C.greenDark} />
      </g>
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
const col = (v: unknown, d: string) => (typeof v === "string" && v && v !== "none" ? v : d);

// Coil of thick rope seen from a low angle: stacked loops with twist marks and a loose end trailing to the right.
// Origin = floor centre. Hero size: about 520 px wide at s = 1.
const RINGS = [210, 160, 110];
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const rope = col(p.color, "#D9A441"), dark = col(p.color2, "#A87A2A");
  const cy = -120;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={20} cy={0} rx={270} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        <ellipse cx={0} cy={cy + 34} rx={226} ry={88} fill={dark} />
        {RINGS.map((r, i) => (
          <g key={i}>
            <ellipse cx={0} cy={cy + 14} rx={r} ry={r * 0.4} fill="none" stroke={dark} strokeWidth={44} />
            <ellipse cx={0} cy={cy} rx={r} ry={r * 0.4} fill="none" stroke={rope} strokeWidth={42} />
            <ellipse cx={0} cy={cy} rx={r} ry={r * 0.4} fill="none" stroke={dark} strokeWidth={30} strokeDasharray="10 26" opacity={0.55} />
          </g>
        ))}
        <ellipse cx={0} cy={cy} rx={64} ry={24} fill={shade(dark, 0.3)} />
        <path d="M200,-90 C250,-40 300,-30 340,-34" fill="none" stroke={dark} strokeWidth={44} strokeLinecap="round" />
        <path d="M200,-100 C250,-50 300,-42 340,-46" fill="none" stroke={rope} strokeWidth={40} strokeLinecap="round" />
        <path d="M200,-100 C250,-50 300,-42 340,-46" fill="none" stroke={dark} strokeWidth={28} strokeDasharray="10 26" opacity={0.55} />
        {[-14, 0, 14].map((d) => (
          <path key={d} d={`M356,${-46 + d * 0.6} l26,${f1(d * 0.9)}`} stroke={rope} strokeWidth={8} strokeLinecap="round" />
        ))}
      </g>
    </g>
  );
}

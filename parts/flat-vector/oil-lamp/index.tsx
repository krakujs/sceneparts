import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Traditional clay oil lamp, hero scale: a low bowl with a spout pointing right, a small ring handle at the back,
// and a flame on the wick. About 420 px wide and 280 px tall at s = 1. anim "flicker": the flame sways and pulses.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const flick = (f: number) => 0.5 + 0.5 * Math.sin(f * 0.9) * 0.6 + 0.5 * Math.sin(f * 2.3) * 0.4;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const clay = p.color && p.color !== "none" ? p.color : C.sand;
  const flame = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const flicker = anim === "flicker";
  const k = flicker ? flick(f) : 0.5;
  const fh = 1 + (flicker ? (k - 0.5) * 0.3 : 0);
  const fx = flicker ? Math.sin(f * 1.7) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "flicker" ? "none" : anim, f)}>
        {/* ring handle at the back */}
        <path d="M-150 -110 Q-230 -150 -180 -210 Q-150 -240 -130 -200" fill="none" stroke={shade(clay, 0.2)} strokeWidth={22} strokeLinecap="round" />
        {/* bowl */}
        <path d="M-170 -120 Q-180 -40 -60 -30 L60 -30 Q180 -40 170 -120 Z" fill={clay} />
        <path d="M-170 -120 L170 -120 Q170 -100 120 -96 L-120 -96 Q-170 -100 -170 -120 Z" fill={shade(clay, 0.15)} />
        {/* base foot */}
        <rect x={-110} y={-30} width={220} height={24} rx={10} fill={shade(clay, 0.25)} />
        {/* spout pointing right */}
        <path d="M120 -120 Q230 -130 290 -170 Q300 -150 280 -128 Q230 -92 150 -96 Z" fill={clay} />
        {/* wick and flame */}
        <rect x={-30} y={-134} width={28} height={14} rx={6} fill={C.ink} />
        <g transform={`translate(${f1(fx)} -134) scale(1 ${f1(fh)}) translate(0 134)`}>
          <path d="M-18 -140 Q-40 -200 -6 -250 Q4 -230 8 -224 Q24 -200 16 -170 Q14 -150 -18 -140 Z" fill={flame} />
          <path d="M-10 -146 Q-22 -190 -2 -218 Q6 -200 8 -190 Q14 -166 -10 -146 Z" fill={C.yellow} />
        </g>
      </g>
    </g>
  );
}

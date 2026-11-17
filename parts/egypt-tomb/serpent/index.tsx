import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Serpent: React.FC<{ x0: number; x1: number; y: number; amp?: number; f?: number; w?: number; open?: boolean; c?: string }> = ({ x0, x1, y, amp = 90, f = 0, w = 70, open = true, c = "#5b6f2e" }) => {
  const n = 40;
  const pts = Array.from({ length: n + 1 }).map((_, i) => {
    const t = i / n;
    return [x0 + (x1 - x0) * t, y + Math.sin(t * 9 + f * 0.2) * amp * (0.4 + 0.6 * t)];
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const [hx, hy] = pts[n];
  return (
    <g>
      <path d={d} fill="none" stroke={INK} strokeWidth={w + 16} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#e8d36a" strokeWidth={w * 0.18} strokeDasharray="30 40" strokeLinecap="round" />
      <g transform={`translate(${hx} ${hy})`}>
        <path d={`M-40 -50 Q60 -90 150 -20 L160 ${open ? 10 : 0} L60 ${open ? 20 : 30} Q-20 60 -40 30 Z`} fill={c} {...S} />
        {open && <path d="M160 10 L60 20 L150 60 Z" fill="#7a1010" {...S} strokeWidth={5} />}
        {open && <path d="M120 12 l8 22 l8 -20 M80 18 l6 20 l8 -18" fill="#fff" stroke={INK} strokeWidth={3} />}
        <circle cx={70} cy={-35} r={14} fill="#ffd36a" {...S} strokeWidth={5} /><circle cx={74} cy={-35} r={6} fill={INK} />
        {open && <path d="M160 40 l50 10 l-10 -20 M210 50 l-10 18" stroke="#c8102e" strokeWidth={6} fill="none" />}
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Serpent x0={p.x0} x1={p.x1} y={p.y} amp={p.amp} f={p.f} w={p.w} open={p.open} c={p.c} />;
}

import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const Lotus: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 L0 -150" stroke={INK} strokeWidth={10} />
    <path d="M0 -150 q-50 -10 -60 -70 q40 10 60 40 q20 -30 60 -40 q-10 60 -60 70 Z" fill={P.green} stroke={INK} strokeWidth={7} />
    <path d="M0 -60 q40 -30 70 -10" fill="none" stroke={INK} strokeWidth={8} />
    <path d="M-30 0 L30 0" stroke={INK} strokeWidth={10} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const total = p.n;
  const n = Math.max(1, Math.min(total, Math.floor((p.f / (p.d * 0.8)) * total) + 1));
  return (
    <g>
      {p.lotus !== false && Array.from({ length: n }).map((_, i) => <Lotus key={i} x={p.x + i * p.dx} y={p.y} s={0.9 * pop(p.f, (i * p.d * 0.8) / total, 5)} />)}
      <text x={540} y={p.y + 240} textAnchor="middle" fontFamily={p.style.font} fontWeight={700} fontSize={p.size} fill={P.scarlet} stroke={INK} strokeWidth={3}>
        {(p.unit * n).toLocaleString("en-US") + (p.suffix ?? "")}
      </text>
    </g>
  );
}

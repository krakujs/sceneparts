import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Beetle: React.FC<{ x: number; y: number; s?: number; f?: number; ball?: boolean; flip?: boolean }> = ({ x, y, s = 1, f = 0, ball = true, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {ball && <g transform={`rotate(${f * 6} 150 -70)`}><circle cx={150} cy={-70} r={70} fill="#7a5a3a" {...S} /><path d="M110 -100 q30 20 60 -10 M120 -40 q20 -20 50 0" stroke={INK} strokeWidth={4} fill="none" /></g>}
    {[0, 1, 2].map((i) => <path key={i} d={`M${-30 + i * 25} -40 l${-10 + Math.sin(f * 0.8 + i) * 12} 40`} stroke={INK} strokeWidth={8} strokeLinecap="round" />)}
    <ellipse cx={0} cy={-60} rx={60} ry={40} fill="#2e5a7a" {...S} />
    <ellipse cx={58} cy={-62} rx={22} ry={18} fill="#24475f" {...S} strokeWidth={6} />
    <path d="M-60 -60 L40 -60" stroke={INK} strokeWidth={4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Beetle x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} ball={p.ball} flip={p.flip} />;
}

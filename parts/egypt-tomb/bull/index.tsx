import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Bull: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean }> = ({ x, y, s = 1, f = 0, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d="M-260 -80 Q-260 -280 0 -270 L200 -270 Q260 -300 300 -250 Q330 -200 300 -160 L260 -150 L240 -80 L210 0 L180 0 L190 -80 L-150 -80 L-160 0 L-190 0 L-200 -80 Z" fill="#1d1a19" stroke={INK} strokeWidth={8} />
    <path d="M-150 -240 q-40 -10 -40 30 M-60 -270 l40 0 l-20 30 Z" fill="#f2efe6" stroke={INK} strokeWidth={4} />
    <path d="M250 -260 L280 -230 L260 -220 Z" fill="#f2efe6" />
    <path d="M230 -270 Q220 -340 270 -350 M280 -265 Q300 -330 340 -320" fill="none" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    <circle cx={270} cy={-345} r={0} />
    <g transform="translate(270 -390)"><circle r={40} fill={P.scarlet} stroke={INK} strokeWidth={6} /><path d="M30 20 q20 -20 10 -50" fill={P.gold} stroke={INK} strokeWidth={4} /></g>
    <path d={`M-260 -200 q${-40 + Math.sin(f * 0.3) * 10} 40 -30 120`} fill="none" stroke={INK} strokeWidth={8} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Bull x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip} />;
}

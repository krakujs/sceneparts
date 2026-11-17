import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Bird: React.FC<{ x: number; y: number; s?: number; f?: number; fire?: boolean; flip?: boolean }> = ({ x, y, s = 1, f = 0, fire, flip }) => (
  // the Benu heron (origin of the phoenix)
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {fire && <path d={`M-120 0 Q-60 ${-260 - Math.sin(f) * 30} 0 -60 Q60 ${-300 - Math.cos(f) * 30} 120 0 Z`} fill="#ff7a1f" opacity={0.75} />}
    <path d="M-80 -120 Q0 -200 90 -160 L100 -260 Q110 -300 140 -290 L230 -270 L140 -265 L120 -160 Q100 -60 0 -60 Q-80 -60 -80 -120 Z" fill="#9fb6c8" {...S} />
    <path d={`M-60 -130 Q-180 ${-200 + Math.sin(f * 0.6) * 60} -160 -60`} fill="#7f97aa" {...S} />
    <path d="M20 -60 L10 60 M50 -60 L60 60" stroke={INK} strokeWidth={8} />
    <path d="M125 -300 l-20 -50 M130 -298 l10 -55" stroke={INK} strokeWidth={5} />
    <circle cx={135} cy={-282} r={6} fill={INK} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Bird x={p.x} y={p.y} s={p.s} f={p.f} fire={p.fire} flip={p.flip} />;
}

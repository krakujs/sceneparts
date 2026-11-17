import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Wedjat: React.FC<{ x: number; y: number; s?: number; fire?: number }> = ({ x, y, s = 1, fire = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {fire > 0 && <path d={`M-40 -60 Q0 ${-200 - 400 * fire} 40 -60`} fill="#ff7a1f" opacity={0.7} />}
    <ellipse cx={0} cy={0} rx={190 * 1.0} ry={110} fill="#ffd36a" opacity={0.35 + 0.3 * fire} />
    <path d="M-160 0 Q0 -100 160 0 Q0 80 -160 0 Z" fill={P.linen} {...S} strokeWidth={12} />
    <circle cx={0} cy={-6} r={50} fill={P.scarlet} {...S} strokeWidth={10} />
    <circle cx={0} cy={-6} r={22} fill={INK} />
    <path d="M-170 -80 Q0 -150 180 -70" fill="none" stroke={INK} strokeWidth={26} strokeLinecap="round" />
    <path d="M160 0 L250 10" stroke={INK} strokeWidth={22} strokeLinecap="round" />
    <path d="M-30 70 L-30 190 Q-34 230 -90 225" fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" />
    <path d="M40 60 L120 200 Q140 230 110 240" fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Wedjat x={p.x} y={p.y} s={p.s} fire={p.fire} />;
}

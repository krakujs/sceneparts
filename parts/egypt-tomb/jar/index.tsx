import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Jar: React.FC<{ x: number; y: number; s?: number; red?: boolean; tilt?: number }> = ({ x, y, s = 1, red, tilt = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${tilt})`}>
    <path d="M-30 -230 L30 -230 L36 -200 Q100 -150 88 -60 Q70 0 0 6 Q-70 0 -88 -60 Q-100 -150 -36 -200 Z" fill="#b5652c" {...S} />
    <path d="M-80 -110 Q0 -90 82 -110" stroke={P.blue} strokeWidth={10} fill="none" />
    <path d="M-86 -80 Q0 -60 86 -80" stroke={INK} strokeWidth={5} fill="none" />
    <rect x={-38} y={-248} width={76} height={22} rx={6} fill={red ? "#a3131d" : "#7a3a12"} {...S} strokeWidth={6} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Jar x={p.x} y={p.y} s={p.s} red={p.red} tilt={p.r} />;
}

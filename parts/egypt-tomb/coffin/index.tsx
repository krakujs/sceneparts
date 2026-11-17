import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Coffin: React.FC<{ x: number; y: number; s?: number; lid?: number; r?: number }> = ({ x, y, s = 1, lid = 0, r = 0 }) => (
  // anthropoid coffin standing (r = 0) or lying (r = -90); lid 0..1 opens it
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-110 0 L-130 -500 Q-140 -700 0 -720 Q140 -700 130 -500 L110 0 Z" fill="#b5652c" {...S} />
    <g transform={`translate(${lid * 160} ${-lid * 60}) rotate(${lid * 18} 0 0)`}>
      <path d="M-100 -10 L-118 -500 Q-125 -690 0 -705 Q125 -690 118 -500 L100 -10 Z" fill="#e8c24a" {...S} />
      <path d="M-70 -640 Q0 -700 70 -640 L60 -540 Q0 -520 -60 -540 Z" fill="#e8b58a" {...S} strokeWidth={6} />
      <path d="M-118 -500 Q0 -430 118 -500" stroke={P.lapis} strokeWidth={22} fill="none" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M-100 ${-380 + i * 90} L100 ${-380 + i * 90}`} stroke={P.green} strokeWidth={10} />)}
    </g>
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Coffin x={p.x} y={p.y} s={p.s} lid={p.lid} r={p.r} />;
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Flintlock musket resting across two wooden stands: wooden stock, iron barrel with bands, lock with a raised
// cock and a trigger guard. Long, so drawn at about 860 px wide at s = 1. Stands on (x, y), bottom centre.
export const Musket: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; wood?: string; iron?: string; angle?: number }> = ({ x, y, s = 1, f = 0, flip = false, wood = "#8A6A45", iron = "#4A4E5E", angle = -6 }) => {
  const o = { stroke: C.ink, strokeWidth: 6, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={40} cy={4} rx={440} ry={16} fill="#000" opacity={0.2} />
      <rect x={-40} y={-135} width={18} height={135} rx={4} fill="#6A4E30" {...o} />
      <rect x={160} y={-172} width={18} height={172} rx={4} fill="#6A4E30" {...o} />
      <g transform={`rotate(${angle} 0 -200)`}>
        {/* stock */}
        <path d="M -380 -220 L -352 -212 L -60 -200 L 180 -196 Q 200 -194 200 -178 Q 196 -156 176 -152 L -40 -130 L -330 -96 Q -378 -100 -380 -150 Z" fill={wood} {...o} />
        <path d="M -330 -170 L 170 -166" stroke="#5A4128" strokeWidth={3} opacity={0.5} />
        <rect x={-384} y={-224} width={12} height={130} rx={4} fill={iron} {...o} />
        {/* barrel */}
        <rect x={-60} y={-226} width={530} height={16} rx={3} fill={iron} {...o} />
        <rect x={60} y={-229} width={12} height={22} fill={iron} stroke={C.ink} strokeWidth={4} />
        <rect x={240} y={-229} width={12} height={22} fill={iron} stroke={C.ink} strokeWidth={4} />
        <rect x={462} y={-230} width={14} height={26} rx={3} fill={iron} {...o} />
        <path d="M -40 -222 L 440 -222" stroke="#FFFFFF" strokeWidth={3} opacity={0.5} />
        {/* ramrod pipes */}
        {[100, 200, 300].map((px) => (
          <circle key={px} cx={px} cy={-188} r={6} fill="#C99A4A" stroke={C.ink} strokeWidth={3} />
        ))}
        {/* lock */}
        <rect x={-40} y={-200} width={90} height={30} rx={4} fill={iron} {...o} />
        <path d="M -34 -200 L -50 -236 L -28 -232 L -18 -200 Z" fill={iron} {...o} />
        <circle cx={6} cy={-185} r={6} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
        {/* trigger guard */}
        <path d="M 10 -168 Q 40 -138 70 -168" stroke={iron} strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Musket x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} wood={p.wood} iron={p.iron} angle={p.angle} />;
}

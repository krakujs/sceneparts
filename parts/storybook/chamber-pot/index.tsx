import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Enamel chamber pot: cream glaze with a teal rim band, a loop handle and a few dots. Empty, gently wobbling.
// Stands on (x, y), bottom centre, about 290 px tall at s = 1.
export const ChamberPot: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; glaze?: string; rim?: string }> = ({ x, y, s = 1, f = 0, flip = false, glaze = C.cream, rim = C.teal }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const wobble = Math.sin(f / 40) * 1.2;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={190} ry={16} fill="#000" opacity={0.2} />
      <g transform={`rotate(${wobble} 0 0)`}>
        <path d="M 160 -200 Q 250 -200 240 -130 Q 232 -70 160 -80" stroke={C.ink} strokeWidth={24} fill="none" strokeLinecap="round" />
        <path d="M 160 -200 Q 250 -200 240 -130 Q 232 -70 160 -80" stroke={glaze} strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d="M -165 -250 C -165 -120 -150 -50 -100 -15 Q 0 4 100 -15 C 150 -50 165 -120 165 -250 Z" fill={glaze} {...o} />
        <path d="M -165 -236 Q 0 -200 165 -236 L 165 -212 Q 0 -176 -165 -212 Z" fill={rim} {...o} />
        {[
          [-80, -160],
          [0, -120],
          [80, -160],
          [-40, -70],
          [40, -70],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={6} fill={rim} />
        ))}
        <path d="M -135 -200 Q -140 -120 -110 -60" stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={0.55} strokeLinecap="round" />
        <ellipse cx={0} cy={-250} rx={165} ry={34} fill={rim} {...o} />
        <ellipse cx={0} cy={-250} rx={140} ry={22} fill="#4A4E5E" stroke={C.ink} strokeWidth={5} />
        <ellipse cx={-60} cy={-256} rx={30} ry={6} fill="#FFFFFF" opacity={0.25} />
        <ellipse cx={0} cy={-6} rx={120} ry={12} fill={glaze} {...o} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <ChamberPot x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} glaze={p.glaze} rim={p.rim} />;
}

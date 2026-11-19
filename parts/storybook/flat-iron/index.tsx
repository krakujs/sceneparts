import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Black cast-iron sad iron: a wedge with a pointed nose, a looped handle on top and wavy heat shimmer rising.
// Hero close-up, about 400 px across at s = 1. Stands on (x, y), bottom centre.
export const FlatIron: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; iron?: string; hot?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, iron = "#2A2D36", hot = true }) => {
  const o = { stroke: C.ink, strokeWidth: 6, strokeLinejoin: "round" as const };
  const rise = (f * 0.8) % 30;
  const squiggle = (sx: number, sy: number) => `M ${sx} ${sy} q 8 -10 16 0 t 16 0 t 16 0 t 16 0`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={210} ry={14} fill="#000" opacity={0.2} />
      {hot
        ? [
            { sx: -236, dy: 0, o: 0.9 },
            { sx: 222, dy: 14, o: 0.8 },
          ].map((w, i) => (
            <path key={i} d={squiggle(w.sx, -200 - rise + w.dy)} stroke={C.mustard} strokeWidth={6} fill="none" strokeLinecap="round" opacity={w.o * (1 - rise / 40)} />
          ))
        : null}
      <path d="M -110 -150 C -120 -270 90 -270 80 -150" stroke={C.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d="M -110 -150 C -120 -270 90 -270 80 -150" stroke="#5A5F6E" strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -190 0 L 190 0 Q 205 -2 200 -25 L 115 -150 L -170 -150 Q -190 -150 -190 -130 Z" fill={iron} {...o} />
      <path d="M -150 -138 L 100 -138" stroke="#5A5F6E" strokeWidth={6} opacity={0.7} strokeLinecap="round" />
      <path d="M -160 -110 L -160 -30" stroke="#FFFFFF" strokeWidth={8} opacity={0.2} strokeLinecap="round" />
      <circle cx={-40} cy={-70} r={7} fill="#5A5F6E" stroke={C.ink} strokeWidth={3} />
      <circle cx={30} cy={-70} r={7} fill="#5A5F6E" stroke={C.ink} strokeWidth={3} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <FlatIron x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} iron={p.iron} hot={p.hot} />;
}

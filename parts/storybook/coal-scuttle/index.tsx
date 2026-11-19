import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Coal scuttle: black metal coal scuttle with a handle full of coal and a small shovel leaning on it. Hero close-up; stands on (x, y).
export const CoalScuttle: React.FC<{ x: number; y: number; s?: number; f?: number; sparkle?: boolean; metal?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, sparkle = true, metal = "#2C2F3B", flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const glint = sparkle ? 0.5 + Math.sin(f / 6) * 0.5 : 0.3;
  const lumps: [number, number, number][] = [[-120, -330, 36], [-60, -352, 40], [0, -340, 42], [60, -356, 40], [120, -332, 36], [-90, -300, 30], [-20, -312, 32], [50, -308, 30], [110, -296, 28]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={230} ry={18} fill="#000" opacity={0.2} />
      {/* shovel leaning on the right */}
      <path d="M 190 -30 L 290 -290" stroke={C.ink} strokeWidth={20} strokeLinecap="round" />
      <path d="M 190 -30 L 290 -290" stroke={C.sepia} strokeWidth={9} strokeLinecap="round" />
      <path d="M 268 -292 Q 300 -350 352 -330 Q 370 -300 330 -262 Q 300 -250 268 -292 Z" fill={metal} {...o} />
      {/* handle */}
      <path d="M -150 -300 Q 0 -560 150 -300" stroke={C.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d="M -150 -300 Q 0 -560 150 -300" stroke={metal} strokeWidth={10} fill="none" strokeLinecap="round" />
      {/* body */}
      <path d="M -170 -300 L 170 -300 L 140 -40 Q 0 -6 -140 -40 Z" fill={metal} {...o} />
      <path d="M -150 -270 L -128 -60" stroke="#FFFFFF" strokeWidth={8} opacity={0.25} strokeLinecap="round" />
      <path d="M -157 -230 L 157 -230 M -151 -160 L 151 -160" stroke={C.ink} strokeWidth={7} />
      <ellipse cx={0} cy={-300} rx={170} ry={34} fill={C.ink} stroke={C.ink} strokeWidth={6} />
      {/* coal heap */}
      {lumps.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={C.stoneDark} stroke={C.ink} strokeWidth={4} />)}
      <circle cx={-40} cy={-362} r={7} fill="#FFFFFF" opacity={glint} />
      <circle cx={90} cy={-340} r={5} fill="#FFFFFF" opacity={glint * 0.8} />
      <circle cx={-110} cy={-318} r={4} fill="#FFFFFF" opacity={glint * 0.6} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <CoalScuttle x={p.x} y={p.y} s={p.s} f={p.f} sparkle={p.sparkle} metal={p.metal} flip={p.flip} />;
}

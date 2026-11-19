import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Sailor's cutlass standing point-down in the lid of a wooden barrel: curved steel blade, brass basket guard,
// leather grip and pommel. A glint sweeps over the blade. Stands on (x, y), about 600 px tall at s = 1.
export const Cutlass: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; steel?: string; brass?: string; wood?: string; glint?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, steel = "#C9D3DA", brass = "#C99A4A", wood = "#6A4E30", glint = true }) => {
  const o = { stroke: C.ink, strokeWidth: 6, strokeLinejoin: "round" as const };
  const g = glint ? 0.3 + Math.max(0, Math.sin(f / 16)) * 0.6 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={190} ry={16} fill="#000" opacity={0.2} />
      {/* barrel */}
      <path d="M -170 -230 L -162 -6 Q 0 10 162 -6 L 170 -230 Q 0 -196 -170 -230 Z" fill="#8A6A45" {...o} strokeWidth={7} />
      {[-120, -60, 60, 120].map((sx) => (
        <line key={sx} x1={sx} y1={-200} x2={sx * 0.96} y2={-12} stroke="#5A4128" strokeWidth={3} opacity={0.35} />
      ))}
      <rect x={-168} y={-150} width={336} height={18} rx={6} fill="#4A4E5E" stroke={C.ink} strokeWidth={5} />
      <rect x={-166} y={-60} width={332} height={18} rx={6} fill="#4A4E5E" stroke={C.ink} strokeWidth={5} />
      <ellipse cx={0} cy={-230} rx={170} ry={34} fill="#C9A072" stroke={C.ink} strokeWidth={7} />
      {/* blade */}
      <path d="M -16 -452 Q 40 -360 6 -238 L 14 -236 Q 62 -358 18 -452 Z" fill={steel} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 16 -440 Q 52 -350 16 -250" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.7} />
      <path d="M 4 -420 Q 36 -350 20 -290" stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={g} strokeLinecap="round" />
      {/* basket guard */}
      <path d="M -58 -456 Q -70 -390 -6 -380 Q 50 -382 58 -456" fill="none" stroke={C.ink} strokeWidth={18} strokeLinecap="round" />
      <path d="M -58 -456 Q -70 -390 -6 -380 Q 50 -382 58 -456" fill="none" stroke={brass} strokeWidth={9} strokeLinecap="round" />
      <ellipse cx={0} cy={-456} rx={64} ry={14} fill={brass} {...o} strokeWidth={5} />
      {/* grip and pommel */}
      <rect x={-13} y={-560} width={26} height={110} rx={10} fill={wood} {...o} strokeWidth={5} />
      {[-540, -520, -500, -480].map((gy) => (
        <line key={gy} x1={-13} y1={gy} x2={13} y2={gy - 8} stroke={brass} strokeWidth={3} />
      ))}
      <circle cx={0} cy={-574} r={18} fill={brass} {...o} strokeWidth={6} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Cutlass x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} steel={p.steel} brass={p.brass} wood={p.wood} glint={p.glint} />;
}

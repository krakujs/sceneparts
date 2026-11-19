import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Telegraph machine: brass telegraph key and sounder on a wooden base with paper tape; the key taps. Stands on (x, y) at desk level.
export const TelegraphMachine: React.FC<{ x: number; y: number; s?: number; f?: number; tapping?: boolean; brass?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, tapping = true, brass = "#D9A441", flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const dark = "#5E4530";
  const press = tapping ? Math.max(0, Math.sin(f / 8)) : 0;
  const keyAngle = -8 + press * 8;
  const marks = [0, 1, 2, 3].map((m) => -318 + ((m * 46 + f * 0.6) % 140));
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={320} ry={16} fill="#000" opacity={0.2} />
      {/* wooden base */}
      <rect x={-300} y={-60} width={600} height={60} rx={8} fill={dark} {...o} />
      <path d="M -280 -48 L -60 -48" stroke="#FFFFFF" strokeWidth={5} opacity={0.3} strokeLinecap="round" />
      {/* paper tape running out of the sounder */}
      <rect x={-330} y={-78} width={180} height={18} fill={C.cream} stroke={C.ink} strokeWidth={4} />
      {marks.map((mx, i) => <rect key={i} x={Math.max(-326, Math.min(-156, mx))} y={-72} width={12} height={6} fill={C.ink} />)}
      {/* sounder: two coils on a plate, with a clicking arm */}
      <rect x={-250} y={-130} width={150} height={20} rx={6} fill={dark} {...o} />
      <rect x={-230} y={-200} width={36} height={72} rx={14} fill={brass} {...o} />
      <rect x={-160} y={-200} width={36} height={72} rx={14} fill={brass} {...o} />
      <rect x={-200} y={-214} width={40} height={18} rx={5} fill={C.ink} />
      <path d="M -200 -150 L -140 -220" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
      <path d="M -200 -150 L -140 -220" stroke={brass} strokeWidth={5} strokeLinecap="round" />
      <circle cx={-200} cy={-150} r={10} fill={brass} {...o} />
      {/* telegraph key on the right */}
      <rect x={40} y={-110} width={220} height={50} rx={8} fill={dark} {...o} />
      <rect x={60} y={-140} width={40} height={36} rx={6} fill={brass} {...o} />
      <g transform={`rotate(${keyAngle} 80 -106)`}>
        <rect x={80} y={-120} width={200} height={16} rx={6} fill={brass} {...o} />
        <circle cx={270} cy={-112} r={22} fill={C.ink} />
        <circle cx={262} cy={-120} r={6} fill="#FFFFFF" opacity={0.5} />
      </g>
      <rect x={120} y={-126} width={20} height={20} fill={brass} {...o} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <TelegraphMachine x={p.x} y={p.y} s={p.s} f={p.f} tapping={p.tapping} brass={p.brass} flip={p.flip} />;
}

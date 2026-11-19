import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Penny farthing: high-wheel bicycle with a huge front wheel and a tiny rear wheel. Stands on (x, y) at ground level.
export const PennyFarthing: React.FC<{ x: number; y: number; s?: number; f?: number; rolling?: boolean; frame?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, rolling = true, frame = "#2E3F5C", flip = false }) => {
  const FX = 120, FY = -280, FR = 280;
  const RX = -220, RY = -110, RR = 110;
  const turn = rolling ? f * 6 : 0;
  const spokes = (cx: number, cy: number, r: number, n: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((i * 360) / n) * (Math.PI / 180);
      return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke={C.ink} strokeWidth={4} />;
    });
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={340} ry={16} fill="#000" opacity={0.18} />
      {/* frame */}
      <line x1={100} y1={-430} x2={FX} y2={FY} stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
      <line x1={100} y1={-430} x2={FX} y2={FY} stroke={frame} strokeWidth={10} strokeLinecap="round" />
      <line x1={100} y1={-430} x2={RX} y2={RY} stroke={C.ink} strokeWidth={20} strokeLinecap="round" />
      <line x1={100} y1={-430} x2={RX} y2={RY} stroke={frame} strokeWidth={8} strokeLinecap="round" />
      <path d="M 92 -430 Q 70 -482 136 -474" stroke={C.ink} strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M 92 -430 Q 70 -482 136 -474" stroke={C.stone} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M -150 -200 L -150 -240" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
      <path d="M -210 -262 Q -150 -282 -90 -262 L -92 -240 Q -150 -254 -208 -240 Z" fill={C.sepia} {...{ stroke: C.ink, strokeWidth: 6, strokeLinejoin: "round" as const }} />
      {/* front wheel */}
      <circle cx={FX} cy={FY} r={FR} fill="none" stroke={C.ink} strokeWidth={22} />
      <circle cx={FX} cy={FY} r={FR - 14} fill="none" stroke={C.brick} strokeWidth={10} />
      <g transform={`rotate(${turn} ${FX} ${FY})`}>{spokes(FX, FY, FR - 16, 10)}</g>
      <circle cx={FX} cy={FY} r={18} fill={C.mustard} stroke={C.ink} strokeWidth={6} />
      {/* rear wheel */}
      <circle cx={RX} cy={RY} r={RR} fill="none" stroke={C.ink} strokeWidth={16} />
      <circle cx={RX} cy={RY} r={RR - 10} fill="none" stroke={C.brick} strokeWidth={6} />
      <g transform={`rotate(${-turn * 2.5} ${RX} ${RY})`}>{spokes(RX, RY, RR - 12, 8)}</g>
      <circle cx={RX} cy={RY} r={12} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
      {/* highlight on tyre */}
      <path d={`M ${FX - 200} ${FY - 120} A ${FR - 40} ${FR - 40} 0 0 1 ${FX - 80} ${FY - 250}`} stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={0.35} strokeLinecap="round" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <PennyFarthing x={p.x} y={p.y} s={p.s} f={p.f} rolling={p.rolling} frame={p.frame} flip={p.flip} />;
}

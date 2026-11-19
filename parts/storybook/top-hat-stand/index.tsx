import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Top hat stand: wooden coat and hat stand with two top hats on its pegs and a scarf hanging from a lower peg. Stands on (x, y) at floor level.
export const TopHatStand: React.FC<{ x: number; y: number; s?: number; f?: number; wood?: string; scarf?: string; hat?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, wood = C.sepia, scarf = C.brick, hat = "#121A2C", flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const sway = Math.sin(f / 30) * 4;
  const Hat: React.FC<{ cx: number }> = ({ cx }) => (
    <g>
      <rect x={cx - 62} y={-890} width={124} height={170} rx={8} fill={hat} {...o} />
      <rect x={cx - 62} y={-832} width={124} height={22} fill={C.brick} />
      <ellipse cx={cx} cy={-720} rx={116} ry={26} fill={hat} {...o} />
      <path d={`M ${cx - 40} -880 L ${cx - 40} -760`} stroke="#FFFFFF" strokeWidth={6} opacity={0.2} strokeLinecap="round" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={190} ry={18} fill="#000" opacity={0.2} />
      {/* tripod foot */}
      <path d="M -10 -60 L -150 -8 M 10 -60 L 150 -8 M 0 -60 L 0 -8" stroke={C.ink} strokeWidth={34} strokeLinecap="round" />
      <path d="M -10 -60 L -150 -8 M 10 -60 L 150 -8 M 0 -60 L 0 -8" stroke={wood} strokeWidth={18} strokeLinecap="round" />
      <ellipse cx={0} cy={-10} rx={160} ry={18} fill={wood} {...o} />
      {/* pole */}
      <rect x={-14} y={-820} width={28} height={820} rx={8} fill={wood} {...o} />
      <path d="M -6 -780 L -6 -90" stroke="#FFFFFF" strokeWidth={6} opacity={0.3} strokeLinecap="round" />
      <circle cx={0} cy={-840} r={24} fill={wood} {...o} />
      {/* top arms with pegs */}
      <rect x={-200} y={-716} width={400} height={20} rx={8} fill={wood} {...o} />
      <circle cx={-200} cy={-706} r={16} fill={wood} {...o} />
      <circle cx={200} cy={-706} r={16} fill={wood} {...o} />
      <Hat cx={-200} />
      <Hat cx={200} />
      {/* lower peg with scarf */}
      <rect x={-14} y={-560} width={150} height={16} rx={7} fill={wood} {...o} />
      <g transform={`rotate(${sway} 90 -552)`}>
        <rect x={40} y={-560} width={100} height={150} rx={6} fill={scarf} {...o} />
        <path d="M 40 -548 L 140 -548 M 40 -520 L 140 -520" stroke={C.ink} strokeWidth={4} opacity={0.35} />
        <rect x={50} y={-410} width={34} height={100} fill={scarf} {...o} />
        <rect x={100} y={-410} width={34} height={100} fill={scarf} {...o} />
        {[0, 1, 2, 3].map((i) => <line key={i} x1={54 + i * 8} y1={-310} x2={54 + i * 8} y2={-296} stroke={C.ink} strokeWidth={4} />)}
        {[0, 1, 2, 3].map((i) => <line key={i} x1={104 + i * 8} y1={-310} x2={104 + i * 8} y2={-296} stroke={C.ink} strokeWidth={4} />)}
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <TopHatStand x={p.x} y={p.y} s={p.s} f={p.f} wood={p.wood} scarf={p.scarf} hat={p.hat} flip={p.flip} />;
}

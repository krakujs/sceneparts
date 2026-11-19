import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Gallows sign: blank wooden inn sign hanging from a gallows-shaped bracket post; the sign swings gently. No text.
export const GallowsSign: React.FC<{ x: number; y: number; s?: number; f?: number; swing?: boolean; board?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, swing = true, board = "#B98B52", flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const a = swing ? Math.sin(f / 35) * 3 : 0;
  const pivot = [150, -760];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={170} ry={18} fill="#000" opacity={0.18} />
      {/* post and base */}
      <rect x={-250} y={-60} width={100} height={60} rx={8} fill={C.stone} {...o} />
      <rect x={-216} y={-900} width={36} height={846} fill={C.sepia} {...o} />
      <path d="M -206 -880 L -206 -90" stroke="#FFFFFF" strokeWidth={6} opacity={0.3} strokeLinecap="round" />
      <circle cx={-198} cy={-910} r={22} fill={C.sepia} {...o} />
      {/* gallows bracket: arm and diagonal brace */}
      <rect x={-200} y={-770} width={520} height={24} rx={6} fill={C.sepia} {...o} />
      <path d="M -196 -640 L -60 -752" stroke={C.ink} strokeWidth={26} strokeLinecap="round" />
      <path d="M -196 -640 L -60 -752" stroke={C.sepia} strokeWidth={12} strokeLinecap="round" />
      {/* hanging sign, pivots from the arm */}
      <g transform={`rotate(${a} ${pivot[0]} ${pivot[1]})`}>
        <path d="M 40 -760 L 40 -650" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
        <path d="M 40 -760 L 40 -650" stroke={C.stone} strokeWidth={5} strokeLinecap="round" />
        <path d="M 260 -760 L 260 -650" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
        <path d="M 260 -760 L 260 -650" stroke={C.stone} strokeWidth={5} strokeLinecap="round" />
        <circle cx={150} cy={-762} r={12} fill="none" stroke={C.ink} strokeWidth={6} />
        <rect x={20} y={-650} width={260} height={230} rx={14} fill={board} {...o} />
        <rect x={34} y={-636} width={232} height={202} rx={8} fill="none" stroke={C.ink} strokeWidth={4} opacity={0.5} />
        {[-560, -500, -440].map((yy) => <path key={yy} d={`M 34 ${yy} L 266 ${yy}`} stroke={C.ink} strokeWidth={4} opacity={0.35} />)}
        <path d="M 46 -630 L 46 -460" stroke="#FFFFFF" strokeWidth={8} opacity={0.35} strokeLinecap="round" />
        <rect x={20} y={-650} width={260} height={230} rx={14} fill="none" stroke={C.ink} strokeWidth={8} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <GallowsSign x={p.x} y={p.y} s={p.s} f={p.f} swing={p.swing} board={p.board} flip={p.flip} />;
}

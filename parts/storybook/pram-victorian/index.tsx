import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Victorian pram: big spoked wheels, navy basket with brass rim, cream folding hood with fringe and a long
// wooden handle. Empty, gently rocking on its axle. Stands on (x, y), bottom centre, about 530 px tall at s = 1.
export const Pram: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; body?: string; hood?: string; rock?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, body = C.navy, hood = C.cream, rock = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const sway = rock ? Math.sin(f / 30) * 2.2 : 0;
  const wheel = (wx: number) => (
    <g>
      <circle cx={wx} cy={-140} r={140} fill={C.stoneDark} {...o} />
      <circle cx={wx} cy={-140} r={122} fill="none" stroke={C.stone} strokeWidth={6} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <line key={i} x1={wx} y1={-140} x2={wx + Math.cos(a) * 120} y2={-140 + Math.sin(a) * 120} stroke={C.stone} strokeWidth={6} />;
      })}
      <circle cx={wx} cy={-140} r={22} fill={C.mustard} {...o} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={20} cy={4} rx={330} ry={18} fill="#000" opacity={0.2} />
      {wheel(-130)}
      {wheel(150)}
      <rect x={-200} y={-180} width={380} height={24} rx={6} fill={C.stone} {...o} />
      <g transform={`rotate(${sway} 0 -140)`}>
        {/* handle */}
        <path d="M -200 -300 L -330 -520" stroke={C.ink} strokeWidth={24} strokeLinecap="round" fill="none" />
        <path d="M -200 -300 L -330 -520" stroke="#8A6A45" strokeWidth={10} strokeLinecap="round" fill="none" />
        <path d="M -360 -528 L -296 -528" stroke={C.ink} strokeWidth={20} strokeLinecap="round" />
        <path d="M -360 -528 L -296 -528" stroke="#8A6A45" strokeWidth={8} strokeLinecap="round" />
        {/* basket */}
        <path d="M -200 -300 L 160 -300 Q 190 -240 150 -180 L -170 -180 Q -200 -230 -200 -300 Z" fill={body} {...o} />
        <rect x={-206} y={-316} width={372} height={20} rx={10} fill={C.mustard} {...o} />
        <path d="M -150 -260 Q -120 -240 -60 -250" stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={0.35} strokeLinecap="round" />
        {/* hood */}
        <path d="M -200 -312 Q -212 -472 -80 -480 Q -20 -478 10 -312 Z" fill={hood} {...o} />
        <path d="M -170 -420 Q -110 -450 -40 -440" stroke={C.ink} strokeWidth={4} fill="none" opacity={0.35} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const hx = -200 + i * 31;
          return <path key={i} d={`M ${hx} -316 a 15 15 0 0 0 31 0`} fill={C.mustard} stroke={C.ink} strokeWidth={4} />;
        })}
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Pram x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} body={p.body} hood={p.hood} rock={p.rock} />;
}

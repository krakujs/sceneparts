import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Ship lantern: a brass-framed lantern with a red half and a green half of glass, hung on a hook from a wooden
// post. It swings gently and glows when lit. Stands on (x, y), bottom centre, about 600 px tall at s = 1.
export const ShipLantern: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; lit?: boolean; swing?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, lit = true, swing = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const brass = "#C99A4A";
  const green = "#3F9A5A";
  const sway = swing ? Math.sin(f / 30) * 5 : 0;
  const pulse = 1 + Math.sin(f / 4) * 0.05 + Math.sin(f / 9) * 0.04;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={150} ry={14} fill="#000" opacity={0.2} />
      {/* post and arm */}
      <rect x={-150} y={-560} width={40} height={556} rx={6} fill="#8A6A45" {...o} />
      <rect x={-112} y={-560} width={240} height={22} rx={6} fill="#8A6A45" {...o} />
      <rect x={-170} y={-22} width={80} height={22} rx={6} fill={C.stone} {...o} />
      <path d="M 90 -538 L 90 -506 Q 90 -484 70 -484" stroke={C.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M 90 -538 L 90 -506 Q 90 -484 70 -484" stroke={C.stone} strokeWidth={5} fill="none" strokeLinecap="round" />
      <g transform={`translate(90 -480) rotate(${sway}) scale(1.35)`}>
        {lit ? <circle cx={0} cy={130} r={180 * pulse} fill={C.glow} opacity={0.2} /> : null}
        <path d="M -12 -2 Q 0 -30 12 -2" stroke={C.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d="M -12 -2 Q 0 -30 12 -2" stroke={brass} strokeWidth={4} fill="none" strokeLinecap="round" />
        <rect x={-62} y={0} width={124} height={22} rx={6} fill={brass} {...o} />
        <path d="M -34 0 Q 0 -24 34 0 Z" fill={brass} {...o} />
        {/* glass halves */}
        <rect x={-56} y={26} width={56} height={210} rx={8} fill={C.brick} opacity={lit ? 0.92 : 0.55} />
        <rect x={0} y={26} width={56} height={210} rx={8} fill={green} opacity={lit ? 0.92 : 0.55} />
        {lit ? (
          <g transform={`translate(0 130) scale(${pulse})`}>
            <circle cx={-28} cy={0} r={22} fill={C.glow} opacity={0.6} />
            <circle cx={28} cy={0} r={22} fill={C.glow} opacity={0.6} />
            <path d="M 0 -30 Q 12 -6 6 8 Q 0 14 -6 8 Q -12 -6 0 -30 Z" fill="#F08A24" />
          </g>
        ) : null}
        <path d="M -44 40 L -44 110" stroke="#FFFFFF" strokeWidth={7} opacity={0.45} strokeLinecap="round" />
        <rect x={-4} y={26} width={8} height={210} fill={brass} stroke={C.ink} strokeWidth={4} />
        <rect x={-62} y={24} width={124} height={10} fill={brass} stroke={C.ink} strokeWidth={4} />
        <rect x={-62} y={226} width={124} height={10} fill={brass} stroke={C.ink} strokeWidth={4} />
        <rect x={-62} y={236} width={124} height={22} rx={6} fill={brass} {...o} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <ShipLantern x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} lit={p.lit} swing={p.swing} />;
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Wax seal: folded letter with a red wax seal stamped with a plain star, and a seal stamp beside it. Hero close-up; (x, y) is the letter's centre.
export const WaxSeal: React.FC<{ x: number; y: number; s?: number; f?: number; wax?: string; stamping?: boolean; flip?: boolean }> = ({ x, y, s = 1, f = 0, wax = C.brick, stamping = false, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const press = stamping ? Math.max(0, Math.sin(f / 14)) : 0;
  // scalloped wax blob
  const blob = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r = 66 + (i % 2 === 0 ? 6 : -4);
    return `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
  });
  const star = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 40 : 18;
    return `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
  });
  const stampStar = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 34 : 14;
    return `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={170} rx={300} ry={18} fill="#000" opacity={0.18} />
      {/* letter body and flap */}
      <rect x={-200} y={-120} width={400} height={260} rx={8} fill={C.cream} {...o} />
      <path d="M -200 -120 L 0 30 L 200 -120 Z" fill={C.paperDark} {...o} />
      <path d="M -200 140 L -20 -10 M 200 140 L 20 -10" stroke={C.ink} strokeWidth={4} opacity={0.35} />
      <path d="M -170 -100 L -60 -40" stroke="#FFFFFF" strokeWidth={6} opacity={0.5} strokeLinecap="round" />
      {/* wax seal */}
      <polygon points={blob.join(" ")} fill={wax} {...o} />
      <polygon points={star.join(" ")} fill="none" stroke={C.brickDark} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -40 -40 Q -20 -54 4 -58" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.4} strokeLinecap="round" />
      {/* seal stamp beside the letter, pressing down when stamping */}
      <g transform={`translate(0 ${press * 40})`}>
        <circle cx={250} cy={-150} r={44} fill={C.sepia} {...o} />
        <rect x={236} y={-108} width={28} height={70} fill={C.sepia} {...o} />
        <rect x={204} y={-40} width={92} height={44} rx={8} fill="#B98B52" {...o} />
        <polygon points={stampStar.join(" ")} fill="#8A6A45" opacity={0.6} transform="translate(250 -18)" />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <WaxSeal x={p.x} y={p.y} s={p.s} f={p.f} wax={p.wax} stamping={p.stamping} flip={p.flip} />;
}

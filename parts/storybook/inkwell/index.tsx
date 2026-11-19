import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Inkwell: glass inkwell of dark ink with a quill standing in it. Hero close-up; the base sits at (x, y).
export const Inkwell: React.FC<{ x: number; y: number; s?: number; f?: number; ink?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, ink = C.navy, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const wave = Math.sin(f / 14) * 5;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={180} ry={18} fill="#000" opacity={0.2} />
      {/* quill standing in the neck */}
      <g transform="translate(0 -250) rotate(8)">
        <path d="M 4 -60 C 50 -100 70 -190 40 -290 C 26 -300 12 -302 4 -298 C -20 -200 -28 -120 4 -60 Z" fill="#FBF7EE" {...o} strokeWidth={5} />
        <path d="M 4 -60 C -36 -100 -50 -180 -26 -270 C -12 -280 -2 -282 4 -280 C 22 -190 22 -120 4 -60 Z" fill="#EFE6D2" {...o} strokeWidth={5} />
        <path d="M 2 -296 L 2 -60" stroke={C.sepia} strokeWidth={8} strokeLinecap="round" />
      </g>
      {/* glass body and neck */}
      <rect x={-52} y={-320} width={104} height={110} rx={10} fill="#D7E3E2" opacity={0.7} {...o} />
      <rect x={-68} y={-340} width={136} height={26} rx={8} fill="#D7E3E2" opacity={0.85} {...o} />
      <ellipse cx={0} cy={-110} rx={130} ry={110} fill="#D7E3E2" opacity={0.7} {...o} />
      <ellipse cx={0} cy={-92} rx={122} ry={86} fill={ink} />
      <ellipse cx={0} cy={-172 + wave * 0.3} rx={108} ry={14} fill="#2E3F5C" />
      <path d="M -96 -110 Q -110 -60 -70 -30" stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={0.55} strokeLinecap="round" />
      <path d="M -40 -200 Q -20 -206 10 -204" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.6} strokeLinecap="round" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Inkwell x={p.x} y={p.y} s={p.s} f={p.f} ink={p.ink} flip={p.flip} />;
}

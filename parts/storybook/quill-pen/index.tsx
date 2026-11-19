import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Quill pen: white feather quill with a brass-tipped nib, writing a little ink curl. Hero close-up; the nib sits at (x, y).
export const Quill: React.FC<{ x: number; y: number; s?: number; f?: number; ink?: string; writing?: boolean; flip?: boolean }> = ({ x, y, s = 1, f = 0, ink = C.navy, writing = true, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 5, strokeLinejoin: "round" as const };
  const prog = writing ? Math.min(1, (f % 110) / 80) : 1;
  const tipBob = writing ? Math.sin(f / 9) * 3 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={130} cy={22} rx={250} ry={14} fill="#000" opacity={0.15} />
      {/* ink curl written from the nib */}
      <path pathLength={1} d="M 6 4 C 60 -40 100 30 150 -6 S 230 -30 280 6 S 330 -10 350 -20" stroke={ink} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - prog} />
      <g transform={`translate(0 ${tipBob}) rotate(14)`}>
        {/* feather vanes */}
        <path d="M 4 -150 C 90 -210 120 -330 74 -470 C 50 -482 22 -484 6 -476 C -40 -340 -60 -230 4 -150 Z" fill="#FBF7EE" {...o} />
        <path d="M 4 -150 C -70 -220 -100 -330 -64 -440 C -40 -456 -14 -462 6 -470 C 48 -340 40 -230 4 -150 Z" fill="#EFE6D2" {...o} />
        <path d="M 40 -170 C 70 -260 80 -340 60 -440" stroke={C.stone} strokeWidth={3} fill="none" opacity={0.5} />
        <path d="M 2 -470 L 2 -150" stroke={C.sepia} strokeWidth={8} strokeLinecap="round" />
        {/* shaft and nib */}
        <path d="M 2 -150 L 2 -60" stroke={C.sepia} strokeWidth={10} strokeLinecap="round" />
        <path d="M -14 -64 L 2 4 L 18 -64 Z" fill="#D9A441" {...o} />
        <path d="M 2 -60 L 2 0" stroke={C.ink} strokeWidth={3} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Quill x={p.x} y={p.y} s={p.s} f={p.f} ink={p.ink} writing={p.writing} flip={p.flip} />;
}

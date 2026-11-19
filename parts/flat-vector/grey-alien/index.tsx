import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Grey alien: slim body, a very big head with large black eyes, standing calmly with arms at its sides.
// Custom drawing. Body space: feet at 0,0, faces the viewer, ~950 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, color = "#A7B0BD" } = p as any;
  const body = color, bodyD = shade(color, 0.2);
  const blink = (f + 70) % 150 < 5;
  const breathe = 1 + Math.sin(f / 35) * 0.012;
  const eye = (cx: number, cy: number, tilt: number) => (
    <g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
      <g transform={blink ? "scale(1 0.08)" : undefined}>
        <ellipse cx={0} cy={0} rx={70} ry={92} fill={C.ink} />
        <ellipse cx={-22} cy={-36} rx={14} ry={20} fill={C.white} opacity={0.85} transform="rotate(20 -22 -36)" />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={130} ry={16} fill={C.shadow} />
      {/* slim legs and feet */}
      <path d="M -34 -220 L -42 -30" stroke={body} strokeWidth={40} strokeLinecap="round" fill="none" />
      <path d="M 34 -220 L 42 -30" stroke={body} strokeWidth={40} strokeLinecap="round" fill="none" />
      <ellipse cx={-50} cy={-14} rx={46} ry={16} fill={bodyD} />
      <ellipse cx={50} cy={-14} rx={46} ry={16} fill={bodyD} />
      {/* slim torso, breathing gently */}
      <g transform={`translate(0 -200) scale(1 ${breathe.toFixed(4)}) translate(0 200)`}>
        <path d="M -105 -440 Q 0 -470 105 -440 L 76 -210 Q 0 -196 -76 -210 Z" fill={body} />
      </g>
      {/* arms */}
      <path d="M -92 -420 Q -132 -330 -118 -230" stroke={body} strokeWidth={34} strokeLinecap="round" fill="none" />
      <path d="M 92 -420 Q 132 -330 118 -230" stroke={body} strokeWidth={34} strokeLinecap="round" fill="none" />
      <circle cx={-116} cy={-214} r={24} fill={body} />
      <circle cx={116} cy={-214} r={24} fill={body} />
      {/* neck and big head */}
      <rect x={-26} y={-480} width={52} height={60} rx={20} fill={bodyD} />
      <ellipse cx={0} cy={-700} rx={205} ry={245} fill={body} />
      <ellipse cx={30} cy={-560} rx={150} ry={60} fill={bodyD} opacity={0.18} />
      {eye(-88, -690, 10)}
      {eye(88, -690, -10)}
      <path d="M -18 -530 Q 0 -516 18 -530" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
}

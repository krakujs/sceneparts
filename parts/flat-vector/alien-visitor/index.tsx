import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Alien visitor: friendly original alien with a round mint body, a dome head with three eyes, stubby legs and a waving arm.
// Custom drawing (not Person). Body space: feet at 0,0, faces right, ~1000 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const body = "#8FE0C8", bodyD = shade("#8FE0C8", 0.14), lilac = "#B69CF0";
export default function Part(p: PartProps<any>) {
  const { x, y = 1560, s = 1, f, flip } = p as any;
  const wave = Math.sin(f / 4);
  const blink = Math.floor(f / 90) % 2 === 1 && f % 90 < 5;
  const pupil = Math.sin(f / 30) * 6;
  const eye = (cx: number, cy: number, r: number) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.white} />
      {blink ? <rect x={cx - r} y={cy - 2} width={r * 2} height={6} fill={bodyD} /> : <circle cx={cx + pupil * 0.3} cy={cy + 2} r={r * 0.5} fill={C.ink} />}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={170} ry={18} fill={C.shadow} />
      <path d="M -60 -160 L -60 0 L -10 0 L -6 -150 Z" fill={bodyD} />
      <path d="M 60 -160 L 60 0 L 10 0 L 6 -150 Z" fill={bodyD} />
      <rect x={-96} y={-14} width={58} height={22} rx={11} fill={lilac} />
      <rect x={38} y={-14} width={58} height={22} rx={11} fill={lilac} />
      <path d="M -180 -520 Q -250 -560 -226 -640" stroke={body} strokeWidth={44} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-470} rx={198} ry={230} fill={body} />
      <path d="M -150 -430 Q 0 -260 150 -430 Q 150 -260 0 -250 Q -150 -260 -150 -430 Z" fill={bodyD} opacity={0.35} />
      <circle cx={-120} cy={-560} r={22} fill={bodyD} opacity={0.5} />
      <circle cx={120} cy={-380} r={14} fill={bodyD} opacity={0.5} />
      <path d={`M 170 -500 Q ${260 + wave * 20} ${-600 - wave * 40} ${280 + wave * 10} ${-690 + wave * 20}`} stroke={body} strokeWidth={44} fill="none" strokeLinecap="round" />
      <circle cx={282 + wave * 10} cy={-700 + wave * 20} r={34} fill={body} />
      <ellipse cx={0} cy={-830} rx={156} ry={150} fill={body} />
      <ellipse cx={0} cy={-790} rx={140} ry={120} fill={bodyD} opacity={0.18} />
      {eye(-70, -840, 44)}
      {eye(70, -840, 44)}
      {eye(0, -940, 30)}
      <path d="M -40 -740 Q 0 -700 40 -740" stroke={C.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
      <circle cx={-110} cy={-760} r={18} fill={lilac} opacity={0.6} />
      <circle cx={110} cy={-760} r={18} fill={lilac} opacity={0.6} />
    </g>
  );
}

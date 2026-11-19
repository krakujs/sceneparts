import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sea serpent: long teal serpent with dorsal fins and a raised head, humps rising out of a band of waves.
// Origin = bottom of the included water strip (y). The strip is 1400 px wide and 150 px tall at the top wave.
// About 1000 px wide and 500 px tall at s = 1. anim: swim (body undulates, waves roll) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const wave = (y0: number, a: number) => {
  let d = `M -700 ${y0}`;
  for (let i = -700; i < 700; i += 140) d += ` Q ${i + 70} ${y0 - a} ${i + 140} ${y0}`;
  return d;
};
const TOP = wave(-150, 36);
const BODY = "M -460 -130 C -400 -320 -300 -350 -250 -300 C -200 -250 -160 -170 -90 -210 C -30 -250 0 -330 90 -330 C 170 -330 190 -250 240 -250";
const FINS: [number, number][] = [[-300, -330], [-180, -262], [20, -318], [150, -340]];

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1600, s = 1, f = 0, flip = false } = p as any;
  const teal: string = p.color && p.color !== "none" ? p.color : "#1FA39A";
  const anim: string = p.anim ?? "swim";
  const bob = anim === "swim" ? Math.sin(f * 0.08) * 6 : 0;
  const roll = anim === "swim" ? Math.sin(f * 0.05) * 14 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${bob})`}>
        <path d={BODY} stroke={shade(teal, 0.25)} strokeWidth={92} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={BODY} stroke={teal} strokeWidth={84} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={BODY} transform="translate(0 18)" stroke="#8FE0D0" strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.5} />
        <path d="M 240 -250 L 340 -340" stroke={teal} strokeWidth={80} strokeLinecap="round" />
        {FINS.map(([fx, fy], i) => (
          <path key={i} d={`M ${fx - 36} ${fy + 30} L ${fx + 4} ${fy - 58} L ${fx + 36} ${fy + 26} Z`} fill={C.orange} />
        ))}
        <ellipse cx={385} cy={-345} rx={86} ry={56} fill={teal} transform="rotate(-10 385 -345)" />
        <path d="M 360 -320 Q 400 -300 440 -330" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
        <circle cx={410} cy={-372} r={18} fill="#FFFFFF" />
        <circle cx={416} cy={-370} r={9} fill={C.ink} />
        <path d="M 386 -398 Q 410 -414 432 -398" stroke={shade(teal, 0.3)} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
      <g transform={`translate(${roll} 0)`}>
        <path d={TOP} fill="#4AA3D9" />
        <path d={`${wave(-80, 30)} L 700 0 L -700 0 Z`} fill="#2E8BC6" />
        <path d={wave(-150, 36)} stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={0.85} />
        <path d="M -300 -40 Q -270 -60 -240 -40 M 60 -30 Q 90 -50 120 -30" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.5} />
      </g>
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Orchestral triangle hanging from a loop, with a short steel beater. Origin = top of the loop, centred on x.
// anim "ring": the triangle swings from the loop and shakes; the beater taps on the swing.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "ring") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 18) * 8 * Math.exp(-(f % 60) / 30))} 0 0)`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)} 0 0)`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1000;
  const steel = p.color && p.color !== "none" ? p.color : "#A9B4C6";
  const anim: string = p.anim ?? "none";
  const tap = anim === "ring" && f % 60 < 6;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={420} rx={120} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* hanging loop */}
        <path d="M -8 0 Q -8 -40 0 -40 Q 8 -40 8 0" fill="none" stroke={C.greyDark} strokeWidth={10} strokeLinecap="round" />
        {/* triangle: open at the top-left, a dark bar on the bottom edge for depth */}
        <path d="M -150 300 L 0 10 L 150 300 Z" fill="none" stroke={steel} strokeWidth={26} strokeLinejoin="round" />
        <path d="M -150 300 L 0 10 L 150 300 Z" fill="none" stroke={shade(steel, 0.25)} strokeWidth={6} strokeLinejoin="round" opacity={0.6} transform="translate(6 6)" />
        <path d="M -150 300 L 0 10 L 150 300 Z" fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinejoin="round" opacity={0.35} transform="translate(-4 -2)" />
        {/* the loop passes through the top corner */}
        <circle cx={0} cy={10} r={9} fill={C.greyDark} />
        {/* beater: a short stick with a wooden handle */}
        <g transform={`translate(${tap ? -10 : 0} 0) rotate(${tap ? -12 : 0} 80 150)`}>
          <line x1={80} y1={150} x2={230} y2={40} stroke={C.brown} strokeWidth={16} strokeLinecap="round" />
          <circle cx={230} cy={40} r={22} fill={C.greyDark} />
        </g>
      </g>
    </g>
  );
}

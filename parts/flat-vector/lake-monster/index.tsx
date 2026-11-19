import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Loch monster: long-necked plesiosaur-like lake creature with humps, half in the water, with a shy smile.
// Origin = bottom of the included water strip (y). About 900 px wide and 650 px tall at s = 1. anim: idle (body bobs, neck sways) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const wave = (y0: number, a: number) => {
  let d = `M -700 ${y0}`;
  for (let i = -700; i < 700; i += 140) d += ` Q ${i + 70} ${y0 - a} ${i + 140} ${y0}`;
  return d;
};
const BODY = "M -300 -180 C -300 -300 -150 -330 -40 -300 C 60 -330 180 -300 240 -220 L 260 -150 L -300 -120 Z";

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1600, s = 1, f = 0, flip = false } = p as any;
  const green: string = p.color && p.color !== "none" ? p.color : "#5FB58C";
  const dark = shade(green, 0.22);
  const anim: string = p.anim ?? "idle";
  const bob = anim === "idle" ? Math.sin(f * 0.05) * 6 : 0;
  const sway = anim === "idle" ? Math.sin(f * 0.04) * 5 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${bob})`}>
        <path d="M -270 -200 Q -370 -220 -440 -330" stroke={dark} strokeWidth={60} strokeLinecap="round" fill="none" />
        <path d={BODY} fill={green} />
        <path d="M -260 -150 L 240 -150 L 240 -120 L -260 -120 Z" fill={dark} opacity={0.35} />
        <ellipse cx={-50} cy={-150} rx={110} ry={30} fill={dark} transform="rotate(-12 -50 -150)" />
        <ellipse cx={120} cy={-130} rx={90} ry={26} fill={dark} transform="rotate(-18 120 -130)" />
        <g transform={`rotate(${sway} 200 -230)`}>
          <path d="M 200 -230 C 270 -340 200 -460 260 -560" stroke={green} strokeWidth={84} strokeLinecap="round" fill="none" />
          <g transform="translate(290 -600)">
            <ellipse cx={0} cy={0} rx={100} ry={60} fill={green} transform="rotate(-10)" />
            <ellipse cx={-10} cy={20} rx={80} ry={24} fill={dark} opacity={0.35} transform="rotate(-10)" />
            <path d="M -60 -6 Q -40 -24 -20 -6" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M 0 -10 Q 14 -26 28 -10" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M 10 22 Q 40 34 70 14" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
            <ellipse cx={-30} cy={22} rx={20} ry={11} fill={C.pink} opacity={0.7} />
            <ellipse cx={62} cy={6} rx={16} ry={9} fill={C.pink} opacity={0.7} />
          </g>
        </g>
        <ellipse cx={-120} cy={-200} rx={60} ry={24} fill={green} transform="rotate(-20 -120 -200)" />
      </g>
      <path d={`${wave(-110, 30)} L 700 0 L -700 0 Z`} fill="#4AA3D9" />
      <path d={wave(-110, 30)} stroke="#FFFFFF" strokeWidth={7} fill="none" opacity={0.8} />
      <path d="M -200 -40 Q -170 -60 -140 -40 M 120 -30 Q 150 -50 180 -30" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.5} />
    </g>
  );
}

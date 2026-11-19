import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Egg creature: egg-shaped creature with a cracked shell piece on its top, little legs and arms. Feet at (0,0); about 650 px tall at s = 1.
// anim: wiggle (rocks and waves) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const EGG = "M 0 -540 C 170 -540 215 -360 210 -250 C 205 -130 115 -110 0 -110 C -115 -110 -205 -130 -210 -250 C -215 -360 -170 -540 0 -540 Z";
const SHELL = "M -190 -440 C -210 -600 210 -610 190 -440 L 150 -478 L 110 -440 L 70 -490 L 30 -446 L -10 -494 L -50 -446 L -90 -488 L -130 -440 L -170 -484 Z";

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const egg: string = p.color && p.color !== "none" ? p.color : "#FFF4D6";
  const shellC = shade(egg, 0.1);
  const dark = shade(egg, 0.22);
  const anim: string = p.anim ?? "wiggle";
  const rock = anim === "wiggle" ? Math.sin(f * 0.1) * 3 : 0;
  const wave = anim === "wiggle" ? Math.sin(f * 0.2) : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={190} ry={18} fill={C.shadow} />
      <rect x={-110} y={-130} width={46} height={124} rx={22} fill={dark} />
      <rect x={64} y={-130} width={46} height={124} rx={22} fill={dark} />
      <ellipse cx={-97} cy={-8} rx={46} ry={18} fill={C.orange} />
      <ellipse cx={111} cy={-8} rx={46} ry={18} fill={C.orange} />
      <g transform={`rotate(${rock} 0 -110)`}>
        <path d={`M -200 -280 Q -240 -250 -270 -230`} stroke={dark} strokeWidth={34} strokeLinecap="round" fill="none" />
        <circle cx={-280} cy={-222} r={26} fill={dark} />
        <path d={`M 200 -280 Q ${250 + wave * 10} -330 ${270 + wave * 10} -380`} stroke={dark} strokeWidth={34} strokeLinecap="round" fill="none" />
        <circle cx={272 + wave * 10} cy={-396} r={26} fill={dark} />
        <path d={EGG} fill={egg} />
        <path d="M -60 -420 L -30 -400 L -50 -380 L -10 -350" stroke={dark} strokeWidth={6} fill="none" strokeLinejoin="round" />
        <ellipse cx={-120} cy={-330} rx={50} ry={20} fill={dark} opacity={0.25} />
        <path d={SHELL} fill={shellC} stroke={dark} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={-70} cy={-300} r={16} fill={C.ink} />
        <circle cx={70} cy={-300} r={16} fill={C.ink} />
        <circle cx={-64} cy={-306} r={5} fill="#FFFFFF" />
        <circle cx={76} cy={-306} r={5} fill="#FFFFFF" />
        <circle cx={-120} cy={-250} r={22} fill={C.pink} opacity={0.55} />
        <circle cx={120} cy={-250} r={22} fill={C.pink} opacity={0.55} />
        <path d="M -30 -240 Q 0 -215 30 -240" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

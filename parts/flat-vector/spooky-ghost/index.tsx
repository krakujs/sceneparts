import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Spooky ghost: floating sheet ghost with a wavy hem, arms raised in a 'boo' pose, black oval eyes and an O mouth.
// Semi-transparent. Feet (hem) at (0,0) when still; about 850 px tall at s = 1. anim: float (bobs up and down) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const SHEET = "M -230 -620 A 230 230 0 0 1 230 -620 L 230 -120 Q 172 110 115 -120 Q 57 110 0 -120 Q -57 110 -115 -120 Q -172 110 -230 -120 Z";
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1420, s = 1, f = 0, flip = false } = p as any;
  const sheet: string = p.color && p.color !== "none" ? p.color : "#F4F7FF";
  const shadeC = shade(sheet, 0.12);
  const anim: string = p.anim ?? "float";
  const lift = anim === "float" ? Math.sin(f * 0.06) * 18 : 0;
  const shadowK = 1 - Math.abs(lift) / 60;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={200 * shadowK} ry={18 * shadowK} fill={C.shadow} opacity={0.6} />
      <g transform={`translate(0 ${lift})`} opacity={0.88}>
        <path d="M -200 -440 Q -330 -480 -300 -640 Q -270 -620 -240 -560 Q -200 -520 -170 -470 Z" fill={sheet} />
        <path d="M 200 -440 Q 330 -490 310 -600 Q 280 -590 250 -540 Q 210 -510 170 -470 Z" fill={sheet} />
        <circle cx={-300} cy={-650} r={26} fill={sheet} />
        <circle cx={308} cy={-610} r={26} fill={sheet} />
        <path d={SHEET} fill={sheet} />
        <path d="M -150 -420 Q -120 -300 -150 -200 M 150 -420 Q 120 -300 150 -200" stroke={shadeC} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />
        <ellipse cx={-85} cy={-640} rx={34} ry={50} fill={C.ink} />
        <ellipse cx={85} cy={-640} rx={34} ry={50} fill={C.ink} />
        <ellipse cx={0} cy={-515} rx={42} ry={56} fill={C.ink} />
      </g>
    </g>
  );
}

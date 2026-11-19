import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Baby dragon: small chubby dragon sitting on its bottom, stubby wings, big shiny eyes. Feet at (0,0); about 650 px tall at s = 1.
// anim: idle (blinks and breathes) | flap (stubby wings flutter) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const BELLY = "#E6F7C4";
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const body: string = p.color && p.color !== "none" ? p.color : "#4BB46A";
  const dark = shade(body, 0.22), far = shade(body, 0.14);
  const anim: string = p.anim ?? "idle";
  const blink = anim === "idle" && f % 120 < 6 ? 0.1 : 1;
  const breath = anim === "idle" ? Math.sin(f * 0.1) * 4 : 0;
  const flap = anim === "flap" ? Math.sin(f * 0.5) * 22 : Math.sin(f * 0.05) * 3;
  const eye = (ex: number, ey: number) => (
    <g transform={`translate(${ex} ${ey}) scale(1 ${blink})`}>
      <circle r={54} fill="#FFFFFF" />
      <circle cx={10} cy={8} r={32} fill={C.ink} />
      <circle cx={20} cy={-2} r={11} fill="#FFFFFF" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={260} ry={22} fill={C.shadow} />
      <path d="M -120 -90 Q -260 -60 -280 -150" stroke={body} strokeWidth={56} strokeLinecap="round" fill="none" />
      <path d="M -306 -176 L -262 -164 L -290 -132 Z" fill={C.yellow} />
      <ellipse cx={-90} cy={-96} rx={130} ry={100} fill={body} />
      <ellipse cx={-70} cy={-22} rx={92} ry={30} fill={dark} />
      <g transform={`translate(0 ${breath})`}>
        <g transform={`translate(-50 -330) rotate(${flap})`}>
          <path d="M 0 0 Q -90 -90 -80 -190 Q -20 -140 22 -20 Z" fill={far} />
        </g>
        <ellipse cx={10} cy={-210} rx={175} ry={190} fill={body} />
        <ellipse cx={30} cy={-190} rx={110} ry={130} fill={BELLY} />
        <path d="M -60 -392 L -48 -424 L -34 -390 Z M -10 -398 L 2 -430 L 16 -396 Z M 40 -394 L 52 -426 L 66 -392 Z" fill={C.yellow} />
        <g transform={`translate(-50 -330) rotate(${flap})`}>
          <path d="M 0 0 Q -90 -90 -80 -190 Q -20 -140 22 -20 Z" fill={body} />
          <path d="M 0 0 L -56 -150" stroke={dark} strokeWidth={5} strokeLinecap="round" />
        </g>
        <ellipse cx={120} cy={-170} rx={38} ry={58} fill={body} />
        <circle cx={60} cy={-470} r={150} fill={body} />
        <path d="M -10 -592 L 4 -662 L 50 -600 Z" fill="#F4E3B5" />
        <path d="M 92 -600 L 116 -668 L 130 -594 Z" fill="#F4E3B5" />
        <circle cx={-20} cy={-420} r={24} fill={C.pink} opacity={0.6} />
        <circle cx={140} cy={-420} r={24} fill={C.pink} opacity={0.6} />
        {eye(10, -480)}
        {eye(112, -480)}
        <path d="M 50 -400 Q 80 -378 110 -400" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx={120} cy={-26} rx={62} ry={28} fill={dark} />
    </g>
  );
}

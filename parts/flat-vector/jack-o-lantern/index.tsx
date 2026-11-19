import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Jack o lantern: a squat orange pumpkin with ribs, a short stem, carved triangle eyes and a wide toothy grin.
// A candle glows inside: the carved face shows yellow light and anim "flicker" makes it dance.
// Origin = bottom centre. About 400 px wide and 380 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const RIBS = [-140, -70, 0, 70, 140];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const skin = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "flicker";
  const flick = anim === "flicker" ? 0.85 + 0.15 * Math.sin(f * 0.7) * Math.sin(f * 0.23 + 1) + 0.05 * Math.sin(f * 1.9) : 1;
  const glow = C.yellow;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={220} ry={16} fill={C.shadow} />
      {/* stem */}
      <path d="M -26 -330 L -18 -400 Q 0 -418 22 -400 L 26 -330 Z" fill={C.brownDark} />
      {/* pumpkin body with ribs */}
      <path d="M -200 -170 Q -210 -330 0 -340 Q 210 -330 200 -170 Q 200 -20 0 -20 Q -200 -20 -200 -170 Z" fill={skin} />
      {RIBS.map((rx) => <path key={rx} d={`M ${rx} -330 Q ${f1(rx * 1.25)} -180 ${rx} -26`} fill="none" stroke={shade(skin, 0.2)} strokeWidth={10} strokeLinecap="round" />)}
      <path d="M 90 -320 Q 170 -260 160 -150 Q 150 -60 90 -30 Q 150 -100 130 -190 Q 120 -270 90 -320 Z" fill={shade(skin, 0.18)} opacity={0.6} />
      {/* candle glow behind the carved face */}
      <g opacity={flick}>
        <ellipse cx={0} cy={-180} rx={190} ry={140} fill={glow} opacity={0.25} />
        <ellipse cx={0} cy={-180} rx={130} ry={100} fill={glow} opacity={0.35} />
      </g>
      {/* carved face: triangle eyes and a wide grin */}
      <g fill={glow} opacity={0.8 + 0.2 * flick}>
        <path d="M -150 -270 L -70 -250 L -110 -190 Z" />
        <path d="M 150 -270 L 70 -250 L 110 -190 Z" />
        <path d="M -150 -110 Q 0 -30 150 -110 Q 150 -30 0 -40 Q -150 -30 -150 -110 Z" />
      </g>
      {/* teeth on the grin */}
      {[-90, -30, 30, 90].map((tx) => <path key={tx} d={`M ${tx - 20} -86 L ${tx} -58 L ${tx + 20} -86 Z`} fill={skin} />)}
      {/* highlight on the skin */}
      <path d="M -150 -260 Q -170 -200 -150 -150" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.3} />
    </g>
  );
}

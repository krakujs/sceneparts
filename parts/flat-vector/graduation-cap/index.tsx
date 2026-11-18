import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Graduation cap (mortarboard) in a 3/4 view with a gold tassel. Origin = bottom centre of the skull.
// anim "toss": the cap flies up, spins once and drops back in a loop while the tassel swings.
// anim "sway": the cap stays put and only the tassel swings.
const f1 = (v: number) => v.toFixed(1);
const LOOP = 90;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cap = p.color && p.color !== "none" ? p.color : C.navy;
  const gold = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const ph = (f % LOOP) / LOOP;
  const toss = anim === "toss";
  const lift = toss ? -Math.sin(ph * Math.PI) * 240 : 0;
  const spin = toss ? ph * 360 : 0;
  const swing = toss || anim === "sway" ? Math.sin((f * 2 * Math.PI) / 45) * 10 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} opacity={toss ? 1 - 0.5 * Math.sin(ph * Math.PI) : 1} />
      <g transform={`translate(0 ${f1(lift)}) rotate(${f1(spin)} 0 -200)`}>
        {/* skull cap under the board */}
        <path d="M -160 -280 L -160 -150 Q 0 -60 160 -150 L 160 -280 Q 0 -190 -160 -280 Z" fill={shade(cap, 0.25)} />
        {/* board: a diamond seen at an angle, with its front edge thickness */}
        <path d="M -300 -330 L 0 -230 L 300 -330 L 300 -308 L 0 -208 L -300 -308 Z" fill={shade(cap, 0.3)} />
        <path d="M -300 -330 L 0 -430 L 300 -330 L 0 -230 Z" fill={cap} />
        <circle cx={0} cy={-330} r={14} fill={gold} />
        {/* cord from the button to the right edge, then the tassel */}
        <path d="M 0 -330 Q 120 -322 210 -300" stroke={shade(gold, 0.1)} strokeWidth={7} fill="none" strokeLinecap="round" />
        <g transform={`rotate(${f1(swing)} 210 -300)`}>
          <line x1={210} y1={-300} x2={210} y2={-192} stroke={shade(gold, 0.1)} strokeWidth={7} strokeLinecap="round" />
          <rect x={194} y={-198} width={32} height={58} rx={10} fill={gold} />
          <path d="M 198 -142 L 196 -108 M 210 -142 L 210 -104 M 222 -142 L 224 -108" stroke={gold} strokeWidth={6} strokeLinecap="round" fill="none" />
        </g>
      </g>
    </g>
  );
}

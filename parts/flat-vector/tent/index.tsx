import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A-frame camping tent, front view, with the door flap open, guy ropes and pegs.
// Origin = centre of the ground line. About 520 px wide and 520 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const canvas = p.color && p.color !== "none" ? p.color : C.pink;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const glow = anim === "lights" ? (Math.floor(f / 12) % 2 ? C.yellow : C.yellowDark) : C.sand;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={270} ry={18} fill={C.shadow} />
        {/* guy ropes and pegs */}
        <path d="M -200 -20 L -390 0 M 200 -20 L 390 0" stroke={trim} strokeWidth={6} strokeLinecap="round" />
        <rect x={-404} y={-6} width={22} height={12} rx={4} fill={C.greyDark} />
        <rect x={382} y={-6} width={22} height={12} rx={4} fill={C.greyDark} />
        {/* tent body */}
        <path d="M -260 0 L 0 -440 L 260 0 Z" fill={canvas} />
        <path d="M 0 -440 L 260 0 L 120 0 Z" fill={shade(canvas, 0.18)} />
        {/* side stripes */}
        <path d="M -150 -26 L -90 -220 L -70 -220 L -130 -26 Z" fill={trim} opacity={0.8} />
        {/* open door flap with a dark doorway */}
        <path d="M -70 0 L 0 -250 L 70 0 Z" fill={C.navy} />
        <path d="M -70 0 L 0 -250 L 40 0 Z" fill={shade(canvas, 0.1)} opacity={0.6} />
        <path d="M -30 0 L -30 -60 Q 0 -90 30 -60 L 30 0 Z" fill={glow} opacity={anim === "lights" ? 0.95 : 0.4} />
        {/* ridge pole */}
        <path d="M 0 -440 L 0 -452" stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" />
      </g>
    </g>
  );
}

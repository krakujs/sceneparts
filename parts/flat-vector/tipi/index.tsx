import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Conical canvas tipi with poles crossing at the top, a door opening and plain geometric bands.
// Origin = centre of the ground line. About 600 px wide and 900 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const canvas = p.color && p.color !== "none" ? p.color : C.sand;
  const band = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const fire = anim === "lights" ? (Math.floor(f / 8) % 2 ? C.orange : C.yellow) : C.orange;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={300} ry={20} fill={C.shadow} />
        {/* poles crossing at the top, with the two front poles in front */}
        <path d="M -20 -900 L -300 -20 M 20 -900 L 300 -20 M 0 -900 L -120 -20 M 0 -900 L 120 -20" stroke={C.brown} strokeWidth={12} strokeLinecap="round" />
        {/* canvas cone */}
        <path d="M 0 -880 L -300 -20 L 300 -20 Z" fill={canvas} />
        <path d="M 0 -880 L 300 -20 L 180 -20 Z" fill={shade(canvas, 0.14)} />
        {/* geometric bands */}
        <path d="M -186 -300 L 186 -300 L 196 -250 L -196 -250 Z" fill={band} />
        <path d="M -226 -150 L 226 -150 L 236 -110 L -236 -110 Z" fill={band} />
        <path d="M -150 -460 L 150 -460 L 160 -420 L -160 -420 Z" fill={band} />
        {[-120, -40, 40, 120].map((tx) => (
          <path key={tx} d={`M ${tx} -110 L ${tx + 20} -60 L ${tx - 20} -60 Z`} fill={band} />
        ))}
        {/* door flap opening with a fire glow */}
        <path d="M -60 -20 L -60 -190 L 0 -250 L 60 -190 L 60 -20 Z" fill={C.navy} />
        <path d="M -30 -20 L -30 -110 Q 0 -140 30 -110 L 30 -20 Z" fill={fire} opacity={anim === "lights" ? 0.95 : 0.5} />
        <rect x={-70} y={-40} width={140} height={20} rx={6} fill={C.brownDark} />
      </g>
    </g>
  );
}

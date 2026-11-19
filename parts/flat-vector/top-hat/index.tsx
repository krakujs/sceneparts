import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall top hat: a flat brim, a tall cylinder crown and a coloured silk band. Origin = bottom centre (y).
// About 400 px wide and 430 px tall at s = 1. anim "sway": the hat tilts gently.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const black = p.color && p.color !== "none" ? p.color : C.ink;
  const band = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 70) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={240} ry={14} fill={C.shadow} />
      <g transform={`rotate(${f1(tilt)} 0 -60)`}>
        {/* flat brim, a shallow ellipse */}
        <ellipse cx={0} cy={-46} rx={250} ry={46} fill={black} />
        <ellipse cx={0} cy={-56} rx={250} ry={40} fill={shade(black, 0.1)} />
        {/* tall crown */}
        <path d="M -170 -50 L -170 -400 L 170 -400 L 170 -50 Q 0 -20 -170 -50 Z" fill={black} />
        <path d="M 120 -392 L 170 -400 L 170 -50 Q 140 -44 120 -48 Z" fill={shade(black, 0.25)} opacity={0.8} />
        {/* top: an ellipse lid of the crown */}
        <ellipse cx={0} cy={-400} rx={170} ry={34} fill={shade(black, 0.2)} />
        <ellipse cx={0} cy={-400} rx={150} ry={26} fill={shade(black, 0.1)} opacity={0.7} />
        {/* silk band */}
        <rect x={-171} y={-132} width={342} height={44} fill={band} />
        <rect x={-171} y={-132} width={342} height={8} fill={shade(band, 0.2)} opacity={0.6} />
        {/* glossy highlight */}
        <path d="M -120 -360 L -120 -170" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.18} />
      </g>
    </g>
  );
}

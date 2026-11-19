import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Baseball cap, side three-quarter view, facing right, with a curved peak and a back strap. No logo.
// Origin = bottom centre (y). About 600 px wide and 360 px tall at s = 1. anim "bob": the cap bounces gently.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const crown = p.color && p.color !== "none" ? p.color : C.red;
  const peak = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * 2 * Math.PI) / 50)) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={20} cy={4} rx={240} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* crown: a rounded dome, shaded on the far side */}
        <path d="M -190 -20 L -190 -190 Q -180 -350 0 -350 Q 170 -350 190 -190 L 190 -20 Z" fill={crown} />
        <path d="M 60 -342 Q 170 -330 190 -190 L 190 -20 L 120 -20 Q 140 -170 60 -342 Z" fill={shade(crown, 0.2)} opacity={0.7} />
        {/* seam lines and the top button */}
        <path d="M 0 -350 Q -30 -190 -10 -20" stroke={shade(crown, 0.25)} strokeWidth={6} fill="none" />
        <path d="M 90 -340 Q 80 -180 110 -20" stroke={shade(crown, 0.25)} strokeWidth={6} fill="none" />
        <circle cx={0} cy={-350} r={16} fill={shade(crown, 0.25)} />
        {/* back strap with its buckle */}
        <rect x={-200} y={-86} width={48} height={70} rx={12} fill={shade(crown, 0.3)} />
        <rect x={-196} y={-62} width={40} height={10} rx={4} fill={C.grey} opacity={0.8} />
        {/* curved peak sweeping forward */}
        <path d="M 110 -110 Q 330 -170 410 -40 Q 330 -8 220 -14 Q 150 -14 100 -12 Z" fill={peak} />
        <path d="M 110 -110 Q 330 -170 410 -40 Q 330 -60 220 -66 Q 150 -66 110 -72 Z" fill={shade(peak, 0.25)} opacity={0.6} />
      </g>
    </g>
  );
}

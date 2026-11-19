import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wide-brimmed straw sun hat in front three-quarter view with a ribbon band. Origin = bottom centre (y).
// About 600 px wide and 330 px tall at s = 1. anim "sway": the hat tilts gently in a breeze.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const straw = p.color && p.color !== "none" ? p.color : C.sand;
  const ribbon = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 70) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={270} ry={14} fill={C.shadow} />
      <g transform={`rotate(${f1(tilt)} 0 -60)`}>
        {/* brim: a wide ellipse, darker underneath */}
        <ellipse cx={0} cy={-60} rx={300} ry={60} fill={straw} />
        <path d="M -300 -60 Q 0 0 300 -60 Q 300 -36 0 24 Q -300 -36 -300 -60 Z" fill={shade(straw, 0.2)} opacity={0.6} transform="translate(0 -4)" />
        {/* straw weave lines across the brim */}
        {[-200, -110, 0, 110, 200].map((wx) => <path key={wx} d={`M ${wx} -110 Q ${wx * 0.9} -60 ${wx} -14`} stroke={shade(straw, 0.2)} strokeWidth={5} fill="none" opacity={0.6} />)}
        {/* crown */}
        <path d="M -150 -110 L -150 -250 Q -150 -340 0 -340 Q 150 -340 150 -250 L 150 -110 Q 0 -80 -150 -110 Z" fill={straw} />
        <path d="M 60 -330 Q 150 -310 150 -250 L 150 -110 Q 90 -100 70 -110 Q 90 -220 60 -330 Z" fill={shade(straw, 0.2)} opacity={0.6} />
        {/* ribbon band */}
        <path d="M -152 -150 Q 0 -120 152 -150 L 152 -116 Q 0 -86 -152 -116 Z" fill={ribbon} />
        <path d="M 110 -134 L 150 -110 L 140 -90 L 118 -104 Z" fill={shade(ribbon, 0.15)} />
      </g>
    </g>
  );
}

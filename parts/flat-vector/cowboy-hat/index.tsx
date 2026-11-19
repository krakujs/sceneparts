import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Western cowboy hat: a pinched crown, a wide brim that curls up at the sides and a band with a buckle.
// Origin = bottom centre (y). About 600 px wide and 360 px tall at s = 1. anim "sway": the hat tilts gently.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const felt = p.color && p.color !== "none" ? p.color : C.brown;
  const band = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 70) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={300} ry={14} fill={C.shadow} />
      <g transform={`rotate(${f1(tilt)} 0 -60)`}>
        {/* brim: wide and curled up at the sides, darker underneath */}
        <path d="M -300 -70 Q -330 -120 -250 -120 Q -120 -150 0 -130 Q 120 -150 250 -120 Q 330 -120 300 -70 Q 280 -8 0 0 Q -280 -8 -300 -70 Z" fill={felt} />
        <path d="M -280 -40 Q 0 14 280 -40 Q 270 -8 0 2 Q -270 -8 -280 -40 Z" fill={shade(felt, 0.3)} opacity={0.7} />
        {/* crown with a pinched dent in the top */}
        <path d="M -150 -100 L -162 -262 Q -120 -336 -40 -306 Q 0 -284 40 -306 Q 120 -336 162 -262 L 150 -100 Q 0 -70 -150 -100 Z" fill={felt} />
        <path d="M 70 -300 Q 140 -280 150 -220 L 150 -100 Q 100 -92 80 -102 Q 110 -200 70 -300 Z" fill={shade(felt, 0.22)} opacity={0.7} />
        {/* band with a small buckle */}
        <path d="M -152 -150 Q 0 -120 152 -150 L 151 -112 Q 0 -82 -151 -112 Z" fill={band} />
        <rect x={-30} y={-138} width={60} height={34} rx={6} fill={C.yellow} transform="rotate(-2 0 -120)" />
        <rect x={-14} y={-130} width={28} height={18} rx={4} fill={shade(C.yellow, 0.25)} transform="rotate(-2 0 -120)" />
      </g>
    </g>
  );
}

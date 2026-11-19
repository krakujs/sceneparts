import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Friendly anatomical heart, simplified: a red body with a groove, a red aorta and a blue vein on top.
// Organ, centred on (x, y), about 500 px across at s = 1. anim "beat": a quick double pump.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const col = p.color && p.color !== "none" ? p.color : C.red;
  const vein = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  // a sharp beat every 40 frames, with a softer second beat
  const ph = (f % 40) / 40;
  const beat = anim === "beat" ? 1 + 0.07 * (Math.exp(-ph * 14) + 0.5 * Math.exp(-Math.abs(ph - 0.3) * 30)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s * beat)})`}>
      <ellipse cx={0} cy={170} rx={210} ry={14} fill={C.shadow} />
      <g transform="translate(0 30)">
        {/* blue vein on the left */}
        <path d="M -110 -190 L -150 -262 Q -165 -292 -210 -288" stroke={vein} strokeWidth={46} strokeLinecap="round" fill="none" />
        <path d="M -110 -190 L -150 -262 Q -165 -292 -210 -288" stroke={shade(vein, 0.2)} strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.5} transform="translate(12 6)" />
        {/* red aorta arching over the top */}
        <path d="M -20 -150 L -20 -250 Q -20 -300 30 -300 Q 80 -300 90 -262" stroke={C.red} strokeWidth={54} strokeLinecap="round" fill="none" />
        {/* heart body */}
        <path d="M 0 150 C -120 80 -230 10 -215 -110 C -205 -190 -120 -215 -70 -180 C -35 -155 -15 -130 0 -100 C 15 -130 35 -155 70 -180 C 120 -215 205 -190 215 -110 C 230 10 120 80 0 150 Z" fill={col} />
        {/* shade on the right side for depth */}
        <path d="M 150 -120 C 200 -40 130 50 0 150 C 100 60 170 -20 150 -120 Z" fill={shade(col, 0.22)} />
        {/* groove between the two sides */}
        <path d="M 0 -100 Q -14 -20 0 60" stroke={shade(col, 0.3)} strokeWidth={10} strokeLinecap="round" fill="none" />
        {/* highlight */}
        <path d="M -150 -120 Q -170 -60 -120 -20" stroke={C.white} strokeWidth={16} strokeLinecap="round" fill="none" opacity={0.45} />
      </g>
    </g>
  );
}

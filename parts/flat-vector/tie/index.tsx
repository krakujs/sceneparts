import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Necktie hanging straight down. Origin = bottom tip (y). About 300 px wide and 830 px long at s = 1.
// anim "sway": the tie swings gently from the knot.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const blade = p.color && p.color !== "none" ? p.color : C.navy;
  const stripe = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 60) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(sw)} 0 -800)`}>
        <defs>
          <clipPath id="fv-tie-blade-clip">
            <path d="M -40 -690 L 40 -690 L 120 -120 L 0 0 L -120 -120 Z" />
          </clipPath>
        </defs>
        {/* collar band behind the knot */}
        <path d="M -150 -830 Q 0 -760 150 -830 L 150 -800 Q 0 -730 -150 -800 Z" fill={C.white} opacity={0.9} />
        {/* blade: narrow under the knot, widening to a pointed tip at y */}
        <path d="M -40 -690 L 40 -690 L 120 -120 L 0 0 L -120 -120 Z" fill={blade} />
        <g clipPath="url(#fv-tie-blade-clip)">
          {[-560, -420, -280, -140].map((yy) => (
            <path key={yy} d={`M -160 ${yy + 60} L 160 ${yy - 40} L 160 ${yy - 10} L -160 ${yy + 90} Z`} fill={stripe} />
          ))}
          <path d="M 0 -690 L 120 -120 L 0 0 Z" fill={C.ink} opacity={0.12} />
        </g>
        {/* knot: inverted trapezoid */}
        <path d="M -62 -800 L 62 -800 L 40 -690 L -40 -690 Z" fill={shade(blade, 0.12)} />
        <path d="M -62 -800 L 62 -800 L 40 -690 L -40 -690 Z" fill={C.ink} opacity={0.08} />
        <path d="M -40 -690 Q 0 -670 40 -690" stroke={shade(blade, 0.35)} strokeWidth={6} fill="none" />
      </g>
    </g>
  );
}

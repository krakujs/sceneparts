import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cricket bat standing upright: a broad flat willow blade with rounded shoulders and toe, a short neck, and a
// handle wrapped in black tape. Origin = bottom centre of the blade; the blade rests on y.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const willow = p.color && p.color !== "none" ? p.color : C.sand;
  const anim: string = p.anim ?? "none";
  const rot = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 50) * 8 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  // blade: flat face, shoulders at the top, widest at mid-height, rounded toe at the base
  const blade = "M -58 -430 Q -74 -420 -78 -360 Q -86 -220 -80 -120 Q -72 -20 0 0 Q 72 -20 80 -120 Q 86 -220 78 -360 Q 74 -420 58 -430 Z";
  const rightHalf = "M 0 0 Q 72 -20 80 -120 Q 86 -220 78 -360 Q 74 -420 58 -430 L 0 -430 Z";
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={0} rx={70} ry={8} fill={C.shadow} />
      <path d={blade} fill={willow} />
      <path d={rightHalf} fill={shade(willow, 0.16)} />
      {/* splice and neck */}
      <rect x={-22} y={-450} width={44} height={26} rx={6} fill={shade(willow, 0.1)} />
      <rect x={-12} y={-520} width={24} height={76} rx={6} fill={C.brown} />
      {/* taped handle */}
      <rect x={-18} y={-720} width={36} height={206} rx={16} fill={C.ink} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={-18} y1={-700 + i * 28} x2={18} y2={-688 + i * 28} stroke={C.greyDark} strokeWidth={5} />
      ))}
      <circle cx={0} cy={-722} r={18} fill={C.ink} />
    </g>
  );
}

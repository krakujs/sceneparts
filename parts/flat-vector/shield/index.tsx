import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Heater shield: flat top, curved sides and a point at the bottom. Metal rim, a gold star emblem (original,
// not heraldry) and a shaded right half for depth. Origin = bottom point. About 380 px wide and 480 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const OUTER = "M -190 -440 L 190 -440 L 190 -180 Q 190 -60 0 0 Q -190 -60 -190 -180 Z";
const INNER = "M -160 -410 L 160 -410 L 160 -186 Q 160 -80 0 -26 Q -160 -80 -160 -186 Z";
const star = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2, rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${f1(cx + Math.cos(a) * rr)} ${f1(cy + Math.sin(a) * rr)}`);
  }
  return `M ${pts.join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.2, x = p.x ?? 540, y = p.y ?? 1560;
  const field = p.color && p.color !== "none" ? p.color : C.blue;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={170} ry={14} fill={C.shadow} />
      {/* metal rim */}
      <path d={OUTER} fill={C.greyLight} />
      <path d={OUTER} fill={C.greyDark} opacity={0.25} transform="translate(0 -4)" />
      {/* field with a shaded right half */}
      <path d={INNER} fill={field} />
      <path d="M 0 -410 L 160 -410 L 160 -186 Q 160 -80 0 -26 Z" fill={shade(field, 0.2)} opacity={0.6} />
      {/* gold chevron band and star */}
      <path d="M -160 -300 L 0 -210 L 160 -300 L 160 -262 L 0 -172 L -160 -262 Z" fill={C.yellow} />
      <path d={star(0, -360, 58)} fill={C.yellow} />
      <circle cx={0} cy={-360} r={12} fill={C.white} opacity={0.6} />
      {/* rim highlight */}
      <path d="M -176 -424 L -176 -190" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.5} />
    </g>
  );
}

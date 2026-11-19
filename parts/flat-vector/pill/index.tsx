import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two-tone pill, hero size, lying at a slight angle. variant "capsule" is a capsule; "tablet" is a round tablet seen at a slant.
// Origin = bottom centre (the pill rests on y). About 420 px wide and 180 px tall at s = 1.
// anim "bob": the pill floats up and down; "wobble": it rocks a little.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.blue;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const variant: string = p.variant ?? "capsule";
  const anim: string = p.anim ?? "none";
  const lift = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 10 : 0;
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 80) * 4 : 0;
  const shineCap = shade(c2, 0.12);

  if (variant === "tablet") {
    // Round tablet seen at a slant: a thickness band underneath, then the two-tone top face.
    const cy = -89;
    return (
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
        <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
        <g transform={`translate(0 ${f1(lift)}) rotate(${f1(rock)}) scale(1.35)`}>
          <ellipse cx={0} cy={-75} rx={105} ry={75} fill={shade(c2, 0.3)} />
          <ellipse cx={0} cy={cy} rx={105} ry={75} fill={c2} />
          <path d={`M 0 ${cy - 75} A 105 75 0 0 0 0 ${cy + 75} Z`} fill={c1} />
          <path d={`M 0 ${cy - 75} A 105 75 0 0 1 0 ${cy + 75} Z`} fill={c2} />
          <path d={`M -60 ${cy - 30} Q -30 ${cy - 46} 0 ${cy - 46}`} stroke={C.white} strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.5} />
        </g>
      </g>
    );
  }

  // Capsule: a stadium of 260 x 110 drawn at 1.6 times its base size, tilted by -20 degrees.
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(-154 + lift)}) rotate(${f1(-20 + rock)}) scale(1.6)`}>
        <rect x={-130} y={-55} width={260} height={110} rx={55} fill={c2} />
        <path d="M 0 -55 H -75 A 55 55 0 0 0 -75 55 H 0 Z" fill={c1} />
        <path d="M 0 -55 H 75 A 55 55 0 0 1 75 55 H 0 Z" fill={c2} />
        <path d="M 0 -55 H 75 A 55 55 0 0 1 75 55 H 0 Z" fill={shineCap} opacity={0.25} />
        <rect x={-100} y={-40} width={150} height={12} rx={6} fill={C.white} opacity={0.5} />
      </g>
    </g>
  );
}

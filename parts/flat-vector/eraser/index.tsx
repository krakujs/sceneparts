import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rubber eraser block lying on the floor: a pink top with a white base strip, rounded corners, and one
// corner worn down to a chamfer with a few crumbs. Origin = bottom centre. Hero size: about 300 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const rub = p.color && p.color !== "none" ? p.color : C.pink;
  const anim: string = p.anim ?? "none";
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 2 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={160} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(rock)}) scale(${f1(pop)})`}>
        {/* white base strip */}
        <path d="M -150 -40 L 150 -40 L 150 -6 Q 150 0 144 0 L -144 0 Q -150 0 -150 -6 Z" fill="#FFFFFF" />
        <path d="M -150 -40 L 150 -40 L 150 -6 Q 150 0 144 0 L -144 0 Q -150 0 -150 -6 Z" fill="none" stroke={C.greyLight} strokeWidth={4} />
        {/* pink body with a worn chamfer on the top-right corner */}
        <path d="M -150 -110 Q -150 -120 -140 -120 L 90 -120 L 150 -60 L 150 -46 L -150 -46 Z" fill={rub} />
        <rect x={-130} y={-108} width={200} height={10} rx={5} fill="#FFFFFF" opacity={0.3} />
        <rect x={-150} y={-62} width={300} height={16} fill={shade(rub, 0.2)} opacity={0.5} />
        {/* crumbs from the worn corner */}
        <circle cx={172} cy={-30} r={6} fill={rub} />
        <circle cx={190} cy={-12} r={4} fill={rub} />
        <circle cx={160} cy={-6} r={3} fill={C.greyLight} />
      </g>
    </g>
  );
}

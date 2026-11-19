import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Yellow wooden pencil lying on the floor: hexagonal-looking barrel, metal ferrule with a pink eraser,
// and a sharpened wood cone with a graphite point on the right. Origin = bottom centre of the barrel.
// Hero size: about 560 px long at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const barrel = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 3 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(rock)}) scale(${f1(pop)})`}>
        {/* eraser end (left) */}
        <rect x={-270} y={-38} width={70} height={76} rx={14} fill={C.pink} />
        <rect x={-270} y={-38} width={26} height={76} rx={10} fill={shade(C.pink, 0.15)} />
        {/* metal ferrule */}
        <rect x={-210} y={-40} width={36} height={80} fill={C.greyLight} />
        <rect x={-210} y={-40} width={36} height={8} fill={C.grey} />
        <rect x={-210} y={32} width={36} height={8} fill={C.grey} />
        <line x1={-196} y1={-40} x2={-196} y2={40} stroke={C.grey} strokeWidth={3} />
        <line x1={-186} y1={-40} x2={-186} y2={40} stroke={C.grey} strokeWidth={3} />
        {/* barrel with a shaded lower facet */}
        <rect x={-174} y={-34} width={320} height={68} fill={barrel} />
        <rect x={-174} y={14} width={320} height={20} fill={shade(barrel, 0.2)} />
        <rect x={-150} y={-26} width={280} height={8} rx={4} fill="#FFFFFF" opacity={0.3} />
        {/* sharpened cone and graphite tip */}
        <path d="M 146 -34 L 270 -10 L 270 10 L 146 34 Z" fill={C.sand} />
        <path d="M 146 34 L 270 10 L 270 10 L 146 34 Z" fill={shade(C.sand, 0.15)} />
        <path d="M 238 -12 L 280 0 L 238 12 Z" fill={C.inkSoft} />
        <path d="M 270 -6 L 290 0 L 270 6 Z" fill={C.ink} />
      </g>
    </g>
  );
}

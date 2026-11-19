import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector pizza slice: a triangle with a puffy crust edge, pepperoni and a melted cheese drip.
// Origin = resting point at the slice tip (bottom centre). Local units are px at s = 1 (about 320 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function PizzaSlice(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const cheeseC = p.cheeseColor ?? "#FFD25A";
  const crustC = p.crustColor ?? "#E8A552";
  const pepperoni = p.pepperoni ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // triangle: tip at (0,0), top corners at (-150,-320) and (150,-320), slightly bowed sides
  const tip = [0, 0], L = [-150, -320], R = [150, -320];
  const slice = `M 0 0 Q -92 -150 ${L[0]} ${L[1]} L ${R[0]} ${R[1]} Q 92 -150 0 0 Z`;
  const peps: [number, number, number][] = [[-40, -220, 30], [50, -250, 28], [-5, -130, 26], [70, -150, 24]];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={120} ry={12} fill={C.shadow} />
      <g transform={tr}>
        <path d={slice} fill={cheeseC} />
        <path d={`M 0 0 Q 46 -150 ${R[0] - 6} ${R[1] + 8} L ${R[0]} ${R[1]} Q 92 -150 0 0 Z`} fill={shade(cheeseC, 0.12)} />
        {/* melted cheese drips over the sides */}
        <path d="M -70 -150 Q -60 -128 -56 -112 Q -48 -104 -40 -112 Q -36 -126 -30 -150 Z" fill={cheeseC} />
        <path d="M 40 -118 Q 52 -100 54 -86 Q 62 -78 70 -88 Q 72 -104 80 -122 Z" fill={cheeseC} />
        {pepperoni && peps.map(([px, py, r], i) => (
          <g key={i}>
            <circle cx={px} cy={py} r={r} fill={C.red} />
            <circle cx={px - r * 0.3} cy={py - r * 0.3} r={r * 0.22} fill="#FFFFFF" opacity={0.35} />
          </g>
        ))}
        {/* puffy crust edge along the top */}
        <path d={`M ${L[0] - 10} ${L[1] + 4} Q ${L[0] - 16} ${L[1] - 42} 0 ${L[1] - 44} Q ${R[0] + 16} ${L[1] - 42} ${R[0] + 10} ${L[1] + 4} Q ${R[0] - 20} ${L[1] - 14} 0 ${L[1] - 16} Q ${L[0] + 20} ${L[1] - 14} ${L[0] - 10} ${L[1] + 4} Z`} fill={crustC} />
        <path d={`M ${L[0] - 2} ${L[1] + 2} L ${R[0] + 2} ${R[1] + 2} L ${R[0] + 2} ${R[1] - 10} L ${L[0] - 2} ${L[1] - 10} Z`} fill={shade(crustC, 0.2)} opacity={0} />
        <path d={`M -90 ${L[1] - 22} Q 0 ${L[1] - 48} 90 ${L[1] - 22}`} stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.3} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <PizzaSlice {...p} />;
}

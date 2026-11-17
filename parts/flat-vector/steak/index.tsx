import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector steak: a thick steak with grill marks and a fat edge, on a plate with a sprig of herb.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 420 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Steak(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const meatC = p.meatColor ?? "#B5493B";
  const fatC = p.fatColor ?? "#F5DDB8";
  const herb = p.herb ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // steak body: a thick slab seen slightly from above; base sits on the plate surface (y -74)
  const top = "M -170 -120 Q -180 -190 -90 -206 Q -10 -220 60 -200 Q 160 -186 170 -120 Q 176 -60 120 -44 Q 40 -26 -40 -40 Q -150 -40 -170 -120 Z";
  const side = "M -170 -120 Q -150 -40 -40 -40 Q 40 -26 120 -44 Q 176 -60 170 -120 L 166 -100 Q 150 -60 110 -56 Q 30 -40 -40 -58 Q -140 -60 -166 -104 Z";
  const marks: [number, number, number][] = [[-110, -150, -28], [-40, -160, -28], [30, -168, -28], [100, -160, -28], [-70, -120, -28], [0, -128, -28], [70, -124, -28]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Dish x={0} y={0} vessel="plate" w={460} fill="none" />
      <g transform={tr}>
        <path d={side} fill={fatC} transform="translate(0 -74)" />
        <path d={side} fill={shade(fatC, 0.12)} opacity={0.45} transform="translate(0 -74)" />
        <path d={top} fill={meatC} transform="translate(0 -74)" />
        <path d="M -110 -150 Q -60 -176 20 -176" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.25} transform="translate(0 -74)" />
        {marks.map(([mx, my, ang], i) => (
          <g key={i} transform="translate(0 -74)">
            <path d={`M ${f1(mx - 26)} ${f1(my + 8)} L ${f1(mx + 26)} ${f1(my - 8)}`} stroke={shade(meatC, 0.45)} strokeWidth={9} strokeLinecap="round" opacity={0.85} />
          </g>
        ))}
        {herb && (
          <g transform="translate(120 -92)">
            <path d="M 0 0 Q 10 -40 36 -62" stroke={C.greenDark} strokeWidth={5} fill="none" strokeLinecap="round" />
            {[[8, -18, -40], [16, -30, -60], [26, -44, -20], [14, -10, 30], [30, -56, 10]].map(([lx, ly, a], i) => (
              <ellipse key={i} cx={lx} cy={ly} rx={14} ry={6} fill={i % 2 ? C.green : C.greenDark} transform={`rotate(${a} ${lx} ${ly})`} />
            ))}
          </g>
        )}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Steak {...p} />;
}

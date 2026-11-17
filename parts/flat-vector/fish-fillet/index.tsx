import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector salmon fillet on a plate with a lemon wedge and dill.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 420 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function FishFillet(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const fleshC = p.fleshColor ?? "#F4937A";
  const lemon = p.lemon ?? true;
  const dill = p.dill ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // fillet: tapered slab, lying on the plate surface (y -74)
  const top = "M -170 -20 Q -120 -70 -20 -70 Q 80 -72 150 -40 Q 180 -26 170 -6 Q 100 14 -20 6 Q -120 4 -170 -20 Z";
  const edge = "M -170 -20 Q -120 4 -20 6 Q 100 14 170 -6 L 170 4 Q 100 26 -20 18 Q -120 16 -170 -2 Z";
  const fat = [[-120, -40, 0], [-50, -46, 4], [20, -44, -2], [90, -34, 6]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Dish x={0} y={0} vessel="plate" w={460} fill="none" />
      <g transform={tr}>
        <g transform="translate(0 -74)">
          <path d={edge} fill={shade(fleshC, 0.25)} />
          <path d={top} fill={fleshC} />
          {fat.map(([fx, fy, fr], i) => (
            <path key={i} d={`M ${fx} ${fy} Q ${fx + 20} ${fy - 8} ${fx + 46} ${fy + fr}`} stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.85} />
          ))}
          <path d="M -120 -48 Q -70 -62 -20 -58" stroke="#FFFFFF" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.3} />
        </g>
        {lemon && (
          <g transform="translate(150 -92)">
            <path d="M 0 0 A 52 52 0 0 0 -52 -52 Z" transform="rotate(10)" fill={C.yellow} />
            <path d="M -8 -4 L -42 -42" stroke="#FFFFFF" strokeWidth={0} />
            <path d="M 0 0 L -28 -40 M 0 0 L -44 -20 M 0 0 L -20 -48" stroke="#FFF3B0" strokeWidth={5} strokeLinecap="round" />
            <path d="M 0 0 A 52 52 0 0 0 -52 -52" fill="none" stroke={C.yellowDark} strokeWidth={6} />
          </g>
        )}
        {dill && (
          <g transform="translate(-160 -96)">
            <path d="M 0 0 Q 10 -30 30 -48" stroke={C.greenDark} strokeWidth={4} fill="none" strokeLinecap="round" />
            {[[4, -10, -40], [10, -20, -10], [20, -30, -60], [28, -40, 10], [14, -6, 30]].map(([fx, fy, a], i) => (
              <g key={i} transform={`translate(${fx} ${fy}) rotate(${a})`}>
                <path d="M 0 0 L 0 -16" stroke={C.green} strokeWidth={3} strokeLinecap="round" />
                <circle cx={0} cy={-16} r={5} fill={i % 2 ? C.green : C.greenDark} />
              </g>
            ))}
          </g>
        )}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <FishFillet {...p} />;
}

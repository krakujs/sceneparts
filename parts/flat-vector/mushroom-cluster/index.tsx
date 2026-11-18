/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cluster of five forest mushrooms of different sizes on a small mound. Origin = bottom centre of the mound.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
// One mushroom with its base at (0,0); k scales it.
const shroom = (k: number, cap: string, spots: boolean, key: number) => (
  <g key={key} transform={`scale(${f1(k)})`}>
    <path d="M -46 0 C -48 -60 -40 -110 -40 -130 L 40 -130 C 40 -110 48 -60 46 0 Z" fill="#F4E8CF" />
    <path d="M 12 -130 L 40 -130 C 40 -110 48 -60 46 0 L 16 0 C 20 -60 14 -100 12 -130 Z" fill={shade("#F4E8CF", 0.12)} />
    <path d="M -110 -120 C -116 -210 -60 -250 0 -250 C 60 -250 116 -210 110 -120 Z" fill={shade(cap, 0.25)} />
    <path d="M -104 -120 C -110 -200 -56 -238 0 -238 C 56 -238 110 -200 104 -120 Z" fill={cap} />
    {spots && <><circle cx={-40} cy={-190} r={12} fill="#FFFFFF" /><circle cx={28} cy={-208} r={9} fill="#FFFFFF" /><circle cx={62} cy={-160} r={7} fill="#FFFFFF" /></>}
    <ellipse cx={-50} cy={-200} rx={20} ry={9} fill="#FFFFFF" opacity={0.3} transform="rotate(-25 -50 -200)" />
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const cap = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const bob = anim === "sway" ? -4 * (Math.sin((f * 2 * Math.PI) / 80) + 1) : 0;
  // [x, scale, has spots, cap colour index]
  const group: [number, number, boolean, number][] = [
    [-150, 0.62, false, 1], [-40, 1.0, false, 0], [90, 0.78, true, 1], [200, 0.5, false, 0], [-270, 0.42, false, 0],
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={380} ry={26} fill={C.shadow} />
      <path d="M -360 0 C -330 -60 -200 -70 0 -70 C 200 -70 330 -60 360 0 Z" fill={shade("#A8D85A", 0.1)} />
      <path d="M -330 -10 C -260 -50 240 -50 330 -10 Z" fill="#8FC24A" />
      <g transform={`translate(0 ${f1(bob)}) scale(${f1(pop)})`}>
        {group.map(([gx, k, spots, ci], i) => (
          <g key={i} transform={`translate(${gx} ${ci ? -6 : 0})`}>
            {shroom(k, ci ? shade(cap, 0.18) : cap, spots, i)}
          </g>
        ))}
      </g>
    </g>
  );
}

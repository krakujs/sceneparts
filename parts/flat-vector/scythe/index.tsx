import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Farming scythe standing on its heel: long wooden snath (handle) rising to two grips, long curved blade reaching out to the right.
// Hero-to-room scale: about 480 px tall and 400 px wide at s = 1; use about 0.3 next to a person. Origin = floor under the heel.
// anim "swing": the blade sweeps side to side, as in mowing.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  return "";
};
const S0 = [-60, -40], S1 = [130, -470];
const at = (t: number) => [S0[0] + (S1[0] - S0[0]) * t, S0[1] + (S1[1] - S0[1]) * t];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const swing = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 60) * 6 : 0;
  const g1 = at(0.88), g2 = at(0.42);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={60} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <line x1={S0[0]} y1={S0[1]} x2={S1[0]} y2={S1[1]} stroke={wood} strokeWidth={22} strokeLinecap="round" />
        <line x1={g2[0] - 28} y1={g2[1] + 6} x2={g2[0] + 28} y2={g2[1] - 6} stroke={shade(wood, 0.2)} strokeWidth={20} strokeLinecap="round" />
        <line x1={g1[0] - 36} y1={g1[1] + 8} x2={g1[0] + 36} y2={g1[1] - 8} stroke={shade(wood, 0.2)} strokeWidth={22} strokeLinecap="round" />
        <g transform={`rotate(${f1(swing)} -60 -37)`}>
          <path d="M -60 -62 C 60 -106 220 -98 340 -36 L 346 -18 C 220 -50 60 -40 -60 -18 Z" fill={metal} />
          <path d="M 0 -68 C 120 -96 230 -84 330 -40" fill="none" stroke={C.white} strokeWidth={7} strokeLinecap="round" opacity={0.35} />
        </g>
      </g>
    </g>
  );
}

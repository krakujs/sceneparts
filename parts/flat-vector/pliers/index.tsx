import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Combination pliers lying on the floor, slightly open: two crossed steel arms, coloured grips on the handles.
// Origin = floor centre. Hero size: about 420 px long at s = 1. anim "snap": the jaws open and close.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const grip = p.color && p.color !== "none" ? p.color : C.red;
  const steel = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const k = anim === "snap" ? 20 * (1 - Math.cos((f * 2 * Math.PI) / 60)) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-10} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <line x1={-230} y1={-150} x2={150} y2={-40 - k} stroke={steel} strokeWidth={36} strokeLinecap="round" />
        <line x1={-230} y1={-30} x2={150} y2={-130 + k} stroke={steel} strokeWidth={36} strokeLinecap="round" />
        <line x1={-230} y1={-150} x2={-100} y2={-112} stroke={grip} strokeWidth={58} strokeLinecap="round" />
        <line x1={-230} y1={-30} x2={-100} y2={-64} stroke={grip} strokeWidth={58} strokeLinecap="round" />
        <circle cx={150} cy={-40 - k} r={22} fill={shade(steel, 0.2)} />
        <circle cx={150} cy={-130 + k} r={22} fill={shade(steel, 0.2)} />
        <circle cx={-13} cy={-88} r={22} fill={shade(steel, 0.3)} />
        <circle cx={-13} cy={-88} r={8} fill={C.white} opacity={0.6} />
      </g>
    </g>
  );
}

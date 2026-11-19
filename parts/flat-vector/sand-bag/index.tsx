import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stack of sandbags in a pyramid: three at the bottom, two on top. Each bag is a soft pillow with a tied neck.
// About 560 px wide and 320 px tall at s = 1 (room scale). Origin = bottom centre (rests on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// One sandbag centred at (cx, cy), about 200 x 110.
const Bag = ({ cx, cy, fill }: { cx: number; cy: number; fill: string }) => (
  <g>
    <path d={`M${cx - 100} ${cy + 40} Q${cx - 110} ${cy - 40} ${cx - 70} ${cy - 46} Q${cx} ${cy - 62} ${cx + 70} ${cy - 46} Q${cx + 110} ${cy - 40} ${cx + 100} ${cy + 40} Q${cx} ${cy + 58} ${cx - 100} ${cy + 40} Z`} fill={fill} />
    <path d={`M${cx - 100} ${cy + 40} Q${cx} ${cy + 58} ${cx + 100} ${cy + 40} Q${cx + 100} ${cy + 28} ${cx + 60} ${cy + 22} Q${cx} ${cy + 36} ${cx - 60} ${cy + 22} Q${cx - 100} ${cy + 28} ${cx - 100} ${cy + 40} Z`} fill={shade(fill, 0.18)} />
    <path d={`M${cx - 14} ${cy - 50} Q${cx} ${cy - 70} ${cx + 14} ${cy - 50}`} fill="none" stroke={shade(fill, 0.25)} strokeWidth={10} strokeLinecap="round" />
    <path d={`M${cx - 30} ${cy - 10} Q${cx} ${cy - 4} ${cx + 30} ${cy - 14}`} fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.2} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const sand = p.color && p.color !== "none" ? p.color : C.sand;
  const tie = p.color2 && p.color2 !== "none" ? p.color2 : shade(sand, 0.1);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <Bag cx={-200} cy={-60} fill={sand} />
        <Bag cx={0} cy={-60} fill={tie} />
        <Bag cx={200} cy={-60} fill={sand} />
        <Bag cx={-100} cy={-170} fill={tie} />
        <Bag cx={100} cy={-170} fill={sand} />
      </g>
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A few cut logs on the ground: two lying along the floor and one on top, with the cut end showing growth rings.
// About 560 px wide and 300 px tall at s = 1. Origin = bottom centre (rests on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// One log: a bark-coloured cylinder lying along x, with a cut face at the right end. (cx, cy) is its centre.
const Log = ({ cx, cy, len, r, wood, bark }: { cx: number; cy: number; len: number; r: number; wood: string; bark: string }) => (
  <g>
    <rect x={cx - len / 2} y={cy - r} width={len} height={r * 2} rx={r} fill={bark} />
    <rect x={cx - len / 2 + 10} y={cy - r + 10} width={len - 40} height={r * 2 - 20} rx={r - 10} fill={shade(bark, 0.15)} opacity={0.5} />
    <ellipse cx={cx + len / 2} cy={cy} rx={r * 0.42} ry={r} fill={wood} />
    <ellipse cx={cx + len / 2} cy={cy} rx={r * 0.42} ry={r} fill="none" stroke={shade(bark, 0.2)} strokeWidth={6} />
    <ellipse cx={cx + len / 2} cy={cy} rx={r * 0.22} ry={r * 0.52} fill="none" stroke={shade(bark, 0.2)} strokeWidth={6} />
    <circle cx={cx + len / 2} cy={cy} r={r * 0.08} fill={shade(bark, 0.2)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <Log cx={-40} cy={-46} len={460} r={46} wood={wood} bark={bark} />
        <Log cx={-40} cy={-130} len={420} r={44} wood={wood} bark={bark} />
      </g>
    </g>
  );
}

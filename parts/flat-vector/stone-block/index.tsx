import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big cut stone block in front 3/4 view: front face, lit top and shaded right side, with a few chisel facets.
// About 600 px wide and 420 px tall at s = 1 (room scale). Origin = bottom centre (rests on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const stone = p.color && p.color !== "none" ? p.color : C.grey;
  const top = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={340} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* right side face (shaded) */}
        <path d="M280 -400 L340 -440 L340 -40 L280 0 Z" fill={shade(stone, 0.28)} />
        {/* top face (lit) */}
        <path d="M-280 -400 L-220 -440 L340 -440 L280 -400 Z" fill={top} />
        {/* front face */}
        <rect x={-280} y={-400} width={560} height={400} rx={10} fill={stone} />
        {/* chisel facets: a few flat bands on the front */}
        <path d="M-280 -340 L-120 -330 L-120 -270 L-280 -280 Z" fill={shade(stone, 0.08)} />
        <path d="M-60 -220 L120 -230 L120 -170 L-60 -160 Z" fill={shade(stone, 0.12)} />
        <path d="M120 -120 L280 -130 L280 -70 L120 -60 Z" fill={shade(stone, 0.06)} />
        {/* edge highlight on the top front lip */}
        <rect x={-280} y={-400} width={560} height={16} rx={6} fill={C.white} opacity={0.18} />
        {/* a crack */}
        <path d="M-150 -180 L-120 -150 L-140 -120 L-110 -90" fill="none" stroke={shade(stone, 0.35)} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

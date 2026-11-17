import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small standing photo frame with a simple landscape (sun and two hills) and a little foot stand. Origin = floor centre.
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
  const frame = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -90 0 L -70 -40 L 70 -40 L 90 0 Z" fill={shade(frame, 0.2)} />
        <rect x={-150} y={-400} width={300} height={362} rx={16} fill={frame} />
        <rect x={-150} y={-60} width={300} height={22} rx={8} fill={shade(frame, 0.2)} />
        <rect x={-118} y={-368} width={236} height={274} rx={6} fill={C.sky} />
        <circle cx={60} cy={-300} r={36} fill={C.yellow} />
        <path d="M -118 -106 Q -60 -210 -10 -150 Q 40 -190 118 -150 L 118 -94 L -118 -94 Z" fill={C.skyDeep} />
        <path d="M -118 -94 Q -40 -170 40 -110 Q 80 -134 118 -110 L 118 -94 Z" fill={C.greenDark} />
      </g>
    </g>
  );
}

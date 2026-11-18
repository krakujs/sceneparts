import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Orange translucent medicine bottle with a white cap and a blank white label (no text), with a couple of pills beside it.
// Origin = bottom centre (the bottle stands on y). About 620 px wide and 480 px tall at s = 1.
// anim "bob", "wobble" or "pop" move the whole bottle.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

// A capsule pill lying at an angle: red left half, white right half.
const Pill = ({ x, y, r }: { x: number; y: number; r: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={-55} y={-25} width={110} height={50} rx={25} fill={C.red} />
    <path d="M 0 -25 H 30 A 25 25 0 0 1 30 25 H 0 Z" fill={C.white} />
    <rect x={-46} y={-19} width={60} height={8} rx={4} fill={C.white} opacity={0.4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const amber = p.color && p.color !== "none" ? p.color : C.orange;
  const cap = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={16} fill={C.shadow} />
      <Pill x={250} y={-30} r={24} />
      <Pill x={-262} y={-18} r={-16} />
      <g transform={motion(anim, f)}>
        {/* body, with a darker lower band that reads as liquid seen through the glass */}
        <rect x={-160} y={-360} width={320} height={354} rx={46} fill={amber} />
        <rect x={-160} y={-130} width={320} height={124} rx={46} fill={shade(amber, 0.14)} />
        <rect x={-132} y={-330} width={18} height={190} rx={9} fill={C.white} opacity={0.45} />
        {/* neck and cap with ridges */}
        <rect x={-110} y={-392} width={220} height={40} rx={10} fill={shade(cap, 0.1)} />
        <rect x={-165} y={-470} width={330} height={100} rx={18} fill={cap} />
        {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((rx) => (
          <rect key={rx} x={rx - 3} y={-460} width={6} height={80} rx={3} fill={shade(cap, 0.12)} />
        ))}
        {/* blank label */}
        <rect x={-120} y={-300} width={240} height={150} rx={14} fill={C.white} />
        <rect x={-120} y={-300} width={240} height={14} rx={6} fill={shade(C.white, 0.08)} />
      </g>
    </g>
  );
}

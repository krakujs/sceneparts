import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Javelin standing on its metal tip, leaning up and to the right at the given angle: a thin tapered
// shaft, a grip binding wrapped round the middle, and a flat tail cap. Drawn along +x and then rotated.
// Origin = the tip on the ground. About 900 px long at s = 1.
const f1 = (v: number) => v.toFixed(1);
const L = 900; // shaft length

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 400, y = p.y ?? 1560;
  const angle = Math.max(20, Math.min(80, Number(p.angle ?? 60)));
  const bind = p.color && p.color !== "none" ? p.color : C.red;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const sway = anim === "wobble" ? 2 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <ellipse cx={0} cy={0} rx={60} ry={8} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(-angle + sway)})`}>
        {/* metal tip, a small cone */}
        <path d="M 0 -8 L 56 -6 L 56 6 L 0 8 Z" fill={C.grey} />
        <path d="M 0 -8 L 36 -4 L 36 4 L 0 8 Z" fill={C.greyDark} opacity={0.4} />
        {/* shaft, tapering from the tip to the tail */}
        <path d={`M 56 -6 L ${L - 40} -10 L ${L - 40} 10 L 56 6 Z`} fill={metal} />
        <path d={`M 56 3 L ${L - 40} 4 L ${L - 40} 10 L 56 6 Z`} fill={shade(metal, 0.2)} />
        {/* grip binding in the middle */}
        <rect x={L / 2 - 150} y={-12} width={300} height={24} fill={bind} />
        {Array.from({ length: 10 }).map((_, k) => (
          <line key={k} x1={L / 2 - 150 + k * 30 + 6} y1={-12} x2={L / 2 - 150 + k * 30 - 6} y2={12} stroke={shade(bind, 0.3)} strokeWidth={4} opacity={0.6} />
        ))}
        {/* tail cap */}
        <rect x={L - 44} y={-12} width={44} height={24} rx={8} fill={C.greyDark} />
      </g>
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sparkler: a thin metal stick standing upright in sand, with a star-burst of sparks at its tip.
// Origin = bottom centre (the stick stands on y). About 300 px wide and 580 px tall at s = 1.
// anim "flicker": the spark rays pulse in length and tiny sparks fall from the tip, looping.
const f1 = (v: number) => v.toFixed(1);
const TIP = -430;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const spark = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const live = anim === "flicker";
  const rays = Array.from({ length: 18 }, (_, i) => {
    const a = (i * 20 * Math.PI) / 180;
    const base = 96 + (i % 2) * 52;
    const pulse = live ? Math.sin(f * 0.8 + i * 1.3) * 18 : Math.sin(i * 1.3) * 10;
    const len = base + pulse;
    return { x: Math.sin(a) * len, y: TIP - Math.cos(a) * len, x0: Math.sin(a) * 18, y0: TIP - Math.cos(a) * 18 };
  });
  const falling = Array.from({ length: 8 }, (_, j) => {
    const t = live ? (f / 45 + j / 8) % 1 : (j / 8 + 0.1) % 1;
    return { x: Math.sin(j * 2.4) * 70 * t, y: TIP + 40 + 260 * t * t, t };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={60} ry={14} fill={C.sand} />
      <rect x={-8} y={-420} width={16} height={420} rx={8} fill={C.greyDark} />
      <rect x={-3} y={-412} width={4} height={400} rx={2} fill={C.white} opacity={0.35} />
      <rect x={-12} y={-430} width={24} height={20} rx={8} fill={C.greyDark} />
      {/* glow and star-burst */}
      <circle cx={0} cy={TIP} r={130} fill={spark} opacity={0.22} />
      {rays.map((r, i) => (
        <line key={i} x1={f1(r.x0)} y1={f1(r.y0)} x2={f1(r.x)} y2={f1(r.y)} stroke={i % 3 ? spark : C.white} strokeWidth={i % 2 ? 4 : 6} strokeLinecap="round" />
      ))}
      {rays.map((r, i) => (i % 3 === 0 ? <circle key={`e${i}`} cx={f1(r.x)} cy={f1(r.y)} r={6} fill={spark} /> : null))}
      <circle cx={0} cy={TIP} r={26} fill={spark} />
      <circle cx={0} cy={TIP} r={13} fill={C.white} />
      {falling.map((d, j) => (
        <circle key={`f${j}`} cx={f1(d.x)} cy={f1(d.y)} r={4} fill={spark} opacity={f1(1 - d.t) as any} />
      ))}
    </g>
  );
}

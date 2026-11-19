import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Playground: an A-frame swing set with two swings on chains, a slide with a ladder and platform, and a small see-saw.
// Every leg touches the ground. Origin = centre of the ground line. About 1000 px wide and 620 px tall at s = 1.
// anim swing rocks the swings gently.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const FRAME = "#FF8A3D", ACCENT = "#3D6FE0", SAND = "#E9CF97";
const BAR_Y = -560;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = (p.s ?? 1) * 0.86, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const frame = p.color && p.color !== "none" ? p.color : FRAME;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : ACCENT;
  const anim: string = p.anim ?? "none";
  const swing = (sx: number) => (anim === "swing" ? 10 * Math.sin((f * 2 * Math.PI) / 100 + sx / 100) : 0);
  const seat = (sx: number) => (
    <g transform={`rotate(${f1(swing(sx))} ${sx} ${BAR_Y})`}>
      <line x1={sx - 34} y1={BAR_Y} x2={sx - 40} y2={-330} stroke={C.greyDark} strokeWidth={5} />
      <line x1={sx + 34} y1={BAR_Y} x2={sx + 40} y2={-330} stroke={C.greyDark} strokeWidth={5} />
      <rect x={sx - 46} y={-330} width={92} height={18} rx={8} fill={accent} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={4} rx={520} ry={16} fill={C.shadow} />
        {/* soft surfacing under the equipment */}
        <rect x={-520} y={-18} width={1040} height={18} rx={6} fill={SAND} />
        {/* swing set: A-frame legs to the ground, top bar, two swings */}
        <line x1={-450} y1={0} x2={-300} y2={BAR_Y} stroke={frame} strokeWidth={14} strokeLinecap="round" />
        <line x1={-150} y1={0} x2={-300} y2={BAR_Y} stroke={frame} strokeWidth={14} strokeLinecap="round" />
        <rect x={-462} y={BAR_Y - 10} width={324} height={16} rx={8} fill={frame} />
        {seat(-380)}
        {seat(-220)}
        {/* see-saw: a fulcrum on the ground and a tilted board */}
        <path d="M -20 0 L 0 -60 L 20 0 Z" fill={frame} />
        <rect x={-110} y={-72} width={180} height={16} rx={8} fill={accent} transform="rotate(-6 -20 -64)" />
        <circle cx={-20} cy={-66} r={8} fill={C.greyDark} />
        {/* slide: ladder up to a platform, then a chute down to the ground */}
        <line x1={92} y1={0} x2={172} y2={-420} stroke={frame} strokeWidth={10} strokeLinecap="round" />
        <line x1={122} y1={0} x2={192} y2={-420} stroke={frame} strokeWidth={10} strokeLinecap="round" />
        {[0.12, 0.26, 0.4, 0.54, 0.68, 0.82].map((t, i) => (
          <line key={i} x1={92 + 80 * t} y1={-420 * t} x2={122 + 70 * t} y2={-420 * t} stroke={frame} strokeWidth={6} strokeLinecap="round" />
        ))}
        <rect x={160} y={-430} width={190} height={16} rx={6} fill={frame} />
        <rect x={180} y={-414} width={10} height={414} fill={C.greyDark} />
        <rect x={326} y={-414} width={10} height={414} fill={C.greyDark} />
        <rect x={160} y={-440} width={40} height={10} rx={4} fill={frame} />
        <path d="M 320 -420 L 400 -420 L 540 -28 L 462 -28 Z" fill={accent} />
        <rect x={460} y={-30} width={80} height={30} rx={6} fill={shade(accent, 0.2)} />
      </g>
    </g>
  );
}

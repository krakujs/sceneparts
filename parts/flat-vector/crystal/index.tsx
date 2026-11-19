import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Gem crystal cluster: tall faceted crystals of two sizes on a grey rock base. Each crystal has a lit face and a
// shaded face. anim "shimmer": a bright highlight sweeps across the crystals in a 100-frame loop.
// Origin = bottom centre of the rock. About 420 px wide and 520 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
// Each crystal: tip, base centre and width (a hexagonal prism seen from the front, lit left face + shaded right face).
const CRYSTALS = [
  { tx: -10, ty: -520, bx: -10, by: -140, w: 70 },
  { tx: -150, ty: -380, bx: -150, by: -120, w: 52 },
  { tx: 120, ty: -400, bx: 120, by: -120, w: 58 },
  { tx: 40, ty: -300, bx: 40, by: -120, w: 36 },
  { tx: -70, ty: -260, bx: -70, by: -110, w: 34 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const gem = p.color && p.color !== "none" ? p.color : "#9B6BE8";
  const anim: string = p.anim ?? "shimmer";
  const sweep = anim === "shimmer" ? (f % 100) / 100 : -1; // 0..1 across the crystals, -1 = off
  const sweepX = -260 + sweep * 520;
  const body = (c: typeof CRYSTALS[number], k: number) => {
    const lit = shade(gem, -0.15), dark = shade(gem, 0.3);
    const L = `M ${c.tx} ${c.ty} L ${c.bx - c.w} ${c.by - c.w * 0.5} L ${c.bx - c.w} ${c.by} L ${c.bx} ${c.by + 18} Z`;
    const R = `M ${c.tx} ${c.ty} L ${c.bx + c.w} ${c.by - c.w * 0.5} L ${c.bx + c.w} ${c.by} L ${c.bx} ${c.by + 18} Z`;
    const hit = sweep >= 0 && Math.abs(c.tx - sweepX) < 60;
    return (
      <g key={k}>
        <path d={L} fill={lit} />
        <path d={R} fill={dark} />
        {hit && <path d={`M ${c.tx - 12} ${c.ty + 30} L ${c.tx + 6} ${c.ty + 10} L ${c.tx + 14} ${c.ty + 30} Z`} fill={C.white} opacity={0.7} />}
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={230} ry={16} fill={C.shadow} />
      {/* rock base */}
      <path d="M -210 -40 Q -220 -110 -150 -120 L 150 -120 Q 220 -110 210 -40 Q 150 0 0 0 Q -150 0 -210 -40 Z" fill={C.grey} />
      <path d="M 40 -110 L 150 -120 Q 220 -110 210 -40 Q 150 0 0 0 Q 100 -40 40 -110 Z" fill={shade(C.grey, 0.2)} opacity={0.7} />
      {/* crystals: back ones first */}
      {CRYSTALS.map((c, k) => body(c, k))}
      {/* glints on the lit faces */}
      {sweep >= 0 && <rect x={sweepX - 6} y={-560} width={12} height={460} fill={C.white} opacity={0.12} transform="skewX(-12)" />}
    </g>
  );
}

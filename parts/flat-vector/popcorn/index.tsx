import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Popcorn tub: striped paper tub (drawn here instead of a dish vessel) overflowing with puffed popcorn pieces.
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const hash = (i: number) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
/** Same motion as the dish generator. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

const TOP_Y = -400, TOP_HW = 200, BOT_HW = 150, STRIPES = 6;
const TOP_RIM_RY = 34;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 1560, s = p.s ?? 1, f: number = p.f ?? 0;
  const anim: string = p.anim ?? "none";
  const stripe: string = p.stripeColor ?? C.red;
  const corn: string = p.popcornColor ?? "#FFF3C4";
  // striped tub: alternate stripes, the right-hand stripes take the one darker shade
  const stripes: React.ReactNode[] = [];
  for (let i = 0; i < STRIPES; i++) {
    const u0 = i / STRIPES, u1 = (i + 1) / STRIPES;
    const xt0 = -TOP_HW + 2 * TOP_HW * u0, xt1 = -TOP_HW + 2 * TOP_HW * u1;
    const xb0 = -BOT_HW + 2 * BOT_HW * u0, xb1 = -BOT_HW + 2 * BOT_HW * u1;
    let col = i % 2 === 0 ? stripe : "#FFFFFF";
    if (i >= STRIPES - 2) col = shade(col, 0.16);
    stripes.push(
      <polygon key={i} points={`${xt0},${TOP_Y} ${xt1},${TOP_Y} ${xb1},0 ${xb0},0`} fill={col} />
    );
  }
  // puffed popcorn pieces heaped above the rim
  const pieces: React.ReactNode[] = [];
  for (let i = 0; i < 30; i++) {
    const px = (hash(i) * 2 - 1) * 190;
    const py = -428 - hash(i + 5) * 170 * (1 - Math.abs(px) / 240);
    const r = 24 + hash(i + 11) * 16;
    const base = i % 4 === 0 ? "#FFFFFF" : i % 4 === 1 ? "#FFE08A" : corn;
    pieces.push(
      <g key={i}>
        <circle cx={px} cy={py + r * 0.3} r={r * 0.95} fill={shade(base, 0.12)} />
        <circle cx={px} cy={py} r={r} fill={base} />
        <circle cx={px + r * 0.7} cy={py + r * 0.2} r={r * 0.78} fill={base} />
        <circle cx={px - r * 0.6} cy={py + r * 0.25} r={r * 0.7} fill={base} />
        <circle cx={px - r * 0.3} cy={py - r * 0.35} r={r * 0.22} fill="#FFFFFF" opacity={0.7} />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={22} fill={C.shadow} />
      <g transform={motion(anim, f, 400)}>
        {stripes}
        <ellipse cx={0} cy={TOP_Y} rx={TOP_HW} ry={TOP_RIM_RY} fill="#FFFFFF" />
        <ellipse cx={0} cy={TOP_Y} rx={TOP_HW - 14} ry={TOP_RIM_RY - 9} fill={shade(stripe, 0.3)} />
        {pieces}
      </g>
    </g>
  );
}

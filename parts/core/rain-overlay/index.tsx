import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Rain overlay: full-frame slanted rain in three layers (far, mid, near), with small splash ticks at the bottom edge.
// Streaks wrap top to bottom and sideways, so the rain loops. Covers the full frame, ignores x and y.

const LAYERS = [
  { n: 90, len: 26, sp: 16, w: 1.6, op: 0.34 },
  { n: 60, len: 44, sp: 26, w: 2.3, op: 0.48 },
  { n: 30, len: 72, sp: 40, w: 3.2, op: 0.62 },
];
const SLANT = 0.22; // horizontal drift per unit of fall
const XSPAN = 1480; // x wraps over -200..1280, which is off-frame on both sides

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const col = p.color ?? "#5F7FA0";
  const sd = String(p.seed ?? "rain");
  const amount = clamp(Number(p.density ?? 1), 0, 2);
  const speed = Number(p.speed ?? 1);
  const streaks = LAYERS.map((L, li) => {
    let d = "";
    for (let i = 0; i < Math.round(L.n * amount); i++) {
      const q = (k: number) => random(`${sd}-${li}-${i}-${k}`);
      const span = 1920 + 2 * L.len;
      const y = ((q(0) * span + lf * L.sp * speed) % span) - L.len;
      const x = ((((q(1) * XSPAN - lf * L.sp * speed * SLANT) % XSPAN) + XSPAN) % XSPAN) - 200;
      d += `M${x.toFixed(1)} ${y.toFixed(1)}l${(-L.len * SLANT).toFixed(1)} ${L.len} `;
    }
    return { d, w: L.w, op: L.op };
  });
  let splash = "";
  let splashOp = 0;
  for (let k = 0; k < 12; k++) {
    const q = (j: number) => random(`${sd}-splash-${k}-${j}`);
    const T = 18 + q(0) * 12;
    const ph = ((lf + q(1) * T) % T) / T;
    if (ph >= 0.5) continue;
    const g = Math.sin((ph / 0.5) * Math.PI);
    const sx = q(2) * 1080, sy = 1905, h = 16 * g;
    splash += `M${sx.toFixed(1)} ${sy} l${(-0.9 * h).toFixed(1)} ${(-h).toFixed(1)} M${sx.toFixed(1)} ${sy} l0 ${(-1.1 * h).toFixed(1)} M${sx.toFixed(1)} ${sy} l${(0.9 * h).toFixed(1)} ${(-h).toFixed(1)} `;
    splashOp = Math.max(splashOp, g * 0.6);
  }
  return (
    <g fill="none" stroke={col} strokeLinecap="round">
      {streaks.map((s, i) => <path key={i} d={s.d} strokeWidth={s.w} opacity={s.op} />)}
      <path d={splash} strokeWidth={2} opacity={splashOp} />
    </g>
  );
}

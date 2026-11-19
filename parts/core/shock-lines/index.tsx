import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn } from "../stat-card/index";

// Shock lines: short tapered emphasis strokes radiating from (x, y). They pop out one after another,
// flicker on and off as they hold, then fade. Each stroke is a closed wedge, so the lines stay crisp at any scale.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "shock");
  const n = Math.round(clamp(Number(p.count ?? 14), 6, 24));
  const r0 = Number(p.r ?? 230);
  const len = Number(p.len ?? 170);
  const c = p.color ?? u.ink;
  const fade = 1 - clamp((lf - 80) / 30);
  const lines = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const a = (i / n) * Math.PI * 2 + (q(0) - 0.5) * 0.12;
    const pop = popIn(lf, i * 1.5, 8);
    const inner = r0 * (0.9 + 0.2 * q(1));
    const L = len * (0.75 + 0.5 * q(2));
    const rIn = inner * (0.85 + 0.15 * pop);
    const rOut = inner + L * Math.max(0, pop);
    const ux = Math.cos(a), uy = Math.sin(a);
    const hw = 9;
    const flick = random(`${sd}-${i}-${Math.floor(lf / 2)}`) > 0.25 ? 1 : 0.35;
    const d = `M${(ux * rIn - uy * hw).toFixed(1)} ${(uy * rIn + ux * hw).toFixed(1)} L${(ux * rOut).toFixed(1)} ${(uy * rOut).toFixed(1)} L${(ux * rIn + uy * hw).toFixed(1)} ${(uy * rIn - ux * hw).toFixed(1)} Z`;
    return { d, flick };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={fade.toFixed(3)}>
      {lines.map((l, i) => <path key={i} d={l.d} fill={c} opacity={l.flick} />)}
    </g>
  );
}

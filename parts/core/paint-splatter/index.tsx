import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Paint splatter: a lumpy colourful paint splat with drips running down and spatter dots flying off.
// Shapes are drawn twice, an ink underlay for the outline and then the paint, so overlaps share one cartoon outline.

function lump(R: number, sd: string, grow: number) {
  const ph1 = random(`${sd}-p1`) * 6.28, ph2 = random(`${sd}-p2`) * 6.28, ph3 = random(`${sd}-p3`) * 6.28;
  let d = "";
  const N = 60;
  for (let j = 0; j < N; j++) {
    const a = (j / N) * Math.PI * 2;
    const rr = R * grow * (1 + 0.13 * Math.sin(3 * a + ph1) + 0.07 * Math.sin(7 * a + ph2) + 0.05 * Math.sin(11 * a + ph3));
    d += `${j ? "L" : "M"}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} `;
  }
  return d + "Z";
}

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "paint");
  const R = Math.max(60, Number(p.size ?? 220));
  const grow = ease(clamp(lf / 10));
  const main = lump(R, sd, grow);
  const side = lump(R * 0.5, `${sd}-side`, grow);
  const drips = Array.from({ length: 5 }, (_, i) => {
    const q = (k: number) => random(`${sd}-drip${i}-${k}`);
    const a = Math.PI / 2 + (q(0) - 0.5) * 1.6;
    const bx = Math.cos(a) * R * 0.8, by = Math.sin(a) * R * 0.8;
    const w = 16 + q(1) * 12;
    const L = (120 + q(2) * 160) * ease(clamp((lf - 8 - q(3) * 6) / 30));
    return { d: `M${(bx - w / 2).toFixed(1)} ${by.toFixed(1)} L${(bx - w / 2).toFixed(1)} ${(by + L).toFixed(1)} A${(w / 2).toFixed(1)} ${(w / 2).toFixed(1)} 0 0 0 ${(bx + w / 2).toFixed(1)} ${(by + L).toFixed(1)} L${(bx + w / 2).toFixed(1)} ${by.toFixed(1)} Z` };
  });
  const dots = Array.from({ length: 14 }, (_, i) => {
    const q = (k: number) => random(`${sd}-dot${i}-${k}`);
    const a = q(0) * Math.PI * 2;
    const dist = (R * 1.2 + q(1) * R * 0.6) * ease(clamp((lf - 2) / 18));
    return { x: Math.cos(a) * dist, y: Math.sin(a) * dist, r: 6 + q(2) * 14, c: i % 2 ? u.series[1] : u.series[2] };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g fill={u.ink} stroke={u.ink} strokeWidth={14} strokeLinejoin="round">
        <path d={main} />
        {drips.map((d, i) => <path key={i} d={d.d} />)}
        <path d={side} transform="translate(120 70)" />
      </g>
      <path d={main} fill={u.accent} />
      <path d={side} transform="translate(120 70)" fill={u.series[1]} />
      {drips.map((d, i) => <path key={i} d={d.d} fill={u.accent} />)}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(1)} fill={d.c} stroke={u.ink} strokeWidth={4} />
      ))}
    </g>
  );
}

import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Ink splash: an ink blot that splats out of (x, y): a lumpy central blob, flung droplets and tapered streaks.
// It grows fast in the first ~15 frames, then holds still.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const R = Math.max(20, Number(p.size ?? 230));
  const c = p.color ?? u.ink;
  const sd = String(p.seed ?? "ink");
  const grow = ease(clamp(lf / 14));
  const ph1 = random(`${sd}-p1`) * 6.28, ph2 = random(`${sd}-p2`) * 6.28, ph3 = random(`${sd}-p3`) * 6.28;
  const N = 72;
  let blob = "";
  for (let j = 0; j < N; j++) {
    const a = (j / N) * Math.PI * 2;
    const rr = R * grow * (1 + 0.14 * Math.sin(3 * a + ph1) + 0.08 * Math.sin(7 * a + ph2) + 0.04 * Math.sin(13 * a + ph3));
    blob += `${j ? "L" : "M"}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} `;
  }
  const drops = Array.from({ length: 14 }, (_, i) => {
    const q = (k: number) => random(`${sd}-d${i}-${k}`);
    const a = q(0) * Math.PI * 2;
    const prog = ease(clamp((lf - (2 + q(1) * 8)) / 18));
    const dist = R * (1.45 + q(2) * 1.4) * prog;
    return { x: Math.cos(a) * dist, y: Math.sin(a) * dist, r: (4 + q(3) * 12) * (0.3 + 0.7 * prog), prog };
  }).filter((d) => d.prog > 0);
  const streaks = Array.from({ length: 8 }, (_, i) => {
    const q = (k: number) => random(`${sd}-s${i}-${k}`);
    const a = q(0) * Math.PI * 2;
    const prog = ease(clamp((lf - (3 + q(1) * 5)) / 16));
    const L = R * (0.7 + q(2) * 0.9) * prog;
    const dx = Math.cos(a), dy = Math.sin(a), px = -dy, py = dx;
    const w = 10 + q(3) * 12, r0 = R * 0.55;
    const bx = dx * r0, by = dy * r0;
    return { d: `M${(bx + px * w).toFixed(1)} ${(by + py * w).toFixed(1)} L${(bx + dx * L).toFixed(1)} ${(by + dy * L).toFixed(1)} L${(bx - px * w).toFixed(1)} ${(by - py * w).toFixed(1)} Z`, prog };
  }).filter((q) => q.prog > 0);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`${blob}Z`} fill={c} />
      {drops.map((d, i) => <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(1)} fill={c} />)}
      {streaks.map((q, i) => <path key={i} d={q.d} fill={c} />)}
    </g>
  );
}

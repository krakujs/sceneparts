import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Dust cloud: a low brown cloud kicked up along the ground at (x, y), with pebbles flying out and landing.
// Puffs spread sideways, rise a little and thin away. Pebbles follow closed-form parabolas.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "dust");
  const spread = Math.max(80, Number(p.width ?? 320));
  const n = Math.round(clamp(Number(p.count ?? 14), 6, 30));
  const grow = ease(clamp(lf / 18));
  const fade = 1 - clamp((lf - 28) / 50);
  const puffs = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const side = (q(0) - 0.5) * 2;
    const cx = side * spread * 0.5 * (0.5 + 0.6 * ease(clamp(lf / 40)));
    const r = (40 + q(1) * 50) * (0.35 + 0.65 * grow);
    const cy = -r * 0.35 - 0.6 * lf * q(2);
    return { cx, cy, r, c: q(3) < 0.5 ? "#B89B76" : "#DCC7A4" };
  });
  const G = 0.7;
  const pebbles = Array.from({ length: 8 }, (_, i) => {
    const q = (k: number) => random(`${sd}-p${i}-${k}`);
    const dir = (i % 2 ? 1 : -1) * (0.3 + q(0) * 0.7);
    const vx = dir * (5 + q(1) * 5);
    const vy = -(8 + q(2) * 6);
    const T = (-2 * vy) / G;
    const px = vx * lf;
    const py = vy * lf + 0.5 * G * lf * lf;
    const op = lf < T ? 1 : clamp(1 - (lf - T) / 20);
    return { px, py: Math.min(py, 0), op, r: 5 + q(3) * 6, rot: q(4) * 360 + lf * 6 * dir };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g opacity={fade}>
        {puffs.map((q, i) => <circle key={i} cx={q.cx.toFixed(1)} cy={q.cy.toFixed(1)} r={q.r.toFixed(1)} fill={q.c} />)}
      </g>
      {pebbles.map((q, i) => (
        <ellipse key={i} cx={q.px.toFixed(1)} cy={q.py.toFixed(1)} rx={q.r.toFixed(1)} ry={(q.r * 0.7).toFixed(1)}
          transform={`rotate(${q.rot.toFixed(1)} ${q.px.toFixed(1)} ${q.py.toFixed(1)})`}
          fill="#7A6446" stroke={u.ink} strokeWidth={3} opacity={q.op} />
      ))}
    </g>
  );
}

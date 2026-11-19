import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Water splash: a pale crown of water at (x, y), ripple rings spreading across the surface, and a burst of
// blue droplets flung up and out. Droplets follow closed-form gravity arcs and vanish when they land.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "splash");
  const water = "#4FB3E8";
  const pale = "#BFE6FA";
  const size = Math.max(60, Number(p.size ?? 260));
  const n = Math.round(clamp(Number(p.count ?? 18), 4, 40));
  const bl = ease(clamp(lf / 10));
  const blobFade = 1 - clamp((lf - 50) / 30);
  const G = 0.9;
  const rings = [0, 1].map((i) => {
    const t = clamp((lf - i * 8) / 40);
    return { rx: 40 + size * ease(t), op: lf - i * 8 > 0 ? 1 - t : 0, sw: 10 * (1 - t) + 3 };
  });
  const drops = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const ang = -Math.PI / 2 + (q(0) - 0.5) * Math.PI * 0.9;
    const v = 16 + q(1) * 12;
    const vx = Math.cos(ang) * v * 0.8, vy = Math.sin(ang) * v;
    const t = lf - 2;
    const T = (-2 * vy) / G;
    const dx = vx * Math.max(t, 0), dy = vy * Math.max(t, 0) + 0.5 * G * Math.max(t, 0) * Math.max(t, 0);
    const op = t < 0 ? 0 : t < T ? 1 : 0;
    return { dx, dy, op, r: 8 + q(2) * 8 };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {rings.map((r, i) => (
        <ellipse key={i} cx={0} cy={0} rx={r.rx.toFixed(1)} ry={(r.rx * 0.28).toFixed(1)} fill="none" stroke={water} strokeWidth={r.sw.toFixed(1)} opacity={r.op.toFixed(3)} />
      ))}
      <ellipse cx={0} cy={0} rx={(110 * bl).toFixed(1)} ry={(28 * bl).toFixed(1)} fill={pale} stroke={u.ink} strokeWidth={6} opacity={blobFade} />
      {drops.map((d, i) => (
        <g key={i} transform={`translate(${d.dx.toFixed(1)} ${d.dy.toFixed(1)})`} opacity={d.op}>
          <circle r={d.r.toFixed(1)} fill={water} stroke={u.ink} strokeWidth={4} />
          <circle cx={(-d.r * 0.35).toFixed(1)} cy={(-d.r * 0.35).toFixed(1)} r={(d.r * 0.25).toFixed(1)} fill="#FFFFFF" opacity={0.8} />
        </g>
      ))}
    </g>
  );
}

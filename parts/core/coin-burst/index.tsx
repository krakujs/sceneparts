import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Coin burst: gold coins shoot up out of (x, y) like a fountain. Each coin follows a closed-form gravity arc
// and spins by flipping on its scaleX axis. The coins fade out after about 100 frames.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "coins");
  const n = Math.round(clamp(Number(p.count ?? 18), 6, 40));
  const speed = Number(p.speed ?? 1);
  const G = 0.9;
  const fade = 1 - clamp((lf - 100) / 40);
  const coins = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const t = lf - q(2) * 4;
    if (t < 0) return null;
    const vx = (q(0) - 0.5) * 12;
    const vy = -(20 + q(1) * 12) * speed;
    const X = vx * t;
    const Y = vy * t + 0.5 * G * t * t;
    const flip = Math.cos(t * (0.22 + q(3) * 0.2) + q(4) * 6.28);
    return { X, Y, flip, r: 22 + q(5) * 6 };
  }).filter((c): c is { X: number; Y: number; flip: number; r: number } => c !== null);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={fade.toFixed(3)}>
      {coins.map((c, i) => (
        <g key={i} transform={`translate(${c.X.toFixed(1)} ${c.Y.toFixed(1)}) scale(${(Math.abs(c.flip) < 0.06 ? 0.06 : c.flip).toFixed(3)} 1)`}>
          <circle r={c.r} fill="#F5C542" stroke={u.ink} strokeWidth={6} />
          <circle r={c.r * 0.68} fill="none" stroke="#C8961E" strokeWidth={4} />
          <circle cx={(-c.r * 0.35).toFixed(1)} cy={(-c.r * 0.35).toFixed(1)} r={(c.r * 0.15).toFixed(1)} fill={u.white} opacity={0.7} />
        </g>
      ))}
    </g>
  );
}

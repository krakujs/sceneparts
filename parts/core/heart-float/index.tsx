import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Heart float: a live-stream reaction stream. Hearts rise from (x, y), sway, grow a little, fade out and loop.
// Each heart is born at a fixed interval (life / count), so the stream starts gently and then runs on.

const HEART = "M0 -0.42 C-0.55 -1.15 -1.6 -0.55 -1.1 0.32 C-0.75 0.85 -0.25 1.05 0 1.5 C0.25 1.05 0.75 0.85 1.1 0.32 C1.6 -0.55 0.55 -1.15 0 -0.42 Z";

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const N = Math.round(clamp(Number(p.count ?? 14), 1, 40));
  const life = Math.max(30, Number(p.life ?? 96));
  const gap = life / N;
  const spread = Number(p.spread ?? 70), rise = Number(p.rise ?? 4.2);
  const sd = String(p.seed ?? "heart");
  const cols = p.color ? [p.color] : ["#F27BA6", u.accent];
  const hearts: { hx: number; hy: number; size: number; op: number; c: string }[] = [];
  for (let j = 0; j < N; j++) {
    const born = lf - j * gap;
    if (born < 0) continue;
    const age = born % life;
    const q = (k: number) => random(`${sd}-${j}-${k}`);
    const size = (46 + q(0) * 26) * (0.85 + 0.35 * (age / life));
    const hx = (q(2) - 0.5) * spread + Math.sin(age * 0.09 + q(1) * 6.28) * (14 + q(3) * 16);
    const hy = -age * rise;
    const fadeIn = clamp(age / 8);
    const fadeOut = age < life * 0.5 ? 1 : clamp(1 - (age - life * 0.5) / (life * 0.5));
    hearts.push({ hx, hy, size, op: fadeIn * fadeOut, c: cols[j % cols.length] });
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {hearts.map((h, i) => (
        <path key={i} d={HEART} fill={h.c} opacity={h.op} transform={`translate(${h.hx.toFixed(1)} ${h.hy.toFixed(1)}) scale(${(h.size / 3.2).toFixed(3)})`} />
      ))}
    </g>
  );
}

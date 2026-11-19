import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn } from "../stat-card/index";

// Sparkles: 6-12 four-point twinkle stars scattered inside radius r around (x, y).
// Each star has its own size, phase and period, so they pulse out of step. Every star is a pure function of the frame.

const star = (R: number) => `M0 ${-R} Q0 0 ${R} 0 Q0 0 0 ${R} Q0 0 ${-R} 0 Q0 0 0 ${-R} Z`;

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const n = Math.round(clamp(Number(p.count ?? 9), 1, 12));
  const r = clamp(Number(p.r ?? 220), 20, 1000);
  const sd = String(p.seed ?? "sparkle");
  const stars = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const a = q(0) * Math.PI * 2, d = Math.sqrt(q(1)) * r;
    const R = 34 + q(2) * 46;
    const period = 40 + q(3) * 40;
    const tw = 0.5 + 0.5 * Math.sin((lf / period + q(4)) * Math.PI * 2);
    const sc = popIn(lf, i * 2, 10) * (0.25 + 0.75 * tw * tw);
    return {
      x: Math.cos(a) * d, y: Math.sin(a) * d, R, sc,
      rot: (q(5) - 0.5) * 20,
      c: i % 3 === 0 ? u.accent : u.series[2],
    };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {stars.map((q, i) => (
        <g key={i} transform={`translate(${q.x.toFixed(1)} ${q.y.toFixed(1)}) rotate(${q.rot.toFixed(1)}) scale(${q.sc.toFixed(3)})`}>
          <path d={star(q.R)} fill={q.c} />
          <path d={star(q.R * 0.36)} fill={u.white} />
        </g>
      ))}
    </g>
  );
}

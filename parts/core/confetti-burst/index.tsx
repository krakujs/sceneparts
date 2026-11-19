import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Confetti burst: 60-100 small rectangles and dots in the style's series colours, shot out of (x, y).
// Air drag slows them, gravity pulls them down and they tumble as they fall. Closed-form motion, so any frame renders alone.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const n = Math.round(clamp(Number(p.count ?? 80), 1, 160));
  const speed = Number(p.speed ?? 1), sd = String(p.seed ?? "confetti");
  const TAU = 22, G = 0.6; // drag time constant (frames) and gravity (px per frame squared)
  const decay = 1 - Math.exp(-lf / TAU);
  const fade = lf > 110 ? clamp(1 - (lf - 110) / 40) : 1;
  const pieces = Array.from({ length: n }, (_, i) => {
    const r = (k: number) => random(`${sd}-${i}-${k}`);
    const ang = -Math.PI / 2 + (r(0) - 0.5) * Math.PI; // fan out upwards, to both sides
    const v0 = (10 + r(1) * 16) * speed;
    const dx = Math.cos(ang) * v0 * TAU * decay;
    const dy = (Math.sin(ang) * v0 - G * TAU) * TAU * decay + G * TAU * lf;
    const rot = r(2) * 360 + (r(3) - 0.5) * 24 * lf;
    const flip = Math.cos(lf * (0.12 + r(4) * 0.2) + r(5) * 6.28);
    return {
      dx, dy, rot, flip,
      dot: r(6) < 0.35, w: 18 + r(7) * 12, h: 10 + r(8) * 8,
      c: u.series[i % u.series.length],
    };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {pieces.map((q, i) => (
        <g key={i} transform={`translate(${q.dx.toFixed(1)} ${q.dy.toFixed(1)}) rotate(${q.rot.toFixed(1)}) scale(1 ${q.flip.toFixed(3)})`} opacity={fade}>
          {q.dot ? <circle r={q.w * 0.4} fill={q.c} /> : <rect x={-q.w / 2} y={-q.h / 2} width={q.w} height={q.h} rx={1.5} fill={q.c} />}
        </g>
      ))}
    </g>
  );
}

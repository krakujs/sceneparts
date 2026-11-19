import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Sparkle trail: a bright four-point sparkle travels along a quadratic arc from (x1, y1) to (x2, y2),
// dropping a fading trail of small twinkles behind it. Each trail twinkle is a closed-form function of its age.

const star = (R: number) => `M0 ${-R} Q0 0 ${R} 0 Q0 0 0 ${R} Q0 0 ${-R} 0 Q0 0 0 ${-R} Z`;
const DUR = 30;
const TRAIL = 16;
const LIFE = 56;

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1;
  const x1 = Number(p.x1 ?? 200), y1 = Number(p.y1 ?? 1300), x2 = Number(p.x2 ?? 880), y2 = Number(p.y2 ?? 700);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "trail");
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const cx = mx, cy = my - 260;
  const pos = (t: number): [number, number] => {
    const k = 1 - t;
    return [k * k * x1 + 2 * k * t * cx + t * t * x2, k * k * y1 + 2 * k * t * cy + t * t * y2];
  };
  const trail = Array.from({ length: TRAIL }, (_, i) => {
    const sf = i * 2;
    const age = lf - sf;
    if (age < 0 || age > LIFE) return null;
    const [tx, ty] = pos(ease(clamp(sf / DUR)));
    const jx = (random(`${sd}-${i}-x`) - 0.5) * 30;
    const jy = (random(`${sd}-${i}-y`) - 0.5) * 30;
    const R = (10 + 22 * (1 - age / LIFE)) * (0.6 + 0.4 * (1 - i / TRAIL));
    return { x: tx + jx, y: ty + jy, R, op: 1 - age / LIFE };
  }).filter((q): q is { x: number; y: number; R: number; op: number } => q !== null);
  const [hx, hy] = pos(ease(clamp(lf / DUR)));
  const headOp = lf > DUR ? 1 - clamp((lf - DUR) / 20) : 1;
  const hs = 1 + 0.1 * Math.sin(lf * 0.6);
  const mxs = (x1 + x2) / 2, mys = (y1 + y2) / 2;
  return (
    <g transform={`translate(${mxs} ${mys}) scale(${s}) translate(${-mxs} ${-mys})`}>
      {trail.map((q, i) => (
        <g key={i} transform={`translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`} opacity={q.op.toFixed(3)}>
          <path d={star(q.R)} fill={u.series[2]} />
          <path d={star(q.R * 0.36)} fill={u.white} />
        </g>
      ))}
      <g transform={`translate(${hx.toFixed(1)} ${hy.toFixed(1)}) scale(${hs.toFixed(3)})`} opacity={headOp.toFixed(3)}>
        <circle r={50} fill={u.white} opacity={0.35} />
        <path d={star(64)} fill={u.accent} stroke={u.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d={star(24)} fill={u.white} />
      </g>
    </g>
  );
}

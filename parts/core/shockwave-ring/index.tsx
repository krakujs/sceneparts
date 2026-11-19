import React from "react";
import { clamp, ease, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Shockwave ring: one or more rings that expand from (x, y) with a fading, thinning stroke, for impacts.
// A short flash marks the moment of impact. Rings slow down as they spread, and the last one is still faintly visible at frame 60.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const n = Math.round(clamp(Number(p.count ?? 2), 1, 6));
  const R = Math.max(40, Number(p.r ?? 420));
  const len = Math.max(20, Number(p.len ?? 80));
  const gap = Math.max(0, Number(p.gap ?? 8));
  const c = p.color ?? u.accent;
  const flashLen = 12;
  const rings = Array.from({ length: n }, (_, i) => {
    const age = lf - i * gap;
    if (age < 0) return null;
    const prog = clamp(age / len);
    if (prog >= 1) return null;
    return {
      r: 10 + (R - 10) * ease(prog),
      sw: 4 + 24 * (1 - prog),
      op: Math.pow(1 - prog, 0.6),
    };
  }).filter((q): q is { r: number; sw: number; op: number } => q !== null);
  const flash = lf < flashLen ? 1 - lf / flashLen : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {flash > 0 ? <circle r={30 + lf * 5} fill={u.series[2]} opacity={flash * 0.9} /> : null}
      {rings.map((q, i) => (
        <circle key={i} r={q.r} fill="none" stroke={c} strokeWidth={q.sw} opacity={q.op} />
      ))}
    </g>
  );
}

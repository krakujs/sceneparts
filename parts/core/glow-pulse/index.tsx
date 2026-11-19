import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { startFrame, enter } from "../stat-card/index";

// Glow pulse: a soft radial glow behind something at (x, y), breathing in size and opacity.
// The gradient id is built from x, y and seed, so several glows can share a shot.

const uid = (v: unknown) => String(v).replace(/[^a-zA-Z0-9]/g, "_");

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const R = Math.max(10, Number(p.r ?? 380));
  const c = p.color ?? "#FFD36B";
  const period = Math.max(12, Number(p.period ?? 96));
  const beat = Math.sin((lf / period) * Math.PI * 2); // -1..1
  const size = 1 + 0.08 * beat;
  const op = clamp(enter(lf, 0, 14) * Number(p.strength ?? 0.9) * (0.8 + 0.2 * beat));
  const id = `glow-${uid(x)}-${uid(y)}-${uid(p.seed ?? "a")}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={c} stopOpacity={1} />
          <stop offset="0.35" stopColor={c} stopOpacity={0.55} />
          <stop offset="0.7" stopColor={c} stopOpacity={0.15} />
          <stop offset="1" stopColor={c} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle r={R * size} fill={`url(#${id})`} opacity={op} />
    </g>
  );
}

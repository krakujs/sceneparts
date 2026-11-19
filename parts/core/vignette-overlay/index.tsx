import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter } from "../stat-card/index";

// Vignette overlay: full-frame dark radial vignette, darkest at the corners. Optional slow breathe.
// Covers 0..1080 x 0..1920 and ignores x and y. The gradient id is built from the strength and seed, so instances don't collide.

const uid = (v: unknown) => String(v).replace(/[^a-zA-Z0-9]/g, "_");

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const k = clamp(Number(p.strength ?? 0.6), 0, 1);
  const pulse = p.breathe ? 1 + 0.08 * Math.sin((lf / 180) * Math.PI * 2) : 1;
  const op = clamp(k * pulse * enter(lf, 0, 12));
  const c = p.color ?? u.ink;
  const id = `vig-${uid(p.seed ?? "a")}-${Math.round(k * 100)}`;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="48%" r="72%">
          <stop offset="0.3" stopColor={c} stopOpacity={0} />
          <stop offset="1" stopColor={c} stopOpacity={1} />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill={`url(#${id})`} opacity={op} />
    </g>
  );
}

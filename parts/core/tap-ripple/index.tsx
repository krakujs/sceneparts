import React from "react";
import { ui, startFrame, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Touch ripples: each tap sends `rings` rings outward from the point, staggered, fading as they grow.
// A white fingertip dot sits on the point and presses down at the start of every tap. Loops forever.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const every = Math.max(8, p.every ?? 40);
  const rings = Math.max(1, Math.min(6, p.rings ?? 3));
  const x = p.x ?? 540, y = p.y ?? 960;
  const col = p.color ?? u.accent;
  const since = p.f - at;
  const cyc = ((since % every) + every) % every;
  const pressK = since < 0 ? 1 : 1 - 0.18 * Math.sin(Math.min(1, cyc / 6) * Math.PI);
  const rs = [];
  for (let k = 0; k < rings; k++) {
    const lt = (((since - k * (every / rings) * 0.6) % every) + every) % every;
    const q = lt / every;
    rs.push({ r: (24 + q * 220) * s, o: since < 0 ? 0 : (1 - q) * 0.9 });
  }
  return (
    <g>
      {rs.map((r, i) => (
        <circle key={i} cx={x} cy={y} r={r.r} fill="none" stroke={col} strokeWidth={8 * s} opacity={r.o} />
      ))}
      <g transform={`translate(${x} ${y}) scale(${s * pressK})`}>
        <circle cx={0} cy={0} r={26} fill={u.white} stroke={u.ink} strokeWidth={6} />
        <circle cx={0} cy={0} r={8} fill={col} />
      </g>
    </g>
  );
}

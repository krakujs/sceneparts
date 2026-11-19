import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Snow overlay: full-frame drifting snowflakes as soft white dots in three depth layers. Far flakes are small and slow,
// near flakes are big and fast. Each flake wraps top to bottom, so it loops. Covers the full frame, ignores x and y.

const uid = (v: unknown) => String(v).replace(/[^a-zA-Z0-9]/g, "_");
const LAYERS = [
  { n: 70, v: 1.1, rmin: 1.6, rmax: 3.0, op: 0.6, sway: 14 },
  { n: 45, v: 2.2, rmin: 2.8, rmax: 4.4, op: 0.75, sway: 22 },
  { n: 22, v: 3.6, rmin: 4.6, rmax: 7.5, op: 0.9, sway: 30 },
];

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "snow");
  const speed = Number(p.speed ?? 1), density = clamp(Number(p.density ?? 1), 0, 2);
  const H = 1920 + 60;
  const id = `snow-${uid(sd)}`;
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={1} />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity={0.75} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </radialGradient>
      </defs>
      {LAYERS.map((L, li) => (
        <g key={li} opacity={L.op}>
          {Array.from({ length: Math.round(L.n * density) }, (_, i) => {
            const q = (k: number) => random(`${sd}-${li}-${i}-${k}`);
            const cy = ((q(0) * H + lf * L.v * speed) % H) - 30;
            const drift = Math.sin(lf * 0.012 * (1 + li * 0.5) + q(2) * 6.28) * L.sway;
            const cx = ((((q(1) * 1080 + drift) % 1080) + 1080) % 1080);
            const r = (L.rmin + q(3) * (L.rmax - L.rmin)) * 2.4;
            return <circle key={i} cx={cx.toFixed(1)} cy={cy.toFixed(1)} r={r.toFixed(1)} fill={`url(#${id})`} />;
          })}
        </g>
      ))}
    </g>
  );
}

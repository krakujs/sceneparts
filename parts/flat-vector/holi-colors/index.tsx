import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Holi colour bursts: clusters of soft powder clouds in pink, yellow, green, blue and orange,
// thrown outward from the centre. Origin = centre of the burst.
const f1 = (v: number) => v.toFixed(1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const anim: string = p.anim ?? "none";
  const cols = [C.pink, C.yellow, C.green, C.blue, C.orange];
  // puff: 0 at frame 0 (compact) to 1 after 24 frames, then held
  const u = anim === "puff" ? easeOut(clamp01(f / 24)) : 1;
  const k = 0.45 + 0.55 * u;
  // each cloud: a direction, distance and size; the clouds are groups of overlapping circles
  const clouds = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 + 0.3;
    const d = 300 + (i % 3) * 60;
    return { cx: Math.cos(a) * d, cy: Math.sin(a) * d * 0.8, col: cols[i % cols.length], r: 90 + (i % 4) * 18 };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`} opacity={anim === "puff" ? f1(0.4 + 0.6 * u) : 1}>
      {clouds.map((c, i) => (
        <g key={i} transform={`translate(${f1(c.cx * k)} ${f1(c.cy * k)}) scale(${f1(k)})`}>
          <circle cx={0} cy={0} r={c.r} fill={c.col} opacity={0.85} />
          <circle cx={c.r * 0.6} cy={-c.r * 0.3} r={c.r * 0.7} fill={c.col} opacity={0.85} />
          <circle cx={-c.r * 0.55} cy={c.r * 0.35} r={c.r * 0.6} fill={c.col} opacity={0.85} />
          <circle cx={c.r * 0.2} cy={c.r * 0.5} r={c.r * 0.35} fill={C.white} opacity={0.25} />
        </g>
      ))}
      {/* a few powder specks flying out */}
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2 + 0.9;
        const d = (120 + (i % 5) * 45) * k;
        return <circle key={i} cx={f1(Math.cos(a) * d)} cy={f1(Math.sin(a) * d * 0.8)} r={9 + (i % 3) * 3} fill={cols[(i + 2) % cols.length]} />;
      })}
    </g>
  );
}

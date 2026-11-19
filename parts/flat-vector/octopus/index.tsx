import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector octopus. Centre (x, y), honours flip. About 360 px wide and tall at s = 1.
// Round orange-red head with friendly eyes; eight tapered arms curl from p.f, with pale suckers along each arm.

const SUCK = "#FFD9C2", CHEEK = "#FF9AA8";

// walk an arm from (x0, y0): heading a0 at each step plus a bend that depends on u (0 at the root, 1 at the tip)
const walk = (x0: number, y0: number, a0: number, steps: number, len: number, bend: (u: number) => number) => {
  const pts: [number, number][] = [[x0, y0]];
  let x = x0, y = y0;
  for (let k = 1; k <= steps; k++) {
    const a = a0 + bend(k / steps);
    x += Math.cos(a) * (len / steps);
    y += Math.sin(a) * (len / steps);
    pts.push([x, y]);
  }
  return pts;
};

// a tapered tube along the points, radius r0 at the root to r1 at the tip; dots = sucker positions on the inner side
const tube = (pts: [number, number][], r0: number, r1: number, every = 0) => {
  const n = pts.length, L: string[] = [], R: string[] = [], dots: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1;
    const nx = -dy / m, ny = dx / m, r = r0 + (r1 - r0) * (i / (n - 1));
    L.push(`${(pts[i][0] + nx * r).toFixed(1)} ${(pts[i][1] + ny * r).toFixed(1)}`);
    R.push(`${(pts[i][0] - nx * r).toFixed(1)} ${(pts[i][1] - ny * r).toFixed(1)}`);
    if (every && i > 0 && i < n - 1 && i % every === 0) dots.push([pts[i][0] - nx * r * 0.5, pts[i][1] - ny * r * 0.5, r * 0.4]);
  }
  return { d: `M ${L.join(" L ")} L ${R.reverse().join(" L ")} Z`, dots };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const col = p.color ?? "#FF6B3D", dark = shade(col, 0.22);
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1000;
  const swim = (p.pose ?? "swim") === "swim";
  const ph = f * (swim ? 0.08 : 0.04);
  const sway = swim ? 0.55 : 0.3;
  const bob = Math.sin(f * (swim ? 0.07 : 0.05)) * (swim ? 8 : 5);

  const arms = [-86, -62, -38, -14, 14, 38, 62, 86].map((b, i) => {
    const a0 = Math.PI / 2 - (b / 86) * 0.9, curl = (b >= 0 ? 1 : -1) * 1.5;
    const pts = walk(b, 30, a0, 12, 170, (u) => sway * Math.sin(ph - u * 5 + i * 0.7) * u + curl * u * u);
    return { i, ...tube(pts, 15, 3, 2) };
  });

  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s})`}>
      {arms.map((a) => (
        <g key={a.i}>
          <path d={a.d} fill={a.i % 2 ? dark : col} />
          {a.dots.map(([dx, dy, r], k) => <circle key={k} cx={dx.toFixed(1)} cy={dy.toFixed(1)} r={r.toFixed(1)} fill={SUCK} />)}
        </g>
      ))}
      <path d="M -112 40 C -118 -58 -70 -146 0 -146 C 70 -146 118 -58 112 40 C 80 56 -80 56 -112 40 Z" fill={col} />
      <ellipse cx={-44} cy={-100} rx={22} ry={12} transform="rotate(-20 -44 -100)" fill="#FFFFFF" opacity={0.22} />
      <circle cx={-70} cy={6} r={12} fill={CHEEK} opacity={0.55} />
      <circle cx={70} cy={6} r={12} fill={CHEEK} opacity={0.55} />
      {[-38, 38].map((ex) => (
        <g key={ex}>
          <circle cx={ex} cy={-22} r={24} fill={C.white} />
          <circle cx={ex + 4} cy={-18} r={12} fill={C.ink} />
          <circle cx={ex + 8} cy={-24} r={4} fill={C.white} />
        </g>
      ))}
    </g>
  );
}

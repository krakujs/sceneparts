import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Friendly monster: tall furry two-legged monster, orange with purple spots, three eyes and small horns, waving.
// Feet at (0,0); about 900 px tall at s = 1. anim: wave (right arm waves) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const ring = (cx: number, cy: number, rx: number, ry: number, ph: number): [number, number][] => {
  const n = 40, pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 1 + 0.03 * Math.cos(18 * t + ph);
    pts.push([cx + rx * r * Math.cos(t), cy + ry * r * Math.sin(t)]);
  }
  return pts;
};
const smooth = (pts: [number, number][]) => {
  const n = pts.length;
  const mid = (i: number): [number, number] => {
    const a = pts[i % n], b = pts[(i + 1) % n];
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  };
  const m0 = mid(n - 1);
  let d = `M ${m0[0].toFixed(1)} ${m0[1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const m = mid(i);
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return d + " Z";
};
const SPOTS: [number, number, number][] = [[-120, -640, 34], [100, -700, 26], [-60, -420, 40], [140, -500, 30], [-150, -330, 24], [40, -800, 22]];

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const orange: string = p.color && p.color !== "none" ? p.color : "#FF8A3D";
  const dark = shade(orange, 0.2);
  const purple = C.purple;
  const anim: string = p.anim ?? "wave";
  const wave = anim === "wave" ? Math.sin(f * 0.25) : 0;
  const hx = 330 + wave * 18, hy = -730 + Math.abs(wave) * -10;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={240} ry={22} fill={C.shadow} />
      <rect x={-150} y={-200} width={100} height={170} rx={40} fill={dark} />
      <rect x={50} y={-200} width={100} height={170} rx={40} fill={orange} />
      <ellipse cx={-100} cy={-20} rx={62} ry={26} fill={purple} />
      <ellipse cx={100} cy={-20} rx={62} ry={26} fill={purple} />
      <path d="M -230 -560 Q -290 -460 -300 -380" stroke={dark} strokeWidth={60} strokeLinecap="round" fill="none" />
      <circle cx={-305} cy={-362} r={38} fill={dark} />
      <path d={smooth(ring(0, -500, 230, 330, f * 0.04))} fill={orange} />
      {SPOTS.map(([sx, sy, r], i) => <circle key={i} cx={sx} cy={sy} r={r} fill={purple} />)}
      <path d="M -130 -860 L -150 -940 L -80 -870 Z" fill="#5E3B26" />
      <path d="M 130 -860 L 150 -940 L 80 -870 Z" fill="#5E3B26" />
      <path d={`M 220 -560 Q ${300 + wave * 10} -620 ${hx} ${hy + 40}`} stroke={orange} strokeWidth={60} strokeLinecap="round" fill="none" />
      <circle cx={hx} cy={hy} r={42} fill={orange} />
      <circle cx={hx - 18} cy={hy - 40} r={12} fill={orange} />
      <circle cx={hx + 6} cy={hy - 50} r={12} fill={orange} />
      <circle cx={hx + 28} cy={hy - 40} r={12} fill={orange} />
      <circle cx={-90} cy={-700} r={34} fill="#FFFFFF" />
      <circle cx={0} cy={-720} r={34} fill="#FFFFFF" />
      <circle cx={90} cy={-700} r={34} fill="#FFFFFF" />
      <circle cx={-84} cy={-696} r={16} fill={C.ink} />
      <circle cx={6} cy={-716} r={16} fill={C.ink} />
      <circle cx={96} cy={-696} r={16} fill={C.ink} />
      <path d="M -100 -600 Q 0 -520 100 -600 Q 0 -570 -100 -600 Z" fill={C.ink} />
      <ellipse cx={0} cy={-575} rx={40} ry={14} fill={C.pink} />
    </g>
  );
}

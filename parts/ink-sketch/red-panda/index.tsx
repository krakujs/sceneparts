import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Red panda (preset of ink-sketch/quadruped): russet coat, white muzzle and ear edges, dark legs, bushy tail with dark rings (over).
const LOOK = {"len": 240, "girth": 120, "leg": 80, "legW": 26, "neck": 22, "neckAngle": 50, "head": 54, "snout": 34, "snoutH": 34, "color": "#B9612F", "legColor": "#3A2A24", "muzzle": "#FFFFFF", "ear": "round", "earSize": 1.2, "innerEar": "#FFFFFF", "tail": "bushy", "tailLen": 230, "tailAngle": 15, "tailColor": "#B9612F", "tailTip": "#3A2A24", "nose": "#1F2433", "mouth": "smile", "eye": 1.1};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => ((() => {
  const tl = 230, pz = p.pose ?? 'stand';
  const wag = (pz === 'idle' || pz === 'walk' || pz === 'run' ? Math.sin((p.f ?? 0) / (pz === 'run' ? 3 : 5)) : 0) * 10;
  const ta = (15 + wag) * Math.PI / 180, ca = Math.cos(ta), sa = Math.sin(ta);
  const td = h.tilt * Math.PI / 180, px = -h.len * 0.42;
  const T = (x: number, y: number) => { const dx = x - px, dy = y; return [px + dx * Math.cos(td) - dy * Math.sin(td), dy * Math.cos(td) + dx * Math.sin(td)]; };
  const A = T(-h.len * 0.5, h.by - h.girth * 0.175);
  const E = [A[0] - ca * tl, A[1] - sa * tl];
  const C1 = [A[0] - ca * tl * 0.55 + sa * tl * 0.25, A[1] - sa * tl * 0.55 - ca * tl * 0.25 + tl * 0.2];
  const W = tl * 0.36;
  const bez = (t: number) => [(1 - t) * (1 - t) * A[0] + 2 * (1 - t) * t * C1[0] + t * t * E[0], (1 - t) * (1 - t) * A[1] + 2 * (1 - t) * t * C1[1] + t * t * E[1]];
  const dd = (t: number) => [2 * (1 - t) * (C1[0] - A[0]) + 2 * t * (E[0] - C1[0]), 2 * (1 - t) * (C1[1] - A[1]) + 2 * t * (E[1] - C1[1])];
  return (
    <g stroke='#3A2A24' strokeWidth={W * 0.13} fill='none'>
      {[0.62, 0.74, 0.86].map((t) => {
        const P = bez(t), D = dd(t), m = Math.hypot(D[0], D[1]) || 1;
        const nx = -D[1] / m, ny = D[0] / m, w = (W / 2) * (1 - 0.7 * (t - 0.55) / 0.45) * 0.97;
        return <line key={t} x1={P[0] - nx * w} y1={P[1] - ny * w} x2={P[0] + nx * w} y2={P[1] + ny * w} />;
      })}
    </g>
  );
})())} />;
}

import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter } from "../stat-card/index";

// Hand-drawn pen ellipse around (x,y): draws itself in one loop, overshoots the start a little, then a faint second pass.
// rx, ry = radii. Default colour is the red pen (u.bad).
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const col = p.color || base.bad;
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const cx = p.x ?? 540, cy = p.y ?? 960;
  const rx = p.rx ?? 220, ry = p.ry ?? 130;
  const loop = (seed: string, grow: number) => {
    const N = 150;
    const pts: V[] = [];
    for (let i = 0; i <= N; i++) {
      const a = ((-100 + (390 * i) / N) * Math.PI) / 180;
      const k = (1 + 0.025 * Math.sin(3 * a + 1) + 0.012 * (random(seed + i) * 2 - 1)) * grow;
      pts.push([cx + rx * k * Math.cos(a), cy + ry * k * Math.sin(a)]);
    }
    let L = 0;
    for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return { d: `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}`, L };
  };
  const main = loop("hc", 1);
  const ghost = loop("hd", 1.03);
  const k1 = enter(p.f, at, 24);
  const k2 = enter(p.f, at + 5, 24);
  return (
    <g transform={`translate(0 0) scale(${s})`}>
      <path d={ghost.d} fill="none" stroke={col} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" opacity={0.5}
        strokeDasharray={`${ghost.L} ${ghost.L * 2}`} strokeDashoffset={ghost.L * (1 - k2)} />
      <path d={main.d} fill="none" stroke={col} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={`${main.L} ${main.L * 2}`} strokeDashoffset={main.L * (1 - k1)} />
    </g>
  );
}

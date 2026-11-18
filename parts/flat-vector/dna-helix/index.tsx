import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Vertical double helix of two coloured strands joined by rungs. Centred on x, y. About 400 px wide, 900 px tall at s = 1.
// Strands are drawn as a travelling wave; anim "spin" shifts their phase so the helix looks like it turns.
// Parts of each strand that pass behind the rungs are drawn in a darker shade for depth.
const f1 = (v: number) => v.toFixed(1);
const H = 880, R = 170, K = (2 * Math.PI) / 280, STEP = 6, RUNG_EVERY = 8;

type P = { x: number; y: number; z: number };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const c1 = p.color && p.color !== "none" ? p.color : C.teal;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const phi = anim === "spin" ? (f * 2 * Math.PI) / 150 : 0;
  const n = Math.round(H / STEP);
  const a: P[] = [], b: P[] = [];
  for (let i = 0; i <= n; i++) {
    const yy = -H / 2 + i * STEP;
    const th = yy * K + phi;
    a.push({ x: R * Math.sin(th), y: yy, z: Math.cos(th) });
    b.push({ x: -R * Math.sin(th), y: yy, z: -Math.cos(th) });
  }
  // Split each strand into back and front segments by depth.
  const seg = (pts: P[], front: boolean) => {
    let d = "";
    for (let i = 0; i < n; i++) {
      const q = pts[i], r = pts[i + 1];
      if ((q.z + r.z > 0) === front) d += `M ${f1(q.x)} ${f1(q.y)} L ${f1(r.x)} ${f1(r.y)} `;
    }
    return d;
  };
  const rungs: React.ReactNode[] = [];
  for (let i = 0; i <= n; i += RUNG_EVERY) {
    rungs.push(<line key={i} x1={f1(a[i].x)} y1={f1(a[i].y)} x2={f1(b[i].x)} y2={f1(b[i].y)} stroke={C.white} strokeWidth={9} strokeLinecap="round" />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <path d={seg(a, false)} stroke={shade(c1, 0.35)} strokeWidth={22} strokeLinecap="round" fill="none" />
      <path d={seg(b, false)} stroke={shade(c2, 0.35)} strokeWidth={22} strokeLinecap="round" fill="none" />
      {rungs}
      <path d={seg(a, true)} stroke={c1} strokeWidth={22} strokeLinecap="round" fill="none" />
      <path d={seg(b, true)} stroke={c2} strokeWidth={22} strokeLinecap="round" fill="none" />
    </g>
  );
}

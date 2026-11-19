import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter } from "../stat-card/index";

// Marker-style wavy underline of width w that draws itself left to right. x,y = left end of the line.
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const x0 = p.x ?? 240, y0 = p.y ?? 1000, w = p.w ?? 600;
  const N = 120;
  const pts: V[] = [];
  for (let i = 0; i <= N; i++) {
    const X = x0 + (w * i) / N;
    const Y = y0 + 9 * Math.sin((2 * Math.PI * (X - x0)) / 80) + (random(`us${i}`) - 0.5) * 3;
    pts.push([X, Y]);
  }
  let L = 0;
  for (let i = 1; i <= N; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const k = enter(p.f, at, 30);
  const d = `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}`;
  return (
    <g transform={`translate(0 0) scale(${s})`}>
      <path d={d} fill="none" stroke={u.accent} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={`${L} ${L * 2}`} strokeDashoffset={L * (1 - k)} />
    </g>
  );
}

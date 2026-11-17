import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector manta ray, seen from below with the wings spread. Centre (x, y), honours flip. About 630 px wide at s = 1.
// Dark-blue wings with a pale belly hint and two cephalic horns at the front. The wings flap slowly from p.f.

const TOP = "#1E2A4A", DARK = shade(TOP, 0.35), BELLY = "#E4EEF7";

// closed Catmull-Rom spline through the points, as a cubic Bezier path
const smooth = (pts: [number, number][]) => {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + " Z";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1000;
  const swim = (p.pose ?? "swim") === "swim";
  // slow flap: wing tips rise and fall together, more at the tips than at the body
  const flap = Math.sin(f * (swim ? 0.07 : 0.035)) * (swim ? 26 : 10);
  const bob = Math.sin(f * 0.05) * 8;
  const tilt = Math.sin(f * 0.035) * 2;

  const wingPts: [number, number][] = [[0, -140], [60, -134], [130, -106], [210, -70], [280, -30], [314, 8], [272, 62], [200, 104], [120, 146], [48, 172], [0, 178]];
  const wing = wingPts.map(([a, b]) => [a, b + flap * Math.pow(a / 314, 1.6)] as [number, number]);
  const belly = [[0, -30], [52, -24], [96, 14], [70, 84], [30, 118], [0, 122]].map(([a, b]) => [a, b + flap * Math.pow(a / 314, 1.6) * 0.3] as [number, number]);
  const horn = "M 18 -138 Q 40 -176 62 -186 Q 50 -160 74 -134 Z";

  const both = (d: string, fill: string, extra?: React.SVGProps<SVGPathElement>) => (
    <g>
      <path d={d} fill={fill} {...extra} />
      <path d={d} fill={fill} transform="scale(-1 1)" {...extra} />
    </g>
  );

  return (
    <g transform={`translate(${x} ${y + bob}) rotate(${tilt}) scale(${p.flip ? -s : s} ${s})`}>
      {both(smooth(wing), TOP)}
      {both(smooth(wing.map(([a, b]) => [a * 0.82, b * 0.82 + 14] as [number, number])), DARK, { opacity: 0.35 })}
      {both(smooth(belly), BELLY, { opacity: 0.9 })}
      {both(horn, DARK)}
      <path d="M -26 -112 Q 0 -126 26 -112 Q 0 -104 -26 -112 Z" fill={DARK} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector stingray, seen from slightly above. Centre (x, y), faces right, honours flip. About 380 px wide at s = 1.
// Diamond disc with wing edges that ripple from p.f and a long thin tail that sways. swim glides, idle hovers.

const BODY = "#8C7F74", DARK = shade(BODY, 0.22), EYE = C.ink;

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
  const ph = f * (swim ? 0.12 : 0.05);
  const amp = swim ? 0.12 : 0.05;
  const bob = swim ? Math.sin(f * 0.08) * 10 : Math.sin(f * 0.05) * 6;
  const tilt = swim ? Math.sin(ph * 0.5) * 3 : 0;
  const sway = swim ? Math.sin(ph * 1.6) * 18 : Math.sin(f * 0.05) * 6;

  // wing edges scale outwards and inwards in a wave running along the wing
  const ripple = (x0: number, y0: number): [number, number] => {
    const w = Math.min(1, Math.max(0, (60 - x0) / 180));
    return [x0, y0 * (1 + amp * Math.sin(ph - x0 * 0.04) * w)];
  };
  const half: [number, number][] = [[128, 0], [108, -42], [62, -92], [0, -120], [-54, -126], [-100, -100], [-122, -44], [-126, 0]];
  const upper = half.map(([a, b]) => ripple(a, b));
  const lower = [...half].reverse().slice(1, -1).map(([a, b]) => ripple(a, -b));
  const disc = [...upper, ...lower];
  const inner = disc.map(([a, b]) => [a * 0.7 + 10, b * 0.6] as [number, number]);

  return (
    <g transform={`translate(${x} ${y + bob}) rotate(${tilt}) scale(${p.flip ? -s : s} ${s})`}>
      <path d={`M -116 0 C -170 ${sway * 0.3} -210 ${sway * 0.9} -252 ${sway * 1.5}`} fill="none" stroke={DARK} strokeWidth={9} strokeLinecap="round" />
      <path d={smooth(disc)} fill={BODY} />
      <path d={smooth(inner)} fill={DARK} opacity={0.35} />
      {[-30, 30].map((ey) => (
        <g key={ey}>
          <circle cx={96} cy={ey} r={8} fill={EYE} />
          <circle cx={98} cy={ey - 3} r={2.5} fill={C.white} />
        </g>
      ))}
    </g>
  );
}

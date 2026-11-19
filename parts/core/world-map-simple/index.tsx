import React from "react";
import { type PartProps } from "@sceneparts/core";

import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Simplified world map: blobby hand-made continents (roughly placed, not traced) on a rounded ocean card.
// dots = [{x:0..1, y:0..1, label}] pop in as highlighted places. x,y = centre of the card.
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];
// Continents as loops in a 0..100 (x) by 0..76 (y) box. Rough shapes, not a traced map.
const LAND: number[][][] = [
  [[8, 14], [16, 9], [26, 11], [31, 20], [28, 28], [31, 35], [25, 43], [20, 40], [15, 33], [8, 27], [5, 20]],
  [[30, 46], [38, 44], [41, 52], [38, 62], [33, 72], [29, 66], [28, 56]],
  [[46, 16], [53, 12], [59, 15], [56, 21], [51, 25], [45, 23]],
  [[48, 28], [57, 26], [63, 31], [61, 42], [55, 52], [49, 47], [45, 38]],
  [[61, 12], [75, 7], [89, 11], [93, 21], [87, 30], [78, 34], [70, 30], [62, 26], [60, 19]],
  [[80, 50], [90, 48], [95, 54], [89, 61], [81, 59]],
];

// Closed smooth curve through the points (Catmull-Rom to cubic Bezier).
const smooth = (P: V[]) => {
  const n = P.length;
  let d = `M${P[0][0]} ${P[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  return d + " Z";
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const MW = 900, MH = 500;
  const mapXY = (X: number, Y: number): V => [-MW / 2 + (X / 100) * MW, -MH / 2 + (Y / 76) * MH];
  const dots = (Array.isArray(p.dots) ? p.dots : []) as { x: number; y: number; label?: string }[];
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      <Card x={-480} y={-280} w={960} h={560} r={44} u={u} />
      <rect x={-MW / 2} y={-MH / 2} width={MW} height={MH} rx={24} fill={u.series[1]} opacity={0.2} />
      {LAND.map((pts, i) => {
        const P = pts.map(([X, Y]) => mapXY(X, Y));
        const cxm = P.reduce((a, q) => a + q[0], 0) / P.length;
        const cym = P.reduce((a, q) => a + q[1], 0) / P.length;
        const e = enter(p.f, at + i * 3, 14);
        return (
          <path key={i} d={smooth(P)} fill={u.white} stroke={u.ink} strokeWidth={4} strokeLinejoin="round" opacity={e}
            transform={`translate(${cxm} ${cym}) scale(${0.85 + 0.15 * e}) translate(${-cxm} ${-cym})`} />
        );
      })}
      {dots.map((d, i) => {
        const [dx, dy] = mapXY(d.x * 100, d.y * 76);
        const t0 = at + 18 + i * 8;
        const k = popIn(p.f, t0, 10);
        const ring = (((p.f - t0) % 40) + 40) % 40 / 40;
        return (
          <g key={i}>
            {p.f > t0 ? <circle cx={dx} cy={dy} r={18 + ring * 26} fill="none" stroke={u.accent} strokeWidth={4} opacity={(1 - ring) * 0.7} /> : null}
            <circle cx={dx} cy={dy} r={16 * k} fill={u.accent} stroke={u.ink} strokeWidth={5} />
            {d.label ? <Txt x={dx} y={dy - 32} u={u} size={34} weight={800} stroke={u.card} sw={8} maxW={320}>{d.label}</Txt> : null}
          </g>
        );
      })}
    </g>
  );
}

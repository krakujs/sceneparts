import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Teleport ring: a standing metal gate built as a hexagon frame with hexagonal bolt plates. Inside, the energy surface
// is tiled with hexagons that shimmer, and rings ripple outward from the centre. Effect: origin = centre of the gate;
// about 680 px across at s = 1.
const METAL = "#7D879C", METAL_D = "#3A4157", METAL_L = "#C9D2DF";

type Pt = [number, number];
const hexPts = (cx: number, cy: number, R: number): Pt[] =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (k * Math.PI) / 3;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
const polyD = (pts: Pt[]) => "M " + pts.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(" L ") + " Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 960, s = 1, f = 0, flip, color = "#4FD8F0", anim = "ripple" } = p as any;
  const on = anim === "ripple";
  const RO = 340, RI = 270;
  const outer = hexPts(0, 0, RO), inner = hexPts(0, 0, RI);
  // Hexagon tiles inside the gate (flat-top lattice), kept inside the inner hexagon.
  const H = 36, sq = Math.sqrt(3);
  const tiles: Pt[][] = [];
  for (let c = -8; c <= 8; c++) {
    for (let r = -8; r <= 8; r++) {
      const cx = c * 1.5 * H;
      const cy = r * H * sq + (Math.abs(c) % 2 === 1 ? (H * sq) / 2 : 0);
      if (Math.hypot(cx, cy) < RI - 30) tiles.push(hexPts(cx, cy, H - 4));
    }
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <defs>
        <radialGradient id="teleport-ring-energy" cx="0" cy="0" r="1">
          <stop offset="0" stopColor={color} stopOpacity={0.5} />
          <stop offset="1" stopColor={color} stopOpacity={0.15} />
        </radialGradient>
        <clipPath id="teleport-ring-clip">
          <path d={polyD(inner)} />
        </clipPath>
      </defs>
      {/* energy surface */}
      <path d={polyD(inner)} fill="url(#teleport-ring-energy)" />
      <g clipPath="url(#teleport-ring-clip)">
        {tiles.map((t, i) => {
          const wave = 0.5 + 0.5 * Math.sin((on ? f / 9 : 0) + i * 0.8);
          return <path key={i} d={polyD(t)} fill={color} fillOpacity={0.06 + 0.14 * wave} stroke={color} strokeOpacity={0.55} strokeWidth={2.5} />;
        })}
        {on && [0, 1, 2].map((k) => {
          const rr = (f * 3 + k * 95) % 290;
          return <circle key={k} cx={0} cy={0} r={rr} fill="none" stroke={C.white} strokeWidth={10} opacity={(1 - rr / 290) * 0.7} />;
        })}
      </g>
      {/* hexagon frame: outer and inner edges, seams and bevel */}
      <path d={`${polyD(outer)} ${polyD(inner)}`} fillRule="evenodd" fill={METAL} />
      <path d={polyD(inner)} fill="none" stroke={METAL_L} strokeWidth={8} />
      {outer.map((q, k) => (
        <line key={k} x1={inner[k][0]} y1={inner[k][1]} x2={q[0]} y2={q[1]} stroke={METAL_D} strokeWidth={8} strokeLinecap="round" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const a = (k * Math.PI) / 3 + Math.PI / 6;
        const r = (RO + RI) / 2;
        return (
          <g key={k}>
            <circle cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={12} fill={C.yellow} />
            <circle cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={5} fill={METAL_D} />
          </g>
        );
      })}
    </g>
  );
}

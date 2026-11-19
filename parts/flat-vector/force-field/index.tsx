import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Force field: a translucent dome bubble made of hexagon tiles, with a shimmer sweep across the surface and rings
// that ripple outward. Effect: origin = centre of the dome; about 840 x 760 px at s = 1.
type Pt = [number, number];
const RX = 420, RY = 380, H = 42, SQ = Math.sqrt(3);
const hexD = (cx: number, cy: number, R: number) => {
  const pts: Pt[] = Array.from({ length: 6 }, (_, k) => {
    const a = (k * Math.PI) / 3;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
  return "M " + pts.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(" L ") + " Z";
};
// Flat-top hexagon lattice, built once: keep tiles whose centre is inside the dome.
const LATTICE: string[] = [];
for (let c = -12; c <= 12; c++) {
  for (let r = -12; r <= 12; r++) {
    const cx = c * 1.5 * H;
    const cy = r * H * SQ + (Math.abs(c) % 2 === 1 ? (H * SQ) / 2 : 0);
    if ((cx / RX) ** 2 + (cy / RY) ** 2 < 0.85) LATTICE.push(hexD(cx, cy, H - 3));
  }
}
const LATTICE_D = LATTICE.join(" ");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 960, s = 1, f = 0, flip, color = "#6FE3FF", anim = "shimmer" } = p as any;
  const on = anim === "shimmer";
  const hexOp = on ? 0.45 + 0.2 * Math.sin(f / 12) : 0.5;
  // Shimmer: a bright arc sweeps slowly around the upper-left of the dome.
  const sweep = on ? f * 0.04 : -1.2;
  const arc: Pt[] = [];
  for (let i = 0; i <= 24; i++) {
    const th = sweep + (i / 24) * 0.9;
    arc.push([RX * 0.9 * Math.cos(th), RY * 0.9 * Math.sin(th)]);
  }
  const arcD = "M " + arc.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(" L ");
  const ripples = on ? [0, 1].map((k) => {
    const kk = ((f + k * 45) % 90) / 90;
    return <ellipse key={k} cx={0} cy={0} rx={RX * kk} ry={RY * kk} fill="none" stroke={color} strokeWidth={6} opacity={(1 - kk) * 0.55} />;
  }) : null;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <defs>
        <radialGradient id="force-field-dome" cx="0" cy="0" r="1">
          <stop offset="0" stopColor={color} stopOpacity={0.02} />
          <stop offset="0.7" stopColor={color} stopOpacity={0.08} />
          <stop offset="1" stopColor={color} stopOpacity={0.32} />
        </radialGradient>
      </defs>
      <ellipse cx={0} cy={0} rx={RX} ry={RY} fill="url(#force-field-dome)" />
      <path d={LATTICE_D} fill="none" stroke={color} strokeOpacity={hexOp} strokeWidth={3} strokeLinejoin="round" />
      {ripples}
      <path d={arcD} fill="none" stroke={C.white} strokeWidth={16} strokeLinecap="round" opacity={0.3} />
      <path d={arcD} fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
      <ellipse cx={0} cy={0} rx={RX} ry={RY} fill="none" stroke={color} strokeWidth={10} opacity={0.85} />
      <ellipse cx={0} cy={0} rx={RX - 16} ry={RY - 16} fill="none" stroke={C.white} strokeWidth={4} opacity={0.35} />
    </g>
  );
}

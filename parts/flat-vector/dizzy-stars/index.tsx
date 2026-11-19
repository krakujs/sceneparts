import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector dizzy stars: a ring of five small yellow stars with white die-cut edges, shadow and one darker
// shade, orbiting in a tilted ring around a head. Motion only from p.f. Centre (x, y), about 490 px wide at s = 1.

const starPts = (R: number, r: number, n = 5): [number, number][] => {
  const o: [number, number][] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / n, rr = i % 2 ? r : R;
    o.push([Math.cos(a) * rr, Math.sin(a) * rr]);
  }
  return o;
};
const rounded = (pts: [number, number][], t: number) => {
  const n = pts.length;
  let d = "";
  pts.forEach((P, i) => {
    const A = pts[(i + n - 1) % n], B = pts[(i + 1) % n];
    const a = [P[0] + (A[0] - P[0]) * t, P[1] + (A[1] - P[1]) * t];
    const b = [P[0] + (B[0] - P[0]) * t, P[1] + (B[1] - P[1]) * t];
    d += `${i ? "L" : "M"} ${a[0].toFixed(1)} ${a[1].toFixed(1)} Q ${P[0].toFixed(1)} ${P[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)} `;
  });
  return d + "Z";
};
const STAR = rounded(starPts(52, 25), 0.2);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.yellow;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "orbit";
  const phase = anim === "none" ? 0 : f * 0.06;
  const spin = anim === "spin" ? f * 4 : 0;
  const pts = [0, 1, 2, 3, 4].map((i) => {
    const th = (i * 2 * Math.PI) / 5 + phase;
    const depth = (Math.sin(th) + 1) / 2;
    return { px: Math.cos(th) * 190, py: -40 + Math.sin(th) * 70, sc: 0.8 + 0.25 * depth, depth, key: i };
  });
  pts.sort((a, b) => a.depth - b.depth);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      {pts.map((q) => (
        <g key={q.key} transform={`translate(${q.px} ${q.py}) rotate(${spin}) scale(${q.sc})`}>
          <path d={STAR} transform="translate(0 14)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
          <path d={STAR} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
          <path d={STAR} transform="translate(0 10)" fill={shade(col, 0.18)} />
          <path d={STAR} fill={col} />
        </g>
      ))}
    </g>
  );
}

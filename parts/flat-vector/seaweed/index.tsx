import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Seaweed: a cluster of wavy brown-green fronds growing from a grey rock. Origin = centre of the rock's base.
// About 500 px wide and 560 px tall at s = 1. anim sway rocks the fronds gently in the current.
const f1 = (v: number) => v.toFixed(1);
const WEED = "#6B7A3A", WEED_LT = "#8C9A4E", ROCK = "#8A93A6", ROCK_LT = "#A9B2C2";
// [x on rock top, lean, height]
const FRONDS: [number, number, number][] = [[-120, 60, 420], [-40, -50, 520], [40, 45, 480], [125, -40, 360]];
const TOP = -150;

type Pt = [number, number];
const bez = (t: number, P: Pt[]) => {
  const [a, b, c, d] = P, u = 1 - t;
  const x = u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0];
  const y = u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1];
  const dx = 3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]);
  const dy = 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1]);
  return { x, y, a: (Math.atan2(dy, dx) * 180) / Math.PI };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const weed = p.color && p.color !== "none" ? p.color : WEED;
  const rock = p.color2 && p.color2 !== "none" ? p.color2 : ROCK;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={260} ry={16} fill={C.shadow} />
      <path d="M -230 0 C -250 -90 -170 -160 -60 -160 L 80 -160 C 170 -160 235 -90 215 0 Z" fill={rock} />
      <ellipse cx={-30} cy={-130} rx={110} ry={22} fill={ROCK_LT} opacity={0.8} />
      {FRONDS.map(([fx, lean, h], i) => {
        const P: Pt[] = [[fx, TOP], [fx + lean, TOP - h * 0.35], [fx - lean, TOP - h * 0.7], [fx + lean * 0.4, TOP - h]];
        const d = `M ${f1(P[0][0])} ${P[0][1]} C ${f1(P[1][0])} ${f1(P[1][1])} ${f1(P[2][0])} ${f1(P[2][1])} ${f1(P[3][0])} ${f1(P[3][1])}`;
        const a = anim === "sway" ? 4 * Math.sin((f * 2 * Math.PI) / 90 + i * 0.9) : 0;
        const leaves = [0.25, 0.45, 0.65, 0.85].map((t, j) => {
          const q = bez(t, P);
          const side = j % 2 ? 1 : -1;
          return (
            <g key={j} transform={`translate(${f1(q.x)} ${f1(q.y)}) rotate(${f1(q.a + side * 50)})`}>
              <ellipse cx={side * 34} cy={0} rx={38} ry={12} fill={shade(weed, 0.1)} />
            </g>
          );
        });
        return (
          <g key={i} transform={`rotate(${f1(a)} ${fx} ${TOP})`}>
            <path d={d} stroke={weed} strokeWidth={24} strokeLinecap="round" fill="none" />
            <path d={d} stroke={WEED_LT} strokeWidth={6} strokeLinecap="round" fill="none" />
            {leaves}
          </g>
        );
      })}
    </g>
  );
}

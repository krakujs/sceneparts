import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Kelp forest stalks: tall green-brown stalks with leaf blades and round air floats, rising from the seabed.
// Origin = centre of the seabed line. About 900 px wide and 1200 px tall at s = 1. anim sway bends the stalks in the current.
const f1 = (v: number) => v.toFixed(1);
const KELP = "#5C7A3E", LEAF = "#6E9447", FLOAT = "#C9A23A";
// [x, lean, height]
const STALKS: [number, number, number][] = [[-330, 40, 980], [-170, -36, 1150], [-10, 30, 1200], [150, -40, 1060], [300, 26, 900]];

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
  const kelp = p.color && p.color !== "none" ? p.color : KELP;
  const leafC = p.color2 && p.color2 !== "none" ? p.color2 : LEAF;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={460} ry={16} fill={C.shadow} />
      <path d="M -520 0 L -520 -30 C -300 -60 300 -60 520 -30 L 520 0 Z" fill="#E8CE95" />
      {STALKS.map(([sx, lean, h], i) => {
        const P: Pt[] = [[sx, 0], [sx + lean, -h * 0.35], [sx - lean, -h * 0.7], [sx + lean * 0.5, -h]];
        const d = `M ${f1(P[0][0])} 0 C ${f1(P[1][0])} ${f1(P[1][1])} ${f1(P[2][0])} ${f1(P[2][1])} ${f1(P[3][0])} ${f1(P[3][1])}`;
        const a = anim === "sway" ? 3.5 * Math.sin((f * 2 * Math.PI) / 110 + i * 0.8) : 0;
        const blades = [0.14, 0.24, 0.34, 0.44, 0.54, 0.64, 0.74, 0.84, 0.92].map((t, j) => {
          const q = bez(t, P);
          const side = j % 2 ? 1 : -1;
          return (
            <g key={j} transform={`translate(${f1(q.x)} ${f1(q.y)}) rotate(${f1(q.a + side * 45)})`}>
              <ellipse cx={side > 0 ? 46 : -46} cy={0} rx={50} ry={13} fill={j % 3 ? leafC : shade(leafC, 0.12)} />
            </g>
          );
        });
        const floats = [0.45, 0.78].filter((_, j) => (i + j) % 2 === 0 || i === 2).map((t, j) => {
          const q = bez(t, P);
          return (
            <g key={j} transform={`translate(${f1(q.x)} ${f1(q.y)})`}>
              <circle cx={0} cy={0} r={28} fill={FLOAT} />
              <circle cx={-8} cy={-9} r={8} fill={C.white} opacity={0.35} />
            </g>
          );
        });
        return (
          <g key={i} transform={`rotate(${f1(a)} ${sx} 0)`}>
            <path d={d} stroke={kelp} strokeWidth={16} strokeLinecap="round" fill="none" />
            {blades}
            {floats}
          </g>
        );
      })}
    </g>
  );
}

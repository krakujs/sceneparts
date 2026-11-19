import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tiny monster: small fuzzy round monster on two little feet with one horn; about 300 px tall at s = 1. Feet at (0,0).
// anim: hop (small bounce) | blink (eyes blink) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const fuzzy = (ph: number): [number, number][] => {
  const n = 36, pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 1 + 0.035 * Math.cos(12 * t + ph);
    pts.push([118 * r * Math.cos(t), -165 + 108 * r * Math.sin(t)]);
  }
  return pts;
};
const smooth = (pts: [number, number][]) => {
  const n = pts.length;
  const mid = (i: number): [number, number] => {
    const a = pts[i % n], b = pts[(i + 1) % n];
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  };
  const m0 = mid(n - 1);
  let d = `M ${m0[0].toFixed(1)} ${m0[1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const m = mid(i);
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return d + " Z";
};

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const fur: string = p.color && p.color !== "none" ? p.color : "#B39DDB";
  const dark = shade(fur, 0.2);
  const anim: string = p.anim ?? "hop";
  const hop = anim === "hop" ? Math.abs(Math.sin(f * 0.12)) * 16 : 0;
  const blink = anim === "blink" && f % 100 < 5 ? 0.1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={110} ry={12} fill={C.shadow} />
      <ellipse cx={-44} cy={-10} rx={40} ry={16} fill={dark} />
      <ellipse cx={44} cy={-10} rx={40} ry={16} fill={dark} />
      <g transform={`translate(0 ${-hop})`}>
        <path d="M -18 -272 L 4 -352 L 22 -270 Z" fill="#5E3B26" />
        <path d={smooth(fuzzy(f * 0.05))} fill={fur} />
        <g transform={`scale(1 ${blink})`}>
          <g transform="translate(0 -190)">
            <circle cx={-42} cy={0} r={30} fill="#FFFFFF" />
            <circle cx={42} cy={0} r={30} fill="#FFFFFF" />
            <circle cx={-36} cy={4} r={16} fill={C.ink} />
            <circle cx={48} cy={4} r={16} fill={C.ink} />
            <circle cx={-30} cy={-2} r={5} fill="#FFFFFF" />
            <circle cx={54} cy={-2} r={5} fill="#FFFFFF" />
          </g>
        </g>
        <ellipse cx={0} cy={-128} rx={14} ry={10} fill={C.ink} />
      </g>
    </g>
  );
}

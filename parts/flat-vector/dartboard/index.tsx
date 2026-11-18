import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall dartboard seen from the front. Origin = board centre (x, y). About 560 px across at s = 1.
// 20 alternating segments, double and treble rings, outer bull and bullseye.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 50) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const R = 270;
const pt = (r: number, a: number) => [r * Math.sin(a), -r * Math.cos(a)] as const;
// Wedge between two radii, from angle a0 to a1 (radians, 0 = top).
const wedge = (r0: number, r1: number, a0: number, a1: number) => {
  const [x0, y0] = pt(r1, a0), [x1, y1] = pt(r1, a1), [x2, y2] = pt(r0, a1), [x3, y3] = pt(r0, a0);
  const big = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${f1(x0)} ${f1(y0)} A ${r1} ${r1} 0 ${big} 1 ${f1(x1)} ${f1(y1)} L ${f1(x2)} ${f1(y2)} A ${r0} ${r0} 0 ${big} 0 ${f1(x3)} ${f1(y3)} Z`;
};
const ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const dark = p.color && p.color !== "none" ? p.color : C.ink;
  const ring = p.accent && p.accent !== "none" ? p.accent : C.red;
  const cream = C.paper;
  const anim: string = p.anim ?? "none";
  const seg = Math.PI / 10;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <circle cx={0} cy={0} r={R + 26} fill={C.greyDark} />
        <circle cx={0} cy={0} r={R + 14} fill={shade(C.greyDark, 0.2)} />
        {ORDER.map((n, i) => {
          const a0 = i * 2 * seg - seg, a1 = a0 + 2 * seg;
          const isDark = i % 2 === 0;
          const base = isDark ? dark : cream;
          const hit = isDark ? ring : shade(ring, 0.1);
          return (
            <g key={n}>
              <path d={wedge(0, R, a0, a1)} fill={base} />
              <path d={wedge(R * 0.9, R, a0, a1)} fill={hit} />
              <path d={wedge(R * 0.52, R * 0.58, a0, a1)} fill={hit} />
            </g>
          );
        })}
        {/* wire-free separators as thin gaps */}
        {ORDER.map((n, i) => {
          const a = i * 2 * seg - seg;
          const [x1, y1] = pt(R * 0.06, a), [x2, y2] = pt(R, a);
          return <line key={n} x1={f1(x1)} y1={f1(y1)} x2={f1(x2)} y2={f1(y2)} stroke={C.greyLight} strokeWidth={2} opacity={0.4} />;
        })}
        {/* outer bull and bullseye */}
        <circle cx={0} cy={0} r={R * 0.1} fill={C.green} />
        <circle cx={0} cy={0} r={R * 0.045} fill={ring} />
        {/* segment numbers as dots: no text, keeps it legible at phone size */}
        {ORDER.map((n, i) => {
          const [dx, dy] = pt(R + 6, i * 2 * seg);
          return <circle key={n} cx={f1(dx)} cy={f1(dy)} r={5} fill={C.white} opacity={0.6} />;
        })}
      </g>
    </g>
  );
}

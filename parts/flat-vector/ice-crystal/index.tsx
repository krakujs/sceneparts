import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ice crystal cluster: faceted icy-blue hexagonal crystals with white sparkles. Origin = centre of the cluster.
// About 420 px wide and 480 px tall at s = 1. anim sparkle twinkles the sparkles; spin turns the cluster slowly.
const f1 = (v: number) => v.toFixed(1);
const ICE = "#8FD3F2", ICE_DK = "#4A9BD0";

// hexagonal crystal, pointed at top and bottom, with a darker right-hand facet
const hex = (W: number, H: number) => `M 0 ${f1(-H)} L ${f1(W)} ${f1(-H * 0.55)} L ${f1(W)} ${f1(H * 0.45)} L 0 ${f1(H)} L ${f1(-W)} ${f1(H * 0.45)} L ${f1(-W)} ${f1(-H * 0.55)} Z`;
const facetR = (W: number, H: number) => `M 0 ${f1(-H)} L ${f1(W)} ${f1(-H * 0.55)} L ${f1(W)} ${f1(H * 0.45)} L 0 ${f1(H)} Z`;
// [dx, dy, half width, half height, rotation, colour]
const CRYSTALS: [number, number, number, number, number, string][] = [
  [-125, 70, 46, 150, -24, ICE_DK],
  [125, 80, 44, 140, 22, ICE_DK],
  [-55, -40, 40, 150, -12, "#BDE9FA"],
  [60, -30, 38, 130, 14, "#BDE9FA"],
  [0, 0, 72, 220, 0, ICE],
];
const SPARKLES: [number, number, number][] = [[-190, -170, 26], [200, -120, 20], [160, 150, 24], [-170, 130, 18], [30, -260, 16]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const ice = p.color && p.color !== "none" ? p.color : ICE;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? (f * 1.2) % 360 : 0;
  const sparkleScale = (i: number) => (anim === "sparkle" ? 0.55 + 0.45 * Math.sin((f * 2 * Math.PI) / 50 + i * 1.3) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(turn)})`}>
        {CRYSTALS.map(([dx, dy, W, H, rot, col], i) => {
          const c = i === 4 ? ice : col;
          return (
            <g key={i} transform={`translate(${dx} ${dy}) rotate(${rot})`}>
              <path d={hex(W, H)} fill={c} />
              <path d={facetR(W, H)} fill={shade(c, 0.22)} />
              <path d={`M ${f1(-W * 0.62)} ${f1(-H * 0.2)} L ${f1(-W * 0.3)} ${f1(-H * 0.55)} L ${f1(-W * 0.18)} ${f1(-H * 0.05)} Z`} fill={C.white} opacity={0.65} />
            </g>
          );
        })}
      </g>
      {SPARKLES.map(([sx, sy, r], i) => {
        const k = sparkleScale(i) * (r / 26);
        return (
          <g key={`s${i}`} transform={`translate(${sx} ${sy}) scale(${f1(k * 1.8)})`}>
            <path d={`M 0 -26 Q 0 0 26 0 Q 0 0 0 26 Q 0 0 -26 0 Q 0 0 0 -26 Z`} fill={C.white} />
          </g>
        );
      })}
    </g>
  );
}

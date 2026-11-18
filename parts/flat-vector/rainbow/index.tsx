import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
const PUFFS: [number, number, number][] = [[-170, 20, 80], [-70, -50, 110], [62, -70, 118], [172, 15, 84], [0, 20, 96]];
/** Cloud body with a flat band underneath. */
const cloudShape = (fill: string, under: string) => (
  <g>
    {PUFFS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />)}
    <rect x={-250} y={52} width={500} height={60} rx={30} fill={under} />
  </g>
);

// Rainbow: six colour bands in a semicircle with a small cloud at each end. Origin = centre of the arc's base line.
// anim "grow" draws the arc in from the left; "pop" scales it in.
const COLS = ["#E8503F", "#FF8A3D", "#FFC83D", "#4BB46A", "#3D6FE0", "#7B5CD6"];
const band = (r1: number, r2: number) => `M ${-r2} 0 A ${r2} ${r2} 0 0 1 ${r2} 0 L ${r1} 0 A ${r1} ${r1} 0 0 0 ${-r1} 0 Z`;
const ease = (f: number, n: number) => { const t = Math.min(1, Math.max(0, f / n)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 700;
  const anim: string = p.anim ?? "none";
  const sc = anim === "pop" ? ease(f, 20) : 1;
  const t = anim === "grow" ? 1 - Math.pow(1 - Math.min(1, f / 60), 3) : 1;
  const bands = COLS.map((c, i) => { const r2 = 430 - i * 34; return <path key={i} d={band(r2 - 34, r2)} fill={c} />; });
  const clouds = (
    <g>
      <g transform="translate(-390 10) scale(0.55)">{cloudShape("#FFFFFF", "#8EC5E8")}</g>
      <g transform="translate(390 10) scale(0.55)">{cloudShape("#FFFFFF", "#8EC5E8")}</g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <clipPath id="sp-rainbow-clip">
          <rect x={-540} y={-600} width={1080 * t} height={620} />
        </clipPath>
      </defs>
      <g transform={`scale(${sc.toFixed(3)})`}>
        <g clipPath={anim === "grow" ? "url(#sp-rainbow-clip)" : undefined}>
          {bands}
          {clouds}
        </g>
      </g>
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Puffy cloud of overlapping circles with a flat soft-blue underside. Origin = centre of the cloud.
const ease = (f: number, n: number) => { const t = Math.min(1, Math.max(0, f / n)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Puffs as [cx, cy, r]. */
export const PUFFS: [number, number, number][] = [[-170, 20, 80], [-70, -50, 110], [62, -70, 118], [172, 15, 84], [0, 20, 96]];
/** Cloud body in a given colour with a flat band underneath (drawn over the puffs). */
export const cloudShape = (fill: string, under: string) => (
  <g>
    {PUFFS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />)}
    <rect x={-250} y={52} width={500} height={60} rx={30} fill={under} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const fill = p.color && p.color !== "none" ? p.color : C.white;
  const under = p.color2 && p.color2 !== "none" ? p.color2 : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const dx = anim === "drift" ? 18 * Math.sin((f * 2 * Math.PI) / 150) : 0;
  const sc = anim === "pop" ? ease(f, 20) : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(${dx.toFixed(1)} 0) scale(${sc.toFixed(3)})`}>{cloudShape(fill, under)}</g>
    </g>
  );
}

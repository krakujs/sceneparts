import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Trimmed boxy hedge segment: a flat green block with a bumpy clipped top. Exactly 1000 px wide and 350 px tall at s = 1.
// The pattern repeats every 100 px and the ends are flush, so segments can be placed side by side at x offsets of 1000 with no seam.
// Origin = centre of the hedge base on the ground.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const BUMPS = Array.from({ length: 10 }, (_, k) => -450 + 100 * k);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.greenDark;
  const anim: string = p.anim ?? "none";
  const dark = shade(leaf, 0.22);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <rect x={-520} y={-14} width={1040} height={20} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <rect x={-500} y={-300} width={1000} height={300} fill={leaf} />
        <rect x={-500} y={-90} width={1000} height={90} fill={dark} />
        {BUMPS.map((bx) => <circle key={`b${bx}`} cx={bx} cy={-300} r={56} fill={leaf} />)}
        {BUMPS.map((bx) => <circle key={`h${bx}`} cx={bx - 18} cy={-326} r={14} fill={C.lime} opacity={0.6} />)}
        {BUMPS.map((bx) => <circle key={`d${bx}`} cx={bx + 22} cy={-190} r={8} fill={dark} />)}
      </g>
    </g>
  );
}

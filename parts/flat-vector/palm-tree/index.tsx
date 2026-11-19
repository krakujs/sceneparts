import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Palm tree: a slim curved trunk with rings, a crown of long drooping fronds and a few coconuts.
// Origin = centre of the trunk base on the ground. About 640 px wide and 1300 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const poly = (ps: number[][]) => ps.map((q, i) => `${i ? "L" : "M"} ${f1(q[0])} ${f1(q[1])}`).join(" ");

// Trunk: quadratic curve from the base to the crown.
const P0 = [0, 0], P1 = [70, -460], P2 = [160, -900];
const N = 30;
const trunk = Array.from({ length: N + 1 }, (_, i) => {
  const t = i / N, u = 1 - t;
  const x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0];
  const y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1];
  const dx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  const len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len, w = 50 - 22 * t;
  return { l: [x + nx * w, y + ny * w], r: [x - nx * w, y - ny * w] };
});
const rings = trunk.filter((_, i) => i > 0 && i < N && i % 2 === 0);

// One frond: a leaf shape from the crown (0,0) out to a drooping tip.
const frond = (deg: number, len: number) => {
  const a = (deg * Math.PI) / 180;
  const droop = 90 + 60 * Math.abs(Math.cos(a));
  const tx = Math.cos(a) * len, ty = Math.sin(a) * len + droop;
  const cx = Math.cos(a) * len * 0.5, cy = Math.sin(a) * len * 0.5 - 30 + droop * 0.25;
  const L = Math.hypot(tx, ty), nx = (-ty / L) * 46, ny = (tx / L) * 46;
  return `M 0 0 Q ${f1(cx + nx)} ${f1(cy + ny)} ${f1(tx)} ${f1(ty)} Q ${f1(cx - nx * 0.6)} ${f1(cy - ny * 0.6)} 0 0 Z`;
};
const FRONDS: [number, number][] = [[-172, 330], [-140, 360], [-110, 330], [-78, 330], [-45, 350], [-15, 330], [12, 300]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const trunkC = p.color2 && p.color2 !== "none" ? p.color2 : "#D9B98C";
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 2 * Math.sin((f * 2 * Math.PI) / 100) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <path d={`${poly(trunk.map((t) => t.l))} ${poly(trunk.map((t) => t.r).reverse()).replace("M", "L")} Z`} fill={trunkC} />
        {rings.map((t, i) => (
          <path key={i} d={`M ${f1(t.l[0])} ${f1(t.l[1])} L ${f1(t.r[0])} ${f1(t.r[1])}`} stroke={shade(trunkC, 0.25)} strokeWidth={7} strokeLinecap="round" />
        ))}
        <g transform={`translate(${P2[0]} ${P2[1]}) rotate(${f1(sway)})`}>
          {FRONDS.map(([a, len], i) => (
            <path key={i} d={frond(a, len)} fill={i % 2 ? shade(leaf, 0.15) : leaf} />
          ))}
          <circle cx={-12} cy={30} r={20} fill={C.brownDark} />
          <circle cx={12} cy={34} r={20} fill={shade(C.brownDark, 0.15)} />
          <circle cx={0} cy={50} r={20} fill={C.brownDark} />
        </g>
      </g>
    </g>
  );
}

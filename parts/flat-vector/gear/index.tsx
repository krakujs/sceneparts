import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Single chunky cog wheel with trapezoid teeth and a centre hole. anim spin turns it about its hub.
// Origin = bottom centre (the floor line; the wheel stands on its rim). Hero scale: at s = 1 about 380 px across. Use s about 0.3 next to a person.
const f1 = (v: number) => v.toFixed(1);
const N = 10, RO = 190, RR = 150, TIP = 0.1, ROOT = 0.17; // teeth, tip radius, root radius, half-widths in radians
// closed outline of a toothed wheel centred on (0,0)
const toothPath = (n: number, ro: number, rr: number, tip: number, root: number) => {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n;
    const pts: [number, number][] = [[a - root, rr], [a - tip, ro], [a + tip, ro], [a + root, rr]];
    pts.forEach(([t, r], k) => {
      d += `${k === 0 && i === 0 ? "M" : "L"}${f1(r * Math.sin(t))},${f1(-r * Math.cos(t))}`;
    });
  }
  return `${d}Z`;
};
const TOOTHED = toothPath(N, RO, RR, TIP, ROOT);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? (f * 3) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={motion(anim === "spin" ? "none" : anim, f)}>
        <g transform={`translate(0 ${-RO}) rotate(${f1(turn)})`}>
          <path d={TOOTHED} fill={body} />
          <circle cx={0} cy={0} r={100} fill={shade(body, 0.14)} />
          <circle cx={0} cy={0} r={36} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Low succulent rosette of thick pointed leaves, on the ground. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const leaf = (len: number, w: number) => `M 0 0 C ${f1(-w)} ${f1(-len * 0.25)} ${f1(-w * 0.8)} ${f1(-len * 0.8)} 0 ${f1(-len)} C ${f1(w * 0.8)} ${f1(-len * 0.8)} ${f1(w)} ${f1(-len * 0.25)} 0 0 Z`;

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const green = p.color && p.color !== "none" ? p.color : "#7FBF8E";
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 2 * Math.sin((f * 2 * Math.PI) / 100) : 0;
  // [angle, length, width] from the outer ring inwards
  const outer: [number, number, number][] = [[-74, 230, 92], [-50, 280, 100], [-26, 300, 104], [0, 310, 100], [26, 300, 104], [50, 280, 100], [74, 230, 92]];
  const inner: [number, number, number][] = [[-40, 180, 80], [-12, 200, 84], [16, 190, 82], [42, 170, 76]];
  const piece = ([a, len, w]: [number, number, number], i: number, c: string) => (
    <g key={`${a}-${i}`} transform={`translate(0 0) rotate(${f1(a + sw)})`}>
      <path d={leaf(len, w)} fill={c} />
      <path d={leaf(len, w * 0.4).replace(/M 0 0/, "M 0 0")} fill={shade(c, 0.22)} transform={`translate(${f1(w * 0.1)} 0)`} opacity={0.5} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={18} fill={C.shadow} />
      <g transform={`scale(${f1(pop)})`}>
        <g transform="translate(0 -6)">
          {outer.map((o, i) => piece(o, i, shade(green, 0.12)))}
          {inner.map((o, i) => piece(o, i, green))}
        </g>
      </g>
    </g>
  );
}

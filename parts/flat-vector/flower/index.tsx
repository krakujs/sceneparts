/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic garden flower: curved stem, two leaves, round five-petal bloom. Origin = bottom of the stem.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const leaf = (c: string) => (
  <g>
    <path d="M 0 0 C -70 -30 -80 -100 0 -150 C 80 -100 70 -30 0 0 Z" fill={c} />
    <path d="M 0 0 C 70 -30 80 -100 0 -150 C 20 -90 18 -40 0 0 Z" fill={shade(c, 0.2)} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const petal = p.color && p.color !== "none" ? p.color : C.pink;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const leafSw = anim === "sway" ? 4 * Math.sin((f * 2 * Math.PI) / 70 + 1) : 0;
  const head = 0, hy = -400;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={90} ry={12} fill={C.shadow} />
      <g transform={`rotate(${f1(sw)})`}>
        <path d={`M 0 0 Q 14 ${hy / 2} ${head} ${hy}`} stroke={C.green} strokeWidth={16} strokeLinecap="round" fill="none" />
        <g transform={`translate(0 -150) rotate(${f1(-40 + leafSw)}) scale(${f1(pop)})`}>{leaf(C.green)}</g>
        <g transform={`translate(8 -230) rotate(${f1(45 - leafSw)}) scale(${f1(pop)})`}>{leaf(shade(C.green, -0.1))}</g>
        <g transform={`translate(${head} ${hy}) scale(${f1(pop)})`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx={0} cy={-52} rx={36} ry={52} fill={i % 2 ? shade(petal, 0.12) : petal} transform={`rotate(${i * 72})`} />
          ))}
          <circle r={28} fill={C.yellow} />
          <circle r={28} fill="none" stroke={C.yellowDark} strokeWidth={0} />
        </g>
      </g>
    </g>
  );
}

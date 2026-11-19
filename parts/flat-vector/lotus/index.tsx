/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pink lotus bloom with pointed petals, sitting on a round green lily pad on a small patch of water. Origin = bottom centre of the water.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const petalPath = "M 0 0 C -58 -40 -52 -130 0 -190 C 52 -130 58 -40 0 0 Z";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const pink = p.color && p.color !== "none" ? p.color : C.pink;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const bob = anim === "sway" ? -6 * (Math.sin((f * 2 * Math.PI) / 100) + 1) : 0;
  const ring = (n: number, spread: number, c: string, len: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = -spread + (i * 2 * spread) / (n - 1);
      return <path key={`${c}${i}`} d={petalPath} fill={c} transform={`rotate(${f1(a)}) scale(1 ${f1(len)})`} />;
    });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={48} fill={shade("#7EC4DF", 0.1)} />
      <ellipse cx={0} cy={-6} rx={280} ry={40} fill={C.skyDeep} />
      <g transform={`translate(0 ${f1(bob)})`}>
        <ellipse cx={0} cy={-30} rx={210} ry={46} fill={C.green} />
        <path d="M 0 -30 L -190 -60" stroke={C.greenDark} strokeWidth={6} />
        <path d="M 0 -30 L 170 -62" stroke={C.greenDark} strokeWidth={6} />
        <path d="M 0 -30 L 0 -68" stroke={C.greenDark} strokeWidth={6} />
        <g transform={`translate(0 -40) scale(${f1(pop * 1.5)})`}>
          {ring(5, 72, shade(pink, 0.15), 1.05)}
          {ring(5, 40, pink, 0.9)}
          {ring(3, 14, shade(pink, -0.1), 0.7)}
          <ellipse cx={0} cy={-10} rx={28} ry={18} fill={C.yellow} />
        </g>
      </g>
    </g>
  );
}

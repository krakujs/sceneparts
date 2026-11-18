/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall sunflower: stem with large leaves, big yellow petal ring around a brown seed disc. Origin = bottom of stem.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const bigLeaf = (c: string) => (
  <g>
    <path d="M 0 0 C -120 -40 -150 -170 0 -230 C 150 -170 120 -40 0 0 Z" fill={c} />
    <path d="M 0 0 C 120 -40 150 -170 0 -230 C 30 -150 30 -60 0 0 Z" fill={shade(c, 0.2)} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const petal = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 2.5 * Math.sin((f * 2 * Math.PI) / 100) : 0;
  const lsw = anim === "sway" ? 4 * Math.sin((f * 2 * Math.PI) / 80 + 0.8) : 0;
  const hy = -1020;
  const petals = 14;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={16} fill={C.shadow} />
      <g transform={`rotate(${f1(sw)})`}>
        <path d={`M 0 0 Q 22 ${hy / 2} 0 ${hy}`} stroke={C.green} strokeWidth={22} strokeLinecap="round" fill="none" />
        <g transform={`translate(0 -300) rotate(${f1(-48 + lsw)}) scale(0.85)`}>{bigLeaf(C.green)}</g>
        <g transform={`translate(4 -560) rotate(${f1(52 - lsw)}) scale(0.8)`}>{bigLeaf(shade(C.green, -0.08))}</g>
        <g transform={`translate(0 ${hy}) scale(${f1(pop)})`}>
          {Array.from({ length: petals }, (_, i) => (
            <ellipse key={i} cx={0} cy={-150} rx={36} ry={120} fill={i % 2 ? shade(petal, 0.1) : petal} transform={`rotate(${(i * 360) / petals})`} />
          ))}
          <circle r={112} fill={shade(C.brown, 0.1)} />
          <circle r={96} fill={C.brownDark} />
          {Array.from({ length: 18 }, (_, i) => {
            const r = 20 + (i % 4) * 18, a = i * 2.39996;
            return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={5} fill={C.sand} opacity={0.6} />;
          })}
        </g>
      </g>
    </g>
  );
}

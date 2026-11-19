/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small clump of three daisies: thin white petals round a yellow centre on thin stems. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const daisy = (cx: number, top: number, h: number, petal: string, sway: number, key: number) => (
  <g key={key}>
    <path d={`M ${cx} 0 Q ${cx + sway * 0.3} ${-h / 2} ${cx + sway} ${top}`} stroke={C.green} strokeWidth={10} strokeLinecap="round" fill="none" />
    <path d={`M ${cx + sway * 0.6} ${top + h * 0.45} C ${cx + sway * 0.6 - 40} ${top + h * 0.35} ${cx + sway * 0.6 - 40} ${top + h * 0.2} ${cx + sway * 0.6} ${top + h * 0.2} C ${cx + sway * 0.6 + 40} ${top + h * 0.3} ${cx + sway * 0.6 + 40} ${top + h * 0.4} ${cx + sway * 0.6} ${top + h * 0.45} Z`} fill={C.green} />
    <g transform={`translate(${f1(cx + sway)} ${f1(top)}) scale(1.45)`}>
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse key={i} cx={0} cy={-44} rx={11} ry={40} fill={i % 2 ? shade(petal, 0.08) : petal} transform={`rotate(${i * 36})`} />
      ))}
      <circle r={24} fill={C.yellow} />
      <circle r={24} fill={C.yellowDark} opacity={0.35} transform="translate(6 6)" />
    </g>
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const petal = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  const k = anim === "sway" ? 1 : 0;
  const w = (i: number) => k * 4 * Math.sin((f * 2 * Math.PI) / 80 + i * 1.3);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(Math.min(1, f / 20))})` : undefined}>
        {daisy(-110, -300, 300, petal, w(0) * 4, 0)}
        {daisy(40, -360, 360, petal, w(1) * 4, 1)}
        {daisy(150, -230, 230, petal, w(2) * 4, 2)}
      </g>
    </g>
  );
}

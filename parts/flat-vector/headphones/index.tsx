import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Over-ear headphones: arched headband, two cups with ear cushions. Origin = bottom centre (cups rest on y).
// anim "beat": both cups swell on a steady rhythm.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const cush = p.cushion && p.cushion !== "none" ? p.cushion : C.greyLight;
  const anim: string = p.anim ?? "none";
  const beat = anim === "beat" ? 1 + 0.035 * Math.pow(Math.max(0, Math.sin((f * 2 * Math.PI) / 30)), 4) : 1;
  const cup = (cx: number) => (
    <g transform={`translate(${cx} 0) scale(${beat}) translate(${-cx} 0)`}>
      <rect x={cx - 60} y={-220} width={120} height={220} rx={44} fill={body} />
      <rect x={cx - 60} y={-120} width={120} height={20} rx={8} fill={shade(body, 0.25)} />
      <ellipse cx={cx} cy={-110} rx={36} ry={56} fill={cush} />
      <ellipse cx={cx - 10} cy={-128} rx={10} ry={18} fill={C.white} opacity={0.5} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -170 -220 C -190 -470 190 -470 170 -220" fill="none" stroke={body} strokeWidth={34} strokeLinecap="round" />
        <path d="M -150 -300 C -160 -410 160 -410 150 -300" fill="none" stroke={C.white} strokeWidth={6} strokeLinecap="round" opacity={0.15} />
        <rect x={-186} y={-236} width={32} height={30} rx={8} fill={shade(body, 0.2)} />
        <rect x={154} y={-236} width={32} height={30} rx={8} fill={shade(body, 0.2)} />
        {cup(-170)}
        {cup(170)}
      </g>
    </g>
  );
}

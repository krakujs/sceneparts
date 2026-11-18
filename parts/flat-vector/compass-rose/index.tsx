import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, font } from "../style/index";

// Compass rose as on a map: eight points, the four main ones long, each split into two halves, with N E S W letters.
// Centred on x, y. About 720 px across at s = 1. anim "spin": the rose turns in over 50 frames and settles; "pulse": it breathes.
const f1 = (v: number) => v.toFixed(1);
const R = 260;
const rad = (d: number) => (d * Math.PI) / 180;

// One half of a point: a triangle from the centre to the tip, with its base on one side.
const half = (a: number, len: number, side: 1 | -1) => {
  const dx = Math.sin(rad(a)), dy = -Math.cos(rad(a));
  const px = Math.cos(rad(a)), py = Math.sin(rad(a));
  const w = len * 0.16 * side;
  return `M 0 0 L ${f1(dx * len)} ${f1(dy * len)} L ${f1(px * w)} ${f1(py * w)} Z`;
};
const POINTS = Array.from({ length: 8 }, (_, k) => ({ a: k * 45, len: k % 2 === 0 ? R : R * 0.6 }));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const c1 = p.color && p.color !== "none" ? p.color : C.navy;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const t = Math.min(1, f / 50), e = 1 - (1 - t) ** 3;
  const rot = anim === "spin" ? -270 * (1 - e) : 0;
  const pulse = anim === "pulse" ? 1 + 0.04 * Math.sin((f * 2 * Math.PI) / 60) : 1;
  const L = R + 62;
  const letter = (ch: string, lx: number, ly: number) => (
    <text key={ch} x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fontFamily={font} fontWeight={800} fontSize={84} fill={C.ink}>{ch}</text>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(pulse)})`}>
        <circle cx={0} cy={0} r={R + 26} fill={C.white} opacity={0.9} />
        <circle cx={0} cy={0} r={R + 14} fill="none" stroke={C.greyLight} strokeWidth={6} />
        <g transform={`rotate(${f1(rot)})`}>
          {POINTS.map((pt, i) => (
            <g key={i}>
              <path d={half(pt.a, pt.len, 1)} fill={c1} />
              <path d={half(pt.a, pt.len, -1)} fill={c2} />
            </g>
          ))}
          <circle cx={0} cy={0} r={R * 0.12} fill={C.white} stroke={C.greyLight} strokeWidth={6} />
        </g>
        {letter("N", 0, -L)}
        {letter("E", L, 0)}
        {letter("S", 0, L)}
        {letter("W", -L, 0)}
      </g>
    </g>
  );
}

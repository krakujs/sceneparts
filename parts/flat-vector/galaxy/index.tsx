import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Galaxy: a spiral galaxy seen at a slant, with two arms of stars wound around a glowing core, about 800 px wide at s = 1.
// Origin = centre of the core. Built for a dark background.
// anim "spin": the galaxy turns slowly in its own plane.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const STARS: { x: number; y: number; r: number; c: string; arm: number }[] = [];
for (let k = 0; k < 2; k++) {
  for (let i = 0; i <= 110; i++) {
    const th = i * 0.14;
    const rad = 22 * Math.exp(0.2 * th);
    const a = th + k * Math.PI;
    const jx = 12 * Math.sin(i * 5.1 + k * 3), jy = 12 * Math.cos(i * 3.7 + k);
    const inner = i < 45;
    STARS.push({
      x: rad * Math.cos(a) + jx,
      y: rad * Math.sin(a) + jy,
      r: Math.max(3, 7 - i * 0.04),
      c: inner ? C.white : i % 5 === 0 ? C.pink : "#B5DDF5",
      arm: k,
    });
  }
}
// a few stars scattered around the disc
for (let i = 0; i < 40; i++) {
  const a = i * 2.39996;
  const rad = 60 + 280 * Math.sqrt((i + 0.5) / 40);
  STARS.push({ x: rad * Math.cos(a), y: rad * Math.sin(a), r: 2.6 + (i % 3) * 0.8, c: i % 4 === 0 ? C.yellow : C.white, arm: 2 });
}

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const spin = p.anim === "spin" ? f * 0.15 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* soft halo */}
      <defs>
        <radialGradient id="galaxy-bg">
          <stop offset="0" stopColor="#1A1440" stopOpacity={0.95} />
          <stop offset="0.6" stopColor="#1A1440" stopOpacity={0.75} />
          <stop offset="1" stopColor="#1A1440" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={0} cy={0} rx={470} ry={290} fill="url(#galaxy-bg)" transform="rotate(-20)" />
      {/* the disc, squashed for a slant, turning in its own plane */}
      <g transform={`scale(1 0.5) rotate(${f1(spin - 20)})`}>
        {STARS.map((st, i) => (
          <circle key={i} cx={f1(st.x)} cy={f1(st.y)} r={f1(st.r)} fill={st.c} opacity={st.arm === 2 ? 0.8 : 0.9} />
        ))}
        {/* glowing core */}
        <circle cx={0} cy={0} r={110} fill={C.yellow} opacity={0.22} />
        <circle cx={0} cy={0} r={64} fill="#FFF3B0" opacity={0.5} />
        <circle cx={0} cy={0} r={30} fill={C.white} />
      </g>
    </g>
  );
}

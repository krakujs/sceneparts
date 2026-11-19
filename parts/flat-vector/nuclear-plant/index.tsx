import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Nuclear plant: two hyperbolic cooling towers with steam, and a reactor dome in front. Generic, no hazard symbols.
// Origin = base on the ground. About 960 px wide and 1100 px tall at s = 1.
// anim "lights": the steam plumes from both cooling towers drift up and fade.
const f1 = (v: number) => v.toFixed(1);
const puff = (f: number, k: number) => {
  const t = ((f + k * 22) % 66) / 66;
  return { y: -t * 260, r: 40 + t * 90, o: (1 - t) * 0.9, dx: Math.sin(t * 3 + k) * 40 };
};
// Profile of a hyperbolic cooling tower: narrow at the throat, wider at the top and base.
const towerPath = (cx: number, base: number, top: number, bw: number, tw: number, nw: number) => {
  const mid = (base + top) / 2;
  return `M ${f1(cx - bw)} ${f1(base)} Q ${f1(cx - nw)} ${f1(mid)} ${f1(cx - tw)} ${f1(top)} L ${f1(cx + tw)} ${f1(top)} Q ${f1(cx + nw)} ${f1(mid)} ${f1(cx + bw)} ${f1(base)} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.greyLight;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const towers = [{ cx: -250, base: -320, top: -900 }, { cx: 250, base: -320, top: -900 }];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={480} ry={24} fill={C.shadow} />
      {/* steam plumes */}
      {anim === "lights" && towers.map((t, ti) =>
        [0, 1, 2].map((k) => {
          const q = puff(f, k + ti * 3);
          return <circle key={`${ti}-${k}`} cx={f1(t.cx + q.dx)} cy={f1(t.top - 40 + q.y)} r={f1(q.r)} fill={C.white} opacity={f1(q.o)} />;
        }),
      )}
      {/* cooling towers */}
      {towers.map((t, i) => (
        <g key={i}>
          <path d={towerPath(t.cx, t.base, t.top, 175, 125, 82)} fill={wall} />
          <path d={towerPath(t.cx + 34, t.base, t.top, 64, 48, 34)} fill={shade(wall, 0.12)} opacity={0.6} />
          <rect x={t.cx - 110} y={t.top} width={220} height={22} rx={8} fill={shade(wall, 0.18)} />
          {/* lattice bands */}
          {[-780, -620, -460].map((ly) => (
            <rect key={ly} x={t.cx - 130} y={ly} width={260} height={8} rx={4} fill={accent} opacity={0.5} />
          ))}
        </g>
      ))}
      {/* reactor dome and building */}
      <rect x={-200} y={-300} width={400} height={300} rx={14} fill={C.greyLight} />
      <rect x={-200} y={-300} width={400} height={14} rx={6} fill={shade(C.greyLight, 0.15)} />
      <path d="M -180 -300 Q -180 -470 0 -470 Q 180 -470 180 -300 Z" fill={C.white} />
      <path d="M -150 -300 Q -150 -440 0 -440 Q 60 -440 90 -400" fill="none" stroke={C.greyLight} strokeWidth={12} strokeLinecap="round" />
      <rect x={-140} y={-300} width={280} height={8} fill={C.greyDark} opacity={0.3} />
      {/* windows and door on the building */}
      {[-150, -30, 90].map((wx) => (
        <rect key={wx} x={wx} y={-230} width={70} height={60} rx={6} fill={C.skyDeep} />
      ))}
      <rect x={-40} y={-120} width={80} height={120} rx={6} fill={C.greyDark} />
      {/* ground strip and fence line */}
      <rect x={-480} y={-14} width={960} height={14} rx={6} fill={C.grey} opacity={0.5} />
    </g>
  );
}

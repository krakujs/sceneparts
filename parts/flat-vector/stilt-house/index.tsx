import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stilt house: a plank house with a gable roof on a deck, raised on six stilts over the water, with a ladder down to
// the water. Origin = water line at the centre. About 760 px wide and 820 px tall at s = 1.
// anim "lights": the house windows glow one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const bar = (x1: number, y1: number, x2: number, y2: number, w: number) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = (-dy / len) * (w / 2), ny = (dx / len) * (w / 2);
  return `M ${f1(x1 + nx)} ${f1(y1 + ny)} L ${f1(x2 + nx)} ${f1(y2 + ny)} L ${f1(x2 - nx)} ${f1(y2 - ny)} L ${f1(x1 - nx)} ${f1(y1 - ny)} Z`;
};
const win = (key: string, x0: number, y0: number, w: number, h: number, glow: boolean) => (
  <g key={key}>
    <rect x={x0} y={y0} width={w} height={h} rx={4} fill={glow ? C.yellow : C.sky} />
    <rect x={x0 + w / 2 - 3} y={y0} width={6} height={h} fill={C.white} opacity={0.8} />
    <rect x={x0} y={y0 + h / 2 - 3} width={w} height={6} fill={C.white} opacity={0.8} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.brown;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.redDark;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 4 === k;
  const stilts = [-310, -200, -90, 90, 200, 310];
  const planks = Array.from({ length: 12 }, (_, i) => -630 + i * 24);
  const rungs = Array.from({ length: 11 }, (_, i) => -320 + i * 30);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={380} ry={14} fill={C.shadow} />
        {/* water */}
        <rect x={-500} y={-60} width={1000} height={60} fill={C.skyDeep} />
        {[-380, -120, 140, 360].map((wx) => <rect key={`wv${wx}`} x={wx} y={-34} width={80} height={5} rx={2} fill={C.white} opacity={0.6} />)}
        {/* stilts into the water */}
        {stilts.map((px) => <rect key={`st${px}`} x={px - 12} y={-340} width={24} height={330} fill={shade(wall, 0.3)} />)}
        {/* deck with railing */}
        <rect x={-350} y={-360} width={700} height={24} rx={4} fill={wall} />
        {Array.from({ length: 12 }, (_, i) => <rect key={`dk${i}`} x={-350 + i * 60} y={-360} width={3} height={24} fill={shade(wall, 0.25)} />)}
        {Array.from({ length: 12 }, (_, i) => <rect key={`rp${i}`} x={-340 + i * 60} y={-420} width={8} height={60} fill={shade(wall, 0.1)} />)}
        <rect x={-350} y={-428} width={700} height={12} rx={4} fill={shade(wall, 0.1)} />
        {/* house walls with planks */}
        <rect x={-300} y={-640} width={600} height={280} fill={wall} />
        {planks.map((py) => <rect key={`hp${py}`} x={-300} y={py} width={600} height={3} fill={shade(wall, 0.18)} />)}
        {/* gable roof */}
        <path d="M -340 -630 L 0 -800 L 340 -630 Z" fill={roof} />
        <rect x={-350} y={-644} width={700} height={16} rx={5} fill={shade(roof, 0.25)} />
        {/* windows and door */}
        {win("wl", -220, -560, 70, 80, lit(0))}
        {win("wr", 150, -560, 70, 80, lit(1))}
        <rect x={-50} y={-480} width={100} height={120} rx={6} fill={C.brownDark} />
        <circle cx={34} cy={-420} r={4} fill={C.yellow} />
        {/* rope-free ladder from the deck down to the water */}
        <path d={bar(236, -336, 236, -12, 7)} fill={C.greyDark} />
        <path d={bar(264, -336, 264, -12, 7)} fill={C.greyDark} />
        {rungs.map((ry) => <rect key={`rg${ry}`} x={234} y={ry} width={32} height={6} rx={2} fill={C.greyDark} />)}
      </g>
    </g>
  );
}

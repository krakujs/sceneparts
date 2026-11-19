import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two-storey suburban house, flat front elevation. Origin = centre of the floor line.
// About 760 px wide and 900 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const glow = (f: number, i: number) => (Math.floor(f / 12) + i) % 4 === 0 ? C.yellow : C.sky;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.paper;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const lit = anim === "lights";
  const win = (i: number, wx: number, wy: number) => (
    <g key={i}>
      <rect x={wx} y={wy} width={130} height={130} rx={10} fill={C.white} />
      <rect x={wx + 10} y={wy + 10} width={110} height={110} rx={6} fill={lit ? glow(f, i) : C.sky} />
      <path d={`M ${wx + 20} ${wy + 20} L ${wx + 42} ${wy + 20} L ${wx + 20} ${wy + 52} Z`} fill={C.white} opacity={0.7} />
      <rect x={wx + 63} y={wy + 10} width={8} height={110} fill={C.white} />
      <rect x={wx + 10} y={wy + 63} width={110} height={8} fill={C.white} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={400} ry={22} fill={C.shadow} />
        {/* chimney */}
        <rect x={150} y={-1000} width={70} height={190} rx={6} fill={C.brownDark} />
        <rect x={140} y={-1016} width={90} height={26} rx={6} fill={C.brown} />
        {/* walls */}
        <rect x={-340} y={-720} width={680} height={720} rx={14} fill={wall} />
        <rect x={-340} y={-40} width={680} height={40} rx={10} fill={shade(wall, 0.12)} />
        {/* roof */}
        <path d="M -400 -700 L 0 -1000 L 400 -700 Q 400 -680 370 -680 L -370 -680 Q -400 -680 -400 -700 Z" fill={accent} />
        <path d="M -400 -700 L 0 -1000 L 400 -700 L 370 -700 L 0 -1000 L -370 -700 Z" fill={shade(accent, 0.22)} />
        <rect x={-400} y={-690} width={800} height={24} rx={8} fill={C.white} />
        {/* upstairs windows and downstairs windows */}
        {win(0, -270, -640)}
        {win(1, 140, -640)}
        {win(2, -270, -420)}
        {win(3, 140, -420)}
        {/* door with step and porch */}
        <rect x={-70} y={-300} width={140} height={260} rx={70} fill={shade(accent, 0.1)} />
        <rect x={-70} y={-300} width={140} height={260} rx={14} fill={accent} />
        <circle cx={50} cy={-170} r={9} fill={C.yellow} />
        <rect x={-100} y={-40} width={200} height={20} rx={6} fill={C.greyLight} />
        <rect x={-130} y={-22} width={260} height={22} rx={6} fill={C.grey} />
      </g>
    </g>
  );
}

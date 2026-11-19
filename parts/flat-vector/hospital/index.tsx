import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hospital: a tall multi-storey block with rows of windows, a blue square with a white H high on the facade,
// and a canopy over the glass entrance doors. Nothing else. Origin = centre of the ground line.
// About 720 px wide and 1030 px tall at s = 1. anim lights glows the windows in turn.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const WALL = "#EEF3F8", ACCENT = "#3D6FE0";
const COLS = [-260, -120, 120, 260];
const ROWS = [-930, -790, -650, -510, -370]; // upper window tops, 100 px tall

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : WALL;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : ACCENT;
  const anim: string = p.anim ?? "none";
  const frame = shade(wall, 0.3);
  const lit = (i: number) => (anim === "lights" ? 0.5 + 0.5 * (0.5 + 0.5 * Math.sin((f - i * 9) / 6)) : 1);
  const windowAt = (wx: number, wy: number, h: number, i: number) => (
    <g key={`w${wx}-${wy}`}>
      <rect x={wx - 50} y={wy} width={100} height={h} rx={8} fill={frame} />
      <rect x={wx - 42} y={wy + 8} width={84} height={h - 16} rx={5} fill={C.sky} opacity={lit(i)} />
      <rect x={wx - 2} y={wy + 8} width={4} height={h - 16} fill={frame} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-4} rx={400} ry={22} fill={C.shadow} />
        <rect x={-380} y={-40} width={760} height={40} rx={6} fill={shade(wall, 0.2)} />
        {/* main block and parapet */}
        <rect x={-340} y={-1000} width={680} height={1000} rx={8} fill={wall} />
        <rect x={-360} y={-1030} width={720} height={34} rx={8} fill={shade(wall, 0.12)} />
        {/* upper windows */}
        {ROWS.map((ry, r) => COLS.map((cx, c) => windowAt(cx, ry, 100, r * 4 + c)))}
        {/* ground-floor windows either side of the entrance */}
        {[-230, 230].map((cx, c) => windowAt(cx, -190, 110, 20 + c))}
        {/* blue square with a white H high on the facade */}
        <rect x={-70} y={-930} width={140} height={130} rx={12} fill={accent} />
        <rect x={-38} y={-900} width={22} height={70} fill={C.white} />
        <rect x={16} y={-900} width={22} height={70} fill={C.white} />
        <rect x={-38} y={-876} width={76} height={22} fill={C.white} />
        {/* glass entrance doors under a canopy on two posts */}
        <rect x={-90} y={-215} width={180} height={215} rx={4} fill={frame} />
        <rect x={-80} y={-205} width={160} height={205} fill={C.skyDeep} />
        <rect x={-3} y={-205} width={6} height={205} fill={frame} />
        <rect x={-146} y={-219} width={8} height={219} fill={shade(wall, 0.35)} />
        <rect x={138} y={-219} width={8} height={219} fill={shade(wall, 0.35)} />
        <rect x={-150} y={-245} width={300} height={26} rx={6} fill={accent} />
        <rect x={-150} y={-219} width={300} height={8} fill={shade(accent, 0.25)} />
      </g>
    </g>
  );
}

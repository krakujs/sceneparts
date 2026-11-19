import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// University hall: a wide classical front with columns, a pediment, wide steps and a small clock cupola. Origin = bottom centre. About 880 px wide and 1000 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F2EADB";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#3D6FE0";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={470} ry={22} fill={C.shadow} />
        <rect x={-330} y={-40} width={660} height={22} rx={6} fill={shade(wall, 0.15)} />
        <rect x={-360} y={-20} width={720} height={20} rx={6} fill={shade(wall, 0.25)} />
        {/* wide hall with pediment */}
        <rect x={-400} y={-600} width={800} height={580} rx={10} fill={wall} />
        <path d="M -460 -600 L 0 -760 L 460 -600 Z" fill={roof} />
        <path d="M -400 -600 L 0 -730 L 400 -600 Z" fill={shade(roof, 0.12)} />
        <circle cx={0} cy={-655} r={34} fill={C.white} opacity={0.9} />
        <rect x={-400} y={-600} width={800} height={24} fill={shade(wall, 0.15)} />
        {/* columns */}
        {[-300, -200, -100, 0, 100, 200, 300].map((cx) => (
          <g key={cx}>
            <rect x={cx - 22} y={-560} width={44} height={480} fill={C.white} />
            <rect x={cx + 8} y={-560} width={14} height={480} fill={shade(C.white, 0.12)} />
            <rect x={cx - 34} y={-572} width={68} height={16} rx={4} fill={shade(C.white, 0.08)} />
          </g>
        ))}
        {/* entrance doors between the centre columns */}
        <rect x={-60} y={-300} width={120} height={180} rx={10} fill={C.brownDark} />
        <rect x={-50} y={-290} width={46} height={160} rx={6} fill={C.skyDeep} />
        <rect x={4} y={-290} width={46} height={160} rx={6} fill={C.skyDeep} />
        <rect x={-50} y={-290} width={12} height={160} fill={C.white} opacity={0.5} />
        {/* small clock cupola */}
        <rect x={-70} y={-860} width={140} height={100} rx={8} fill={wall} />
        <path d="M -90 -860 L 0 -950 L 90 -860 Z" fill={roof} />
        <circle cx={0} cy={-815} r={36} fill={C.white} />
        <rect x={-3} y={-840} width={6} height={24} fill={C.ink} />
        <rect x={-3} y={-815} width={22} height={6} fill={C.ink} />
        <rect x={-6} y={-976} width={12} height={28} fill={C.greyDark} />
        {/* window bands on the flanks */}
        {[-360, -300].map((wx) => (
          <rect key={wx} x={wx} y={-480} width={40} height={100} rx={8} fill={C.sky} opacity={anim === "lights" ? lit(wx > 0 ? 1 : 0) : 1} />
        ))}
        {[300, 360].map((wx) => (
          <rect key={wx} x={wx} y={-480} width={40} height={100} rx={8} fill={C.sky} opacity={anim === "lights" ? lit(wx > 0 ? 2 : 3) : 1} />
        ))}
      </g>
    </g>
  );
}

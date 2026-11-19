import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// School building, flat front elevation with a bell tower on top, a clock, steps and big windows.
// Origin = bottom centre; the building stands on y. About 820 px wide and 1000 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const WINDOWS = [-300, -100, 100, 300];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F9E0B0";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={460} ry={22} fill={C.shadow} />
        {/* steps */}
        <rect x={-260} y={-40} width={520} height={20} rx={6} fill={shade(wall, 0.12)} />
        <rect x={-290} y={-20} width={580} height={20} rx={6} fill={shade(wall, 0.22)} />
        {/* main block */}
        <rect x={-380} y={-700} width={760} height={660} rx={14} fill={wall} />
        <rect x={-380} y={-720} width={760} height={30} rx={10} fill={shade(wall, 0.15)} />
        {/* roof trim */}
        <rect x={-400} y={-740} width={800} height={34} rx={10} fill={roof} />
        <rect x={-400} y={-716} width={800} height={10} fill={shade(roof, 0.2)} />
        {/* windows */}
        {[0, 1].map((row) =>
          WINDOWS.map((wx, i) => (
            <g key={`${row}-${i}`}>
              <rect x={wx - 62} y={-640 + row * 200} width={124} height={140} rx={10} fill={shade(wall, 0.3)} />
              <rect x={wx - 52} y={-630 + row * 200} width={104} height={120} rx={6} fill={C.sky} opacity={anim === "lights" ? lit(row * 4 + i) : 1} />
              <rect x={wx - 40} y={-620 + row * 200} width={14} height={100} fill={C.white} opacity={0.7} />
              <rect x={wx - 2} y={-630 + row * 200} width={4} height={120} fill={shade(wall, 0.3)} />
            </g>
          ))
        )}
        {/* central entrance door */}
        <rect x={-70} y={-230} width={140} height={190} rx={14} fill={C.brownDark} />
        <rect x={-58} y={-218} width={52} height={176} rx={6} fill={C.skyDeep} />
        <rect x={6} y={-218} width={52} height={176} rx={6} fill={C.skyDeep} />
        <rect x={-4} y={-230} width={8} height={190} fill={C.brownDark} />
        <rect x={-100} y={-262} width={200} height={20} rx={8} fill={roof} />
        {/* bell tower */}
        <rect x={-120} y={-930} width={240} height={200} rx={12} fill={wall} />
        <rect x={-150} y={-950} width={300} height={28} rx={10} fill={roof} />
        <rect x={-30} y={-900} width={60} height={110} rx={28} fill={C.greyDark} />
        <rect x={-20} y={-885} width={40} height={18} rx={8} fill={C.white} opacity={0.6} />
        {/* clock */}
        <circle cx={0} cy={-790} r={62} fill={C.white} />
        <rect x={-4} y={-840} width={8} height={40} rx={4} fill={C.ink} />
        <rect x={-4} y={-790} width={40} height={8} rx={4} fill={C.ink} />
        <circle cx={0} cy={-790} r={8} fill={roof} />
        {/* roof spire */}
        <path d="M -150 -950 L 0 -1040 L 150 -950 Z" fill={roof} />
        <rect x={-6} y={-1060} width={12} height={24} fill={C.greyDark} />
        {/* flag pole */}
        <rect x={-500} y={-520} width={8} height={520} fill={C.greyDark} />
      </g>
    </g>
  );
}

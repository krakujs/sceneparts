import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic mosque: a central dome, two slender minarets and a tall arched entrance. No emblems. Origin = bottom centre. About 880 px wide and 1220 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F4F1EA";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#3D6FE0";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={460} ry={22} fill={C.shadow} />
        <rect x={-440} y={-20} width={880} height={24} rx={6} fill={shade(wall, 0.2)} />
        {/* prayer hall */}
        <rect x={-340} y={-420} width={680} height={400} rx={10} fill={wall} />
        <rect x={-360} y={-440} width={720} height={26} rx={8} fill={shade(wall, 0.12)} />
        {/* central dome */}
        <rect x={-120} y={-560} width={240} height={130} rx={10} fill={wall} />
        <path d="M -160 -560 A 160 160 0 0 1 160 -560 Z" fill={roof} />
        <rect x={-6} y={-740} width={12} height={60} fill={C.yellowDark} />
        <circle cx={0} cy={-750} r={14} fill={C.yellow} />
        {/* two minarets */}
        {[-430, 430].map((mx) => (
          <g key={mx}>
            <rect x={mx - 42} y={-1050} width={84} height={1030} rx={10} fill={wall} />
            <rect x={mx - 56} y={-1080} width={112} height={36} rx={10} fill={C.white} />
            <path d={`M ${mx - 46} -1080 Q ${mx} -1180 ${mx + 46} -1080 Z`} fill={roof} />
            <rect x={mx - 6} y={-1200} width={12} height={36} fill={C.yellowDark} />
            <rect x={mx - 28} y={-900} width={56} height={90} rx={24} fill={C.sky} opacity={anim === "lights" ? lit(0) : 1} />
            <rect x={mx - 28} y={-700} width={56} height={90} rx={24} fill={C.sky} opacity={anim === "lights" ? lit(1) : 1} />
          </g>
        ))}
        {/* arched windows on the hall */}
        {[-260, -140, 140, 260].map((wx, i) => (
          <path key={wx} d={`M ${wx - 36} -300 V -370 A 36 36 0 0 1 ${wx + 36} -370 V -300 Z`} fill={C.sky} opacity={anim === "lights" ? lit(i + 2) : 1} />
        ))}
        {/* tall arched entrance */}
        <path d="M -100 -20 V -210 A 100 100 0 0 1 100 -210 V -20 Z" fill={C.brownDark} />
        <path d="M -78 -30 V -200 A 78 78 0 0 1 78 -200 V -30 Z" fill={C.skyDeep} />
      </g>
    </g>
  );
}

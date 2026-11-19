import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Library: a columned building with wide windows, a pediment and an open-book icon above the door. Origin = bottom centre. About 840 px wide and 1020 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#EFE9DC";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#3D6FE0";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={430} ry={20} fill={C.shadow} />
        <rect x={-400} y={-30} width={800} height={24} rx={6} fill={shade(wall, 0.2)} />
        <rect x={-380} y={-620} width={760} height={600} rx={10} fill={wall} />
        <path d="M -420 -620 L 0 -740 L 420 -620 Z" fill={roof} />
        <rect x={-420} y={-620} width={840} height={22} rx={6} fill={shade(roof, 0.2)} />
        {/* wide windows */}
        {[-300, 100].map((wx, i) => (
          <g key={wx}>
            <rect x={wx} y={-560} width={200} height={260} rx={12} fill={C.sky} opacity={anim === "lights" ? lit(i) : 1} />
            <rect x={wx + 10} y={-550} width={28} height={240} fill={C.white} opacity={0.6} />
            <rect x={wx + 96} y={-560} width={8} height={260} fill={shade(wall, 0.3)} />
            <rect x={wx - 8} y={-430} width={216} height={8} fill={shade(wall, 0.3)} />
          </g>
        ))}
        {/* columns */}
        {[-340, -240, 140, 240, 340].map((cx) => (
          <rect key={cx} x={cx - 14} y={-600} width={28} height={570} fill={C.white} />
        ))}
        {/* door and open-book icon above it */}
        <rect x={-70} y={-340} width={140} height={300} rx={10} fill={C.brownDark} />
        <rect x={-58} y={-326} width={52} height={280} rx={6} fill={C.skyDeep} />
        <rect x={6} y={-326} width={52} height={280} rx={6} fill={C.skyDeep} />
        <path d="M -90 -440 Q -45 -460 -4 -440 L -4 -400 Q -45 -420 -90 -400 Z" fill={C.white} />
        <path d="M 90 -440 Q 45 -460 4 -440 L 4 -400 Q 45 -420 90 -400 Z" fill={C.white} />
        <rect x={-6} y={-445} width={12} height={50} rx={4} fill={C.blue} />
        <rect x={-80} y={-410} width={70} height={6} rx={3} fill={C.blue} opacity={0.5} />
        <rect x={10} y={-410} width={70} height={6} rx={3} fill={C.blue} opacity={0.5} />
      </g>
    </g>
  );
}

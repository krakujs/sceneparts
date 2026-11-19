import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Gym: a modern building with a large glass front showing a dumbbell icon, a door and a blank roof sign band. Origin = bottom centre. About 840 px wide and 1000 px tall at s = 1 (the glass front lights up with anim lights).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#E4F1EA";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#FF8A3D";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={450} ry={22} fill={C.shadow} />
        <rect x={-420} y={-18} width={840} height={20} rx={6} fill={shade(wall, 0.2)} />
        {/* building body */}
        <rect x={-400} y={-640} width={800} height={620} rx={14} fill={wall} />
        <rect x={-420} y={-670} width={840} height={38} rx={10} fill={roof} />
        <rect x={-420} y={-652} width={840} height={12} fill={shade(roof, 0.2)} />
        {/* large glass front */}
        <rect x={-340} y={-560} width={680} height={520} rx={16} fill={C.sky} opacity={anim === "lights" ? lit(0) : 1} />
        {[-180, 0, 180].map((mx) => (
          <rect key={mx} x={mx - 6} y={-560} width={12} height={520} fill={shade(wall, 0.25)} />
        ))}
        <rect x={-320} y={-540} width={70} height={480} fill={C.white} opacity={0.5} />
        <rect x={-130} y={-540} width={40} height={480} fill={C.white} opacity={0.3} />
        {/* dumbbell icon on the glass */}
        <rect x={-120} y={-330} width={240} height={20} rx={8} fill={C.greyDark} />
        <rect x={-150} y={-390} width={36} height={120} rx={10} fill={C.ink} />
        <rect x={114} y={-390} width={36} height={120} rx={10} fill={C.ink} />
        <rect x={-180} y={-370} width={30} height={80} rx={8} fill={C.inkSoft} />
        <rect x={150} y={-370} width={30} height={80} rx={8} fill={C.inkSoft} />
        {/* entrance door */}
        <rect x={-70} y={-240} width={140} height={220} rx={10} fill={C.brownDark} />
        <rect x={-58} y={-228} width={52} height={196} rx={6} fill={C.skyDeep} />
        <rect x={6} y={-228} width={52} height={196} rx={6} fill={C.skyDeep} />
        {/* roof sign band (blank) */}
        <rect x={-260} y={-620} width={520} height={60} rx={12} fill={C.orange} />
      </g>
    </g>
  );
}

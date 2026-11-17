import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Police station: a plain civic building with a blue lamp over the door and a blank round badge sign. No words or emblems. Origin = bottom centre. About 800 px wide and 850 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#E4E9F2";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#2A50AE";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={420} ry={20} fill={C.shadow} />
        <rect x={-400} y={-14} width={800} height={20} rx={6} fill={shade(wall, 0.2)} />
        {/* main building */}
        <rect x={-380} y={-820} width={760} height={810} rx={14} fill={wall} />
        <rect x={-400} y={-850} width={800} height={40} rx={10} fill={roof} />
        <rect x={-400} y={-830} width={800} height={14} fill={shade(roof, 0.2)} />
        {/* windows, two rows */}
        {[-300, -150, 150, 300].map((wx, i) => [-700, -520].map((wy, j) => (
          <g key={`${wx}-${wy}`}>
            <rect x={wx - 50} y={wy} width={100} height={110} rx={8} fill={C.sky} opacity={anim === "lights" ? lit(i + j * 4) : 1} />
            <rect x={wx - 38} y={wy + 10} width={12} height={90} fill={C.white} opacity={0.65} />
            <rect x={wx - 2} y={wy} width={4} height={110} fill={shade(wall, 0.3)} />
          </g>
        )))}
        {/* blue lamp over the door */}
        <rect x={-18} y={-300} width={36} height={22} fill={C.greyDark} />
        <path d="M -40 -300 Q 0 -350 40 -300 Z" fill={C.blue} />
        <circle cx={0} cy={-316} r={22} fill={C.blue} opacity={anim === "lights" ? lit(0) : 0.9} />
        <circle cx={-6} cy={-322} r={6} fill={C.white} opacity={0.7} />
        {/* entrance */}
        <rect x={-80} y={-270} width={160} height={270} rx={10} fill={C.brownDark} />
        <rect x={-66} y={-256} width={58} height={240} rx={6} fill={C.skyDeep} />
        <rect x={8} y={-256} width={58} height={240} rx={6} fill={C.skyDeep} />
        {/* blank badge sign on the wall */}
        <circle cx={0} cy={-600} r={70} fill={C.navy} />
        <circle cx={0} cy={-600} r={52} fill={C.yellow} />
        <path d="M -30 -600 L 0 -620 L 30 -600 L 0 -580 Z" fill={C.navy} opacity={0.3} />
        {/* flagpole beside the door */}
        <rect x={430} y={-620} width={10} height={620} fill={C.greyDark} />
        <rect x={436} y={-620} width={70} height={44} fill={C.blue} opacity={0.6} />
      </g>
    </g>
  );
}

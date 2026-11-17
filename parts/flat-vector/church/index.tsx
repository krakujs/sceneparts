import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic small church with a steeple, a simple cross on top and arched windows. Origin = bottom centre. About 680 px wide and 1290 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F7F1E3";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#7B5CD6";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={360} ry={18} fill={C.shadow} />
        <rect x={-340} y={-16} width={680} height={20} rx={6} fill={shade(wall, 0.2)} />
        {/* nave */}
        <rect x={-300} y={-480} width={600} height={470} rx={10} fill={wall} />
        <path d="M -330 -480 L 0 -560 L 330 -480 Z" fill={roof} />
        {/* steeple tower */}
        <rect x={-130} y={-1000} width={260} height={540} rx={10} fill={wall} />
        <path d="M -150 -1000 L 0 -1190 L 150 -1000 Z" fill={roof} />
        <rect x={-150} y={-1010} width={300} height={22} rx={8} fill={shade(roof, 0.2)} />
        {/* simple cross on top */}
        <rect x={-8} y={-1290} width={16} height={100} rx={4} fill={C.greyDark} />
        <rect x={-30} y={-1260} width={60} height={14} rx={4} fill={C.greyDark} />
        {/* tower arched windows */}
        <path d="M -40 -860 V -920 A 40 40 0 0 1 40 -920 V -860 Z" fill={C.sky} />
        <path d="M -40 -700 V -760 A 40 40 0 0 1 40 -760 V -700 Z" fill={C.sky} opacity={anim === "lights" ? lit(0) : 1} />
        {/* nave arched windows */}
        {[-200, 0, 200].map((wx, i) => (
          <g key={wx}>
            <path d={`M ${wx - 36} -300 V -370 A 36 36 0 0 1 ${wx + 36} -370 V -300 Z`} fill={C.sky} opacity={anim === "lights" ? lit(i + 1) : 1} />
            <rect x={wx - 2} y={-370} width={4} height={70} fill={shade(wall, 0.3)} />
          </g>
        ))}
        {/* arched door */}
        <path d="M -70 -110 V -210 A 70 70 0 0 1 70 -210 V -110 Z" fill={C.brownDark} />
        <path d="M -54 -120 V -200 A 54 54 0 0 1 54 -200 V -120 Z" fill={C.skyDeep} />
      </g>
    </g>
  );
}

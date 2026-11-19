import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cinema: a facade with a marquee of lights, two blank poster frames and a film-reel icon above the doors. No words. Origin = bottom centre. About 860 px wide and 860 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#EEE8F6";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#E8503F";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={460} ry={22} fill={C.shadow} />
        <rect x={-430} y={-22} width={860} height={22} rx={6} fill={shade(wall, 0.2)} />
        <rect x={-380} y={-820} width={760} height={800} rx={12} fill={wall} />
        <rect x={-400} y={-846} width={800} height={34} rx={10} fill={roof} />
        {/* marquee sign with lights */}
        <rect x={-260} y={-760} width={520} height={110} rx={12} fill={C.ink} />
        <rect x={-236} y={-736} width={472} height={58} rx={8} fill={C.white} opacity={0.9} />
        {[-240, -160, -80, 0, 80, 160, 240].map((lx, i) => (
          <circle key={lx} cx={lx} cy={-650} r={8} fill={C.yellow} opacity={anim === "lights" ? lit(i) : 1} />
        ))}
        {/* blank poster frames */}
        {[-300, 110].map((px, i) => (
          <g key={px}>
            <rect x={px} y={-620} width={190} height={260} rx={10} fill={C.greyDark} />
            <rect x={px + 14} y={-606} width={162} height={232} rx={6} fill={C.greyLight} />
            <rect x={px + 14} y={-606} width={162} height={20} fill={C.white} opacity={0.6} />
          </g>
        ))}
        {/* film-reel icon */}
        <circle cx={0} cy={-300} r={70} fill={C.greyDark} />
        <circle cx={0} cy={-300} r={56} fill={C.ink} />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 34} cy={-300 + Math.sin((a * Math.PI) / 180) * 34} r={12} fill={C.greyDark} />
        ))}
        <circle cx={0} cy={-300} r={14} fill={C.grey} />
        {/* entrance doors */}
        <rect x={-110} y={-290} width={220} height={290} rx={12} fill={C.brownDark} />
        <rect x={-96} y={-276} width={84} height={260} rx={8} fill={C.skyDeep} />
        <rect x={12} y={-276} width={84} height={260} rx={8} fill={C.skyDeep} />
      </g>
    </g>
  );
}

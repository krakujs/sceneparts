import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bakery shop front: a bread-loaf icon sign, a striped-free awning, loaves on display in the window and a door.
// Origin = bottom centre on the ground. About 640 px wide and 700 px tall at s = 1.
// anim "lights": the loaves in the window glow warm one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.pink;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const loaves = [-210, -110, -10, 90];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={330} ry={18} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* building */}
        <rect x={-300} y={-600} width={600} height={600} rx={14} fill={wall} />
        <rect x={-320} y={-640} width={640} height={50} rx={10} fill={trim} />
        <rect x={-300} y={-22} width={600} height={14} fill={shade(wall, 0.15)} />
        {/* bread-loaf icon sign on a bracket */}
        <rect x={-6} y={-720} width={8} height={90} fill={C.greyDark} />
        <rect x={-84} y={-762} width={170} height={70} rx={34} fill={C.yellowDark} />
        <rect x={-74} y={-752} width={150} height={20} rx={10} fill={C.yellow} />
        <path d="M -40 -712 L -20 -730 M -2 -712 L 18 -730 M 36 -712 L 56 -730" stroke={C.white} strokeWidth={7} strokeLinecap="round" />
        {/* striped-free canopy */}
        <path d="M -316 -470 L 316 -470 L 330 -420 L -330 -420 Z" fill={trim} />
        <rect x={-330} y={-424} width={660} height={8} fill={shade(trim, 0.25)} />
        {/* shop window with loaves */}
        <rect x={-270} y={-390} width={260} height={230} rx={12} fill={C.greyDark} />
        <rect x={-258} y={-378} width={236} height={206} rx={8} fill={C.sky} />
        <path d="M -230 -378 L -200 -378 L -240 -172 L -262 -172 Z" fill={C.white} opacity={0.35} />
        <rect x={-258} y={-200} width={236} height={28} fill={C.sand} />
        {loaves.map((lx, i) => {
          const on = anim === "lights" && Math.floor(f / 6) % loaves.length >= i;
          return (
            <g key={lx}>
              <ellipse cx={lx - 15} cy={-220} rx={42} ry={26} fill={on ? C.yellow : C.yellowDark} />
              <path d={`M ${lx - 30} -232 L ${lx - 16} -246 M ${lx - 10} -234 L ${lx + 4} -248`} stroke={C.brown} strokeWidth={5} strokeLinecap="round" />
            </g>
          );
        })}
        {/* door and small window */}
        <rect x={60} y={-390} width={170} height={368} rx={12} fill={C.brownDark} />
        <rect x={78} y={-372} width={134} height={130} rx={8} fill={C.sky} />
        <circle cx={206} cy={-100} r={9} fill={C.yellow} />
        <rect x={80} y={-226} width={130} height={10} fill={C.brown} />
        {/* cake-stand style counter outside */}
        <rect x={-300} y={-12} width={600} height={12} fill={C.greyDark} />
      </g>
    </g>
  );
}

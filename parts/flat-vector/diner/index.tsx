import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// American roadside diner: a long low building with rounded corners, a chrome band, a wide row of windows, a door with
// a striped awning and a step, and a big blank sign board (a coffee cup, no words) on a pole on the roof.
// Origin = centre of the ground line (y). About 880 px wide and 830 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = pick(p.color, "#F6E7C8");
  const trim = pick(p.color2, C.red);
  const anim: string = p.anim ?? "none";
  const on = anim === "lights" ? (Math.floor(f / 10) % 2 ? 1 : 0.55) : 1;
  const chrome = C.greyLight;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-4} rx={470} ry={22} fill={C.shadow} />
        {/* sign pole on the roof, then the blank sign board with a coffee cup */}
        <rect x={-10} y={-680} width={20} height={260} fill={chrome} />
        <rect x={-200} y={-830} width={400} height={160} rx={24} fill={C.white} />
        <rect x={-186} y={-816} width={372} height={132} rx={18} fill={trim} opacity={anim === "lights" ? on : 1} />
        <path d="M -44 -770 L 44 -770 L 38 -716 Q 36 -700 18 -700 L -18 -700 Q -36 -700 -38 -716 Z" fill={C.white} />
        <path d="M 44 -758 Q 74 -750 66 -728 Q 58 -712 36 -716" stroke={C.white} strokeWidth={8} fill="none" strokeLinecap="round" />
        <rect x={-70} y={-700} width={140} height={10} rx={5} fill={C.white} />
        {/* flat roof and body with rounded corners */}
        <rect x={-440} y={-430} width={880} height={28} rx={14} fill={trim} />
        <rect x={-420} y={-402} width={840} height={372} rx={50} fill={wall} />
        <rect x={-420} y={-232} width={840} height={18} fill={chrome} />
        <rect x={-420} y={-232} width={840} height={5} fill={C.white} opacity={0.8} />
        <rect x={-420} y={-52} width={840} height={22} rx={6} fill={shade(wall, 0.2)} />
        {/* wide windows with a diagonal reflection */}
        {[[-380, -90], [90, 380]].map(([wx1, wx2], i) => (
          <g key={i}>
            <rect x={wx1} y={-370} width={wx2 - wx1} height={118} rx={16} fill={C.sky} />
            <path d={`M ${wx1 + 30} -362 L ${wx1 + 90} -362 L ${wx1 + 40} -260 L ${wx1 + 0} -260 Z`} fill={C.white} opacity={0.5} />
            <rect x={wx1} y={-370} width={wx2 - wx1} height={118} rx={16} fill="none" stroke={chrome} strokeWidth={10} />
            <rect x={wx1 + (wx2 - wx1) / 2 - 4} y={-370} width={8} height={118} fill={chrome} />
          </g>
        ))}
        {/* door with a striped awning and a step */}
        <rect x={-60} y={-300} width={120} height={250} rx={10} fill={C.brownDark} />
        <rect x={-48} y={-288} width={96} height={226} rx={8} fill={C.skyDeep} />
        <rect x={-4} y={-288} width={8} height={226} fill={C.brownDark} />
        <path d="M -110 -330 L 110 -330 L 130 -296 L -130 -296 Z" fill={trim} />
        {[-80, -40, 0, 40, 80].map((ax) => (
          <rect key={ax} x={ax - 10} y={-330} width={20} height={34} fill={C.white} opacity={0.55} />
        ))}
        <rect x={-80} y={-52} width={160} height={52} rx={8} fill={shade(wall, 0.12)} />
        <rect x={-90} y={-30} width={180} height={30} rx={8} fill={shade(wall, 0.25)} />
      </g>
    </g>
  );
}

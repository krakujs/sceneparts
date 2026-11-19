import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small single-storey clinic with an awning, two windows and a green cross sign on a pole (green, not red). Origin = bottom centre. About 780 px wide and 800 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F7F3EC";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#4BB46A";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={380} ry={20} fill={C.shadow} />
        <rect x={-380} y={-10} width={760} height={16} rx={6} fill={shade(wall, 0.2)} />
        {/* low building */}
        <rect x={-360} y={-380} width={720} height={370} rx={12} fill={wall} />
        <rect x={-380} y={-410} width={760} height={36} rx={10} fill={roof} />
        <rect x={-380} y={-392} width={760} height={12} fill={shade(roof, 0.2)} />
        {/* awning with stripes */}
        <path d="M -260 -300 L 260 -300 L 300 -250 L -300 -250 Z" fill={C.white} />
        {[-220, -140, -60, 20, 100, 180].map((ax, i) => (
          <path key={ax} d={`M ${ax} -300 L ${ax + 40} -300 L ${ax + 70} -250 L ${ax + 30} -250 Z`} fill={i % 2 ? C.green : C.white} opacity={0.9} />
        ))}
        {/* door and windows */}
        <rect x={-70} y={-240} width={140} height={230} rx={10} fill={C.brownDark} />
        <rect x={-58} y={-226} width={116} height={200} rx={6} fill={C.skyDeep} />
        <rect x={-250} y={-240} width={150} height={120} rx={10} fill={C.sky} opacity={anim === "lights" ? lit(0) : 1} />
        <rect x={100} y={-240} width={150} height={120} rx={10} fill={C.sky} opacity={anim === "lights" ? lit(1) : 1} />
        <rect x={-242} y={-232} width={18} height={104} fill={C.white} opacity={0.6} />
        <rect x={108} y={-232} width={18} height={104} fill={C.white} opacity={0.6} />
        {/* green cross sign on a pole */}
        <rect x={280} y={-700} width={12} height={700} fill={C.greyDark} />
        <rect x={180} y={-790} width={210} height={150} rx={18} fill={C.white} />
        <rect x={255} y={-770} width={60} height={110} rx={8} fill={C.green} />
        <rect x={215} y={-735} width={140} height={40} rx={8} fill={C.green} />
      </g>
    </g>
  );
}

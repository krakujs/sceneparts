import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Observatory: a round-walled building under a domed roof. The dome slit is open and a telescope pokes out of it.
// Origin = ground under the centre. About 640 px wide and 790 px tall at s = 1 (telescope tip included).
// anim "lights": the windows glow one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const arch = (xc: number, yb: number, w: number, h: number) => {
  const r = w / 2, yt = yb - h + r;
  return `M ${f1(xc - r)} ${f1(yb)} V ${f1(yt)} A ${f1(r)} ${f1(r)} 0 0 1 ${f1(xc + r)} ${f1(yt)} V ${f1(yb)} Z`;
};
const win = (key: string, x0: number, y0: number, w: number, h: number, glow: boolean) => (
  <g key={key}>
    <rect x={x0} y={y0} width={w} height={h} rx={6} fill={glow ? C.yellow : C.sky} />
    <path d={`M ${f1(x0 + w * 0.15)} ${f1(y0 + h)} L ${f1(x0 + w * 0.42)} ${f1(y0)} L ${f1(x0 + w * 0.56)} ${f1(y0)} L ${f1(x0 + w * 0.29)} ${f1(y0 + h)} Z`} fill={C.white} opacity={0.5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.paper;
  const dome = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 4 === k;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={360} ry={18} fill={C.shadow} />
        {/* walls and plinth */}
        <rect x={-300} y={-460} width={600} height={460} fill={wall} />
        <rect x={-320} y={-30} width={640} height={30} rx={6} fill={shade(wall, 0.25)} />
        <rect x={-310} y={-470} width={620} height={14} rx={4} fill={shade(dome, 0.15)} />
        {/* dome with shaded right half */}
        <path d="M -300 -460 A 300 300 0 0 1 300 -460 Z" fill={dome} />
        <path d="M 0 -460 L 0 -760 A 300 300 0 0 1 300 -460 Z" fill={shade(dome, 0.18)} />
        {/* open slit in the dome */}
        <path d="M 0 -460 L 219 -665 A 300 300 0 0 1 267 -596 Z" fill={C.navy} />
        {/* telescope tube poking out of the slit */}
        <g transform="translate(0 -460) rotate(-35)">
          <rect x={-60} y={-16} width={36} height={32} rx={6} fill={C.greyDark} />
          <rect x={-30} y={-26} width={340} height={52} rx={12} fill={C.greyDark} />
          <rect x={300} y={-34} width={20} height={68} rx={6} fill={C.inkSoft} />
          <ellipse cx={322} cy={0} rx={10} ry={28} fill={C.skyDeep} />
          <rect x={60} y={-30} width={60} height={60} rx={8} fill={C.grey} />
        </g>
        <circle cx={0} cy={-460} r={34} fill={C.greyDark} />
        {/* door and windows */}
        <path d={arch(0, -30, 120, 190)} fill={C.brownDark} />
        <circle cx={34} cy={-130} r={5} fill={C.yellow} />
        {win("w1", -210, -340, 70, 96, lit(0))}
        {win("w2", 140, -340, 70, 96, lit(1))}
        {win("w3", -210, -190, 70, 96, lit(2))}
        {win("w4", 140, -190, 70, 96, lit(3))}
        <rect x={-300} y={-360} width={600} height={8} fill={shade(wall, 0.12)} />
      </g>
    </g>
  );
}

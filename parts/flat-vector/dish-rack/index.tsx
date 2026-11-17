import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dish rack: metal drying rack with three white plates standing in it and two cups on the tray.
// color = rack colour, color2 = cup colour. Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const rack = p.color && p.color !== "none" ? p.color : "#9AA3B5";
  const cup = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const rackDk = shade(rack, 0.2), cupDk = shade(cup, 0.2);
  const plate = (cx: number, key: number) => (
    <g key={key} transform={`rotate(-4 ${cx} -150)`}>
      <ellipse cx={cx} cy={-150} rx={34} ry={110} fill={C.white} />
      <ellipse cx={cx} cy={-150} rx={22} ry={90} fill={shade(C.white, 0.08)} />
    </g>
  );
  const cupShape = (cx: number, key: number) => (
    <g key={key}>
      <path d={`M ${cx + 30} -96 Q ${cx + 52} -96 ${cx + 52} -76 Q ${cx + 52} -58 ${cx + 28} -58`} fill="none" stroke={cupDk} strokeWidth={10} strokeLinecap="round" />
      <path d={`M ${cx - 34} -112 L ${cx + 34} -112 L ${cx + 26} -48 Q ${cx + 24} -40 ${cx + 16} -40 L ${cx - 16} -40 Q ${cx - 24} -40 ${cx - 26} -48 Z`} fill={cup} />
      <ellipse cx={cx} cy={-112} rx={34} ry={10} fill={shade(cup, -0.15)} />
      <ellipse cx={cx} cy={-112} rx={26} ry={7} fill={shade(cup, 0.45)} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* back rail */}
        <rect x={-200} y={-250} width={400} height={14} rx={7} fill={rackDk} />
        {/* plates standing in the rack */}
        {plate(-130, 0)}
        {plate(-70, 1)}
        {plate(-10, 2)}
        {/* cups on the tray */}
        {cupShape(80, 0)}
        {cupShape(136, 1)}
        {/* tray */}
        <rect x={-200} y={-40} width={400} height={30} rx={10} fill={rack} />
        <rect x={-200} y={-18} width={400} height={12} rx={6} fill={rackDk} />
        {/* uprights */}
        <rect x={-200} y={-260} width={16} height={222} rx={8} fill={rack} />
        <rect x={184} y={-260} width={16} height={222} rx={8} fill={rackDk} />
      </g>
    </g>
  );
}

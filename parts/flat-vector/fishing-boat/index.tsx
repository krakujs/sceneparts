import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small trawler, side view facing right. Origin = waterline centre. Room scale: about 660 px wide.
// Wheelhouse with windows, a mast with a net boom reaching over the stern, a lifebuoy. anim "drive" rocks it.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 85) * 1.8)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 40} y={8} width={80} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 130} y={18} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const hull = p.color && p.color !== "none" ? p.color : C.red;
  const house = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* mast and net boom */}
        <rect x={-66} y={-470} width={12} height={230} fill={C.greyDark} />
        <line x1={-60} y1={-420} x2={-330} y2={-130} stroke={C.greyDark} strokeWidth={12} strokeLinecap="round" />
        <path d="M -330 -130 L -272 -22 L -372 -22 Z" fill={C.sand} opacity={0.7} />
        {/* hull with a darker band */}
        <path d="M -320 -100 L 320 -100 L 270 12 L -270 12 Z" fill={hull} />
        <rect x={-320} y={-66} width={620} height={16} fill={shade(hull, 0.25)} />
        <circle cx={200} cy={-40} r={16} fill="none" stroke={C.orange} strokeWidth={10} />
        <rect x={-330} y={-112} width={660} height={14} rx={6} fill={C.greyDark} />
        {/* wheelhouse */}
        <rect x={-120} y={-236} width={190} height={128} rx={12} fill={house} />
        <rect x={-134} y={-256} width={218} height={26} rx={10} fill={C.greyLight} />
        <rect x={-100} y={-218} width={150} height={52} rx={8} fill={C.sky} />
        <rect x={-28} y={-218} width={8} height={52} fill={C.greyLight} />
        <rect x={32} y={-184} width={38} height={76} rx={4} fill={C.greyLight} />
      </g>
      <Water w={700} />
    </g>
  );
}

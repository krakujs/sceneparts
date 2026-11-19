import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sailing boat, side view facing right. Origin = waterline centre; the hull sits in the water.
// Room scale: about 600 px wide and 610 px tall at s = 1. anim "drive" rocks it on the waves.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 90) * 1.8)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// Light water strip at the waterline, drawn in front of the hull so it reads as afloat.
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 50} y={8} width={70} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 120} y={18} width={80} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const hull = p.color && p.color !== "none" ? p.color : C.blue;
  const sail = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* mast, mainsail, jib and boom */}
        <rect x={-8} y={-600} width={16} height={516} fill={C.greyDark} />
        <path d="M -14 -576 Q -170 -330 -236 -104 L -14 -104 Z" fill={sail} />
        <path d="M 14 -560 Q 170 -330 262 -104 L 14 -104 Z" fill={shade(sail, 0.14)} />
        <rect x={-252} y={-116} width={256} height={14} rx={7} fill={C.greyDark} />
        <path d="M -8 -600 L 52 -587 L -8 -574 Z" fill={C.red} />
        {/* hull with a darker lower shade and white rail */}
        <path d="M -300 -96 L 300 -96 L 236 12 L -236 12 Z" fill={hull} />
        <path d="M -262 -50 L 262 -50 L 236 12 L -236 12 Z" fill={shade(hull, 0.2)} />
        <rect x={-300} y={-110} width={600} height={16} rx={8} fill={C.white} />
      </g>
      <Water w={640} />
    </g>
  );
}

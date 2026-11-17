import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long open canoe, side view facing right. Origin = waterline centre. Room scale: about 760 px wide.
// The bow and stern tips point up; a single paddle dips in and out in anim "drive".
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 90) * 1.6)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 80} y={8} width={80} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 170} y={18} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const hull = p.color && p.color !== "none" ? p.color : C.orange;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const anim: string = p.anim ?? "none";
  const dip = anim === "drive" ? Math.sin((f * 2 * Math.PI) / 70) * 10 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* hull: pointed upturned ends, curved bottom and an open dark interior */}
        <path d="M -380 -124 Q -190 -26 0 -36 Q 190 -26 380 -124 Q 280 0 0 12 Q -280 0 -380 -124 Z" fill={hull} />
        <path d="M -350 -120 Q -190 -40 0 -50 Q 190 -40 350 -120 Q 180 -20 0 -20 Q -180 -20 -350 -120 Z" fill={shade(hull, 0.35)} />
        {/* the paddle: grip above the canoe, blade in the water */}
        <g transform={`translate(40 -150) rotate(${f1(-20 + dip)})`}>
          <rect x={-6} y={0} width={12} height={172} rx={6} fill={wood} />
          <circle cx={0} cy={0} r={14} fill={C.brownDark} />
          <rect x={-24} y={148} width={48} height={52} rx={22} fill={wood} />
        </g>
      </g>
      <Water w={700} />
    </g>
  );
}

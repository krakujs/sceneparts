import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stool: round wooden seat (ellipse top with a shaded rim) on splayed legs. variant low = kitchen stool;
// bar = tall bar stool with a footrest ring between the legs. Origin = bottom centre.
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
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const bar = p.variant === "bar";
  const SEAT = bar ? -640 : -400; // seat top height above the floor
  const legEnd = 40; // legs splay out to the floor
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* back leg in shade, behind the others */}
        <line x1={0} y1={SEAT + 50} x2={0} y2={-legEnd} stroke={dk} strokeWidth={30} strokeLinecap="round" />
        {/* front legs */}
        <line x1={-70} y1={SEAT + 50} x2={-150} y2={-legEnd} stroke={c} strokeWidth={34} strokeLinecap="round" />
        <line x1={70} y1={SEAT + 50} x2={150} y2={-legEnd} stroke={c} strokeWidth={34} strokeLinecap="round" />
        {bar && <rect x={-150} y={-260} width={300} height={22} rx={11} fill={dk} />}
        {/* round seat: shaded rim then top */}
        <rect x={-190} y={SEAT} width={380} height={50} rx={6} fill={dk} />
        <ellipse cx={0} cy={SEAT + 50} rx={190} ry={46} fill={dk} />
        <ellipse cx={0} cy={SEAT} rx={190} ry={46} fill={c} />
        <ellipse cx={-30} cy={SEAT - 6} rx={120} ry={22} fill="#FFFFFF" opacity={0.12} />
      </g>
    </g>
  );
}

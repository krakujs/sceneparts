import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stethoscope laid out flat, the classic icon: two metal ear tubes with earpieces at the top meet at a
// Y joint; one long tube loops down and round to the round chest piece resting on the ground.
// Origin = bottom centre (the chest piece rests on y). About 420 px wide and 600 px tall at s = 1.
// anim "sway" rocks it gently from the chest piece.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "sway" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 70) * 3)} -110 -70)` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const tube = p.color && p.color !== "none" ? p.color : C.tealDark;
  const metal = "#C9D0DC", metalDk = shade(metal, 0.25);
  const anim: string = p.anim ?? "none";
  const tubing = "M 10 -372 C 10 -300 40 -260 110 -240 C 200 -214 210 -110 140 -80 C 80 -54 -20 -100 -60 -100";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-20} cy={0} rx={220} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* metal ear tubes: bow outwards then meet at the Y joint */}
        <path d="M -150 -592 C -190 -520 -120 -440 -14 -396" stroke={metalDk} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d="M 150 -592 C 190 -520 120 -440 34 -396" stroke={metalDk} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d="M -150 -592 C -190 -520 -120 -440 -14 -396" stroke={metal} strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d="M 150 -592 C 190 -520 120 -440 34 -396" stroke={metal} strokeWidth={10} fill="none" strokeLinecap="round" />
        {/* tension spring bar between the ear tubes */}
        <rect x={-120} y={-506} width={240} height={14} rx={7} fill={metalDk} />
        {/* earpieces */}
        <ellipse cx={-152} cy={-600} rx={22} ry={18} fill={C.ink} />
        <ellipse cx={152} cy={-600} rx={22} ry={18} fill={C.ink} />
        {/* Y joint */}
        <path d="M -24 -404 L 44 -404 L 26 -360 L -6 -360 Z" fill={shade(tube, 0.2)} />
        {/* long tube looping down to the chest piece */}
        <path d={tubing} stroke={shade(tube, 0.25)} strokeWidth={30} fill="none" strokeLinecap="round" />
        <path d={tubing} stroke={tube} strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d="M 120 -236 C 180 -214 192 -150 166 -112" stroke={C.white} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.3} />
        {/* stem and chest piece resting on the ground */}
        <rect x={-92} y={-114} width={44} height={30} rx={8} fill={metalDk} />
        <ellipse cx={-110} cy={-44} rx={84} ry={44} fill={metalDk} />
        <ellipse cx={-110} cy={-56} rx={84} ry={44} fill={metal} />
        <ellipse cx={-110} cy={-58} rx={60} ry={30} fill={C.greyLight} />
        <ellipse cx={-110} cy={-58} rx={26} ry={13} fill={shade(metal, 0.12)} />
      </g>
    </g>
  );
}

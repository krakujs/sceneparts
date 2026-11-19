import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stopwatch standing on a small foot: a round case with a white face, twelve hour ticks, a minute hand
// and a coloured second hand, and a crown button on a stem at the top. Origin = bottom centre.
// About 520 px wide and 680 px tall at s = 1. anim "tick" moves the second hand once a second.
const f1 = (v: number) => v.toFixed(1);
const CY = -340, R = 250; // face centre height and case radius

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const caseC = p.color && p.color !== "none" ? p.color : C.blue;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  // 30 fps: one tick (6 degrees) every 30 frames, so the hand jumps once a second
  const secAng = anim === "tick" ? Math.floor(f / 30) * 6 : 90;
  const ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* foot and neck */}
        <rect x={-130} y={-60} width={260} height={60} rx={20} fill={shade(caseC, 0.25)} />
        <rect x={-46} y={-110} width={92} height={60} fill={shade(caseC, 0.1)} />
        {/* crown stem and button */}
        <rect x={-30} y={-640} width={60} height={60} fill={shade(caseC, 0.1)} />
        <rect x={-70} y={-690} width={140} height={60} rx={22} fill={accent} />
        <rect x={-70} y={-690} width={140} height={18} rx={9} fill={shade(accent, 0.2)} />
        {/* ring at the side of the stem */}
        <rect x={-14} y={-620} width={28} height={28} rx={8} fill={C.greyDark} />
        {/* case with a darker shade rim */}
        <circle cx={0} cy={CY} r={R} fill={caseC} />
        <circle cx={0} cy={CY} r={R - 16} fill={shade(caseC, 0.2)} />
        {/* face */}
        <circle cx={0} cy={CY} r={R - 34} fill={C.white} />
        {ticks.map((i) => (
          <rect key={i} x={-5} y={CY - (R - 34) + 18} width={10} height={i % 3 === 0 ? 34 : 18} rx={3}
            fill={C.ink} transform={`rotate(${i * 30} 0 ${CY})`} />
        ))}
        {/* minute hand at 10 minutes */}
        <g transform={`translate(0 ${CY}) rotate(60)`}>
          <rect x={-9} y={-150} width={18} height={150} rx={9} fill={C.ink} />
        </g>
        {/* second hand with a counterweight tail */}
        <g transform={`translate(0 ${CY}) rotate(${secAng})`}>
          <rect x={-5} y={-190} width={10} height={210} rx={5} fill={accent} />
          <circle cx={0} cy={0} r={0} fill={accent} />
        </g>
        {/* centre pin */}
        <circle cx={0} cy={CY} r={16} fill={C.ink} />
        <circle cx={0} cy={CY} r={7} fill={accent} />
        {/* glass shine */}
        <path d={`M -150 ${CY - 60} Q -120 ${CY - 150} -40 ${CY - 185}`} stroke={C.white} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.35} />
      </g>
    </g>
  );
}

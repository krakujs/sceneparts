import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Knitted crew-neck sweater with ribbed neck, cuffs and hem, on a wooden coat hanger. Origin = bottom centre:
// the hem rests on y, the hook is the highest point. About 560 px wide and 690 px tall at s = 1.
// anim "sway": the garment swings gently from the hook.
const f1 = (v: number) => v.toFixed(1);
const WOOD = "#C9A272";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const knit = p.color && p.color !== "none" ? p.color : C.red;
  const rib = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 3 : 0;
  const sleeve = (side: 1 | -1) => (
    <g>
      <path d={`M ${-150 * side} -440 L ${-265 * side} -130 L ${-205 * side} -106 L ${-118 * side} -350 Z`} fill={knit} />
      <path d={`M ${-265 * side} -130 L ${-205 * side} -106 L ${-200 * side} -74 L ${-258 * side} -100 Z`} fill={rib} />
      <path d={`M ${-150 * side} -440 L ${-190 * side} -400 L ${-230 * side} -300 L ${-175 * side} -310 Z`} fill={shade(knit, 0.15)} opacity={0.5} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={250} ry={14} fill={C.shadow} />
      {/* hanger, behind the garment */}
      <path d="M 0 -600 L 0 -636 Q 0 -684 30 -684 Q 52 -684 46 -660" stroke={WOOD} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -150 -432 L 0 -600 L 150 -432" stroke={WOOD} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`rotate(${f1(sw)} 0 -600)`}>
        {sleeve(1)}
        {sleeve(-1)}
        {/* body */}
        <path d="M -150 -440 L 150 -440 L 160 -30 Q 0 -10 -160 -30 Z" fill={knit} />
        <path d="M 110 -430 L 150 -440 L 160 -30 L 122 -34 Q 120 -200 110 -430 Z" fill={shade(knit, 0.15)} opacity={0.55} />
        {/* knit rows */}
        {[-360, -300, -240, -180, -120].map((yy) => (
          <path key={yy} d={`M -120 ${yy} Q -60 ${yy + 10} 0 ${yy} Q 60 ${yy + 10} 120 ${yy}`} stroke={shade(knit, 0.22)} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />
        ))}
        {/* ribbed hem */}
        <path d="M -160 -62 L 160 -62 L 162 -30 Q 0 -10 -162 -30 Z" fill={rib} />
        {[-140, -110, -80, -50, -20, 10, 40, 70, 100, 130].map((rx) => <line key={rx} x1={rx} y1={-60} x2={rx} y2={-32} stroke={shade(rib, 0.2)} strokeWidth={4} />)}
        {/* ribbed neck */}
        <ellipse cx={0} cy={-440} rx={68} ry={26} fill={rib} />
        <ellipse cx={0} cy={-440} rx={50} ry={16} fill={shade(knit, 0.35)} />
      </g>
    </g>
  );
}

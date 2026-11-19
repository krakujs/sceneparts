import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Coat rack: standing hall coat tree on a round three-leg base, with a coat and a hat hanging from its hooks.
// Origin = bottom centre; faces the viewer, honours flip, s and anim. Room scale (about 1000 px tall).
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(wood, 0.2);
  const coat = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const coatDk = shade(coat, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={20} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* three feet */}
        <path d="M 0 -40 L -210 -10 Q -220 0 -200 0 L 200 0 Q 220 0 210 -10 Z" fill={dk} />
        <rect x={-214} y={-36} width={60} height={36} rx={18} fill={dk} />
        <rect x={154} y={-36} width={60} height={36} rx={18} fill={dk} />
        {/* central pole */}
        <rect x={-14} y={-960} width={28} height={940} rx={14} fill={wood} />
        <rect x={4} y={-960} width={10} height={940} rx={5} fill={dk} opacity={0.5} />
        {/* hall tree top */}
        <ellipse cx={0} cy={-960} rx={22} ry={12} fill={dk} />
        {/* hooks: left and right arms at the top */}
        <path d="M -14 -850 Q -120 -860 -150 -820" fill="none" stroke={wood} strokeWidth={22} strokeLinecap="round" />
        <path d="M 14 -850 Q 120 -860 150 -820" fill="none" stroke={wood} strokeWidth={22} strokeLinecap="round" />
        <circle cx={-150} cy={-820} r={18} fill={dk} />
        <circle cx={150} cy={-820} r={18} fill={dk} />
        {/* coat hung on the middle hook */}
        <path d="M -150 -760 Q -150 -800 -120 -800 L 120 -800 Q 150 -800 150 -760 L 178 -470 Q 180 -440 150 -440 L -150 -440 Q -180 -440 -178 -470 Z" fill={coat} />
        <path d="M 60 -800 L 150 -760 L 178 -470 Q 180 -440 150 -440 L 60 -440 Z" fill={coatDk} opacity={0.7} />
        <rect x={-6} y={-800} width={12} height={360} fill={coatDk} opacity={0.5} />
        <path d="M -150 -760 Q -200 -740 -208 -560 L -176 -552 Q -170 -700 -120 -730 Z" fill={coat} />
        <path d="M 150 -760 Q 200 -740 208 -560 L 176 -552 Q 170 -700 120 -730 Z" fill={coatDk} />
        {/* buttons */}
        <circle cx={-40} cy={-690} r={9} fill={C.yellow} />
        <circle cx={-40} cy={-600} r={9} fill={C.yellow} />
        {/* hat on the top hook, generic crown and brim */}
        <ellipse cx={0} cy={-930} rx={120} ry={22} fill={C.greyDark} />
        <path d="M -70 -930 Q -70 -1010 -40 -1010 L 40 -1010 Q 70 -1010 70 -930 Z" fill={C.greyDark} />
        <rect x={-70} y={-950} width={140} height={20} rx={8} fill={C.ink} opacity={0.5} />
      </g>
    </g>
  );
}

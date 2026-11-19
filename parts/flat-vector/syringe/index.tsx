import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Medical syringe lying flat: barrel with liquid, finger flange, plunger, needle hub and needle.
// Origin = bottom centre (the barrel rests on y). About 740 px wide and 150 px tall at s = 1.
// anim "push": the plunger slides in and out, and a drop forms at the needle tip.
const f1 = (v: number) => v.toFixed(1);
const YC = -62; // centre line of the barrel

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const med = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const ph = (f % 90) / 90;
  const sx = anim === "push" ? -200 + 260 * (0.5 - 0.5 * Math.cos(2 * Math.PI * ph)) : -70;
  const dropT = anim === "push" ? Math.min(1, Math.max(0, (ph - 0.3) / 0.3)) : 0;
  const dropY = YC - 6 + dropT * 50;
  const dropOp = anim === "push" ? (ph > 0.3 && ph < 0.7 ? 1 : 0) : 0;
  const glass = "#E3F3FA";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={12} fill={C.shadow} />
      {/* barrel */}
      <rect x={-250} y={YC - 58} width={360} height={116} rx={16} fill={glass} />
      {/* plunger rod and rubber stopper */}
      <rect x={-360} y={YC - 9} width={sx + 360} height={18} rx={6} fill={C.greyDark} />
      {/* medicine between the stopper and the needle hub */}
      <rect x={sx} y={YC - 44} width={110 - sx} height={88} fill={med} />
      <rect x={sx} y={YC - 44} width={110 - sx} height={12} fill={shade(med, 0.2)} />
      <rect x={sx - 12} y={YC - 52} width={24} height={104} rx={6} fill={C.greyDark} />
      {/* graduation marks on the top of the barrel */}
      {[-200, -150, -100, -50, 0, 50].map((gx) => (
        <path key={gx} d={`M ${gx} ${YC - 58} L ${gx} ${YC - 40}`} stroke={C.greyDark} strokeWidth={5} strokeLinecap="round" />
      ))}
      {/* finger flange at the back and thumb pad on the plunger */}
      <rect x={-272} y={YC - 66} width={34} height={132} rx={10} fill={C.grey} />
      <rect x={-382} y={YC - 30} width={22} height={60} rx={8} fill={C.greyDark} />
      {/* hub and needle */}
      <rect x={110} y={YC - 20} width={40} height={40} rx={6} fill={C.grey} />
      <rect x={148} y={YC - 4} width={176} height={8} rx={4} fill={C.greyDark} />
      {/* drop at the needle tip */}
      <g opacity={dropOp}>
        <path d={`M 324 ${f1(dropY - 22)} Q 336 ${f1(dropY - 4)} 336 ${f1(dropY + 4)} A 12 12 0 0 1 312 ${f1(dropY + 4)} Q 312 ${f1(dropY - 4)} 324 ${f1(dropY - 22)} Z`} fill={med} />
      </g>
    </g>
  );
}

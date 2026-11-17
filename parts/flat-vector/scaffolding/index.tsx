import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Metal tube scaffold tower with four wooden plank decks, cross braces and a top deck. Room scale.
// Origin = floor centre under the tower. Size at s = 1: about 700 px wide and 940 px tall.
// anim "sway": the whole tower rocks slightly from side to side, pivoting on its feet.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "sway") return `translate(${f1(Math.sin((f * 2 * Math.PI) / 80) * 8)} 0)`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const LEVELS = [-180, -360, -540, -720, -900];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : "#C98E55";
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={380} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {[-300, 300].map((bx) => (
          <rect key={`post${bx}`} x={bx - 11} y={-940} width={22} height={940} fill={metal} />
        ))}
        {[-300, 300].map((bx) => (
          <rect key={`foot${bx}`} x={bx - 40} y={-30} width={80} height={30} rx={6} fill={C.greyDark} />
        ))}
        {LEVELS.map((L, i) => (
          <g key={`lvl${i}`}>
            <rect x={-300} y={L - 14} width={600} height={14} fill={shade(metal, 0.15)} />
            <rect x={-350} y={L - 22} width={700} height={22} rx={4} fill={wood} />
            <rect x={-340} y={L - 20} width={680} height={5} rx={2} fill={C.white} opacity={0.2} />
          </g>
        ))}
        {[0, -180, -360, -540, -720].map((ya, i) => (
          <g key={`brace${i}`} stroke={C.greyDark} strokeWidth={12} strokeLinecap="round">
            <line x1={-290} y1={ya} x2={290} y2={ya - 180} />
            <line x1={290} y1={ya} x2={-290} y2={ya - 180} />
          </g>
        ))}
        {LEVELS.flatMap((L) => [-300, 300].map((bx) => (
          <circle key={`${L}-${bx}`} cx={bx} cy={L - 11} r={9} fill={C.greyDark} />
        )))}
      </g>
    </g>
  );
}

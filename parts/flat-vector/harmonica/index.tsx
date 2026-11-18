import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Harmonica lying flat, seen from the front: silver metal covers over a coloured comb with ten holes.
// Origin = bottom centre. About 560 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const HOLES = 10;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const comb = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const metal = C.greyLight, dark = C.greyDark;
  const hx = (i: number) => -250 + i * 55.5;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* comb (coloured plastic) */}
        <rect x={-290} y={-150} width={580} height={150} rx={22} fill={comb} />
        <rect x={-290} y={-40} width={580} height={40} rx={16} fill={shade(comb, 0.2)} />
        {/* metal covers, top and bottom */}
        <rect x={-300} y={-180} width={600} height={50} rx={18} fill={metal} />
        <rect x={-300} y={-190} width={600} height={18} rx={9} fill={C.white} opacity={0.6} />
        <rect x={-300} y={-150} width={600} height={10} fill={dark} opacity={0.2} />
        <rect x={-300} y={-22} width={600} height={22} rx={10} fill={metal} />
        <rect x={-300} y={-24} width={600} height={6} fill={shade(metal, 0.2)} />
        {/* row of holes, one row through the comb */}
        {Array.from({ length: HOLES }, (_, i) => (
          <g key={i}>
            <rect x={hx(i) - 22} y={-118} width={44} height={70} rx={10} fill={C.ink} />
            <rect x={hx(i) - 14} y={-112} width={28} height={12} rx={5} fill={C.inkSoft} />
          </g>
        ))}
        {/* screws at the ends */}
        <circle cx={-268} cy={-155} r={9} fill={dark} />
        <circle cx={268} cy={-155} r={9} fill={dark} />
        <circle cx={-268} cy={-155} r={3} fill={metal} />
        <circle cx={268} cy={-155} r={3} fill={metal} />
      </g>
    </g>
  );
}

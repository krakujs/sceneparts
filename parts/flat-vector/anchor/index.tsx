import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Classic ship anchor, front view. Origin = bottom centre, so the anchor stands on y. About 340 px wide, 500 px tall.
// Ring, shank, stock, crown and two curved arms with flukes. anim: bob, wobble (rocks on its base), pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 80) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.greyDark;
  const hi = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* ring at the top */}
        <circle cx={0} cy={-440} r={46} fill="none" stroke={metal} strokeWidth={24} />
        {/* shank */}
        <rect x={-13} y={-392} width={26} height={372} fill={metal} />
        <rect x={-13} y={-392} width={6} height={372} fill={hi} />
        {/* stock */}
        <rect x={-78} y={-332} width={156} height={26} rx={13} fill={metal} />
        {/* arms with flukes */}
        <path d="M 0 -26 Q 118 -20 150 -128" fill="none" stroke={metal} strokeWidth={30} strokeLinecap="round" />
        <path d="M 0 -26 Q -118 -20 -150 -128" fill="none" stroke={metal} strokeWidth={30} strokeLinecap="round" />
        <polygon points="150,-118 214,-150 206,-96" fill={metal} />
        <polygon points="-150,-118 -214,-150 -206,-96" fill={metal} />
        {/* crown */}
        <circle cx={0} cy={-30} r={26} fill={hi} />
      </g>
    </g>
  );
}

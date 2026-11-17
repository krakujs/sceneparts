import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dining chair: wooden, slatted back, seat in 3/4 view facing right (the seat's side edge is on the right).
// Origin = bottom centre of the footprint. Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const back = shade(c, 0.08);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* back legs (far side, in shade) */}
        <rect x={-150} y={-240} width={26} height={240} rx={9} fill={dk} />
        <rect x={60} y={-240} width={26} height={240} rx={9} fill={dk} />
        {/* back posts going up */}
        <rect x={-190} y={-500} width={30} height={500} rx={12} fill={c} />
        <rect x={130} y={-500} width={30} height={500} rx={12} fill={c} />
        {/* slats of the back */}
        <rect x={-200} y={-500} width={380} height={34} rx={12} fill={c} />
        <rect x={-190} y={-410} width={320} height={22} rx={10} fill={back} />
        <rect x={-190} y={-350} width={320} height={22} rx={10} fill={back} />
        {/* seat, 3/4 view: top face plus a shaded right side edge */}
        <polygon points="-210,-270 180,-270 240,-300 -150,-300" fill={shade(c, 0.05)} />
        <rect x={-210} y={-270} width={390} height={44} rx={10} fill={c} />
        <polygon points="180,-270 240,-300 240,-256 180,-226" fill={dk} />
        {/* front legs */}
        <rect x={-180} y={-226} width={30} height={226} rx={10} fill={c} />
        <rect x={130} y={-226} width={30} height={226} rx={10} fill={c} />
        {/* stretcher between legs */}
        <rect x={-150} y={-120} width={280} height={18} rx={8} fill={dk} />
      </g>
    </g>
  );
}

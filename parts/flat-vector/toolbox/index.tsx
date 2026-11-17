import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Toolbox: metal toolbox with a carry handle on the lid, a screwdriver and a wrench poking out of the top.
// Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const STEEL = "#C9D1DC";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const lid = shade(c, -0.12), dk = shade(c, 0.22);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* tools poking out, behind the lid */}
        <rect x={-124} y={-300} width={12} height={150} rx={4} fill={STEEL} />
        <rect x={-140} y={-360} width={40} height={70} rx={18} fill={C.yellow} />
        <rect x={-140} y={-300} width={40} height={10} rx={4} fill={C.yellowDark} />
        <rect x={113} y={-290} width={14} height={110} rx={4} fill={STEEL} />
        <rect x={92} y={-340} width={56} height={56} rx={18} fill={STEEL} />
        <rect x={104} y={-334} width={32} height={20} rx={10} fill={shade(STEEL, 0.35)} />
        {/* body */}
        <rect x={-180} y={-170} width={360} height={170} rx={18} fill={c} />
        <rect x={-180} y={-52} width={360} height={52} rx={16} fill={dk} />
        {/* latches */}
        <rect x={-110} y={-122} width={40} height={26} rx={6} fill={C.greyDark} />
        <rect x={70} y={-122} width={40} height={26} rx={6} fill={C.greyDark} />
        {/* lid */}
        <rect x={-190} y={-214} width={380} height={52} rx={18} fill={lid} />
        <rect x={-190} y={-170} width={380} height={8} rx={4} fill={dk} />
        {/* carry handle */}
        <path d="M -64 -214 Q -64 -296 0 -296 Q 64 -296 64 -214" fill="none" stroke={C.inkSoft} strokeWidth={22} strokeLinecap="round" />
      </g>
    </g>
  );
}

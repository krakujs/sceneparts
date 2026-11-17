import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Coffee table: low top (oval or rectangular) on four short legs, with a mug and a closed book on the top.
// Origin = bottom centre.
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
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const oval = p.variant !== "rectangle";
  const TOP_Y = -220, TOP_H = 60, W = 300;
  const topShape = oval
    ? <rect x={-W} y={TOP_Y} width={2 * W} height={TOP_H} rx={TOP_H / 2} fill={c} />
    : <rect x={-W} y={TOP_Y} width={2 * W} height={TOP_H} rx={14} fill={c} />;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={W - 10} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* legs */}
        <rect x={-W + 40} y={TOP_Y + TOP_H} width={34} height={-TOP_Y - TOP_H} rx={12} fill={dk} />
        <rect x={W - 74} y={TOP_Y + TOP_H} width={34} height={-TOP_Y - TOP_H} rx={12} fill={dk} />
        {/* lower shelf */}
        <rect x={-W + 60} y={-100} width={2 * W - 120} height={24} rx={10} fill={dk} />
        {/* top */}
        {topShape}
        <rect x={-W + 20} y={TOP_Y + 8} width={2 * W - 40} height={12} rx={6} fill="#FFFFFF" opacity={0.14} />
        {/* closed book on top */}
        <rect x={-120} y={TOP_Y - 26} width={150} height={26} rx={5} fill={C.teal} />
        <rect x={-120} y={TOP_Y - 26} width={12} height={26} rx={4} fill={C.tealDark} />
        <rect x={-120} y={TOP_Y - 44} width={140} height={18} rx={5} fill={C.yellow} />
        {/* mug */}
        <rect x={80} y={TOP_Y - 84} width={70} height={84} rx={12} fill={C.white} />
        <path d="M 146 -284 Q 192 -284 192 -262 Q 192 -240 146 -240" fill="none" stroke={C.white} strokeWidth={14} strokeLinecap="round" />
        <rect x={80} y={TOP_Y - 84} width={70} height={14} rx={7} fill={C.greyLight} />
        <ellipse cx={115} cy={TOP_Y - 84} rx={35} ry={8} fill={C.brownDark} />
      </g>
    </g>
  );
}

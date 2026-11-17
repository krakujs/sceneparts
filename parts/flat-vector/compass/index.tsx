import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round magnetic compass on a small foot, with N/E/S/W tick marks (shapes only) and a needle.
// Origin = bottom centre (the foot rests on y). About 460 px wide and 510 px tall at s = 1.
// anim "needle": the needle wobbles about north.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const CY = -280;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const needle = anim === "needle" ? 18 * Math.sin((f * 2 * Math.PI) / 50) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -120 0 L 120 0 L 70 -50 L -70 -50 Z" fill={shade(body, 0.2)} />
        <circle cx={0} cy={CY} r={230} fill={body} />
        <circle cx={0} cy={CY} r={208} fill={shade(body, 0.2)} />
        <circle cx={0} cy={CY} r={192} fill={C.paper} />
        {Array.from({ length: 36 }, (_, i) => i * 10).map((deg) => {
          const card = deg % 90 === 0;
          const col = deg === 0 ? C.red : C.ink;
          return (
            <g key={deg} transform={`translate(0 ${CY}) rotate(${deg})`}>
              <rect x={card ? -6 : -2} y={-186} width={card ? 12 : 4} height={card ? 30 : 14} rx={3} fill={col} />
            </g>
          );
        })}
        <g transform={`translate(0 ${CY}) rotate(${f1(needle)})`}>
          <polygon points="0,-150 -22,0 22,0" fill={C.red} />
          <polygon points="0,150 -22,0 22,0" fill={C.greyLight} />
          <circle r={22} fill={C.greyDark} />
          <circle r={8} fill={C.white} />
        </g>
        <path d="M -120 -390 Q -60 -440 40 -420" fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.35} />
      </g>
    </g>
  );
}

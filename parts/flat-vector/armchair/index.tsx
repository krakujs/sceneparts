import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Armchair: single cosy chair, rounded back and arms, seat cushion, short legs. Origin = bottom centre.
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
  const c = p.color && p.color !== "none" ? p.color : C.pink;
  const dk = shade(c, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* short legs */}
        <rect x={-260} y={-40} width={22} height={40} rx={7} fill={C.brownDark} />
        <rect x={238} y={-40} width={22} height={40} rx={7} fill={C.brownDark} />
        {/* tall rounded back */}
        <path d="M -280 -40 L -280 -420 Q -280 -500 -200 -500 L 200 -500 Q 280 -500 280 -420 L 280 -40 Z" fill={c} />
        <path d="M 200 -500 Q 280 -500 280 -420 L 280 -40 L 220 -40 L 220 -440 Z" fill={dk} opacity={0.55} />
        {/* seat base */}
        <rect x={-280} y={-150} width={560} height={120} rx={30} fill={dk} />
        {/* seat cushion */}
        <rect x={-200} y={-200} width={400} height={80} rx={36} fill={shade(c, 0.05)} />
        <rect x={-200} y={-200} width={400} height={20} rx={10} fill="#FFFFFF" opacity={0.1} />
        {/* rounded arms */}
        <rect x={-340} y={-300} width={130} height={270} rx={60} fill={c} />
        <rect x={210} y={-300} width={130} height={270} rx={60} fill={c} />
        <rect x={-340} y={-300} width={130} height={270} rx={60} fill={dk} opacity={0.12} />
        <rect x={210} y={-300} width={130} height={270} rx={60} fill={dk} opacity={0.22} />
        {/* back cushion */}
        <rect x={-190} y={-440} width={380} height={230} rx={60} fill={shade(c, 0.1)} />
      </g>
    </g>
  );
}

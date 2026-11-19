import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall gas cylinder with a domed shoulder, collar ring, valve top and a handle. About 300 px wide and 720 px tall at s = 1.
// Origin = bottom centre (stands on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.green;
  const cap = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={180} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* foot ring */}
        <rect x={-130} y={-50} width={260} height={50} rx={14} fill={shade(cap, 0.2)} />
        {/* cylinder body */}
        <rect x={-120} y={-560} width={240} height={520} rx={18} fill={body} />
        {/* shaded side */}
        <rect x={60} y={-560} width={60} height={520} rx={16} fill={shade(body, 0.25)} opacity={0.6} />
        {/* dome shoulder */}
        <path d="M-120 -560 Q-120 -650 0 -650 Q120 -650 120 -560 Z" fill={body} />
        {/* collar ring */}
        <rect x={-130} y={-640} width={260} height={34} rx={12} fill={cap} />
        {/* valve and handle on top */}
        <rect x={-40} y={-700} width={80} height={62} rx={12} fill={shade(cap, 0.15)} />
        <rect x={-24} y={-740} width={48} height={44} rx={10} fill={C.greyLight} />
        <rect x={-90} y={-742} width={180} height={18} rx={9} fill={cap} />
        {/* white label band with no text */}
        <rect x={-120} y={-380} width={240} height={120} fill={C.white} opacity={0.2} />
        {/* ribbed base collar */}
        <rect x={-120} y={-80} width={240} height={14} rx={6} fill={shade(body, 0.2)} />
      </g>
    </g>
  );
}

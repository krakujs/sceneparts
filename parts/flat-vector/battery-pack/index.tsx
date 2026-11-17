import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Large rechargeable battery pack with a carrying handle and four charge-level bars. level = 0..4 bars lit.
// Origin = bottom centre (the floor line). Hero scale: at s = 1 about 380 px wide and 400 px tall. Use s about 0.4 next to a person.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  return "";
};
const HEIGHTS = [40, 70, 100, 130];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const handle = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const lit = anim === "charge" ? Math.floor(f / 15) % 5 : Math.max(0, Math.min(4, Math.round(Number(p.level ?? 3))));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M-80,-330 V-372 Q-80,-396 -56,-396 H56 Q80,-396 80,-372 V-330" fill="none" stroke={handle} strokeWidth={26} strokeLinecap="round" />
        <rect x={-180} y={-330} width={360} height={330} rx={36} fill={body} />
        <rect x={-180} y={-70} width={360} height={70} rx={30} fill={shade(body, 0.2)} />
        {/* charge level meter */}
        <rect x={-130} y={-290} width={260} height={160} rx={18} fill={shade(body, 0.3)} />
        {HEIGHTS.map((h, i) => (
          <rect key={i} x={-110 + i * 56} y={-146 - h} width={44} height={h} rx={8} fill={i < lit ? C.green : C.greyDark} opacity={i < lit ? 1 : 0.5} />
        ))}
        {/* output port */}
        <rect x={-40} y={-52} width={80} height={24} rx={8} fill={C.ink} />
      </g>
    </g>
  );
}

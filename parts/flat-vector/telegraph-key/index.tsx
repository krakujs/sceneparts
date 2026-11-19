import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Telegraph key (morse key): a brass lever pivoting on a wooden base, with a knob and a contact stop and two wire terminals.
// Origin = bottom centre (base rests on y). anim "tap": the lever is pressed down over and over.
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
  const brass = p.color && p.color !== "none" ? p.color : C.yellowDark;
  const anim: string = p.anim ?? "none";
  const angle = anim === "tap" ? 9 * Math.max(0, Math.sin((f * 2 * Math.PI) / 40)) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* wires out of both ends to terminal posts */}
        <path d="M 220 -48 C 280 -48 300 -20 340 -20" fill="none" stroke={C.inkSoft} strokeWidth={8} strokeLinecap="round" />
        <path d="M -220 -48 C -280 -48 -300 -20 -340 -20" fill="none" stroke={C.inkSoft} strokeWidth={8} strokeLinecap="round" />
        <rect x={340} y={-70} width={22} height={60} rx={6} fill={C.greyDark} />
        <rect x={-362} y={-70} width={22} height={60} rx={6} fill={C.greyDark} />
        {/* wooden base */}
        <rect x={-220} y={-70} width={440} height={70} rx={12} fill={C.brown} />
        <rect x={-220} y={-70} width={440} height={14} rx={6} fill={C.brownDark} opacity={0.5} />
        <rect x={-180} y={-44} width={360} height={4} rx={2} fill={C.brownDark} opacity={0.5} />
        <rect x={-180} y={-30} width={360} height={4} rx={2} fill={C.brownDark} opacity={0.5} />
        <circle cx={-190} cy={-40} r={7} fill={C.greyLight} />
        <circle cx={190} cy={-40} r={7} fill={C.greyLight} />
        {/* contact stop under the lever tip */}
        <rect x={40} y={-84} width={26} height={14} rx={4} fill={shade(brass, 0.25)} />
        {/* pivot block and posts */}
        <rect x={-180} y={-118} width={54} height={48} rx={8} fill={shade(brass, 0.25)} />
        {/* lever: rotates about the pivot */}
        <g transform={`rotate(${f1(angle)} -153 -98)`}>
          <rect x={-153} y={-106} width={290} height={14} rx={7} fill={brass} />
          <rect x={-140} y={-103} width={250} height={3} rx={1.5} fill={C.white} opacity={0.4} />
          <circle cx={137} cy={-99} r={24} fill={brass} />
          <circle cx={130} cy={-106} r={8} fill={C.white} opacity={0.5} />
        </g>
        <circle cx={-153} cy={-98} r={10} fill={C.greyDark} />
      </g>
    </g>
  );
}

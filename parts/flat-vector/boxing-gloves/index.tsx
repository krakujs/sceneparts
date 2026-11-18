import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of boxing gloves tied together at the cuffs by a lace, seen from the front. Each glove is a
// rounded fist with a thumb, and a white cuff at the base. Origin = bottom centre (cuffs rest on y).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

const Glove = ({ c, mirror }: { c: string; mirror: boolean }) => (
  <g transform={`scale(${mirror ? -1 : 1} 1)`}>
    {/* cuff */}
    <rect x={-40} y={-120} width={130} height={110} rx={22} fill={C.white} />
    <rect x={-40} y={-120} width={130} height={22} rx={10} fill={C.greyLight} />
    {/* fist */}
    <path d="M -60 -150 Q -150 -300 -110 -400 Q -60 -490 40 -480 Q 150 -470 160 -360 Q 170 -260 110 -180 Q 60 -130 -40 -130 Z" fill={c} />
    {/* thumb */}
    <path d="M 60 -250 Q 130 -300 150 -250 Q 160 -200 110 -190 Q 70 -180 60 -210 Z" fill={shade(c, 0.12)} />
    {/* shade band on the lower fist */}
    <path d="M -58 -190 Q 0 -150 112 -190 L 110 -180 Q 60 -130 -40 -130 Z" fill={shade(c, 0.22)} />
    {/* highlight */}
    <ellipse cx={-50} cy={-380} rx={22} ry={40} fill={C.white} opacity={0.35} transform="rotate(20 -50 -380)" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <Glove c={c} mirror={false} />
        <Glove c={c} mirror={true} />
        {/* lace tying the cuffs together */}
        <path d="M -40 -70 Q 0 -40 40 -70" stroke={C.ink} strokeWidth={10} strokeLinecap="round" fill="none" />
        <path d="M -40 -70 L 40 -70" stroke={C.inkSoft} strokeWidth={4} strokeDasharray="8 8" fill="none" />
      </g>
    </g>
  );
}

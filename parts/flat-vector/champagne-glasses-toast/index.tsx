import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two champagne flutes tilted towards each other and touching at the top, with a small splash and bubbles.
// Origin = midpoint between the two feet. Each flute is drawn upright, then rotated about its foot.
const f1 = (v: number) => v.toFixed(1);
const SC = 1.5; // flute scale inside the part

const Flute = ({ fx, rot, liquid }: { fx: number; rot: number; liquid: string }) => (
  <g transform={`translate(${f1(fx)} 0) rotate(${f1(rot)})`}>
    {/* foot */}
    <ellipse cx={0} cy={0} rx={70} ry={14} fill={C.greyLight} />
    <ellipse cx={0} cy={-6} rx={70} ry={14} fill={C.white} opacity={0.5} />
    {/* stem */}
    <rect x={-7} y={-260} width={14} height={262} rx={6} fill={C.white} opacity={0.85} />
    {/* bowl: glass shell */}
    <path d="M -78 -380 L 78 -380 Q 74 -200 0 -190 Q -74 -200 -78 -380 Z" fill="#FFFFFF" opacity={0.55} />
    {/* champagne inside the bowl */}
    <path d="M -66 -300 L 66 -300 Q 60 -205 0 -196 Q -60 -205 -66 -300 Z" fill={liquid} />
    <path d="M -66 -300 L 66 -300 Q 64 -292 60 -280 L -60 -280 Q -64 -292 -66 -300 Z" fill={shade(liquid, 0.1)} />
    {/* rim */}
    <rect x={-80} y={-384} width={160} height={8} rx={4} fill={C.white} opacity={0.8} />
    {/* highlight */}
    <path d="M -58 -350 L -50 -230" stroke={C.white} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1400;
  const liquid = p.color && p.color !== "none" ? p.color : "#F4D27A";
  const anim: string = p.anim ?? "none";
  // clink: the two glasses swing in towards each other and back
  const k = anim === "clink" ? Math.max(0, Math.sin((f * 2 * Math.PI) / 50)) * 3 : 0;
  const bubbles = Array.from({ length: 9 }, (_, i) => {
    const rise = anim === "sparkle" ? (f * 1.5 + i * 40) % 160 : i * 18;
    return { cx: -60 + i * 16 + Math.sin(i * 2.1) * 10, cy: -rise * 0.9 - 30, r: 4 + (i % 3) * 2 };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={24} fill={C.shadow} />
      <g transform={`scale(${SC})`}>
        <Flute fx={-120} rot={14 + k} liquid={liquid} />
        <Flute fx={120} rot={-14 - k} liquid={liquid} />
        {/* splash at the contact point */}
        <g transform={`translate(0 ${f1(-360)}) scale(${anim === "clink" ? f1(1 + 0.15 * Math.max(0, Math.sin((f * 2 * Math.PI) / 50))) : 1})`}>
          <path d="M 0 -60 L 10 -20 L 50 -40 L 26 -4 L 70 14 L 22 22 L 36 62 L 0 30 L -36 62 L -22 22 L -70 14 L -26 -4 L -50 -40 L -10 -20 Z" fill={C.yellow} opacity={0.9} />
          <circle cx={0} cy={0} r={18} fill={C.white} opacity={0.9} />
        </g>
        {bubbles.map((b, i) => <circle key={i} cx={f1(b.cx)} cy={f1(b.cy)} r={b.r} fill={C.yellowDark} opacity={0.6} />)}
      </g>
    </g>
  );
}

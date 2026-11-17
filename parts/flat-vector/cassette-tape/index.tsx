import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Audio cassette: plastic shell with two reels, a window, and a blank label. Hero scale; origin = bottom centre.
// anim "reels": the two reels turn together.
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
  const shell = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const turn = anim === "reels" ? (f * 4) % 360 : 0;
  const reel = (cx: number) => (
    <g transform={`translate(${cx} -200) rotate(${f1(turn)})`}>
      <circle cx={0} cy={0} r={62} fill={C.inkSoft} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-4} y={-58} width={8} height={20} rx={3} fill={C.grey} transform={`rotate(${i * 60})`} />)}
      <circle cx={0} cy={0} r={20} fill={C.greyLight} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* shell */}
        <rect x={-270} y={-330} width={540} height={330} rx={34} fill={shell} />
        <rect x={-270} y={-60} width={540} height={60} rx={24} fill={shade(shell, 0.25)} />
        <path d="M -230 -310 Q -100 -330 40 -312" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.3} />
        {/* label */}
        <rect x={-210} y={-300} width={420} height={110} rx={12} fill={C.white} />
        <rect x={-190} y={-282} width={160} height={12} rx={6} fill={C.greyLight} />
        <rect x={-190} y={-260} width={100} height={10} rx={5} fill={C.greyLight} />
        {/* window with reels */}
        <rect x={-210} y={-170} width={420} height={130} rx={18} fill={C.ink} />
        <rect x={-195} y={-155} width={390} height={100} rx={12} fill={shade(C.navy, 0.1)} />
        {reel(-110)}
        {reel(110)}
        {/* tape spanning between reels */}
        <rect x={-110} y={-236} width={220} height={8} rx={4} fill={C.ink} opacity={0.6} />
        {/* bottom holes */}
        <rect x={-170} y={-40} width={90} height={22} rx={8} fill={C.ink} opacity={0.5} />
        <rect x={80} y={-40} width={90} height={22} rx={8} fill={C.ink} opacity={0.5} />
      </g>
    </g>
  );
}

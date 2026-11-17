import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Portable cassette player from the 1980s with a headband of headphones draped over it and cables to each cup.
// Generic: no brand text. Origin = bottom centre. anim "spin": both tape reels turn.
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
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin" ? f * 4 : 0;
  const reel = (cx: number) => (
    <g transform={`translate(${cx} -165) rotate(${f1(spin)})`}>
      <circle cx={0} cy={0} r={40} fill={C.greyLight} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={-4} y={-34} width={8} height={20} rx={3} fill={C.greyDark} transform={`rotate(${k * 120})`} />
      ))}
      <circle cx={0} cy={0} r={12} fill={C.greyDark} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={13} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -230 -120 C -230 -400 230 -400 230 -120" fill="none" stroke={C.inkSoft} strokeWidth={20} strokeLinecap="round" />
        <path d="M -234 -40 C -230 -20 -200 -30 -180 -40" fill="none" stroke={C.inkSoft} strokeWidth={8} strokeLinecap="round" />
        <path d="M 234 -40 C 230 -20 200 -30 180 -40" fill="none" stroke={C.inkSoft} strokeWidth={8} strokeLinecap="round" />
        <rect x={-262} y={-150} width={56} height={110} rx={24} fill={C.inkSoft} />
        <rect x={206} y={-150} width={56} height={110} rx={24} fill={C.inkSoft} />
        <rect x={-258} y={-140} width={20} height={90} rx={10} fill={C.greyDark} />
        <rect x={238} y={-140} width={20} height={90} rx={10} fill={C.greyDark} />
        <rect x={-180} y={-240} width={360} height={240} rx={28} fill={body} />
        <rect x={-168} y={-228} width={336} height={8} rx={4} fill={C.white} opacity={0.3} />
        <rect x={-130} y={-220} width={260} height={110} rx={14} fill={C.ink} />
        {reel(-70)}
        {reel(70)}
        <rect x={-70} y={-128} width={140} height={5} rx={2} fill={C.brown} />
        {[-120, -60, 0, 60, 120].map((bx, i) => (
          <rect key={bx} x={bx - 22} y={-88} width={44} height={26} rx={7} fill={i === 2 ? C.red : shade(body, 0.35)} />
        ))}
        <rect x={-150} y={-44} width={300} height={6} rx={3} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}

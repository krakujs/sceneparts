import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hot air balloon, front view: striped envelope on ropes above a wicker basket, with a burner flame.
// Origin = bottom centre (the basket floor); about 540 px wide and 880 px tall at s = 1.
// anim "fly": gentle sway and bob with a flickering burner flame.
const f1 = (v: number) => v.toFixed(1);
const bob = (anim: string, f: number) => {
  if (anim === "fly") return -(Math.sin((f * 2 * Math.PI) / 100) + 1) * 10;
  if (anim === "bob") return -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6;
  return 0;
};
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};
const ENVELOPE = "M 0 -880 C 230 -880 270 -680 260 -560 C 252 -420 170 -300 90 -270 L -90 -270 C -170 -300 -252 -420 -260 -560 C -270 -680 -230 -880 0 -880 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1500;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const a = p.color && p.color !== "none" ? p.color : C.red;
  const b = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const sway = anim === "fly" ? Math.sin((f * 2 * Math.PI) / 100) * 1.5 : 0;
  const flick = anim === "fly" ? 1 + 0.14 * Math.sin(f * 0.9) + 0.06 * Math.sin(f * 2.3) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob(anim, f))}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(sway)}) scale(${f1(popScale(anim, f))})`}>
        <defs>
          <clipPath id="fv-balloon-envelope"><path d={ENVELOPE} /></clipPath>
        </defs>
        {/* ropes */}
        <line x1={-70} y1={-132} x2={-100} y2={-258} stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
        <line x1={70} y1={-132} x2={100} y2={-258} stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
        <line x1={-36} y1={-132} x2={-62} y2={-258} stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
        <line x1={36} y1={-132} x2={62} y2={-258} stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
        {/* envelope: six vertical gores, alternating colours, with a shaded right side */}
        <g clipPath="url(#fv-balloon-envelope)">
          {Array.from({ length: 6 }, (_, k) => (
            <rect key={k} x={-260 + k * 87} y={-900} width={87} height={680} fill={k % 2 ? b : a} />
          ))}
          <rect x={150} y={-900} width={130} height={680} fill={C.ink} opacity={0.12} />
        </g>
        {/* mouth ring */}
        <ellipse cx={0} cy={-262} rx={96} ry={16} fill={C.greyDark} />
        {/* burner and flame */}
        <rect x={-26} y={-250} width={52} height={24} rx={6} fill={C.greyDark} />
        <g transform={`translate(0 -250) scale(1 ${f1(flick)})`}>
          <path d="M 0 -86 C 26 -60 34 -30 24 -8 C 16 8 -16 8 -24 -8 C -34 -30 -26 -60 0 -86 Z" fill={C.orange} />
          <path d="M 0 -50 C 12 -34 14 -18 8 -6 C 4 2 -4 2 -8 -6 C -14 -18 -12 -34 0 -50 Z" fill={C.yellow} />
        </g>
        {/* basket */}
        <rect x={-92} y={-142} width={184} height={16} rx={6} fill={C.brownDark} />
        <path d="M -84 -132 L 84 -132 L 70 -16 Q 68 0 52 0 L -52 0 Q -68 0 -70 -16 Z" fill={C.brown} />
        {[-108, -84, -60, -36].map((yy, i) => (
          <rect key={i} x={-78 + i * 2} y={yy} width={156 - i * 4} height={6} fill={C.brownDark} />
        ))}
      </g>
    </g>
  );
}

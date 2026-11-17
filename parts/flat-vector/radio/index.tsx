import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Modern portable radio: a rounded case with a carry handle, a speaker grille on the left, a dial display
// with a needle on the right and two knobs. Origin = bottom centre. anim "tune" sweeps the needle along the dial.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const SLOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const needle = 110 + (anim === "tune" ? 70 * Math.sin((f * 2 * Math.PI) / 90) : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "tune" ? "" : anim, f)}>
        {/* telescoping antenna at the back */}
        <rect x={176} y={-410} width={20} height={130} rx={9} fill={C.greyDark} />
        {/* case */}
        <rect x={-230} y={-300} width={460} height={300} rx={40} fill={body} />
        <rect x={-230} y={-40} width={460} height={40} rx={20} fill={shade(body, 0.25)} />
        {/* carry handle */}
        <path d="M -130 -300 V -340 Q -130 -372 -98 -372 H 98 Q 130 -372 130 -340 V -300" fill="none" stroke={C.inkSoft} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
        {/* speaker grille */}
        <rect x={-200} y={-262} width={170} height={200} rx={20} fill={shade(body, 0.25)} />
        {SLOTS.map((i) => (
          <rect key={i} x={-180} y={-240 + i * 22} width={130} height={9} rx={4.5} fill={shade(body, 0.5)} />
        ))}
        {/* dial display */}
        <rect x={-10} y={-262} width={210} height={100} rx={14} fill={C.navy} />
        <line x1={20} y1={-206} x2={190} y2={-206} stroke={C.greyLight} strokeWidth={3} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={20 + i * 14.5} y={i % 3 === 0 ? -226 : -220} width={3} height={i % 3 === 0 ? 20 : 14} rx={1.5} fill={C.greyLight} />
        ))}
        <rect x={needle - 2} y={-244} width={4} height={60} rx={2} fill={C.yellow} />
        <circle cx={needle} cy={-242} r={5} fill={C.yellow} />
        {/* knobs and buttons */}
        <circle cx={60} cy={-100} r={30} fill={C.ink} />
        <line x1={60} y1={-100} x2={60} y2={-120} stroke={C.white} strokeWidth={5} strokeLinecap="round" transform={`rotate(${f1(anim === "tune" ? 60 * Math.sin((f * 2 * Math.PI) / 90) : 30)} 60 -100)`} />
        <circle cx={150} cy={-100} r={30} fill={C.ink} />
        <line x1={150} y1={-100} x2={150} y2={-120} stroke={C.white} strokeWidth={5} strokeLinecap="round" />
        <rect x={20} y={-70} width={74} height={18} rx={9} fill={C.greyDark} />
        <rect x={110} y={-70} width={74} height={18} rx={9} fill={C.greyDark} />
        <rect x={-200} y={-262} width={170} height={8} rx={4} fill={C.white} opacity={0.2} />
      </g>
    </g>
  );
}

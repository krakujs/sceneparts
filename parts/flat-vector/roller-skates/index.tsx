import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// One quad roller skate in side view, facing right: a boot with cuff, laces and toe cap, a metal plate and
// four wheels in a row under it. Hero prop, about 450 px wide at s = 1. Origin = floor centre; wheels touch y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const boot = p.color && p.color !== "none" ? p.color : C.pink;
  const wheelC = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 14 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const wheel = (cx: number) => (
    <g transform={`translate(${cx} -40)`}>
      <circle cx={0} cy={0} r={40} fill={C.ink} />
      <circle cx={0} cy={0} r={28} fill={wheelC} />
      <g transform={`rotate(${f1(spin)})`}>
        <line x1={-18} y1={0} x2={18} y2={0} stroke={shade(wheelC, 0.35)} strokeWidth={6} strokeLinecap="round" />
        <line x1={0} y1={-18} x2={0} y2={18} stroke={shade(wheelC, 0.35)} strokeWidth={6} strokeLinecap="round" />
      </g>
      <circle cx={0} cy={0} r={8} fill={C.greyLight} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* metal plate with four wheels */}
          <rect x={-200} y={-98} width={380} height={16} rx={6} fill={C.greyDark} />
          <rect x={-196} y={-82} width={372} height={6} rx={3} fill={shade(C.greyDark, 0.3)} />
          {wheel(-150)}{wheel(-90)}{wheel(90)}{wheel(150)}
          {/* boot: heel, cuff, tongue, toe */}
          <path d="M -190 -100 L -184 -300 Q -180 -350 -130 -352 L -96 -352 L -78 -250 Q 10 -220 130 -160 Q 190 -132 190 -100 Z" fill={boot} />
          <path d="M -190 -100 L -184 -300 Q -180 -350 -130 -352 L -96 -352 L -90 -330 Q -140 -330 -160 -300 L -170 -100 Z" fill={shade(boot, 0.2)} />
          {/* toe cap and laces */}
          <path d="M 110 -160 Q 190 -150 190 -100 L 120 -100 Z" fill={shade(boot, 0.2)} />
          <path d="M -60 -290 L -10 -275 M -60 -250 L 0 -232 M -60 -210 L 10 -190" stroke={C.white} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.85} />
          {/* ankle strap */}
          <rect x={-190} y={-240} width={110} height={18} rx={8} fill={C.white} opacity={0.5} />
          {/* toe stopper */}
          <circle cx={178} cy={-98} r={12} fill={C.greyDark} />
        </g>
      </g>
    </g>
  );
}

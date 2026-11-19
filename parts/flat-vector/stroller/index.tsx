import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Baby stroller (pushchair) in side view, facing right: a rounded seat body with a dome hood and window,
// a basket underneath, a push handle at the back, and four wheels. Hero prop, about 500 px wide, 600 px tall
// at s = 1. Origin = floor centre; the wheels touch y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={C.ink} />
    <circle cx={cx} cy={cy} r={r * 0.56} fill={rim} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={cx - r * 0.07} y={cy - r * 0.5} width={r * 0.14} height={r * 0.5} rx={3}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 90} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.16} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const rock = driving ? Math.sin((f * 2 * Math.PI) / 30) * 1.2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={`${motion(anim, f)} rotate(${f1(rock)})`}>
        {/* frame: push handle, chassis and front fork */}
        <path d="M -200 -300 L -250 -560 L -290 -560" stroke={frame} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M -190 -60 L -180 -180 L 120 -180 L 140 -60" stroke={frame} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 120 -180 L 120 -300" stroke={frame} strokeWidth={16} strokeLinecap="round" fill="none" />
        <rect x={-190} y={-120} width={330} height={14} rx={7} fill={frame} />
        {/* basket underneath */}
        <rect x={-140} y={-220} width={230} height={50} rx={14} fill={shade(body, 0.2)} />
        {/* seat body */}
        <rect x={-180} y={-420} width={330} height={200} rx={50} fill={body} />
        <rect x={-180} y={-260} width={330} height={22} rx={11} fill={shade(body, 0.15)} />
        {/* hood: dome with a sky-blue window */}
        <path d="M -190 -400 Q -200 -580 0 -590 Q 140 -585 150 -420 Z" fill={body} />
        <path d="M -160 -410 Q -160 -540 0 -550 Q 110 -545 120 -410 Z" fill={C.sky} />
        <path d="M -160 -410 Q -160 -540 0 -550 Q -10 -480 -150 -410 Z" fill="#FFFFFF" opacity={0.45} />
        {/* baby-free seat cushion and the front bar */}
        <rect x={-150} y={-395} width={290} height={36} rx={14} fill={shade(body, 0.12)} />
        {/* four wheels: two at the back, two at the front (overlapping in side view) */}
        {wheel(-200, -62, 62, frame, spin)}
        {wheel(-135, -62, 62, frame, spin)}
        {wheel(90, -62, 62, frame, spin)}
        {wheel(150, -62, 62, frame, spin)}
      </g>
    </g>
  );
}

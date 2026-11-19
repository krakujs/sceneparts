import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Electric kick scooter facing right: deck, stem, handlebar with grips, headlight and two small wheels.
// Origin = bottom centre between the wheels (wheels touch y). About 470 px wide at s = 1.
// anim "roll": the wheel spokes turn.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const Wheel = ({ cx, spin }: { cx: number; spin: number }) => (
  <g>
    <circle cx={cx} cy={-46} r={46} fill={C.ink} />
    <circle cx={cx} cy={-46} r={30} fill={C.inkSoft} />
    <g transform={`translate(${cx} -46) rotate(${f1(spin)})`}>
      {[0, 60, 120].map((a) => (
        <rect key={a} x={-3} y={-26} width={6} height={52} rx={3} fill={C.greyLight} transform={`rotate(${a})`} />
      ))}
    </g>
    <circle cx={cx} cy={-46} r={9} fill={C.greyLight} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const spin = anim === "roll" ? f * 10 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* rear strut and fender */}
        <rect x={-178} y={-112} width={16} height={60} fill={shade(body, 0.2)} />
        <path d="M -226 -46 A 56 56 0 0 1 -114 -46" fill="none" stroke={body} strokeWidth={14} strokeLinecap="round" />
        <Wheel cx={-170} spin={spin} />
        {/* front fork and stem */}
        <rect x={156} y={-92} width={26} height={50} rx={8} fill={shade(body, 0.2)} />
        <rect x={158} y={-340} width={18} height={240} rx={9} fill={C.greyDark} />
        <Wheel cx={170} spin={spin} />
        {/* deck */}
        <rect x={-200} y={-112} width={380} height={26} rx={13} fill={body} />
        <rect x={-190} y={-110} width={360} height={6} rx={3} fill={C.white} opacity={0.4} />
        {/* handlebar with grips and headlight */}
        <rect x={116} y={-352} width={104} height={18} rx={9} fill={C.inkSoft} />
        <rect x={112} y={-358} width={22} height={30} rx={10} fill={C.ink} />
        <rect x={214} y={-358} width={22} height={30} rx={10} fill={C.ink} />
        <circle cx={194} cy={-322} r={10} fill={C.yellow} />
      </g>
    </g>
  );
}

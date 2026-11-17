import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Toy car: small rounded side-view toy car with big wheels, a windscreen and a darker lower body.
// Origin = bottom centre (under the wheels); faces right, honours flip, s and anim. anim "roll" spins the wheels and rocks the car.
const f1 = (v: number) => v.toFixed(1);
const WHEEL_R = 60;

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "roll") return `translate(${f1(Math.sin((f * 2 * Math.PI) / 90) * 14)} ${f1(-Math.abs(Math.sin((f * 2 * Math.PI) / 45)) * 4)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const Wheel = ({ cx, angle }: { cx: number; angle: number }) => (
  <g transform={`translate(${cx} ${-WHEEL_R}) rotate(${f1(angle)})`}>
    <circle cx={0} cy={0} r={WHEEL_R} fill={C.ink} />
    <circle cx={0} cy={0} r={WHEEL_R - 14} fill={C.greyDark} />
    <circle cx={0} cy={0} r={18} fill={C.greyLight} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={-5} y={-(WHEEL_R - 18)} width={10} height={2 * (WHEEL_R - 18)} rx={4} fill={C.greyLight} transform={`rotate(${i * 60})`} />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const dk = shade(c, 0.2);
  const spin = (p.anim === "roll" ? f * 9 : 0) % 360;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* cabin */}
        <path d="M -104 -150 Q -92 -250 -40 -252 L 62 -252 Q 104 -250 120 -150 Z" fill={c} />
        {/* windows */}
        <path d="M -84 -160 Q -76 -226 -40 -228 L 0 -228 L 0 -160 Z" fill={C.skyDeep} />
        <path d="M 12 -160 L 12 -228 L 56 -228 Q 84 -226 94 -160 Z" fill={C.skyDeep} />
        {/* main body */}
        <rect x={-190} y={-156} width={380} height={96} rx={44} fill={c} />
        <path d="M 60 -156 H 146 A 44 44 0 0 1 190 -112 V -104 A 44 44 0 0 1 146 -60 H 60 Z" fill={dk} opacity={0.6} />
        {/* door line and head/tail lights */}
        <rect x={-6} y={-138} width={10} height={60} rx={4} fill={dk} />
        <rect x={-186} y={-124} width={22} height={18} rx={6} fill={C.yellow} />
        <rect x={164} y={-124} width={22} height={18} rx={6} fill={C.orange} />
        {/* wheel arches */}
        <circle cx={-118} cy={-WHEEL_R} r={WHEEL_R + 8} fill={dk} />
        <circle cx={118} cy={-WHEEL_R} r={WHEEL_R + 8} fill={dk} />
        <Wheel cx={-118} angle={spin} />
        <Wheel cx={118} angle={spin} />
      </g>
    </g>
  );
}

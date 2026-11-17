import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall clock: round clock with twelve tick marks and a sweeping second hand. Wall item: centred on (x, y).
// anim "tick": the second hand jumps once a second and the hands move with the frame.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const rim = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const tick = anim === "tick";
  const hourA = 300 + (tick ? f * 0.008 : 0);
  const minA = 60 + (tick ? f * 0.1 : 0);
  const secA = tick ? Math.floor(f / 30) * 6 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <circle cx={0} cy={0} r={170} fill={shade(rim, 0.2)} />
        <circle cx={-6} cy={-6} r={170} fill={rim} />
        <circle cx={0} cy={0} r={138} fill={C.white} />
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 30})`}>
            <rect x={-6} y={-124} width={12} height={i % 3 === 0 ? 24 : 13} rx={4} fill={C.ink} />
          </g>
        ))}
        <g transform={`rotate(${f1(hourA)})`}>
          <line x1={0} y1={10} x2={0} y2={-70} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
        </g>
        <g transform={`rotate(${f1(minA)})`}>
          <line x1={0} y1={12} x2={0} y2={-112} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
        </g>
        <g transform={`rotate(${f1(secA)})`}>
          <line x1={0} y1={22} x2={0} y2={-118} stroke={C.red} strokeWidth={4} strokeLinecap="round" />
        </g>
        <circle cx={0} cy={0} r={11} fill={C.red} />
      </g>
    </g>
  );
}

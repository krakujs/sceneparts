import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Christmas stocking: a red sock with a white knitted cuff, a little white snowflake pattern and a hanging loop.
// Origin = the top of the loop (the stocking hangs from y). About 380 px wide and 600 px tall at s = 1.
// anim "sway": the stocking swings gently from its loop.
const f1 = (v: number) => v.toFixed(1);
const flake = (cx: number, cy: number) => (
  <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`} stroke={C.white} strokeWidth={5} strokeLinecap="round">
    <line x1={-11} y1={0} x2={11} y2={0} />
    <line x1={0} y1={-11} x2={0} y2={11} />
    <line x1={-8} y1={-8} x2={8} y2={8} />
    <line x1={-8} y1={8} x2={8} y2={-8} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 300;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const cuff = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 5 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(sway)})`}>
        {/* hanging loop */}
        <path d="M -26 -6 C -26 -62 26 -62 26 -6" fill="none" stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" />
        {/* leg and foot */}
        <path d="M -120 60 L 120 60 L 120 330 C 120 400 240 380 240 470 C 240 520 212 545 150 545 Q -120 545 -120 520 Z" fill={red} />
        <rect x={84} y={60} width={36} height={270} fill={shade(red, 0.18)} opacity={0.7} />
        {/* snowflakes */}
        {flake(-58, 150)}{flake(30, 128)}{flake(-30, 240)}{flake(56, 236)}{flake(-62, 330)}{flake(22, 360)}{flake(170, 480)}
        {/* knitted cuff */}
        <rect x={-138} y={0} width={276} height={112} rx={22} fill={cuff} />
        <rect x={-138} y={94} width={276} height={18} rx={9} fill={C.greyLight} />
        {[-100, -60, -20, 20, 60, 100].map((dx) => <line key={dx} x1={dx} y1={14} x2={dx} y2={80} stroke={C.greyLight} strokeWidth={6} strokeLinecap="round" />)}
      </g>
    </g>
  );
}

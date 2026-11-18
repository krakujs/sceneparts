import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Square sticky note with a curled bottom-right corner and a few doodle lines (no words).
// anim "flutter": the note tilts and sways gently from its bottom edge. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const flut = anim === "flutter";
  const sway = flut ? Math.sin((f * 2 * Math.PI) / 70) * 3 : 0;
  const lift = flut ? Math.abs(Math.sin((f * 2 * Math.PI) / 70)) * -6 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={10} fill={C.shadow} />
      <g transform={`translate(0 ${f1(lift)}) rotate(${f1(sway)} 0 0) ${motion(anim, f)}`}>
        <path d="M -210 -440 L 210 -440 L 210 -120 L 110 -20 L -210 -20 Z" fill={paper} />
        {/* curled corner */}
        <path d="M 210 -120 L 110 -20 L 210 -20 Z" fill={shade(paper, 0.25)} />
        <path d="M 110 -20 L 210 -120" stroke={shade(paper, 0.35)} strokeWidth={6} strokeLinecap="round" />
        {/* doodles */}
        <path d="M -150 -360 q 22 -30 44 0 t 44 0 t 44 0 t 44 0" stroke={shade(paper, 0.4)} strokeWidth={9} strokeLinecap="round" fill="none" />
        <circle cx={-40} cy={-250} r={34} stroke={shade(paper, 0.4)} strokeWidth={9} fill="none" />
        <path d="M 60 -290 L 80 -240 L 130 -236 L 92 -206 L 104 -156 L 60 -184 L 16 -156 L 28 -206 L -10 -236 L 40 -240 Z" fill={shade(paper, 0.2)} />
        <path d="M -150 -110 L -60 -110" stroke={shade(paper, 0.4)} strokeWidth={9} strokeLinecap="round" />
        <path d="M -150 -70 L 20 -70" stroke={shade(paper, 0.4)} strokeWidth={9} strokeLinecap="round" />
      </g>
    </g>
  );
}

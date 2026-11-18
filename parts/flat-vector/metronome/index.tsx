import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pyramid wooden metronome: a tapered wood body on a flat base, a small window with a scale, and a thin arm
// pivoting from the bottom with a sliding weight. Origin = bottom centre. anim "tick" swings the arm, one beat per 30 frames.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const PIVOT = -120; // arm pivot height above the base

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const arm = anim === "tick" ? 22 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? easeOutBack(Math.min(1, Math.max(0, f / 20))) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) scale(${f1(pop)})`}>
        {/* base and pyramid body */}
        <rect x={-130} y={-36} width={260} height={36} rx={10} fill={shade(wood, 0.3)} />
        <path d="M -120 -36 L -70 -440 Q -66 -470 -30 -470 L 30 -470 Q 66 -470 70 -440 L 120 -36 Z" fill={wood} />
        <path d="M 40 -440 L 92 -60 L 120 -36 L 70 -440 Z" fill={shade(wood, 0.2)} />
        {/* top cap */}
        <rect x={-54} y={-500} width={108} height={36} rx={12} fill={shade(wood, 0.2)} />
        {/* scale window */}
        <rect x={-40} y={-340} width={80} height={130} rx={10} fill={C.sand} />
        {[-300, -270, -240, -210, -180].map((yy, i) => <rect key={i} x={-28} y={yy} width={i === 2 ? 56 : 36} height={5} rx={2} fill={C.inkSoft} />)}
        {/* arm, pivoting at the pivot point, with a sliding weight */}
        <g transform={`translate(0 ${PIVOT}) rotate(${f1(arm)})`}>
          <rect x={-6} y={-440} width={12} height={400} rx={6} fill={C.yellowDark} />
          <rect x={-22} y={-270} width={44} height={36} rx={8} fill={C.ink} />
        </g>
        <circle cx={0} cy={PIVOT} r={18} fill={C.ink} />
      </g>
    </g>
  );
}

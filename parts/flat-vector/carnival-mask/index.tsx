import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Decorative carnival eye mask on a stick: gold trim, swirls, gems and a fan of feathers on one side.
// Origin = bottom centre of the stick (it stands on y). About 470 px wide and 520 px tall at s = 1.
// anim "sparkle" twinkles the stars around the mask.
const f1 = (v: number) => v.toFixed(1);
const BODY = "M -200 -470 Q -150 -510 -70 -492 Q 0 -474 70 -492 Q 150 -510 200 -470 Q 232 -420 206 -372 Q 130 -332 66 -368 Q 0 -342 -66 -368 Q -130 -332 -206 -372 Q -232 -420 -200 -470 Z";
const FEATHERS = [C.pink, C.teal, C.orange, C.lime, C.pink];
const STARS: [number, number][] = [[-290, -540], [300, -600], [-270, -300], [250, -250]];

const Star = ({ x, y, k, c }: { x: number; y: number; k: number; c: string }) => (
  <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(k)})`} opacity={f1(0.4 + 0.6 * k)}>
    <path d="M 0 -22 L 5 -5 L 22 0 L 5 5 L 0 22 L -5 5 L -22 0 L -5 -5 Z" fill={c} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const mask = p.color && p.color !== "none" ? p.color : C.purple;
  const gold = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const phase = (i: number) => (anim === "sparkle" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40 + i * 1.7) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* feathers fanning out from the right side, behind the mask */}
      {[-62, -36, -12, 12, 36].map((a, i) => (
        <g key={i} transform={`translate(176 -430) rotate(${a})`}>
          <path d="M 0 0 C 30 -60 26 -150 0 -214 C -26 -150 -30 -60 0 0 Z" fill={FEATHERS[i]} stroke={shade(FEATHERS[i], 0.2)} strokeWidth={4} />
          <path d="M 0 -6 L 0 -190" stroke={shade(FEATHERS[i], 0.3)} strokeWidth={4} strokeLinecap="round" />
        </g>
      ))}
      {/* stick with a wrapped grip and a gold binding under the mask */}
      <rect x={-9} y={-372} width={18} height={380} rx={9} fill={C.brown} />
      <rect x={-9} y={-70} width={18} height={70} rx={6} fill={shade(C.brown, 0.25)} />
      <rect x={-24} y={-388} width={48} height={20} rx={6} fill={gold} stroke={shade(gold, 0.2)} strokeWidth={3} />
      {/* mask body with a gold trim */}
      <path d={BODY} fill={mask} />
      <path d={BODY} fill="none" stroke={gold} strokeWidth={12} strokeLinejoin="round" />
      <path d={BODY} fill="none" stroke={shade(mask, 0.25)} strokeWidth={0} />
      {/* eye openings */}
      <path d="M -150 -440 Q -100 -478 -50 -440 Q -100 -414 -150 -440 Z" fill={C.ink} stroke={gold} strokeWidth={6} />
      <path d="M 150 -440 Q 100 -478 50 -440 Q 100 -414 150 -440 Z" fill={C.ink} stroke={gold} strokeWidth={6} />
      {/* gold swirls beside the eyes and on the forehead */}
      <path d="M -186 -430 C -214 -470 -196 -506 -166 -492" stroke={gold} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M 186 -430 C 214 -470 196 -506 166 -492" stroke={gold} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M -40 -488 C -70 -520 -26 -536 -14 -508" stroke={gold} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M 40 -488 C 70 -520 26 -536 14 -508" stroke={gold} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* gems */}
      <circle cx={0} cy={-470} r={13} fill={C.pink} stroke={gold} strokeWidth={4} />
      <circle cx={-76} cy={-478} r={9} fill={C.teal} stroke={gold} strokeWidth={3} />
      <circle cx={76} cy={-478} r={9} fill={C.teal} stroke={gold} strokeWidth={3} />
      <circle cx={-4} cy={-474} r={3} fill={C.white} opacity={0.8} />
      {/* sparkle stars */}
      {STARS.map(([sx, sy], i) => (
        <Star key={i} x={sx} y={sy} k={phase(i)} c={gold} />
      ))}
    </g>
  );
}

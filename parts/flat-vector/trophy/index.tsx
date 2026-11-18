import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Gold cup trophy: a bowl with a stem, two curved handles, and a stepped base with a plaque.
// Origin = bottom centre (the base rests on y). About 500 px wide and 640 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const gold = p.color && p.color !== "none" ? p.color : C.yellow;
  const base = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* stepped base */}
        <rect x={-190} y={-70} width={380} height={70} rx={14} fill={base} />
        <rect x={-190} y={-70} width={380} height={14} rx={6} fill={shade(base, 0.25)} />
        <rect x={-140} y={-120} width={280} height={54} rx={12} fill={shade(base, 0.1)} />
        {/* gold plaque on the base */}
        <rect x={-70} y={-62} width={140} height={40} rx={8} fill={gold} />
        {/* stem and collar */}
        <rect x={-34} y={-220} width={68} height={104} fill={shade(gold, 0.15)} />
        <rect x={-80} y={-240} width={160} height={28} rx={10} fill={gold} />
        {/* handles: thick arcs on each side of the cup */}
        <path d="M -150 -460 Q -270 -460 -260 -360 Q -250 -270 -120 -270" stroke={shade(gold, 0.15)} strokeWidth={34} strokeLinecap="round" fill="none" />
        <path d="M 150 -460 Q 270 -460 260 -360 Q 250 -270 120 -270" stroke={shade(gold, 0.15)} strokeWidth={34} strokeLinecap="round" fill="none" />
        {/* cup bowl */}
        <path d="M -190 -520 Q -200 -270 -60 -240 L 60 -240 Q 200 -270 190 -520 Z" fill={gold} />
        {/* bowl rim */}
        <rect x={-196} y={-540} width={392} height={28} rx={12} fill={shade(gold, 0.08)} />
        {/* shade on the right of the bowl */}
        <path d="M 110 -500 Q 160 -400 120 -270 L 60 -240 Q 150 -300 150 -420 Z" fill={shade(gold, 0.2)} />
        {/* shine */}
        <path d="M -130 -480 Q -140 -400 -110 -330" stroke={C.white} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.45} />
        {/* star on the bowl */}
        <path d="M 0 -440 L 14 -406 L 50 -404 L 21 -382 L 32 -346 L 0 -368 L -32 -346 L -21 -382 L -50 -404 L -14 -406 Z" fill={shade(gold, 0.25)} />
      </g>
    </g>
  );
}

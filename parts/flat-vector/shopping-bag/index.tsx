import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Plain paper shopping bag with twisted rope handles and a folded top. Unbranded, no text.
// Origin = bottom centre (the bag stands on y). About 340 px wide and 530 px tall at s = 1.
// anim "bob": the bag sways a little as if carried.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.sand;
  const rope = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const sway = anim === "bob" ? Math.sin((f * 2 * Math.PI) / 60) * 2 : 0;
  const lift = anim === "bob" ? Math.abs(Math.sin((f * Math.PI) / 60)) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(-lift)}) rotate(${f1(sway)} 0 0)`}>
        {/* handles: two rope arches behind the bag front */}
        <path d="M -120 -392 C -140 -520 -40 -530 -40 -392" stroke={rope} strokeWidth={14} strokeLinecap="round" fill="none" />
        <path d="M 40 -392 C 40 -530 140 -520 120 -392" stroke={rope} strokeWidth={14} strokeLinecap="round" fill="none" />
        {/* body and the right-hand gusset */}
        <rect x={-170} y={-400} width={340} height={400} rx={10} fill={paper} />
        <rect x={120} y={-400} width={50} height={400} rx={6} fill={shade(paper, 0.14)} />
        {/* folded top band */}
        <rect x={-170} y={-400} width={340} height={46} rx={8} fill={shade(paper, 0.08)} />
        <rect x={-170} y={-354} width={340} height={8} fill={shade(paper, 0.2)} />
        {/* front fold lines */}
        <rect x={-170} y={-120} width={340} height={6} fill={shade(paper, 0.1)} />
        <rect x={-120} y={-200} width={6} height={200} fill={shade(paper, 0.08)} />
        {/* the rope handles are knotted into the top band */}
        <circle cx={-120} cy={-392} r={12} fill={rope} />
        <circle cx={120} cy={-392} r={12} fill={rope} />
        {/* highlight */}
        <rect x={-130} y={-300} width={14} height={160} rx={7} fill={C.white} opacity={0.25} />
      </g>
    </g>
  );
}

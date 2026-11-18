import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Friendly anatomy-class skeleton on a pole stand with a round base. About 1000 px tall at s = 1.
// Simple shapes: a round skull with eye holes and a smile, ribcage, spine, pelvis and jointed limbs.
// anim "wave": the right arm sways. Origin = bottom centre (the base rests on y).
const f1 = (v: number) => v.toFixed(1);
const BONE = "#F4F1EA";
const DARK = C.navy;
const POLE = "#9AA3B5";
const UP = -40; // figure lift above the base

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const bone = p.color && p.color !== "none" ? p.color : BONE;
  const bdk = shade(bone, 0.12);
  const anim: string = p.anim ?? "none";
  const sway = anim === "wave" ? 14 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const rib = (y0: number) => (
    <path d={`M -10 ${y0} C -60 ${y0 - 6} -100 ${y0 + 20} -112 ${y0 + 52}`} stroke={bone} strokeWidth={16} strokeLinecap="round" fill="none" />
  );
  const leg = (
    <path d="M -52 -420 L -62 -250 L -54 -80" stroke={bone} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* round base and pole */}
      <ellipse cx={0} cy={-6} rx={170} ry={20} fill={shade(POLE, 0.25)} />
      <rect x={-150} y={-44} width={300} height={36} rx={18} fill={POLE} />
      <rect x={-9} y={-915} width={18} height={880} rx={8} fill={POLE} />
      <path d="M 0 -915 Q 0 -936 -28 -936" stroke={POLE} strokeWidth={14} strokeLinecap="round" fill="none" />

      <g transform={`translate(0 ${UP})`}>
        {/* spine */}
        {Array.from({ length: 9 }, (_, k) => (
          <rect key={k} x={-12} y={-728 + k * 34} width={24} height={22} rx={8} fill={bdk} />
        ))}
        {/* legs */}
        {[-1, 1].map((sg) => (
          <g key={sg} transform={`scale(${sg} 1)`}>
            {leg}
            <circle cx={-62} cy={-250} r={14} fill={bone} />
            <ellipse cx={-54} cy={-66} rx={26} ry={12} fill={bone} />
          </g>
        ))}
        {/* pelvis */}
        <path d="M -95 -440 Q -140 -380 -80 -340 L 80 -340 Q 140 -380 95 -440 Q 0 -420 -95 -440 Z" fill={bone} />
        {/* ribcage */}
        <path d="M -120 -712 Q 0 -736 120 -712" stroke={bone} strokeWidth={18} strokeLinecap="round" fill="none" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            {rib(-700 + i * 42)}
            <g transform="scale(-1 1)">{rib(-700 + i * 42)}</g>
          </g>
        ))}
        <rect x={-9} y={-712} width={18} height={200} rx={9} fill={bdk} />
        {/* neck and skull */}
        <rect x={-14} y={-760} width={28} height={36} rx={8} fill={bone} />
        <circle cx={0} cy={-842} r={84} fill={bone} />
        <rect x={-58} y={-790} width={116} height={60} rx={28} fill={bone} />
        {/* friendly eyes and nose */}
        <ellipse cx={-34} cy={-848} rx={24} ry={28} fill={DARK} />
        <ellipse cx={34} cy={-848} rx={24} ry={28} fill={DARK} />
        <circle cx={-27} cy={-858} r={6} fill={C.white} />
        <circle cx={41} cy={-858} r={6} fill={C.white} />
        <path d="M -9 -816 L 9 -816 L 0 -800 Z" fill={DARK} />
        {/* smile */}
        <path d="M -40 -772 Q 0 -750 40 -772" stroke={DARK} strokeWidth={6} strokeLinecap="round" fill="none" />
        {/* left arm: hangs still */}
        <path d="M -118 -700 L -150 -560 L -165 -445" stroke={bone} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx={-150} cy={-560} r={13} fill={bone} />
        <circle cx={-165} cy={-445} r={16} fill={bone} />
        {/* right arm: pivots at the shoulder and can sway */}
        <g transform={`translate(118 -700) rotate(${f1(sway)})`}>
          <path d="M 0 0 L 32 140 L 47 255" stroke={bone} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx={32} cy={140} r={13} fill={bone} />
          <circle cx={47} cy={255} r={16} fill={bone} />
        </g>
      </g>
    </g>
  );
}

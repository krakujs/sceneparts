import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Longsword stuck point-down in a grey rock. The blade has original angular runes that glow blue.
// Origin = bottom centre of the rock. About 330 px wide and 900 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const STEEL = "#D9E2EE";
// Simple original rune strokes (polylines), placed down the blade.
const RUNES = [
  { y: -560, d: "M -10 -14 L 0 -22 L 10 -14 L 0 14 Z" },
  { y: -470, d: "M -12 -14 L 12 14 M 12 -14 L -12 14" },
  { y: -380, d: "M -10 -16 L 10 0 L -10 16" },
  { y: -290, d: "M -12 0 L 12 0 M 0 -16 L 0 16" },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const glow = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "glow";
  const pulse = anim === "glow" ? 0.6 + 0.4 * Math.sin((f * 2 * Math.PI) / 70) : 0.9;
  const shimmerY = anim === "glow" ? -700 + ((f * 4) % 720) : -9999;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={200} ry={16} fill={C.shadow} />
      {/* rock */}
      <path d="M -170 0 Q -190 -90 -150 -140 Q -120 -190 -40 -180 Q 40 -200 110 -150 Q 180 -110 170 -40 Q 166 0 150 0 Z" fill={C.grey} />
      <path d="M -40 -180 Q 40 -200 110 -150 Q 180 -110 170 -40 Q 166 0 150 0 L 60 0 Q 90 -80 20 -150 Z" fill={shade(C.grey, 0.2)} opacity={0.7} />
      <path d="M -120 -140 Q -80 -160 -40 -150" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.4} />
      {/* blade: point at the rock, widening to the ricasso */}
      <path d="M -20 -150 L 0 -760 L 20 -150 Z" fill={STEEL} />
      <path d="M 0 -760 L 20 -150 L 0 -150 Z" fill={shade(STEEL, 0.15)} />
      <path d="M -6 -740 L -6 -170" stroke={C.white} strokeWidth={6} opacity={0.7} />
      {/* ornate crossguard, with a gem */}
      <path d="M -170 -160 Q -120 -200 -60 -170 L -40 -150 L 40 -150 L 60 -170 Q 120 -200 170 -160 L 150 -130 Q 100 -150 60 -130 L -60 -130 Q -100 -150 -150 -130 Z" fill={C.yellow} />
      <path d="M -170 -160 Q -120 -200 -60 -170 L -40 -150 L 40 -150 L 60 -170 Q 120 -200 170 -160" fill="none" stroke={C.yellowDark} strokeWidth={6} />
      <circle cx={0} cy={-140} r={16} fill={glow} opacity={pulse} />
      {/* grip with wrap and round pommel */}
      <rect x={-16} y={-120} width={32} height={150} rx={8} fill={C.brownDark} />
      {[-100, -70, -40].map((gy) => <rect key={gy} x={-16} y={gy} width={32} height={6} fill={C.brown} />)}
      <circle cx={0} cy={-6} r={22} fill={C.yellow} />
      {/* glowing runes on the blade */}
      {RUNES.map((r, i) => (
        <path key={i} d={r.d} transform={`translate(0 ${r.y})`} fill="none" stroke={glow} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={pulse} />
      ))}
      {anim === "glow" && <rect x={-20} y={shimmerY} width={40} height={60} fill={C.white} opacity={0.35} />}
    </g>
  );
}

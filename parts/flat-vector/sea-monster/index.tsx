import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sea monster: deep-sea big-mouthed fish monster with a glowing lure and soft teeth, swimming.
// Origin = bottom of the included deep-water band (y); the band fades in from the top. About 700 px wide and 500 px tall at s = 1.
// anim: swim (tail beats, lure glows and bubbles rise) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const TEETH_UP = [0, 1, 2, 3, 4, 5].map((i) => [120 + i * 34, -418 + i * 16] as [number, number]);
const TEETH_LOW = [0, 1, 2, 3, 4].map((i) => [124 + i * 36, -300 + i * 2] as [number, number]);

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1600, s = 1, f = 0, flip = false } = p as any;
  const body: string = p.color && p.color !== "none" ? p.color : "#2B3A67";
  const dark = shade(body, 0.3), jaw = "#3D5A8A";
  const anim: string = p.anim ?? "swim";
  const wag = anim === "swim" ? Math.sin(f * 0.2) * 12 : 0;
  const glow = 0.55 + 0.45 * Math.sin(f * 0.15);
  const bub = (f * 2) % 300;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <defs>
        <linearGradient id="sea-monster-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E2A4F" stopOpacity={0} />
          <stop offset="1" stopColor="#0E2A4F" stopOpacity={0.7} />
        </linearGradient>
      </defs>
      <rect x={-540} y={-720} width={1080} height={720} fill="url(#sea-monster-deep)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={320 + i * 30} cy={-((bub + i * 100) % 500) - 60} r={6 + i * 2} fill="none" stroke="#9FD8F0" strokeWidth={3} opacity={0.6} />
      ))}
      <path d="M 120 -470 Q 130 -560 190 -600" stroke={dark} strokeWidth={14} strokeLinecap="round" fill="none" />
      <circle cx={200} cy={-612} r={70} fill={C.yellow} opacity={0.25 * glow} />
      <circle cx={200} cy={-612} r={30} fill={C.yellow} opacity={0.6 + 0.4 * glow} />
      <circle cx={200} cy={-612} r={16} fill="#FFF6C2" />
      <g transform={`rotate(${wag} -210 -340)`}>
        <path d="M -200 -340 L -380 -470 Q -350 -340 -380 -210 Z" fill={dark} />
      </g>
      <path d="M -60 -490 L -20 -600 L 40 -500 Z" fill={dark} />
      <ellipse cx={0} cy={-340} rx={300} ry={170} fill={body} />
      <path d="M -220 -290 Q 0 -200 200 -240 L 260 -250 Q 100 -170 -220 -250 Z" fill={jaw} />
      <path d="M 100 -440 Q 250 -470 330 -340 Q 230 -290 100 -300 Z" fill="#14102A" />
      {TEETH_UP.map(([tx, ty], i) => <circle key={`u${i}`} cx={tx} cy={ty} r={9} fill="#FFFFFF" />)}
      {TEETH_LOW.map(([tx, ty], i) => <circle key={`l${i}`} cx={tx} cy={ty} r={8} fill="#FFFFFF" />)}
      <circle cx={150} cy={-430} r={22} fill={C.yellow} />
      <circle cx={156} cy={-430} r={11} fill={C.ink} />
      <circle cx={160} cy={-436} r={4} fill="#FFFFFF" />
      <path d="M 60 -200 Q 150 -170 220 -200" stroke={dark} strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Elevated round water tank on steel legs, with a ladder and a small walkway. Origin = base on the ground.
// About 420 px wide and 1080 px tall at s = 1.
// anim "lights": a warning lamp on top blinks.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const tank = p.color && p.color !== "none" ? p.color : C.white;
  const steel = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const legs = [-150, -50, 50, 150];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={18} fill={C.shadow} />
      {/* concrete footing */}
      <rect x={-190} y={-40} width={380} height={40} rx={8} fill={C.grey} />
      {/* legs: spread at the base, converging to the tank */}
      <path d="M -170 -40 L -110 -640 L -90 -640 L -150 -40 Z" fill={steel} />
      <path d="M 170 -40 L 110 -640 L 90 -640 L 150 -40 Z" fill={steel} />
      <path d="M -70 -40 L -40 -640 L -18 -640 L -48 -40 Z" fill={steel} />
      <path d="M 70 -40 L 40 -640 L 18 -640 L 48 -40 Z" fill={steel} />
      {/* cross braces */}
      {[-150, -300, -450].map((by) => (
        <g key={by}>
          <line x1={-150} y1={by} x2={150} y2={by} stroke={steel} strokeWidth={10} />
          <line x1={-130} y1={by + 140} x2={130} y2={by} stroke={shade(steel, 0.2)} strokeWidth={6} />
          <line x1={130} y1={by + 140} x2={-130} y2={by} stroke={shade(steel, 0.2)} strokeWidth={6} />
        </g>
      ))}
      {/* ladder running up one leg */}
      <rect x={-100} y={-660} width={6} height={620} fill={C.yellowDark} />
      <rect x={-68} y={-660} width={6} height={620} fill={C.yellowDark} />
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={i} x={-100} y={-640 + i * 20} width={34} height={5} rx={2} fill={C.yellowDark} />
      ))}
      {/* tank: a cylinder with a dome roof */}
      <rect x={-210} y={-900} width={420} height={260} rx={12} fill={tank} />
      <rect x={-210} y={-900} width={420} height={18} rx={6} fill={shade(tank, 0.12)} />
      <path d="M -210 -900 Q -210 -980 0 -990 Q 210 -980 210 -900 Z" fill={steel} />
      <rect x={-18} y={-1000} width={36} height={22} rx={6} fill={C.greyDark} />
      {/* banding rings */}
      {[-790, -700].map((ry) => (
        <rect key={ry} x={-210} y={ry} width={420} height={10} fill={shade(tank, 0.15)} />
      ))}
      {/* tank name panel (blank) */}
      <rect x={-120} y={-860} width={240} height={50} rx={8} fill={C.skyDeep} />
      <rect x={-104} y={-852} width={40} height={34} rx={5} fill={C.white} opacity={0.5} />
      {/* railing around the top */}
      <line x1={-200} y1={-910} x2={200} y2={-910} stroke={steel} strokeWidth={6} />
      {[-200, -100, 0, 100, 200].map((rx) => (
        <line key={rx} x1={rx} y1={-910} x2={rx} y2={-950} stroke={steel} strokeWidth={5} />
      ))}
      {/* warning lamp on top */}
      <rect x={-6} y={-1040} width={12} height={20} fill={C.greyDark} />
      <circle cx={0} cy={-1048} r={10} fill={C.red} opacity={anim === "lights" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(f / 4)) : 0.9} />
    </g>
  );
}

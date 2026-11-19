import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cryo pod: an upright capsule with a frosted glass front, a metal frame, status lights and cold mist.
// occupant "empty" shows the empty pod; "sleeper" shows a sleeping silhouette inside. Origin = floor centre; ~900 px tall.
const METAL = "#7D879C", METAL_D = "#3A4157", ICE = "#DFF3FF";
const POD = "M -170 -60 L -170 -710 A 170 170 0 0 1 170 -710 L 170 -60 Z";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, glass = "#8EC5E8", occupant = "empty", anim = "mist" } = p as any;
  const misting = anim === "mist";
  const blinkA = Math.floor(f / 20) % 2 === 0 ? 1 : 0.35;
  const blinkB = Math.floor(f / 14) % 2 === 0 ? 1 : 0.35;
  // Frost: fixed specks scattered over the glass (deterministic, no randomness).
  const frost = Array.from({ length: 36 }, (_, i) => {
    const px = ((i * 97) % 280) - 140;
    const py = -90 - ((i * 53) % 740);
    return <circle key={i} cx={px} cy={py} r={2 + (i % 4)} fill={C.white} opacity={0.45} />;
  });
  // Mist: puffs that rise from the base and drift.
  const mist = misting
    ? Array.from({ length: 7 }, (_, i) => {
        const prog = ((f * 1.1 + i * 70) % 200) / 200;
        const yy = -40 - prog * 200;
        const xx = Math.sin(f / 25 + i * 1.7) * 70 + (i - 3) * 18;
        return <circle key={i} cx={xx} cy={yy} r={50 + (i % 3) * 18} fill={C.white} opacity={(1 - prog) * 0.55} />;
      })
    : null;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <defs>
        <linearGradient id="cryo-pod-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={glass} stopOpacity={0.45} />
          <stop offset="1" stopColor={glass} stopOpacity={0.75} />
        </linearGradient>
        <clipPath id="cryo-pod-clip">
          <path d={POD} />
        </clipPath>
      </defs>
      <ellipse cx={0} cy={4} rx={230} ry={20} fill={C.shadow} />
      {/* pod body: tinted interior, sleeper, frost and frame */}
      <path d={POD} fill={shade(glass, 0.35)} />
      {occupant === "sleeper" && (
        <g clipPath="url(#cryo-pod-clip)">
          <circle cx={0} cy={-600} r={52} fill={ICE} opacity={0.5} />
          <rect x={-95} y={-540} width={190} height={420} rx={70} fill={ICE} opacity={0.4} />
          <path d="M -30 -606 Q -22 -598 -14 -606" stroke={shade(ICE, 0.3)} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M 14 -606 Q 22 -598 30 -606" stroke={shade(ICE, 0.3)} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      )}
      <path d={POD} fill="url(#cryo-pod-glass)" />
      <g clipPath="url(#cryo-pod-clip)">{frost}</g>
      <path d={POD} fill="none" stroke={METAL_D} strokeWidth={26} strokeLinejoin="round" />
      <path d={POD} fill="none" stroke={METAL} strokeWidth={8} strokeLinejoin="round" />
      {/* control panel on the front */}
      <rect x={-60} y={-230} width={120} height={90} rx={12} fill={METAL_D} />
      {[-30, 0, 30].map((cx, i) => (
        <circle key={cx} cx={cx} cy={-200} r={8} fill={i === 1 ? "#FFC83D" : "#4BB46A"} opacity={i === 0 ? blinkA : blinkB} />
      ))}
      <rect x={-40} y={-172} width={80} height={8} rx={4} fill={glass} />
      {/* base with status lights */}
      <rect x={-220} y={-60} width={440} height={60} rx={12} fill={METAL_D} />
      <rect x={-200} y={-60} width={400} height={8} rx={4} fill={METAL} />
      {[-150, -120].map((cx) => (
        <circle key={cx} cx={cx} cy={-30} r={8} fill="#4BB46A" opacity={cx === -150 ? blinkA : blinkB} />
      ))}
      {[120, 150].map((cx) => (
        <circle key={cx} cx={cx} cy={-30} r={8} fill="#FFC83D" opacity={cx === 120 ? blinkB : blinkA} />
      ))}
      {mist}
    </g>
  );
}

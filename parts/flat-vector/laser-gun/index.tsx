import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Laser gun: a chunky retro ray gun with brass rings on the barrel and a glowing tip. The barrel points right
// (flip to point left). Origin = centre of the body; about 480 px long at s = 1.
// anim "fire": every 90 frames it fires a bolt with a muzzle flash.
const METAL = "#9AA3B5", BRASS = "#FFC83D", TEAL = "#3DE0FF";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1400, s = 1, f = 0, flip, color = "#FF8A3D", beam = "#FFE066", anim = "fire" } = p as any;
  const body = color, bodyD = shade(color, 0.22), metalD = shade(METAL, 0.25);
  const cyc = f % 90;
  const firing = anim === "fire" && cyc >= 4 && cyc <= 44;
  const t = firing ? (cyc - 4) / 40 : 0;
  const boltEnd = 326 + 260 * t;
  const boltOp = firing && t > 0.85 ? (1 - t) / 0.15 : 1;
  const flash = anim === "fire" && cyc < 10 ? 1 - cyc / 10 : 0;
  const pulse = 0.7 + 0.3 * Math.sin(f / 6);
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {/* grip and trigger guard */}
      <path d="M -70 20 L -104 170 Q -108 196 -82 200 L -42 202 Q -20 200 -14 176 L 10 40 Z" fill={bodyD} />
      <path d="M -10 56 L -10 100 Q 20 124 46 100 L 46 56" stroke={metalD} strokeWidth={14} strokeLinecap="round" fill="none" />
      <rect x={16} y={60} width={12} height={30} rx={6} fill={metalD} />
      {/* body with a top ridge and a power cell with a glowing lens */}
      <rect x={-120} y={-80} width={240} height={130} rx={56} fill={body} />
      <rect x={-120} y={10} width={240} height={60} rx={30} fill={bodyD} opacity={0.5} />
      <rect x={-90} y={-104} width={180} height={34} rx={16} fill={bodyD} />
      <rect x={-70} y={-150} width={110} height={60} rx={14} fill={METAL} />
      <ellipse cx={-15} cy={-150} rx={40} ry={14} fill={TEAL} opacity={pulse} />
      {[40, 70, 100].map((vx) => (
        <line key={vx} x1={vx} y1={-30} x2={vx} y2={10} stroke={bodyD} strokeWidth={8} strokeLinecap="round" />
      ))}
      {/* barrel with brass rings and a muzzle */}
      <rect x={110} y={-36} width={200} height={72} rx={12} fill={METAL} />
      <rect x={110} y={16} width={200} height={20} rx={8} fill={metalD} />
      {[150, 200, 250].map((rx) => (
        <g key={rx}>
          <rect x={rx} y={-54} width={16} height={108} rx={6} fill={BRASS} />
          <rect x={rx + 10} y={-54} width={6} height={108} rx={3} fill={shade(BRASS, 0.25)} />
        </g>
      ))}
      <rect x={296} y={-48} width={26} height={96} rx={8} fill={metalD} />
      {/* glowing tip, flash and bolt */}
      {flash > 0 && <circle cx={326} cy={0} r={40 + 60 * flash} fill={beam} opacity={0.45 * flash} />}
      <circle cx={326} cy={0} r={34} fill={beam} opacity={0.45} />
      <circle cx={326} cy={0} r={18} fill={C.white} />
      {firing && (
        <g opacity={boltOp}>
          <line x1={326} y1={0} x2={boltEnd} y2={0} stroke={beam} strokeWidth={40} strokeLinecap="round" opacity={0.3} />
          <line x1={326} y1={0} x2={boltEnd} y2={0} stroke={beam} strokeWidth={16} strokeLinecap="round" opacity={0.85} />
          <line x1={326} y1={0} x2={boltEnd} y2={0} stroke={C.white} strokeWidth={6} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

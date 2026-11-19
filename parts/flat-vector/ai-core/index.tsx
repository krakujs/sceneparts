import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// AI core: a tall server-rack pillar with a glowing ring eye made of segments (teal by default, never a single red lens)
// and rows of blinking data lights. Origin = floor point under the plinth; ~1000 px tall at s = 1.
const NAVY = "#253058", NAVY_D = "#1A2140", NAVY_L = "#33407A", UNIT = "#1B2447", DIM = "#3A4157";
const AMBER = "#FFC83D";
const EYE_Y = -800, RO = 120, RI = 82, N = 12, GAP = 8;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, color = "#2ED8C3", anim = "pulse" } = p as any;
  const on = anim === "pulse";
  const rot = on ? f * 1.2 : 0;
  const pt = (r: number, a: number) => `${(Math.cos(a) * r).toFixed(1)} ${(EYE_Y + Math.sin(a) * r).toFixed(1)}`;
  const segs = Array.from({ length: N }, (_, i) => {
    const a0 = ((i * 360) / N + rot + GAP / 2) * (Math.PI / 180);
    const a1 = (((i + 1) * 360) / N + rot - GAP / 2) * (Math.PI / 180);
    const d = `M ${pt(RO, a0)} A ${RO} ${RO} 0 0 1 ${pt(RO, a1)} L ${pt(RI, a1)} A ${RI} ${RI} 0 0 0 ${pt(RI, a0)} Z`;
    const lit = on ? (((i * 5 + Math.floor(f / 6)) % 12) < 8 ? 1 : 0.3) : 1;
    return <path key={i} d={d} fill={color} opacity={0.45 + 0.55 * lit} />;
  });
  const colours = [color, "#8FF5E4", AMBER];
  const units = Array.from({ length: 11 }, (_, u) => {
    const top = -640 + u * 50;
    return (
      <g key={u}>
        <rect x={-120} y={top} width={240} height={36} rx={6} fill={UNIT} />
        {Array.from({ length: 5 }, (_, j) => {
          const period = 4 + ((u * 3 + j * 5) % 7);
          const lit = on ? (Math.floor(f / period) + u + j) % 3 !== 0 : (u + j) % 3 !== 0;
          return <circle key={j} cx={-90 + j * 45} cy={top + 18} r={7} fill={lit ? colours[(u + j) % 3] : DIM} />;
        })}
      </g>
    );
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={230} ry={20} fill="rgba(31,36,51,0.16)" />
      <rect x={-200} y={-40} width={400} height={40} rx={10} fill={NAVY_D} />
      <rect x={-170} y={-1000} width={340} height={960} rx={22} fill={NAVY} />
      <rect x={-186} y={-1020} width={372} height={34} rx={12} fill={NAVY_D} />
      <rect x={-140} y={-940} width={280} height={880} rx={14} fill={NAVY_D} />
      {/* glowing ring eye */}
      <circle cx={0} cy={EYE_Y} r={150} fill={color} opacity={0.12} />
      <circle cx={0} cy={EYE_Y} r={138} fill={NAVY_L} />
      {segs}
      <circle cx={0} cy={EYE_Y} r={60} fill={color} opacity={0.25} />
      <circle cx={0} cy={EYE_Y} r={30} fill="#D9FFF8" opacity={on ? 0.7 + 0.3 * Math.sin(f / 8) : 0.85} />
      {/* data lights */}
      {units}
      {/* vent slits */}
      {[-90, -78, -66].map((yy) => (
        <rect key={yy} x={-120} y={yy} width={240} height={6} rx={3} fill={shade(NAVY_D, 0.3)} />
      ))}
    </g>
  );
}

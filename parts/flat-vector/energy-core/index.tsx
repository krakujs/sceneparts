import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Energy core: a glowing reactor cylinder inside a metal cage, with light rings that climb the core and pulse.
// Prop: origin = floor point under the base; ~700 px tall at s = 1.
const METAL = "#9AA3B5", METAL_D = "#4A5268", METAL_L = "#DDE2EA";
const TOP = -640, BOT = -60, R = 150;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, color = "#4FD8F0", anim = "pulse" } = p as any;
  const on = anim === "pulse";
  const pulse = on ? 0.6 + 0.4 * Math.sin(f / 8) : 0.8;
  const span = BOT - TOP; // 580 px of climb
  const rings = [0, 1, 2, 3].map((i) => {
    const pos = on ? (f * 2 + i * (span / 4)) % span : i * (span / 4);
    const yy = BOT - pos;
    const op = Math.min(1, pos / 60, (span - pos) / 60);
    return <ellipse key={i} cx={0} cy={yy} rx={R} ry={36} fill="none" stroke={color} strokeWidth={9} opacity={op * 0.95} />;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <defs>
        <linearGradient id="energy-core-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(color, 0.55)} />
          <stop offset="0.35" stopColor={color} />
          <stop offset="0.5" stopColor={C.white} />
          <stop offset="0.7" stopColor={color} />
          <stop offset="1" stopColor={shade(color, 0.55)} />
        </linearGradient>
        <clipPath id="energy-core-clip">
          <rect x={-R} y={TOP} width={R * 2} height={span} />
        </clipPath>
      </defs>
      <circle cx={0} cy={-330} r={260} fill={color} opacity={0.1 * pulse} />
      <ellipse cx={0} cy={0} rx={220} ry={30} fill={color} opacity={0.25 * pulse} />
      {/* base */}
      <rect x={-190} y={-40} width={380} height={40} rx={12} fill={METAL_D} />
      {/* core body */}
      <ellipse cx={0} cy={BOT} rx={R} ry={36} fill={shade(color, 0.5)} />
      <rect x={-R} y={TOP} width={R * 2} height={span} fill="url(#energy-core-glow)" opacity={pulse} />
      <g clipPath="url(#energy-core-clip)">{rings}</g>
      {/* top cap and plate */}
      <ellipse cx={0} cy={TOP} rx={R} ry={36} fill={METAL_L} />
      <rect x={-170} y={-672} width={340} height={36} rx={12} fill={METAL_D} />
      {/* cage: side bars and two hoops in front */}
      <rect x={-162} y={TOP} width={24} height={span} rx={8} fill={METAL} />
      <rect x={138} y={TOP} width={24} height={span} rx={8} fill={METAL} />
      <ellipse cx={0} cy={-560} rx={158} ry={42} fill="none" stroke={METAL} strokeWidth={14} />
      <ellipse cx={0} cy={-150} rx={158} ry={42} fill="none" stroke={METAL} strokeWidth={14} />
    </g>
  );
}

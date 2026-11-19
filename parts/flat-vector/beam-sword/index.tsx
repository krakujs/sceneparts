import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Beam sword: an energy blade on a chunky hilt with a wide crossguard, emitter block, wrapped grip and round pommel.
// Deliberately not a plain cylinder hilt. Origin = bottom of the pommel; the blade points up, ~900 px tall at s = 1.
const METAL = "#9AA3B5", METAL_D = shade("#9AA3B5", 0.25), GRIP = "#2A2F3D", WRAP = "#4A5268";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, color = "#3DD6F5", anim = "hum" } = p as any;
  const hum = anim === "hum";
  const halo = hum ? 0.16 + 0.08 * Math.sin(f / 5) : 0.2;
  const coreOp = hum ? 0.9 + 0.1 * Math.sin(f / 2.3) : 1;
  const blade = "M -26 -332 L -22 -760 L 0 -890 L 22 -760 L 26 -332 Z";
  const wraps = Array.from({ length: 9 }, (_, i) => {
    const yy = -206 + i * 24;
    return <path key={i} d={`M -30 ${yy} L 30 ${yy + 18}`} stroke={WRAP} strokeWidth={8} />;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={60} ry={8} fill={C.shadow} />
      {/* pommel */}
      <circle cx={0} cy={-22} r={30} fill={METAL_D} />
      <circle cx={0} cy={-22} r={12} fill={color} />
      {/* wrapped grip */}
      <clipPath id="beam-sword-grip">
        <rect x={-26} y={-210} width={52} height={190} rx={14} />
      </clipPath>
      <rect x={-26} y={-210} width={52} height={190} rx={14} fill={GRIP} />
      <g clipPath="url(#beam-sword-grip)">{wraps}</g>
      {/* chunky crossguard with rounded ends and a glowing jewel */}
      <rect x={-170} y={-270} width={340} height={62} rx={31} fill={METAL} />
      <rect x={-170} y={-242} width={340} height={34} rx={17} fill={METAL_D} />
      <circle cx={-170} cy={-239} r={44} fill={METAL} />
      <circle cx={170} cy={-239} r={44} fill={METAL} />
      <circle cx={-170} cy={-239} r={14} fill={color} />
      <circle cx={170} cy={-239} r={14} fill={color} />
      {/* emitter block and blade root */}
      <rect x={-44} y={-300} width={88} height={58} rx={16} fill={METAL_D} />
      <rect x={-30} y={-334} width={60} height={40} fill={METAL} />
      {/* blade: halo, glow, body, white core */}
      <path d={blade} fill="none" stroke={color} strokeWidth={70} strokeLinejoin="round" opacity={halo} />
      <path d={blade} fill="none" stroke={color} strokeWidth={34} strokeLinejoin="round" opacity={0.45} />
      <path d={blade} fill={color} opacity={0.95} />
      <path d="M -8 -340 L -7 -760 L 0 -840 L 7 -760 L 8 -340 Z" fill={C.white} opacity={coreOp} />
    </g>
  );
}

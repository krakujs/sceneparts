import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector seahorse, upright, facing right. Origin = body centre (y default 1000). About 260 px tall at s = 1.
// Honours flip, s and vx. pose idle: gentle bob with a slow dorsal fin flutter.
// swim: stronger bob, faster fin flutter and a small sway.

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "idle";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1000;
  const SH = p.color ?? "#FFAA3B", DK = shade(SH, 0.22);
  const swim = pose === "swim";
  const bob = Math.sin(f * (swim ? 0.1 : 0.06)) * (swim ? 12 : 8);
  const sway = swim ? Math.sin(f * 0.1) * 3 : 0;
  const fin = Math.sin(f * (swim ? 0.4 : 0.22)) * (swim ? 12 : 6);
  const tail = Math.sin(f * 0.06 - 0.5) * 4;
  const rings = [-26, -4, 18, 40];

  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s}) rotate(${sway})`}>
      <path d="M 2 84 C -8 110 -40 116 -50 96 C -58 78 -36 66 -28 82 C -22 94 -36 104 -44 92" fill="none" stroke={SH} strokeWidth={16} strokeLinecap="round" transform={`rotate(${tail} 2 84)`} />
      <path d="M -30 -58 C 6 -70 34 -42 30 -6 C 26 26 16 56 4 84 L -14 84 C -4 56 -12 24 -26 2 C -36 -24 -40 -48 -30 -58 Z" fill={SH} />
      <path d="M 30 -20 C 26 26 16 56 4 84 L -2 84 C 8 56 16 26 20 -20 Z" fill={DK} />
      {rings.map((yy, i) => (
        <path key={i} d={`M ${-26 + i * 2} ${yy} Q 2 ${yy + 8} ${30 - i * 3} ${yy}`} fill="none" stroke={DK} strokeWidth={5} strokeLinecap="round" />
      ))}
      <g transform={`rotate(${fin} -30 -40)`}>
        <path d="M -30 -40 C -60 -52 -70 -22 -62 4 C -52 -8 -42 -12 -30 -8 Z" fill={DK} />
      </g>
      <path d="M 4 -70 L 14 -92" stroke={SH} strokeWidth={34} strokeLinecap="round" />
      <ellipse cx={14} cy={-104} rx={30} ry={26} fill={SH} transform="rotate(-10 14 -104)" />
      <path d="M 20 -104 L 74 -86" stroke={SH} strokeWidth={22} strokeLinecap="round" />
      <path d="M -4 -120 L 4 -144 L 16 -124 Z" fill={DK} />
      <ellipse cx={-6} cy={-8} rx={12} ry={7} fill={DK} transform={`rotate(${-20 + fin} -6 -8)`} />
      <circle cx={24} cy={-108} r={8} fill="#1F2433" />
      <circle cx={26.5} cy={-110.5} r={2.6} fill="#FFFFFF" />
    </g>
  );
}

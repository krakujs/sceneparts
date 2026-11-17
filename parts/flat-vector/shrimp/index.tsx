import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector curled shrimp, swimming. Origin = body centre (y default 1000). About 200 px across at s = 1.
// Faces right, honours flip, s and vx. pose swim: tail flicks, legs paddle, body bobs and tilts.
// idle: slow bob with antenna sway.

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "swim";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1000;
  const SH = p.color ?? "#F7906A", DK = shade(SH, 0.2);
  const swim = pose === "swim";
  const bob = swim ? Math.sin(f * 0.1) * 8 : Math.sin(f * 0.05) * 4;
  const tilt = swim ? Math.sin(f * 0.1) * 3 : 0;
  const paddle = (i: number) => (swim ? Math.sin(f * 0.3 + i * 0.9) * 22 : Math.sin(f * 0.05 + i) * 4);
  const tailRot = swim ? Math.sin(f * 0.25) * 18 : Math.sin(f * 0.05) * 4;
  const feel = Math.sin(f * 0.06) * 5;

  const R = 56;
  const ring = [1, 2, 3, 4, 5, 6].map((i) => {
    const deg = -90 - (i - 1) * 30, a = (deg * Math.PI) / 180;
    return { i, deg, x: R * Math.cos(a), y: R * Math.sin(a), r: 26 - (i - 1) * 2.4 };
  });

  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s}) rotate(${tilt})`}>
      <g transform="scale(0.85)">
        {ring.filter((g) => g.i >= 2 && g.i <= 5).map((g) => (
          <g key={`leg${g.i}`} transform={`translate(${g.x} ${g.y}) rotate(${g.deg + paddle(g.i)})`}>
            <path d={`M ${g.r * 0.3} 0 L ${g.r + 16} 0`} fill="none" stroke={DK} strokeWidth={5} strokeLinecap="round" />
          </g>
        ))}
        <g transform={`translate(-6 58) rotate(${tailRot})`}>
          <ellipse cx={16} cy={0} rx={16} ry={10} fill={SH} />
          <ellipse cx={10} cy={-9} rx={12} ry={7} fill={DK} transform="rotate(-25 10 -9)" />
          <ellipse cx={10} cy={9} rx={12} ry={7} fill={DK} transform="rotate(25 10 9)" />
        </g>
        {ring.map((g) => (
          <g key={g.i}>
            <circle cx={g.x - 2} cy={g.y + 3} r={g.r} fill={DK} />
            <circle cx={g.x} cy={g.y} r={g.r} fill={SH} />
          </g>
        ))}
        <circle cx={32} cy={-54} r={30} fill={DK} />
        <circle cx={32} cy={-56} r={30} fill={SH} />
        <path d="M 56 -58 L 92 -52 L 56 -46 Z" fill={SH} />
        <circle cx={44} cy={-62} r={6.5} fill="#1F2433" />
        <circle cx={46} cy={-64} r={2} fill="#FFFFFF" />
        <g transform={`rotate(${feel} 40 -80)`}>
          <path d="M 40 -80 C 62 -116 96 -134 130 -134" fill="none" stroke={DK} strokeWidth={3.5} strokeLinecap="round" />
          <path d="M 36 -84 C 50 -124 80 -152 108 -166" fill="none" stroke={DK} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

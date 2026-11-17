import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector five-armed starfish lying on the ground. Origin = bottom centre (y). About 220 px across at s = 1.
// Faces right, honours flip, s and vx. pose wiggle: arm tips wiggle slowly from p.f. idle: barely moves.

const R = 118;
const CY = -R * 0.809;
const n = (v: number) => v.toFixed(1); // lowest arm tips sit exactly on the ground line

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "wiggle";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const SH = p.color ?? "#FF8A3D", DK = shade(SH, 0.25);
  const amp = pose === "wiggle" ? 6 : 1.5;

  const arm = (k: number) => {
    const w = Math.sin(f * 0.06 + k * 1.3) * amp;
    return (
      <g key={k} transform={`rotate(${-90 + k * 72 + w * 0.5})`}>
        <path d={`M 0 -42 C 40 -42 ${n(86)} ${n(-28 + w * 0.6)} ${n(R)} ${n(w)} C ${n(86)} ${n(28 + w * 0.6)} 40 42 0 42 Z`} fill={SH} />
        {[[22, -14], [40, 10], [22, 16], [52, -12], [76, 8], [92, -6]].map(([cx, cy], i) => (
          <circle key={`b${i}`} cx={cx} cy={cy + (cx / R) * w} r={3.8} fill={DK} opacity={0.7} />
        ))}
      </g>
    );
  };

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${CY})`}>
        {[0, 1, 2, 3, 4].map(arm)}
        <circle r={44} fill={SH} />
        {[[-14, -10], [12, -14], [0, 10], [16, 12], [-18, 8]].map(([cx, cy], i) => (
          <circle key={`c${i}`} cx={cx} cy={cy} r={4} fill={DK} opacity={0.7} />
        ))}
      </g>
    </g>
  );
}

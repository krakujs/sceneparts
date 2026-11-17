import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector sea urchin resting on the ground. Origin = bottom centre (y). About 200 px tall at s = 1.
// Faces right, honours flip, s and vx. pose idle: spines barely move. sway: spines sway gently from p.f.

const SPINES = 26;
const BODY_R = 70, CY = -70; // body circle; bottom touches the ground

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "sway";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const SH = p.color ?? "#5A3A8A", DK = shade(SH, 0.3), SPINE = shade(SH, 0.45);
  const amp = pose === "sway" ? 5 : 1;

  const spines = Array.from({ length: SPINES }, (_, k) => {
    const a = (k * 2 * Math.PI) / SPINES;
    const deg = (a * 180) / Math.PI;
    const bx = BODY_R * Math.cos(a) * 0.96, by = CY + BODY_R * Math.sin(a) * 0.96;
    // Spines pointing into the ground get stubby so they stay above the ground line.
    const len = Math.sin(a) > 0.2 ? 10 : 42 + (k % 3) * 6;
    const sway = Math.sin(f * 0.05 + k * 0.7) * amp;
    return (
      <g key={k} transform={`translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${(deg + sway).toFixed(2)})`}>
        <path d={`M 0 0 L ${len} 0`} stroke={SPINE} strokeWidth={5} strokeLinecap="round" />
      </g>
    );
  });

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      {spines}
      <circle cx={0} cy={CY} r={BODY_R} fill={SH} />
      <path d={`M -62 ${CY + 20} C -40 ${CY + 60} 40 ${CY + 60} 62 ${CY + 20} C 40 ${CY + 36} -40 ${CY + 36} -62 ${CY + 20} Z`} fill={DK} />
      <ellipse cx={-24} cy={CY - 30} rx={18} ry={10} fill="#FFFFFF" opacity={0.18} transform={`rotate(-25 -24 ${CY - 30})`} />
      {[[-30, -60], [6, -84], [34, -50], [-8, -36], [40, -88]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={CY + (cy + 70) * 0.6 - 10} r={3.5} fill={DK} opacity={0.8} />
      ))}
    </g>
  );
}

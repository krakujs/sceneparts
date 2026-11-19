import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cute robot: a small rounded white robot with teal trim, a dark screen face with glowing pill eyes and a hover base.
// It hovers above the floor point (y), which is drawn as a soft shadow. Custom drawing, not a film robot.
// Origin = floor point under the robot; ~750 px tall at s = 1.
const WHITE = "#FFFFFF", WHITE_D = "#D9E2EA", TEAL = "#1FA39A", TEAL_D = shade("#1FA39A", 0.22), TEAL_L = "#7CF0E0";
const SCREEN = "#1E3A4F", PINK = "#F27BA6";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1400, s = 1, f = 0, flip, anim = "hover" } = p as any;
  const hov = anim === "hover" ? Math.sin(f / 14) * 14 : 0;
  const flame = 0.8 + 0.2 * Math.sin(f / 3);
  const flameLen = 44 + 14 * Math.sin(f / 2.5);
  const blink = f % 110 < 6;
  const eye = (cx: number) =>
    blink ? (
      <rect x={cx - 20} y={-280} width={40} height={8} rx={4} fill={TEAL_L} />
    ) : (
      <rect x={cx - 20} y={-276} width={40} height={72} rx={20} fill={TEAL_L} />
    );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={120} ry={20} fill={C.shadow} opacity={Math.max(0.06, 0.16 - hov * 0.003)} />
      <g transform={`translate(0 ${(-250 + hov).toFixed(1)})`}>
        {/* thruster flames under the base */}
        <path d={`M -60 34 L -70 ${34 + flameLen} L -48 34 Z`} fill={TEAL_L} opacity={flame} />
        <path d={`M 60 34 L 70 ${34 + flameLen} L 48 34 Z`} fill={TEAL_L} opacity={flame} />
        <rect x={-90} y={0} width={180} height={34} rx={14} fill={TEAL_D} />
        {/* side pods */}
        <rect x={-222} y={-300} width={40} height={120} rx={20} fill={TEAL} />
        <rect x={182} y={-300} width={40} height={120} rx={20} fill={TEAL} />
        {/* rounded body with a teal lower band */}
        <clipPath id="cute-robot-body">
          <rect x={-190} y={-420} width={380} height={420} rx={130} />
        </clipPath>
        <rect x={-190} y={-420} width={380} height={420} rx={130} fill={WHITE} />
        <g clipPath="url(#cute-robot-body)">
          <rect x={-190} y={-120} width={380} height={120} fill={TEAL} />
          <rect x={-190} y={-130} width={380} height={10} fill={WHITE_D} />
        </g>
        {/* antenna */}
        <line x1={0} y1={-420} x2={0} y2={-490} stroke={TEAL} strokeWidth={12} strokeLinecap="round" />
        <circle cx={0} cy={-504} r={24} fill={PINK} opacity={0.6 + 0.4 * Math.sin(f / 8)} />
        {/* screen face */}
        <rect x={-140} y={-340} width={280} height={200} rx={60} fill={SCREEN} />
        <rect x={-120} y={-318} width={60} height={14} rx={7} fill={C.white} opacity={0.15} />
        {eye(-62)}
        {eye(62)}
        <circle cx={-110} cy={-196} r={16} fill={PINK} opacity={0.5} />
        <circle cx={110} cy={-196} r={16} fill={PINK} opacity={0.5} />
        <path d="M -22 -180 Q 0 -162 22 -180" stroke={TEAL_L} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

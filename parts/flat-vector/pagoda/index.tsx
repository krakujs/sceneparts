import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Five-tier pagoda with upturned eaves, front view. Origin = base on the ground. About 800 px wide and 1400 px tall at s = 1.
// anim "lights": the paper lanterns on each tier glow on one after another.
const f1 = (v: number) => v.toFixed(1);
const TIERS = [
  { y: -40, w: 420, h: 150 },
  { y: -300, w: 340, h: 130 },
  { y: -540, w: 270, h: 110 },
  { y: -760, w: 210, h: 100 },
  { y: -980, w: 150, h: 90 },
];
const lit = (anim: string, f: number, i: number) => (anim === "lights" ? 0.35 + 0.65 * (Math.sin((f - i * 12) / 8) * 0.5 + 0.5) : 0.9);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.paper;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.redDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* soft shadow */}
      <ellipse cx={0} cy={0} rx={380} ry={26} fill={C.shadow} />
      {/* stone plinth */}
      <rect x={-230} y={-40} width={460} height={40} rx={8} fill={C.grey} />
      {TIERS.map((t, i) => {
        const hw = t.w / 2;
        const eave = hw + 70;
        return (
          <g key={i}>
            {/* wall body */}
            <rect x={-hw * 0.82} y={t.y - t.h} width={hw * 1.64} height={t.h} fill={i % 2 ? shade(wall, 0.06) : wall} />
            {/* window / door opening */}
            <rect x={-hw * 0.2} y={t.y - t.h * 0.7} width={hw * 0.4} height={t.h * 0.7} rx={6} fill={C.ink} opacity={0.75} />
            {/* lantern */}
            <rect x={-hw * 0.72} y={t.y - t.h * 0.65} width={hw * 0.22} height={t.h * 0.35} rx={5} fill={C.yellow} opacity={lit(anim, f, i)} />
            <rect x={hw * 0.5} y={t.y - t.h * 0.65} width={hw * 0.22} height={t.h * 0.35} rx={5} fill={C.yellow} opacity={lit(anim, f, i)} />
            {/* eave with upturned corners */}
            <path d={`M ${f1(-eave)} ${f1(t.y - t.h - 6)} Q ${f1(-hw * 0.4)} ${f1(t.y - t.h - 40)} 0 ${f1(t.y - t.h - 36)} Q ${f1(hw * 0.4)} ${f1(t.y - t.h - 40)} ${f1(eave)} ${f1(t.y - t.h - 6)} L ${f1(hw * 0.9)} ${f1(t.y - t.h + 2)} L ${f1(-hw * 0.9)} ${f1(t.y - t.h + 2)} Z`} fill={roof} />
            {/* upturned tips */}
            <path d={`M ${f1(-eave)} ${f1(t.y - t.h - 6)} l -34 -22 l 8 30 Z`} fill={roof} />
            <path d={`M ${f1(eave)} ${f1(t.y - t.h - 6)} l 34 -22 l -8 30 Z`} fill={roof} />
            {/* eave underside shade */}
            <rect x={-eave + 20} y={t.y - t.h - 4} width={(eave - 20) * 2} height={8} rx={4} fill={shade(roof, 0.25)} />
            {/* roof tiles */}
            <rect x={-hw * 0.6} y={t.y - t.h - 40} width={hw * 1.2} height={16} rx={6} fill={shade(roof, 0.15)} />
          </g>
        );
      })}
      {/* finial */}
      <rect x={-6} y={-1100} width={12} height={110} fill={C.yellowDark} />
      <circle cx={0} cy={-1110} r={18} fill={C.yellow} />
      <circle cx={0} cy={-1140} r={10} fill={C.yellowDark} />
    </g>
  );
}

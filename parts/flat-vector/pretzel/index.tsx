import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector pretzel: one thick golden-brown rope forming a heart-like loop, the two ends crossing twice in the
// middle, leaving three holes, with white salt flakes on top. Origin = resting point (bottom centre), honours flip and s.
// ~400 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const hash = (i: number) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Pretzel(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const brown = p.color ?? "#B5692E";
  const gold = "#D98D45";
  const W = 46;
  const dark = shade(brown, 0.3);

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // heart-like loop: top arch and rounded bottom lobes meeting at a point in the middle
  const loop = "M 0 -60 C -70 -120 -190 -120 -190 -230 C -190 -320 -90 -340 0 -270 C 90 -340 190 -320 190 -230 C 190 -120 70 -120 0 -60";
  // the two ends: each leaves a lower corner of the loop and crosses the other twice before tucking under
  const endA = "M -150 -190 C -90 -90 -20 -60 40 -40 C 90 -20 120 -80 80 -110 C 40 -140 -30 -120 -70 -90 C -110 -60 -130 -40 -150 -190";
  const endB = "M 150 -190 C 90 -90 20 -60 -40 -40 C -90 -20 -120 -80 -80 -110 C -40 -140 30 -120 70 -90 C 110 -60 130 -40 150 -190";

  const flakes = Array.from({ length: 18 }, (_, i) => {
    const a = hash(i) * Math.PI * 2, r = Math.sqrt(hash(i + 40)) * 0.85;
    const cx = Math.cos(a) * 130 * r, cy = -270 + Math.sin(a) * 40 * r;
    return <rect key={i} x={f1(cx - 6)} y={f1(cy - 3)} width={12} height={6} rx={2} fill="#FFFFFF" transform={`rotate(${f1(hash(i + 3) * 180)} ${f1(cx)} ${f1(cy)})`} />;
  });

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={18} fill={C.shadow} />
      <g transform={`translate(0 -38) ${tr}`}>
        <path d={loop} fill="none" stroke={dark} strokeWidth={W} strokeLinecap="round" strokeLinejoin="round" transform="translate(0 7)" />
        <path d={loop} fill="none" stroke={brown} strokeWidth={W} strokeLinecap="round" strokeLinejoin="round" />
        <path d={endB} fill="none" stroke={dark} strokeWidth={W - 8} strokeLinecap="round" transform="translate(0 6)" />
        <path d={endB} fill="none" stroke={brown} strokeWidth={W - 8} strokeLinecap="round" />
        <path d={endA} fill="none" stroke={dark} strokeWidth={W - 8} strokeLinecap="round" transform="translate(0 6)" />
        <path d={endA} fill="none" stroke={gold} strokeWidth={W - 8} strokeLinecap="round" />
        <path d="M -150 -270 Q -110 -320 -40 -322" stroke="#FFD7A0" strokeWidth={9} strokeLinecap="round" fill="none" opacity={0.6} />
        {flakes}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Pretzel {...p} />;
}

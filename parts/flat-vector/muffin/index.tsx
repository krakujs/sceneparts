import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector muffin: domed golden top with blueberries and chocolate chips, in a ridged brown paper case.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~340 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const hash = (i: number) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Muffin(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const top = p.color ?? "#D89B4E";
  const paper = "#A0643A";
  const CUP_H = 210, CUP_BOT = 150, CUP_TOP = 170; // cup: height, half width at base and top
  const cupTop = -CUP_H;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // Ridged paper cup: trapezoid with vertical pleats
  const pleats = Array.from({ length: 7 }, (_, i) => {
    const t = (i + 1) / 8;
    const xb = -CUP_BOT + 2 * CUP_BOT * t, xt = -CUP_TOP + 2 * CUP_TOP * t;
    return <line key={i} x1={f1(xb)} y1={0} x2={f1(xt)} y2={f1(cupTop + 14)} stroke={shade(paper, 0.3)} strokeWidth={6} strokeLinecap="round" />;
  });

  // Blueberries and chocolate chips scattered on the dome, deterministic
  const dots = Array.from({ length: 14 }, (_, i) => {
    const a = hash(i) * Math.PI * 2, r = Math.sqrt(hash(i + 20)) * 0.82;
    const cx = Math.cos(a) * 150 * r, cy = cupTop - 40 - Math.sin(a) * 40 * r - 40 + Math.abs(Math.cos(a)) * 0;
    const dy = cupTop - 60 - (1 - r) * 40 + (hash(i + 5) - 0.5) * 20;
    if (i % 3 === 2) return <rect key={i} x={f1(cx - 10)} y={f1(dy - 5)} width={20} height={10} rx={4} fill="#4A2E1C" transform={`rotate(${f1(hash(i + 1) * 180)} ${f1(cx)} ${f1(dy)})`} />;
    return (
      <g key={i}>
        <circle cx={f1(cx)} cy={f1(dy)} r={13} fill={C.purpleDark} />
        <circle cx={f1(cx - 4)} cy={f1(dy - 4)} r={3.5} fill="#FFFFFF" opacity={0.4} />
      </g>
    );
  });

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={CUP_BOT + 40} ry={18} fill={C.shadow} />
      <g transform={tr}>
        {/* paper case */}
        <path d={`M ${-CUP_BOT} 0 L ${-CUP_TOP} ${cupTop} L ${CUP_TOP} ${cupTop} L ${CUP_BOT} 0 Z`} fill={paper} />
        <path d={`M ${-CUP_BOT} 0 L ${-CUP_BOT + 40} 0 L ${-CUP_TOP + 40} ${cupTop} L ${-CUP_TOP} ${cupTop} Z`} fill={shade(paper, 0.12)} />
        {pleats}
        <rect x={-CUP_TOP - 6} y={cupTop - 4} width={2 * CUP_TOP + 12} height={16} rx={8} fill={shade(paper, 0.2)} />
        {/* muffin dome: bulges over the case */}
        <path d={`M ${-CUP_TOP + 8} ${cupTop + 4} C ${-CUP_TOP - 40} ${cupTop - 60} ${-170} ${cupTop - 150} ${-80} ${cupTop - 200} C ${-30} ${cupTop - 232} ${30} ${cupTop - 232} ${80} ${cupTop - 200} C ${170} ${cupTop - 150} ${CUP_TOP + 40} ${cupTop - 60} ${CUP_TOP - 8} ${cupTop + 4} Z`} fill={shade(top, 0.22)} />
        <path d={`M ${-CUP_TOP + 8} ${cupTop + 4} C ${-CUP_TOP - 30} ${cupTop - 50} ${-160} ${cupTop - 140} ${-80} ${cupTop - 190} C ${-30} ${cupTop - 220} ${30} ${cupTop - 220} ${80} ${cupTop - 190} C ${160} ${cupTop - 140} ${CUP_TOP + 30} ${cupTop - 50} ${CUP_TOP - 8} ${cupTop + 4} Z`} fill={top} />
        <path d={`M -120 ${cupTop - 110} Q -110 ${cupTop - 170} -60 ${cupTop - 196}`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.4} />
        {dots}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Muffin {...p} />;
}

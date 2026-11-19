import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Teapot: round-bellied teapot with a spout, side handle, lid knob and steam rising from the spout.
// Origin = resting point (bottom centre); faces the viewer, honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : "#1FA39A";
  const dk = shade(c, 0.18);
  const steam = p.steam ?? true;
  const wisps = [0, 1, 2].map((i) => {
    const ph = (f / 70 + i / 3) % 1;
    return (
      <path key={i} transform={`translate(${f1(-222 + (i - 1) * 16)} ${f1(-236 - ph * 70)})`} opacity={Math.sin(ph * Math.PI) * 0.85}
        d="M 0 0 C 8 -10 -8 -18 0 -28 S 8 -48 0 -56" fill="none" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
    );
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={13} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {steam && wisps}
        {/* spout */}
        <path d="M -96 -96 Q -186 -92 -220 -212" fill="none" stroke={c} strokeWidth={26} strokeLinecap="round" />
        {/* side handle */}
        <path d="M 104 -176 C 196 -196 206 -66 100 -62" fill="none" stroke={c} strokeWidth={24} strokeLinecap="round" />
        {/* round body */}
        <path d="M -86 -14 C -135 -26 -150 -150 -100 -200 C -70 -232 70 -232 100 -200 C 150 -150 135 -26 86 -14 Z" fill={c} />
        <path d="M 60 -226 C 120 -200 140 -150 128 -110 C 118 -70 100 -40 80 -18 C 125 -48 146 -100 140 -140 C 132 -190 104 -220 60 -226 Z" fill={dk} />
        <ellipse cx={-72} cy={-158} rx={12} ry={26} fill="#FFFFFF" opacity={0.45} transform="rotate(12 -72 -158)" />
        {/* spout tip */}
        <ellipse cx={-220} cy={-212} rx={11} ry={7} fill={dk} transform="rotate(-50 -220 -212)" />
        {/* lid and knob */}
        <path d="M -60 -226 Q -56 -266 0 -268 Q 56 -266 60 -226 Z" fill={c} />
        <ellipse cx={0} cy={-226} rx={62} ry={11} fill={dk} />
        <circle cx={0} cy={-280} r={14} fill={dk} />
        {/* foot */}
        <rect x={-70} y={-20} width={140} height={18} rx={8} fill={dk} />
      </g>
    </g>
  );
}

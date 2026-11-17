import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// Modern phone with Wi-Fi bars (0–3)
export const Phone: React.FC<{ x: number; y: number; w?: number; bars: number; label?: string }> = ({ x, y, w = 300, bars, label = "Searching…" }) => {
  const h = w * 2;
  const cx = w / 2, cy = h * 0.42;
  return (
    <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
      <rect x={0} y={0} width={w} height={h} rx={44} fill="#15171C" stroke={INK} strokeWidth={SW} />
      <rect x={14} y={14} width={w - 28} height={h - 28} rx={32} fill="#0E2233" />
      {[1, 2, 3].map((k) => (
        <path key={k} d={`M ${cx - k * 44} ${cy - k * 18} A ${k * 52} ${k * 52} 0 0 1 ${cx + k * 44} ${cy - k * 18}`}
          stroke={k <= bars ? "#7FE3FF" : "#2B4558"} strokeWidth={22} fill="none" strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={cy + 14} r={16} fill={bars > 0 ? "#7FE3FF" : "#2B4558"} />
      <text x={cx} y={cy + 140} textAnchor="middle" fontFamily={bodyFont} fontWeight={800} fontSize={w * 0.11} fill="#CFE9F5">{label}</text>
    </g>
  );
};

// ---------- text ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Phone {...(rest as any)} frame={f} />;
}

import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// ---------- post: postcard, pillar letterbox, pen (generic – no real emblem/design) ----------
// Postcard centred at (x, y). `writ` 0..1 fills handwriting on the left half, `stamp` = text in the printed stamp box.
export const Postcard: React.FC<{ x: number; y: number; w?: number; rot?: number; writ?: number; stamp?: string; color?: string; title?: string; blot?: number; seed?: string }> = ({
  x, y, w = 520, rot = 0, writ = 0, stamp = "15 P", color = "#F3DDA6", title = "POST CARD", blot = 0, seed = "pc",
}) => {
  const h = w * 0.62;
  const lines = 6;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={10} fill="rgba(43,22,12,0.3)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={color} stroke={INK} strokeWidth={SW} />
      <text x={-w / 2 + w * 0.05} y={-h / 2 + h * 0.15} fontFamily={typeFont} fontSize={w * 0.06} fill={P.brick}>{title}</text>
      <line x1={w * 0.04} y1={-h / 2 + h * 0.12} x2={w * 0.04} y2={h / 2 - h * 0.08} stroke={P.brick} strokeWidth={3} />
      {/* printed stamp box */}
      <rect x={w / 2 - w * 0.2} y={-h / 2 + h * 0.07} width={w * 0.15} height={w * 0.18} fill="#F7E7C2" stroke={P.brick} strokeWidth={4} strokeDasharray="6 4" />
      <text x={w / 2 - w * 0.125} y={-h / 2 + h * 0.07 + w * 0.115} textAnchor="middle" fontFamily={titleFont} fontSize={w * (stamp.length > 4 ? 0.045 : 0.06)} fill={P.brick}>{stamp}</text>
      {/* address lines */}
      {[0, 1, 2, 3].map((k) => <line key={k} x1={w * 0.1} y1={-h / 2 + h * (0.5 + k * 0.12)} x2={w / 2 - w * 0.06} y2={-h / 2 + h * (0.5 + k * 0.12)} stroke={P.brick} strokeWidth={2.5} opacity={0.7} />)}
      {/* handwriting squiggles */}
      {new Array(lines).fill(0).map((_, k) => {
        const p = Math.max(0, Math.min(1, writ * lines - k));
        if (p <= 0) return null;
        const x0 = -w / 2 + w * 0.06, x1 = x0 + (w * 0.4 - (k === lines - 1 ? w * 0.15 : 0)) * p;
        const yy = -h / 2 + h * (0.28 + k * 0.11);
        let d = `M ${x0} ${yy}`;
        for (let xx = x0; xx < x1; xx += w * 0.025) d += ` q ${w * 0.006} ${-w * 0.028 * (0.6 + random(`${seed}${k}${Math.round(xx)}`) * 0.6)} ${w * 0.0125} 0 t ${w * 0.0125} 0`;
        return <path key={k} d={d} stroke="#1F3A93" strokeWidth={3.5} fill="none" strokeLinecap="round" />;
      })}
      {blot > 0 ? (
        <g transform={`translate(${-w * 0.12} ${h * 0.05}) scale(${blot})`}>
          <path d={`M 0 -${w * 0.07} C ${w * 0.06} -${w * 0.08} ${w * 0.09} -${w * 0.01} ${w * 0.06} ${w * 0.04} C ${w * 0.04} ${w * 0.09} -${w * 0.05} ${w * 0.08} -${w * 0.07} ${w * 0.03} C -${w * 0.1} -${w * 0.02} -${w * 0.06} -${w * 0.06} 0 -${w * 0.07} Z`} fill="#1F3A93" opacity={0.92} />
          <circle cx={w * 0.09} cy={-w * 0.05} r={w * 0.012} fill="#1F3A93" />
          <circle cx={-w * 0.1} cy={w * 0.06} r={w * 0.009} fill="#1F3A93" />
        </g>
      ) : null}
    </g>
  );
};

// Red pillar letterbox, feet at (x, y)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Postcard {...(rest as any)} frame={f} />;
}

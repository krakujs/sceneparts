import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Old mariner's compass: brass bowl with a cream dial, a star compass rose (no letters), a magnetic needle that
// wobbles and a lanyard ring. Stands on a small wooden block. Stands on (x, y), about 540 px tall at s = 1.
export const OldCompass: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; brass?: string; wobble?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, brass = "#C99A4A", wobble = true }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const cy = -300;
  const needle = wobble ? Math.sin(f / 9) * 12 + Math.sin(f / 3.7) * 3 : 0;
  const rad = (a: number) => (a * Math.PI) / 180;
  const points = Array.from({ length: 8 }, (_, i) => {
    const a = rad(i * 45);
    const dir = [Math.sin(a), -Math.cos(a)];
    const perp = [Math.cos(a), Math.sin(a)];
    const L = i % 2 === 0 ? 150 : 104;
    const hw = i % 2 === 0 ? 26 : 18;
    const tip = [dir[0] * L, dir[1] * L];
    const left = [dir[0] * L * 0.35 + perp[0] * hw, dir[1] * L * 0.35 + perp[1] * hw];
    const right = [dir[0] * L * 0.35 - perp[0] * hw, dir[1] * L * 0.35 - perp[1] * hw];
    const fill = i === 0 ? C.brick : i % 2 === 0 ? C.navy : C.cream;
    return (
      <path
        key={i}
        d={`M 0 0 L ${left[0]} ${left[1]} L ${tip[0]} ${tip[1]} L ${right[0]} ${right[1]} Z`}
        fill={fill}
        stroke={C.ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    );
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={180} ry={16} fill="#000" opacity={0.2} />
      <rect x={-130} y={-60} width={260} height={60} rx={8} fill="#8A6A45" {...o} strokeWidth={7} />
      <rect x={-60} y={-110} width={120} height={56} rx={6} fill={brass} {...o} strokeWidth={6} />
      <path d={`M 0 ${cy + 220} m -16 0 a 16 16 0 1 0 32 0`} fill="none" stroke={brass} strokeWidth={10} />
      <path d={`M 0 ${cy + 220} m -16 0 a 16 16 0 1 0 32 0`} fill="none" stroke={C.ink} strokeWidth={3} />
      <circle cx={0} cy={cy} r={210} fill={brass} {...o} />
      <circle cx={0} cy={cy} r={182} fill={C.cream} stroke={C.ink} strokeWidth={5} />
      {Array.from({ length: 36 }, (_, i) => {
        const a = rad(i * 10);
        const r1 = i % 9 === 0 ? 150 : 166;
        return (
          <line key={i} x1={Math.sin(a) * r1} y1={cy - Math.cos(a) * r1} x2={Math.sin(a) * 180} y2={cy - Math.cos(a) * 180} stroke={C.ink} strokeWidth={3} />
        );
      })}
      <g transform={`translate(0 ${cy})`}>
        {points}
        <circle r={22} fill={brass} {...o} strokeWidth={5} />
        <g transform={`rotate(${needle})`}>
          <path d="M 0 -116 L 14 0 L -14 0 Z" fill={C.brick} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
          <path d="M 0 116 L 14 0 L -14 0 Z" fill={C.cream} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
        </g>
        <circle r={10} fill={C.ink} />
      </g>
      <path d={`M -120 ${cy - 80} A 150 150 0 0 1 -60 ${cy - 150}`} stroke="#FFFFFF" strokeWidth={12} fill="none" opacity={0.45} strokeLinecap="round" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <OldCompass x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} brass={p.brass} wobble={p.wobble} />;
}

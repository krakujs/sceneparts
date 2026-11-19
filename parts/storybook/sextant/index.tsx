import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Brass navigational sextant: graduated arc, pivot with a large mirror, horizon glass, a telescope with eyepiece
// and a wooden grip. The index arm swings slowly along the arc. Stands on (x, y), about 540 px tall at s = 1.
export const Sextant: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; brass?: string; wood?: string; swing?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, brass = "#C99A4A", wood = "#8A6A45", swing = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const P = { x: 0, y: -420 };
  const R = 250;
  const rad = (a: number) => (a * Math.PI) / 180;
  const at = (a: number, r: number) => ({ x: P.x + Math.cos(rad(a)) * r, y: P.y + Math.sin(rad(a)) * r });
  const a1 = at(30, R);
  const a2 = at(150, R);
  const idx = 90 + (swing ? Math.sin(f / 40) * 22 : 0);
  const ie = at(idx, R + 6);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={200} ry={16} fill="#000" opacity={0.2} />
      {/* telescope */}
      <line x1={40} y1={-430} x2={190} y2={-520} stroke={C.ink} strokeWidth={34} strokeLinecap="round" />
      <line x1={40} y1={-430} x2={190} y2={-520} stroke={brass} strokeWidth={20} strokeLinecap="round" />
      <circle cx={198} cy={-524} r={18} fill={brass} {...o} strokeWidth={6} />
      <circle cx={198} cy={-524} r={7} fill={C.navy} />
      {/* frame arms and arc */}
      <line x1={P.x} y1={P.y} x2={a1.x} y2={a1.y} stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
      <line x1={P.x} y1={P.y} x2={a1.x} y2={a1.y} stroke={brass} strokeWidth={12} strokeLinecap="round" />
      <line x1={P.x} y1={P.y} x2={a2.x} y2={a2.y} stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
      <line x1={P.x} y1={P.y} x2={a2.x} y2={a2.y} stroke={brass} strokeWidth={12} strokeLinecap="round" />
      <path d={`M ${a1.x} ${a1.y} A ${R} ${R} 0 0 1 ${a2.x} ${a2.y}`} fill="none" stroke={C.ink} strokeWidth={26} strokeLinecap="round" />
      <path d={`M ${a1.x} ${a1.y} A ${R} ${R} 0 0 1 ${a2.x} ${a2.y}`} fill="none" stroke={brass} strokeWidth={14} strokeLinecap="round" />
      {Array.from({ length: 31 }, (_, i) => {
        const a = 30 + i * 4;
        const p1 = at(a, R - 10);
        const p2 = at(a, R - (i % 5 === 0 ? 30 : 20));
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.ink} strokeWidth={i % 5 === 0 ? 4 : 2.5} />;
      })}
      {/* index arm */}
      <line x1={P.x} y1={P.y} x2={ie.x} y2={ie.y} stroke={C.ink} strokeWidth={20} strokeLinecap="round" />
      <line x1={P.x} y1={P.y} x2={ie.x} y2={ie.y} stroke={brass} strokeWidth={10} strokeLinecap="round" />
      <circle cx={ie.x} cy={ie.y} r={14} fill={brass} {...o} strokeWidth={5} />
      {/* mirrors */}
      <circle cx={P.x} cy={P.y} r={36} fill={brass} {...o} />
      <circle cx={P.x} cy={P.y} r={25} fill="#CFE3E0" stroke={C.ink} strokeWidth={4} />
      <path d={`M ${P.x - 14} ${P.y - 12} L ${P.x + 8} ${P.y - 16}`} stroke="#FFFFFF" strokeWidth={5} opacity={0.8} strokeLinecap="round" />
      <rect x={P.x - 70} y={P.y - 22} width={40} height={36} rx={4} fill="#CFE3E0" {...o} strokeWidth={5} />
      {/* grip */}
      <rect x={-24} y={-170} width={48} height={170} rx={16} fill={wood} {...o} />
      {[-120, -100, -80, -60].map((gy) => (
        <line key={gy} x1={-20} y1={gy} x2={20} y2={gy} stroke="#5A4128" strokeWidth={4} opacity={0.6} />
      ))}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Sextant x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} brass={p.brass} wood={p.wood} swing={p.swing} />;
}

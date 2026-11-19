import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Washboard: wooden frame with a ribbed tin panel and a handle hole, leaning in a tin tub with soap suds.
// Board rubs gently back and forth. Stands on (x, y), bottom centre, about 450 px tall at s = 1.
export const Washboard: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; wood?: string; suds?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, wood = "#A97C50", suds = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const tilt = 12 + Math.sin(f / 12) * 3;
  const bubbles: [number, number, number][] = [
    [-150, -222, 26],
    [-96, -240, 30],
    [-30, -248, 28],
    [36, -244, 30],
    [100, -236, 26],
    [158, -222, 22],
    [-120, -200, 18],
    [130, -200, 18],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={240} ry={16} fill="#000" opacity={0.2} />
      {/* tin tub */}
      <path d="M -230 -200 L -196 -20 Q 0 6 196 -20 L 230 -200 Z" fill="#A9B6C0" {...o} />
      <ellipse cx={0} cy={-200} rx={230} ry={28} fill="#D4DCE2" {...o} />
      <ellipse cx={0} cy={-200} rx={206} ry={18} fill="#7C8A96" />
      <g transform={`rotate(${tilt} 0 -180)`}>
        <rect x={-110} y={-430} width={220} height={290} rx={14} fill={wood} {...o} />
        <rect x={-84} y={-400} width={168} height={232} rx={6} fill="#C9D3DA" stroke={C.ink} strokeWidth={5} />
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={-80} y1={-388 + i * 16} x2={80} y2={-388 + i * 16} stroke="#7C8A96" strokeWidth={4} />
        ))}
        <rect x={-40} y={-420} width={80} height={22} rx={11} fill="#4A4E5E" stroke={C.ink} strokeWidth={4} />
        <path d="M -94 -410 L -94 -160" stroke="#FFFFFF" strokeWidth={6} opacity={0.3} strokeLinecap="round" />
      </g>
      {suds
        ? bubbles.map(([bx, by, r], i) => (
            <circle key={i} cx={bx} cy={by + Math.sin(f / 10 + i) * 4} r={r / 2.2} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} />
          ))
        : null}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Washboard x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} wood={p.wood} suds={p.suds} />;
}

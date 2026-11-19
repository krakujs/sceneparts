import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Bathing machine: a striped wooden beach hut on big wheels with a sea-facing door and steps down to the sand.
// Sea strip with rolling wave crests behind. Stands on (x, y), bottom centre, about 560 px tall at s = 1.
export const BathingMachine: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; stripe?: string; accent?: string; roof?: string; wave?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, stripe = C.cream, accent = C.brick, roof = C.brickDark, wave = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const shift = wave ? (f * 1.2) % 80 : 0;
  let crests = "";
  for (let i = -1; i < 16; i++) crests += `M ${-600 + i * 80} -102 q 20 -14 40 0 `;
  const wheel = (wx: number) => (
    <g>
      <circle cx={wx} cy={-90} r={90} fill="#6A4E30" {...o} />
      <circle cx={wx} cy={-90} r={20} fill={C.stoneDark} {...o} />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60 * Math.PI) / 180;
        return <line key={i} x1={wx} y1={-90} x2={wx + Math.cos(a) * 80} y2={-90 + Math.sin(a) * 80} stroke="#4A3324" strokeWidth={7} />;
      })}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      {/* sea and sand strip */}
      <rect x={-540} y={-150} width={1080} height={100} fill={C.teal} />
      <g transform={`translate(${-shift} 0)`}>
        <path d={crests} stroke={C.cream} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.8} />
      </g>
      <rect x={-540} y={-50} width={1080} height={50} fill="#E3C88F" />
      <line x1={-540} y1={-50} x2={540} y2={-50} stroke={C.ink} strokeWidth={5} />
      <ellipse cx={0} cy={6} rx={380} ry={12} fill="#000" opacity={0.15} />
      {wheel(-200)}
      {wheel(60)}
      {/* body with stripes */}
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={-280 + i * 40} y={-480} width={40} height={290} fill={i % 2 ? accent : stripe} />
      ))}
      <rect x={-280} y={-480} width={400} height={290} fill="none" {...o} />
      <rect x={-200} y={-400} width={52} height={52} rx={26} fill="#CFE3E0" {...o} />
      <path d="M -300 -480 L -250 -562 L 100 -562 L 140 -480 Z" fill={roof} {...o} />
      <path d="M -240 -540 L 80 -540" stroke="#FFFFFF" strokeWidth={6} opacity={0.3} strokeLinecap="round" />
      {/* door */}
      <rect x={60} y={-390} width={60} height={200} fill="#7E2E22" {...o} />
      <circle cx={104} cy={-290} r={6} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
      {/* steps down to the sand */}
      {[
        [120, -190],
        [160, -140],
        [200, -90],
        [240, -40],
      ].map(([sx, top], i) => (
        <rect key={i} x={sx} y={top} width={60} height={-top} fill="#A97C50" {...o} />
      ))}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <BathingMachine x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} stripe={p.stripe} accent={p.accent} roof={p.roof} wave={p.wave} />;
}

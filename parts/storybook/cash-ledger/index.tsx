import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Open cash ledger: a thick leather-bound book open at a spread of ruled columns (no writing), with a brick ribbon
// bookmark. The right page flutters. Stands on (x, y), bottom centre, about 400 px tall and 500 px wide at s = 1.
export const CashLedger: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; cover?: string; ribbon?: string; flutter?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, cover = "#7E2E22", ribbon = C.brick, flutter = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const fl = flutter ? Math.sin(f / 8) * 10 : 0;
  const rules = (x1: number, x2: number) =>
    Array.from({ length: 11 }, (_, i) => <line key={i} x1={x1} y1={-352 + i * 30} x2={x2} y2={-352 + i * 30} stroke="#7C8A96" strokeWidth={2.5} />);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={270} ry={14} fill="#000" opacity={0.2} />
      {/* ribbon bookmark hanging from the spine */}
      <path d="M -7 -12 L -7 66 L 0 56 L 7 66 L 7 -12 Z" fill={ribbon} {...o} strokeWidth={5} />
      {/* cover */}
      <rect x={-252} y={-392} width={504} height={382} rx={12} fill={cover} {...o} />
      {/* left page */}
      <path d="M -236 -376 Q -120 -390 -12 -378 L -12 -14 Q -120 -24 -236 -12 Z" fill={C.cream} stroke={C.ink} strokeWidth={5} />
      {rules(-226, -22)}
      {[-190, -150, -90, -44].map((vx) => (
        <line key={vx} x1={vx} y1={-374} x2={vx} y2={-20} stroke={vx === -190 ? C.brick : "#7C8A96"} strokeWidth={vx === -190 ? 4 : 2.5} />
      ))}
      {/* right page, top corner flutters */}
      <path d={`M 12 -378 Q 120 -390 236 ${-376 + fl} L 236 ${-12 + fl * 0.3} Q 120 -24 12 -14 Z`} fill={C.cream} stroke={C.ink} strokeWidth={5} />
      {rules(22, 226)}
      {[44, 100, 160, 210].map((vx) => (
        <line key={vx} x1={vx} y1={-374} x2={vx} y2={-20} stroke={vx === 210 ? C.brick : "#7C8A96"} strokeWidth={vx === 210 ? 4 : 2.5} />
      ))}
      {/* spine */}
      <rect x={-12} y={-392} width={24} height={382} fill="#5A2119" {...o} strokeWidth={5} />
      <path d="M -40 -20 L -12 -20" stroke="#D9C49C" strokeWidth={6} opacity={0} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <CashLedger x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} cover={p.cover} ribbon={p.ribbon} flutter={p.flutter} />;
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Stone pedestal sundial: a stepped plinth, a fluted column and a brass dial with hour marks and a gnomon. The
// gnomon's shadow sweeps slowly across the dial. Stands on (x, y), bottom centre, about 520 px tall at s = 1.
export const Sundial: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; stone?: string; brass?: string; move?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, stone = "#A9A7A0", brass = "#C99A4A", move = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const cy = -440;
  const rx = 200;
  const ry = 48;
  const th = move ? Math.sin(f / 70) * 70 : 0;
  const rad = (a: number) => (a * Math.PI) / 180;
  const shadowX = Math.sin(rad(th)) * rx * 0.9;
  const shadowY = cy - Math.cos(rad(th)) * ry * 0.9;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={260} ry={20} fill="#000" opacity={0.2} />
      <rect x={-200} y={-70} width={400} height={70} rx={6} fill={stone} {...o} />
      <rect x={-160} y={-112} width={320} height={44} rx={4} fill={stone} {...o} />
      <path d="M -90 -112 L -70 -400 L 70 -400 L 90 -112 Z" fill={stone} {...o} />
      {[-40, 0, 40].map((gx) => (
        <line key={gx} x1={gx} y1={-380} x2={gx * 1.1} y2={-130} stroke={C.ink} strokeWidth={4} opacity={0.3} />
      ))}
      <rect x={-110} y={-424} width={220} height={28} rx={6} fill={stone} {...o} />
      {/* dial */}
      <ellipse cx={0} cy={cy} rx={rx + 30} ry={ry + 10} fill={brass} {...o} />
      <ellipse cx={0} cy={cy} rx={rx} ry={ry} fill="#E0B872" stroke={C.ink} strokeWidth={4} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = rad(i * 30);
        return (
          <line
            key={i}
            x1={Math.sin(a) * rx * 0.76}
            y1={cy - Math.cos(a) * ry * 0.76}
            x2={Math.sin(a) * rx * 0.93}
            y2={cy - Math.cos(a) * ry * 0.93}
            stroke={C.ink}
            strokeWidth={4}
          />
        );
      })}
      <line x1={0} y1={cy} x2={shadowX} y2={shadowY} stroke={C.ink} strokeWidth={16} strokeLinecap="round" opacity={0.35} />
      <path d={`M -8 ${cy} L 8 ${cy} L 0 ${cy - 80} Z`} fill={brass} {...o} strokeWidth={4} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Sundial x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} stone={p.stone} brass={p.brass} move={p.move} />;
}

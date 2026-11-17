import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Glyphs: React.FC<{ x: number; y0: number; y1: number; seed?: number }> = ({ x, y0, y1, seed = 1 }) => {
  const shapes = [
    (y: number) => <><ellipse cx={x} cy={y} rx={24} ry={14} fill="none" {...S} strokeWidth={6} /><circle cx={x} cy={y} r={6} fill={INK} /></>,
    (y: number) => <path d={`M${x - 24} ${y + 14} q24 -38 48 0`} fill="none" {...S} strokeWidth={6} />,
    (y: number) => <path d={`M${x - 26} ${y} l52 0 M${x} ${y - 24} l0 48`} {...S} strokeWidth={6} />,
    (y: number) => <path d={`M${x - 24} ${y - 12} q12 28 24 0 q12 28 24 0`} fill="none" {...S} strokeWidth={6} />,
    (y: number) => <rect x={x - 20} y={y - 16} width={40} height={32} fill="none" {...S} strokeWidth={6} />,
    (y: number) => <path d={`M${x - 18} ${y + 18} l0 -36 q18 -10 36 4 l-9 14 l9 18`} fill="none" {...S} strokeWidth={6} />,
    (y: number) => <path d={`M${x - 22} ${y + 16} L${x} ${y - 18} L${x + 22} ${y + 16} Z`} fill="none" {...S} strokeWidth={6} />,
  ];
  const out: React.ReactNode[] = [];
  for (let y = y0, i = 0; y < y1; y += 92, i++) out.push(<g key={i}>{shapes[(i * 5 + seed * 3) % shapes.length](y)}</g>);
  return (
    <g>
      <path d={`M${x - 42} ${y0 - 50} L${x - 42} ${y1}`} stroke={INK} strokeWidth={5} />
      <path d={`M${x + 42} ${y0 - 50} L${x + 42} ${y1}`} stroke={INK} strokeWidth={5} />
      {out}
    </g>
  );
};

// cartouche title (oval ring with a tie bar)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Glyphs x={p.x} y0={p.y0} y1={p.y1} seed={p.seed} />;
}

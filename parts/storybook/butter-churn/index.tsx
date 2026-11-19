import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Tall wooden butter churn: staves, iron hoops, a lid with a dasher whose handle bobs up and down, and a pat of
// butter on the plate. Stands on (x, y), bottom centre, about 700 px tall at s = 1.
export const ButterChurn: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; wood?: string; band?: string; churn?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, wood = "#B88A58", band = C.stone, churn = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const dy = churn ? Math.sin(f / 10) * 34 : 0;
  const hoop = (yy: number, half: number) => <rect x={-half - 2} y={yy - 8} width={half * 2 + 4} height={16} rx={6} fill={band} stroke={C.ink} strokeWidth={5} />;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={230} ry={18} fill="#000" opacity={0.2} />
      <rect x={-160} y={-34} width={320} height={34} rx={6} fill="#6A4E30" {...o} />
      {/* barrel */}
      <path d="M -148 -36 L -138 -560 Q 0 -596 138 -560 L 148 -36 Q 0 -20 -148 -36 Z" fill={wood} {...o} />
      {[-96, -48, 0, 48, 96].map((sx) => (
        <line key={sx} x1={sx} y1={-40} x2={sx * 0.93} y2={-556} stroke="#6A4E30" strokeWidth={4} opacity={0.6} />
      ))}
      {hoop(-110, 147)}
      {hoop(-300, 143)}
      {hoop(-480, 140)}
      <path d="M -120 -520 L -116 -120" stroke="#FFFFFF" strokeWidth={9} opacity={0.35} strokeLinecap="round" />
      {/* lid */}
      <ellipse cx={0} cy={-560} rx={138} ry={24} fill="#C9A072" {...o} />
      <ellipse cx={0} cy={-562} rx={36} ry={9} fill="#2C2F3B" />
      {/* dasher */}
      <line x1={0} y1={-640 + dy} x2={0} y2={-562} stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
      <line x1={0} y1={-640 + dy} x2={0} y2={-562} stroke="#8A6A45" strokeWidth={8} strokeLinecap="round" />
      <rect x={-46} y={-656 + dy} width={92} height={18} rx={9} fill="#8A6A45" {...o} />
      {/* butter plate */}
      <ellipse cx={200} cy={-10} rx={70} ry={14} fill={C.cream} {...o} />
      <rect x={172} y={-48} width={56} height={30} rx={8} fill={C.mustard} {...o} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <ButterChurn x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} wood={p.wood} band={p.band} churn={p.churn} />;
}

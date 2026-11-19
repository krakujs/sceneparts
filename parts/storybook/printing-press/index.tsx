import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Printing press: wooden hand press with screw, platen, big lever and a sheet of paper on the bed. Stands on (x, y) at floor level.
export const PrintingPress: React.FC<{ x: number; y: number; s?: number; f?: number; pressing?: boolean; wood?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, pressing = true, wood = C.sepia, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const dark = "#5E4530";
  const press = pressing ? (1 + Math.sin(f / 12)) / 2 : 0;
  const drop = press * 80;
  const lever = pressing ? Math.sin(f / 12) * 6 : 0;
  const stemH = -450 + drop - (-600);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={380} ry={22} fill="#000" opacity={0.2} />
      {/* stand */}
      <rect x={-300} y={-90} width={600} height={90} rx={10} fill={dark} {...o} />
      <rect x={-260} y={-620} width={52} height={530} fill={wood} {...o} />
      <rect x={208} y={-620} width={52} height={530} fill={wood} {...o} />
      <rect x={-300} y={-700} width={600} height={84} rx={8} fill={wood} {...o} />
      <path d="M -280 -680 L -120 -680" stroke="#FFFFFF" strokeWidth={8} opacity={0.35} strokeLinecap="round" />
      {/* bed with paper */}
      <rect x={-210} y={-290} width={420} height={50} rx={6} fill={dark} {...o} />
      <rect x={-150} y={-336} width={300} height={48} fill={C.cream} stroke={C.ink} strokeWidth={5} />
      {[-318, -302].map((yy) => <path key={yy} d={`M -130 ${yy} L 130 ${yy}`} stroke={C.sepia} strokeWidth={4} opacity={0.6} />)}
      {/* screw and platen, the platen moves down when pressing */}
      <rect x={-14} y={-610} width={28} height={stemH} fill={C.stone} {...o} />
      <g transform={`translate(0 ${drop})`}>
        <rect x={-200} y={-470} width={400} height={34} rx={6} fill={wood} {...o} />
        <rect x={-150} y={-436} width={300} height={22} fill={dark} {...o} />
      </g>
      {/* big lever on top of the screw */}
      <g transform={`rotate(${lever} 0 -780)`}>
        <rect x={-10} y={-790} width={460} height={24} rx={10} fill={wood} {...o} />
        <circle cx={440} cy={-778} r={28} fill={C.mustard} {...o} />
      </g>
      <circle cx={0} cy={-790} r={34} fill={C.stone} {...o} />
      <path d="M -180 -640 L -140 -640" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <PrintingPress x={p.x} y={p.y} s={p.s} f={p.f} pressing={p.pressing} wood={p.wood} flip={p.flip} />;
}

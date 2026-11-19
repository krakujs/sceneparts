import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Spinning wheel: wooden treadle spinning wheel with spokes turning, a bobbin of wool and a distaff. Stands on (x, y) at floor level.
export const SpinningWheel: React.FC<{ x: number; y: number; s?: number; f?: number; spinning?: boolean; wood?: string; wool?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, spinning = true, wood = C.sepia, wool = C.cream, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const dark = "#5E4530";
  const WX = -90, WY = -330, WR = 200;
  const rot = spinning ? f * 4 : 0;
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45) * Math.PI) / 180;
    return <line key={i} x1={WX} y1={WY} x2={WX + Math.cos(a) * (WR - 14)} y2={WY + Math.sin(a) * (WR - 14)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />;
  });
  const wool_puffs = [[210, -600, 34], [226, -636, 30], [196, -652, 26], [236, -582, 26]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={320} ry={18} fill="#000" opacity={0.18} />
      {/* base board and treadle */}
      <rect x={-260} y={-40} width={460} height={40} rx={8} fill={dark} {...o} />
      <path d="M 40 -20 L 250 -20" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
      <path d="M 40 -20 L 250 -20" stroke={wood} strokeWidth={6} strokeLinecap="round" />
      {/* wheel support post and upright */}
      <rect x={WX - 12} y={WY} width={24} height={WY * -1 - 40} fill={dark} {...o} />
      <rect x={60} y={-560} width={30} height={520} fill={wood} {...o} />
      {/* distaff with wool */}
      <path d="M 150 -40 L 212 -600" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
      <path d="M 150 -40 L 212 -600" stroke={wood} strokeWidth={6} strokeLinecap="round" />
      {wool_puffs.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={wool} stroke={C.ink} strokeWidth={4} />)}
      {/* wheel: rim, spokes, hub */}
      <circle cx={WX} cy={WY} r={WR} fill="none" stroke={C.ink} strokeWidth={34} />
      <circle cx={WX} cy={WY} r={WR} fill="none" stroke={wood} strokeWidth={20} />
      <g transform={`rotate(${rot} ${WX} ${WY})`}>{spokes}</g>
      <circle cx={WX} cy={WY} r={20} fill={dark} {...o} />
      {/* flyer and bobbin with thread */}
      <path d="M 70 -420 Q 150 -470 210 -600" stroke={C.ink} strokeWidth={4} fill="none" strokeDasharray="6 8" />
      <rect x={60} y={-440} width={54} height={36} rx={8} fill={wool} {...o} />
      <rect x={112} y={-436} width={36} height={28} rx={6} fill={C.mustard} {...o} />
      <path d="M 66 -428 L 110 -428 M 66 -418 L 110 -418 M 66 -408 L 110 -408" stroke={C.sepia} strokeWidth={3} opacity={0.6} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <SpinningWheel x={p.x} y={p.y} s={p.s} f={p.f} spinning={p.spinning} wood={p.wood} wool={p.wool} flip={p.flip} />;
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Loom: wooden hand loom with warp threads, half-woven striped cloth and a shuttle moving across. Stands on (x, y) at floor level.
export const Loom: React.FC<{ x: number; y: number; s?: number; f?: number; weaving?: boolean; wood?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, weaving = true, wood = C.sepia, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const dark = "#5E4530";
  const stripes = [C.brick, C.mustard, C.teal, C.cream, C.navy, C.brick, C.mustard, C.teal, C.cream, C.brick];
  const shuttleX = weaving ? Math.sin(f / 40) * 210 : 0;
  const warp = Array.from({ length: 31 }, (_, i) => -300 + i * 20);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={400} ry={20} fill="#000" opacity={0.18} />
      {/* frame */}
      <rect x={-340} y={-60} width={680} height={60} rx={8} fill={dark} {...o} />
      <rect x={-340} y={-640} width={680} height={50} rx={8} fill={wood} {...o} />
      <rect x={-340} y={-600} width={36} height={560} fill={wood} {...o} />
      <rect x={304} y={-600} width={36} height={560} fill={wood} {...o} />
      <path d="M -320 -620 L -120 -620" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
      {/* warp threads above the cloth */}
      {warp.map((wx) => <line key={wx} x1={wx} y1={-590} x2={wx} y2={-330} stroke={C.stoneDark} strokeWidth={2} opacity={0.7} />)}
      {/* woven cloth, stripes with a faint weave */}
      {stripes.map((c, i) => <rect key={i} x={-300} y={-330 + i * 20} width={600} height={20} fill={c} />)}
      {Array.from({ length: 30 }, (_, i) => <line key={i} x1={-300 + i * 20} y1={-330} x2={-300 + i * 20} y2={-130} stroke={C.ink} strokeWidth={2} opacity={0.18} />)}
      <rect x={-300} y={-330} width={600} height={200} fill="none" stroke={C.ink} strokeWidth={6} />
      {/* cloth roll at the bottom */}
      <rect x={-320} y={-140} width={640} height={36} rx={18} fill={C.sepia} {...o} />
      {/* warp threads below the cloth */}
      {warp.slice(0, 31).map((wx) => <line key={wx} x1={wx} y1={-130} x2={wx} y2={-104} stroke={C.stoneDark} strokeWidth={2} opacity={0.5} />)}
      {/* shuttle with trailing weft thread */}
      <g transform={`translate(${shuttleX} -360)`}>
        <path d="M -48 0 Q 0 -24 48 0 Q 0 12 -48 0 Z" fill={C.mustard} {...o} />
        <path d="M -30 -4 L 30 -4" stroke="#FFFFFF" strokeWidth={4} opacity={0.6} />
      </g>
      <path d={`M ${-300} -358 L ${shuttleX - 48} -360`} stroke={C.mustard} strokeWidth={4} opacity={0.8} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Loom x={p.x} y={p.y} s={p.s} f={p.f} weaving={p.weaving} wood={p.wood} flip={p.flip} />;
}

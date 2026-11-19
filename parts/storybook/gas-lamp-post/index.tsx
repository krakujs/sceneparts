import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Gas lamp post: tall ornate cast-iron street lamp with a glass lantern and glow, plus a ladder bar. Stands on (x, y) at the pavement.
export const GasLampPost: React.FC<{ x: number; y: number; s?: number; f?: number; lit?: boolean; iron?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, lit = true, iron = "#2C2F3B", flip = false }) => {
  const flick = 1 + Math.sin(f / 2.1) * 0.07 + Math.sin(f / 5.3) * 0.05;
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={130} ry={18} fill="#000" opacity={0.2} />
      {lit ? <circle cx={0} cy={-850} r={260 * flick} fill={C.glow} opacity={0.22} /> : null}
      {/* base */}
      <path d="M -96 0 L 96 0 L 84 -40 Q 70 -70 40 -76 L -40 -76 Q -70 -70 -84 -40 Z" fill={iron} {...o} />
      <rect x={-70} y={-96} width={140} height={22} rx={6} fill={iron} {...o} />
      {/* column */}
      <rect x={-18} y={-776} width={36} height={680} fill={iron} {...o} />
      <path d="M -10 -90 L -10 -580" stroke="#FFFFFF" strokeWidth={7} opacity={0.35} strokeLinecap="round" />
      {[-130, -560, -740].map((cy) => <rect key={cy} x={-30} y={cy - 10} width={60} height={20} rx={6} fill={iron} {...o} />)}
      {/* ladder bar */}
      <rect x={-62} y={-690} width={124} height={12} rx={5} fill={iron} {...o} />
      <path d="M 62 -684 q 18 0 14 -26" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      {/* lantern */}
      <path d="M -44 -770 L 44 -770 L 30 -800 L -30 -800 Z" fill={iron} {...o} />
      <path d="M -50 -800 L 50 -800 L 40 -918 L -40 -918 Z" fill={lit ? "#FCEBB6" : "#D7E3E2"} opacity={0.92} {...o} />
      {lit ? (
        <g transform={`translate(0 -858) scale(${flick})`}>
          <path d="M 0 -58 Q 26 -18 16 6 Q 0 20 -16 6 Q -26 -18 0 -58 Z" fill="#F08A24" stroke={C.ink} strokeWidth={4} />
          <path d="M 0 -30 Q 9 -8 4 4 Q 0 8 -4 4 Q -9 -8 0 -30 Z" fill={C.glow} />
        </g>
      ) : null}
      <line x1={-16} y1={-800} x2={-14} y2={-918} stroke={iron} strokeWidth={6} />
      <line x1={16} y1={-800} x2={14} y2={-918} stroke={iron} strokeWidth={6} />
      <path d="M -30 -806 L -28 -912" stroke="#FFFFFF" strokeWidth={6} opacity={0.5} strokeLinecap="round" />
      {/* cap */}
      <path d="M -66 -918 L 0 -1000 L 66 -918 Z" fill={iron} {...o} />
      <path d="M -44 -926 L 0 -982" stroke="#FFFFFF" strokeWidth={5} opacity={0.35} strokeLinecap="round" />
      <circle cx={0} cy={-1006} r={12} fill={iron} {...o} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <GasLampPost x={p.x} y={p.y} s={p.s} f={p.f} lit={p.lit} iron={p.iron} flip={p.flip} />;
}

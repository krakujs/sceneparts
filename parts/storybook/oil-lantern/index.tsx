import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Oil lantern: brass frame, glass chimney, carry ring and a flickering flame. Stands on (x, y), bottom centre.
export const OilLantern: React.FC<{ x: number; y: number; s?: number; f?: number; lit?: boolean; metal?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, lit = true, metal = "#B98B52", flip = false }) => {
  const flick = 1 + Math.sin(f / 2.1) * 0.08 + Math.sin(f / 5.3) * 0.05;
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={150} ry={18} fill="#000" opacity={0.2} />
      {lit ? <circle cx={0} cy={-200} r={210 * flick} fill={C.glow} opacity={0.22} /> : null}
      <path d="M -60 -470 Q 0 -560 60 -470" stroke={C.ink} strokeWidth={16} fill="none" />
      <path d="M -60 -470 Q 0 -560 60 -470" stroke={metal} strokeWidth={8} fill="none" />
      <path d="M -70 -440 L 70 -440 L 90 -400 L -90 -400 Z" fill={metal} {...o} />
      <path d="M -70 -400 Q -110 -220 -70 -70 L 70 -70 Q 110 -220 70 -400 Z" fill={lit ? "#FCEBB6" : "#D7E3E2"} opacity={0.9} {...o} />
      {lit ? (
        <g transform={`translate(0 -170) scale(${flick})`}>
          <path d="M 0 -80 Q 34 -24 22 6 Q 0 26 -22 6 Q -34 -24 0 -80 Z" fill="#F08A24" stroke={C.ink} strokeWidth={5} />
          <path d="M 0 -40 Q 12 -10 6 4 Q 0 10 -6 4 Q -12 -10 0 -40 Z" fill={C.glow} />
        </g>
      ) : null}
      <rect x={-8} y={-150} width={16} height={60} fill={C.cream} stroke={C.ink} strokeWidth={4} />
      <path d="M -40 -380 Q -56 -230 -40 -100" stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={0.45} strokeLinecap="round" />
      {[-70, 70].map((bx) => <line key={bx} x1={bx} y1={-400} x2={bx} y2={-70} stroke={metal} strokeWidth={10} />)}
      <path d="M -110 -70 L 110 -70 L 96 0 L -96 0 Z" fill={metal} {...o} />
      <rect x={-96} y={-44} width={192} height={12} fill={C.ink} opacity={0.25} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <OilLantern x={p.x} y={p.y} s={p.s} f={p.f} lit={p.lit} metal={p.metal} flip={p.flip} />;
}

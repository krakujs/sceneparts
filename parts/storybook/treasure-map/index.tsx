import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Old parchment treasure map: curled edges, stains, a dotted route that flows around a palm island to a red X,
// and a small compass rose. No writing. Stands on (x, y), bottom centre, about 420 px tall at s = 1.
export const TreasureMap: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; paper?: string; route?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, paper = C.paper, route = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={220} ry={14} fill="#000" opacity={0.2} />
      <path d="M -210 -400 Q -205 -420 -180 -418 L 170 -424 Q 214 -420 210 -380 L 206 -40 Q 208 -16 170 -20 L -180 -12 Q -210 -16 -212 -50 L -214 -370 Q -216 -398 -210 -400 Z" fill={paper} {...o} />
      <path d="M 180 -410 Q 204 -220 186 -20 L 206 -22 Q 222 -220 210 -400 Z" fill={C.paperDark} opacity={0.8} />
      <path d="M -180 -410 Q -200 -220 -186 -20 L -206 -22 Q -220 -220 -210 -400 Z" fill={C.paperDark} opacity={0.6} />
      <circle cx={-120} cy={-360} r={30} fill="#C9B088" opacity={0.4} />
      <circle cx={110} cy={-80} r={22} fill="#C9B088" opacity={0.4} />
      <rect x={-186} y={-386} width={372} height={350} rx={4} fill="none" stroke={C.sepia} strokeWidth={3} strokeDasharray="2 8" />
      {/* island */}
      <path d="M -90 -250 Q -50 -300 10 -290 Q 80 -300 100 -240 Q 110 -200 70 -180 Q 40 -150 -10 -170 Q -70 -160 -90 -210 Q -100 -230 -90 -250 Z" fill="#C8A36A" stroke={C.sepia} strokeWidth={5} />
      <path d="M -10 -250 Q 0 -290 -10 -320" stroke={C.sepia} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M -10 -320 Q -40 -340 -62 -320 Q -30 -330 -10 -320 Z" fill={C.teal} stroke={C.ink} strokeWidth={3} />
      <path d="M -10 -320 Q 20 -344 44 -322 Q 16 -330 -10 -320 Z" fill={C.teal} stroke={C.ink} strokeWidth={3} />
      <path d="M -10 -320 Q -4 -348 -22 -364 Q -6 -352 -10 -320 Z" fill={C.teal} stroke={C.ink} strokeWidth={3} />
      {/* dotted route */}
      {route ? (
        <path d="M -150 -90 Q -190 -190 -120 -210 Q -60 -230 -10 -190 Q 30 -150 44 -220" stroke={C.brick} strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="2 14" strokeDashoffset={-f * 0.7} />
      ) : null}
      {/* red X */}
      <path d="M 44 -240 L 76 -204 M 76 -240 L 44 -204" stroke={C.brick} strokeWidth={14} strokeLinecap="round" />
      <path d="M 44 -240 L 76 -204 M 76 -240 L 44 -204" stroke={C.brickDark} strokeWidth={4} strokeLinecap="round" opacity={0.4} />
      {/* compass rose */}
      <circle cx={150} cy={-360} r={30} fill="none" stroke={C.sepia} strokeWidth={4} />
      <path d="M 150 -398 L 150 -322 M 112 -360 L 188 -360 M 124 -334 L 176 -386 M 176 -334 L 124 -386" stroke={C.sepia} strokeWidth={3} />
      <path d="M 150 -398 L 144 -360 L 150 -322 L 156 -360 Z" fill={C.brick} stroke={C.ink} strokeWidth={2} />
      {/* waves */}
      <path d="M -160 -60 q 10 -10 20 0 q 10 -10 20 0 M -110 -48 q 10 -10 20 0 q 10 -10 20 0 M 60 -70 q 10 -10 20 0 q 10 -10 20 0" stroke={C.sepia} strokeWidth={3} fill="none" opacity={0.7} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <TreasureMap x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} paper={p.paper} route={p.route} />;
}

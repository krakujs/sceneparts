import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Stoneware hot water bottle: glazed round body with cream spots, a cork stopper and little steam wisps.
// Stands on (x, y), bottom centre, about 480 px tall at s = 1.
export const HotWaterBottle: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; glaze?: string; steam?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, glaze = C.teal, steam = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const body = "M -30 -300 C -150 -300 -175 -220 -170 -140 C -165 -50 -110 0 0 0 C 110 0 165 -50 170 -140 C 175 -220 150 -300 30 -300 Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={180} ry={14} fill="#000" opacity={0.2} />
      <rect x={-26} y={-332} width={52} height={44} fill={glaze} {...o} />
      <path d={body} fill={glaze} {...o} />
      <rect x={-38} y={-344} width={76} height={18} rx={5} fill={C.cream} {...o} />
      {[
        [-80, -180],
        [82, -196],
        [60, -100],
        [-64, -70],
        [0, -150],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={8} fill={C.cream} />
      ))}
      <path d="M -120 -200 Q -132 -120 -92 -60" stroke="#FFFFFF" strokeWidth={12} fill="none" opacity={0.5} strokeLinecap="round" />
      <path d="M -30 -300 C -150 -300 -175 -220 -170 -140 C -165 -50 -110 0 0 0 C 110 0 165 -50 170 -140 C 175 -220 150 -300 30 -300 Z" fill="none" {...o} />
      {/* cork stopper */}
      <rect x={-36} y={-404} width={72} height={62} rx={12} fill="#8A6A45" {...o} />
      <path d="M -20 -396 l 0 46 M 0 -396 l 0 46 M 20 -396 l 0 46" stroke="#5A4128" strokeWidth={3} opacity={0.6} />
      {steam
        ? [0, 1, 2].map((i) => {
            const ph = ((f * 1.1 + i * 27) % 80) / 80;
            const sx = -30 + i * 30;
            const sy = -430 - ph * 70;
            return <path key={i} d={`M ${sx} ${sy} q 10 -12 0 -24 t 0 -24`} stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" opacity={Math.sin(ph * Math.PI) * 0.9} />;
          })
        : null}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <HotWaterBottle x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} glaze={p.glaze} steam={p.steam} />;
}

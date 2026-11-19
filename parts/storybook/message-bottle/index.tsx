import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Message in a bottle: green glass bottle with a cork and a rolled cream note tied with a brick ribbon, bobbing on
// a small wave. Stands on (x, y), the waterline at the bottom centre, about 480 px tall at s = 1.
export const MessageBottle: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; glass?: string; bob?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, glass = "#6E9E6B", bob = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const up = bob ? Math.sin(f / 22) * 6 : 0;
  const tilt = bob ? Math.sin(f / 22) * 5 : 0;
  const wx = bob ? Math.sin(f / 30) * 10 : 0;
  const bodyPath = "M -34 -270 Q -120 -250 -128 -170 L -128 -70 Q -128 -8 -64 -4 L 64 -4 Q 128 -8 128 -70 L 128 -170 Q 120 -250 34 -270 Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <g transform={`translate(0 ${up}) rotate(${tilt} 0 -20)`}>
        <rect x={-34} y={-400} width={68} height={140} rx={8} fill={glass} {...o} />
        <rect x={-40} y={-410} width={80} height={16} rx={6} fill={glass} {...o} />
        <rect x={-40} y={-462} width={80} height={56} rx={8} fill="#C9A072" {...o} />
        <path d="M -24 -456 L -24 -412 M 0 -456 L 0 -412 M 24 -456 L 24 -412" stroke="#8A6A45" strokeWidth={3} opacity={0.6} />
        <path d={bodyPath} fill={glass} opacity={0.6} />
        {/* rolled note */}
        <rect x={-62} y={-210} width={124} height={120} rx={6} fill={C.cream} stroke={C.ink} strokeWidth={4} />
        <ellipse cx={0} cy={-210} rx={62} ry={10} fill="#E8D6AE" stroke={C.ink} strokeWidth={4} />
        <ellipse cx={0} cy={-90} rx={62} ry={10} fill="#E8D6AE" stroke={C.ink} strokeWidth={4} />
        <rect x={-66} y={-160} width={132} height={16} rx={4} fill={C.brick} stroke={C.ink} strokeWidth={3} />
        <path d={bodyPath} fill="none" {...o} />
        <path d="M -100 -200 L -100 -90" stroke="#FFFFFF" strokeWidth={12} opacity={0.5} strokeLinecap="round" />
        <path d="M -60 -262 Q -92 -240 -96 -212" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.5} strokeLinecap="round" />
      </g>
      {/* small wave */}
      <g transform={`translate(${wx} 0)`}>
        <path d="M -280 -4 Q -230 -34 -180 -4 T -80 -4 T 20 -4 T 120 -4 T 220 -4 T 320 -4 L 320 70 L -280 70 Z" fill={C.teal} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -150 -22 q 18 -12 36 0 M 40 -22 q 18 -12 36 0 M 150 -22 q 18 -12 36 0" stroke="#FFFFFF" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.8} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <MessageBottle x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} glass={p.glass} bob={p.bob} />;
}

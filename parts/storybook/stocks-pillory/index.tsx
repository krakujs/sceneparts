import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Stocks and pillory: wooden village stocks with leg holes beside a pillory frame on a post. Empty. Stands on (x, y) at ground level.
export const StocksPillory: React.FC<{ x: number; y: number; s?: number; f?: number; wood?: string; flip?: boolean }> = ({ x, y, s = 1, wood = C.sepia, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const dark = "#5E4530";
  const hole = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} fill={C.ink} />;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={440} ry={20} fill="#000" opacity={0.18} />
      {/* stocks: posts, then boards with holes */}
      <rect x={-330} y={-500} width={40} height={500} fill={dark} {...o} />
      <rect x={180} y={-500} width={40} height={500} fill={dark} {...o} />
      <rect x={-360} y={-10} width={580} height={20} rx={6} fill={dark} {...o} />
      <rect x={-300} y={-480} width={500} height={56} rx={6} fill={wood} {...o} />
      <rect x={-300} y={-260} width={500} height={56} rx={6} fill={wood} {...o} />
      {hole(-200, -452, 30)}{hole(40, -452, 30)}
      {hole(-200, -232, 30)}{hole(40, -232, 30)}
      <path d="M -290 -466 L -120 -466" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
      <path d="M -290 -246 L -120 -246" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
      <rect x={-340} y={-520} width={60} height={24} rx={6} fill={dark} {...o} />
      {/* pillory: post with a head board and a hand board */}
      <rect x={300} y={-740} width={44} height={740} fill={dark} {...o} />
      <rect x={250} y={-690} width={200} height={36} rx={6} fill={wood} {...o} />
      <rect x={250} y={-560} width={200} height={36} rx={6} fill={wood} {...o} />
      <rect x={250} y={-690} width={30} height={170} rx={6} fill={wood} {...o} />
      <rect x={420} y={-690} width={30} height={170} rx={6} fill={wood} {...o} />
      {hole(346, -672, 22)}
      {hole(290, -542, 18)}{hole(394, -542, 18)}
      <path d="M 262 -680 L 330 -680" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <StocksPillory x={p.x} y={p.y} s={p.s} f={p.f} wood={p.wood} flip={p.flip} />;
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Fireside bellows: two wooden boards with a pleated leather body, a brass nozzle pointing right and puffs of air
// when it pumps. Stands on (x, y), bottom centre, about 360 px tall at s = 1.
export const Bellows: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; puff?: boolean; wood?: string; leather?: string }> = ({ x, y, s = 1, f = 0, flip = false, puff = true, wood = "#8A6A45", leather = "#7E2E22" }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const pump = (1 + Math.sin(f / 14)) / 2;
  const topY = -300 - pump * 46;
  const gapTop = topY + 56;
  const gapBot = -60;
  const my = (gapTop + gapBot) / 2;
  const folds = [0, 1, 2, 3, 4, 5].map((k) => gapTop + (k / 5) * (gapBot - gapTop));
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={260} ry={16} fill="#000" opacity={0.2} />
      {/* leather body */}
      <path d={`M -200 ${gapTop} L 40 ${gapTop} L 40 ${gapBot} L -200 ${gapBot} Z`} fill={leather} {...o} />
      {folds.map((fy, i) => (
        <path key={i} d={`M -200 ${fy} Q -80 ${fy + 9} 40 ${fy}`} stroke={C.ink} strokeWidth={5} fill="none" opacity={0.6} />
      ))}
      {/* nozzle */}
      <path d={`M 36 ${my - 40} L 200 ${my - 18} L 200 ${my + 18} L 36 ${my + 40} Z`} fill="#B98B52" {...o} />
      <ellipse cx={206} cy={my} rx={12} ry={22} fill="#7A5A2E" {...o} />
      <path d={`M 60 ${my - 26} L 170 ${my - 10}`} stroke="#FFFFFF" strokeWidth={5} opacity={0.5} strokeLinecap="round" />
      {/* boards */}
      <rect x={-240} y={topY} width={300} height={56} rx={12} fill={wood} {...o} />
      <rect x={-240} y={-60} width={300} height={60} rx={12} fill={wood} {...o} />
      <path d={`M -220 ${topY + 18} L 40 ${topY + 18}`} stroke="#4A3324" strokeWidth={3} opacity={0.5} />
      <path d="M -220 -36 L 40 -36" stroke="#4A3324" strokeWidth={3} opacity={0.5} />
      <circle cx={-224} cy={topY + 28} r={16} fill="#A97C50" {...o} />
      <circle cx={-224} cy={-30} r={16} fill="#A97C50" {...o} />
      {puff
        ? [0, 1].map((i) => {
            const ph = ((f + i * 14) % 28) / 28;
            const cx = 236 + ph * 120;
            const cy = my - ph * 24 + Math.sin(ph * 3) * 6;
            return <circle key={i} cx={cx} cy={cy} r={10 + ph * 26} fill="#F4EAD5" stroke={C.ink} strokeWidth={4} opacity={(1 - ph) * 0.85} />;
          })
        : null}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Bellows x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} puff={p.puff} wood={p.wood} leather={p.leather} />;
}

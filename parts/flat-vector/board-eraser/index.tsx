import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Blackboard duster: a wooden block with a felt pad underneath and a grip on top.
// anim "wipe": it slides side to side, and puffs of chalk dust rise from the pad as it moves.
// Origin = bottom centre of the felt pad (stands on y). About 440 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const felt = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const wipe = p.anim === "wipe";
  const dx = wipe ? Math.sin((f * 2 * Math.PI) / 60) * 60 : 0;
  // Dust puffs: each one rises and spreads from the pad, then restarts.
  const puffs: React.ReactNode[] = [];
  if (wipe) {
    for (let i = 0; i < 7; i++) {
      const t = ((f + i * 6) % 36) / 36;
      const side = i % 2 === 0 ? 1 : -1;
      const px = dx + (i - 3) * 24 + side * t * 36;
      const py = -70 - t * 110;
      puffs.push(
        <circle key={i} cx={f1(px)} cy={f1(py)} r={f1(8 + t * 16)} fill="#B7BFCC" opacity={f1((1 - t) * 0.8)} />,
      );
    }
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={`translate(${f1(dx)} 0)`}>
        {/* grip on top */}
        <rect x={-90} y={-206} width={180} height={62} rx={22} fill={shade(wood, 0.3)} />
        <rect x={-70} y={-186} width={140} height={14} rx={7} fill={shade(wood, 0.3)} opacity={0.5} />
        {/* wooden block */}
        <rect x={-200} y={-152} width={400} height={112} rx={22} fill={wood} />
        <rect x={-200} y={-152} width={400} height={24} rx={12} fill={shade(wood, 0.2)} />
        <rect x={-150} y={-112} width={300} height={6} rx={3} fill={shade(wood, 0.18)} />
        <rect x={-120} y={-80} width={240} height={5} rx={2.5} fill={shade(wood, 0.18)} />
        {/* felt pad */}
        <rect x={-214} y={-46} width={428} height={46} rx={12} fill={felt} />
        <rect x={-214} y={-18} width={428} height={18} rx={9} fill={shade(felt, 0.25)} />
        <rect x={-190} y={-40} width={380} height={4} rx={2} fill={C.white} opacity={0.25} />
      </g>
      {/* chalk dust rising from the pad, drawn over the duster */}
      {puffs}
    </g>
  );
}

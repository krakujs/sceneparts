import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, fitSize, Txt } from "../stat-card/index";

// Compact centred name plate with an accent left edge. Pops in above a character. x, y = centre.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const name = String(p.name ?? "Alex Morgan");
  const sub = String(p.subtitle ?? "Head of Operations");
  const H = 120, EDGE = 22;
  const nSize = fitSize(name, 56, 700);
  const sSize = fitSize(sub, 32, 700);
  const W = Math.round(Math.min(820, Math.max(340, Math.max(name.length * nSize * 0.6, sub.length * sSize * 0.6) + 100 + EDGE)));
  const k = popIn(p.f, at, 12);
  const rx = H / 2;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1250}) scale(${(p.s ?? 1) * k})`}>
      <path d={`M-16 ${H / 2 - 10} L0 ${H / 2 + 24} L16 ${H / 2 - 10} Z`} fill={u.card} stroke={u.ink} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-W / 2 + 8} y={-H / 2 + 12} width={W} height={H} rx={rx} fill="rgba(0,0,0,0.18)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={rx} fill={u.accent} stroke={u.ink} strokeWidth={5} />
      <rect x={-W / 2 + EDGE} y={-H / 2} width={W - EDGE} height={H} rx={rx} fill={u.card} stroke={u.ink} strokeWidth={5} />
      <Txt x={EDGE / 2} y={-4} u={u} size={nSize} weight={900} maxW={W - EDGE - 60}>{name}</Txt>
      <Txt x={EDGE / 2} y={34} u={u} size={sSize} weight={700} fill={u.muted} maxW={W - EDGE - 60}>{sub}</Txt>
    </g>
  );
}

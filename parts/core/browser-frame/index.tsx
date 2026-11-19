import React from "react";
import { ui, startFrame, enter, popIn, fitSize, Txt, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Generic browser window. Top bar uses neutral muted dots (not traffic-light colours), back/forward chevrons and an
// address pill showing `url`. The content area is left empty.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 900, H = p.h ?? 900, R = 36, bar = 110, sw = 8;
  const k = popIn(p.f, at, 14);
  const on = enter(p.f, at, 8);
  const url = String(p.url ?? "www.example.com");
  const pillX = 250, pillW = W - pillX - 40, pillY = 26, pillH = 58;
  const dot = u.soft;
  const dotCol = u.muted;
  const chev = (cx: number, dir: 1 | -1, col: string) => (
    <path d={dir > 0 ? `M${cx - 9} ${-14} L${cx + 9} 0 L${cx - 9} 14` : `M${cx + 9} ${-14} L${cx - 9} 0 L${cx + 9} 14`}
      fill="none" stroke={col} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
  );
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`} opacity={on}>
      <rect x={-W / 2 + 10} y={-H / 2 + 16} width={W} height={H} rx={R} fill="rgba(0,0,0,0.18)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={R} fill={u.card} stroke={u.cardEdge} strokeWidth={sw} />
      <path d={`M${-W / 2} ${-H / 2 + bar} L${-W / 2} ${-H / 2 + R} Q${-W / 2} ${-H / 2} ${-W / 2 + R} ${-H / 2} L${W / 2 - R} ${-H / 2} Q${W / 2} ${-H / 2} ${W / 2} ${-H / 2 + R} L${W / 2} ${-H / 2 + bar} Z`} fill={u.soft} />
      <line x1={-W / 2} y1={-H / 2 + bar} x2={W / 2} y2={-H / 2 + bar} stroke={u.cardEdge} strokeWidth={sw} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={-W / 2 + 46 + i * 38} cy={-H / 2 + bar / 2} r={12} fill={dot} stroke={dotCol} strokeWidth={4} />
      ))}
      <g transform={`translate(0 ${-H / 2 + bar / 2 + 0})`}>
        <g transform={`translate(${-W / 2 + 178} 0)`}>{chev(0, -1, u.muted)}</g>
        <g transform={`translate(${-W / 2 + 214} 0)`}>{chev(0, 1, u.muted)}</g>
      </g>
      <g transform={`translate(${-W / 2 + pillX} ${-H / 2 + pillY})`}>
        <rect x={0} y={0} width={pillW} height={pillH} rx={pillH / 2} fill={u.white} stroke={u.cardEdge} strokeWidth={4} />
        <Txt x={pillW / 2} y={pillH / 2 + 14} u={u} size={fitSize(url, 34, pillW - 40)} weight={700} fill={u.muted} maxW={pillW - 40}>{url}</Txt>
      </g>
    </g>
  );
}

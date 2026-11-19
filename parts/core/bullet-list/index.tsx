import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Card, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Bullet list: optional title over 3-6 bullet points with accent dots, each sliding and fading in after the last.
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const items: string[] = (p.items ?? []).slice(0, 6);
  const n = Math.max(1, items.length);
  const title: string = p.title ?? "";
  const W = 860;
  const headH = title ? 150 : 40;
  const RH = 104;
  const H = headH + n * RH + 40;
  const top = -H / 2;
  const tx = -W / 2 + 110;
  const tE = enter(p.f, f0, 10);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <Card x={-W / 2} y={top} w={W} h={H} u={u} />
      {title ? (
        <g opacity={tE} transform={`translate(0 ${(1 - tE) * 12})`}>
          <Txt x={-W / 2 + 50} y={top + 90} u={u} size={60} weight={900} anchor="start" maxW={W - 100}>{title}</Txt>
          <rect x={-W / 2 + 50} y={top + 112} width={110} height={10} rx={5} fill={u.accent} />
        </g>
      ) : null}
      {items.map((t, i) => {
        const at = f0 + 6 + i * 5;
        const e = enter(p.f, at, 10);
        const cy = top + headH + i * RH + RH / 2;
        return (
          <g key={i} opacity={e} transform={`translate(${(1 - e) * 40} 0)`}>
            <circle cx={-W / 2 + 74} cy={cy} r={14} fill={u.accent} stroke={u.ink} strokeWidth={3} />
            <Txt x={tx} y={cy + 14} u={u} size={42} weight={600} anchor="start" maxW={W - 150 - (tx + W / 2)}>{t}</Txt>
          </g>
        );
      })}
    </g>
  );
}

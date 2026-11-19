import React from "react";
import { type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, enter, Card, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Numbered list: each item is a card with a big round number badge; rows slide in one by one, badges pop.
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const items: string[] = (p.items ?? []).slice(0, 6);
  const n = Math.max(1, items.length);
  const W = 860, RH = 128, GAP = 24;
  const total = n * RH + (n - 1) * GAP;
  const top = -total / 2;
  const badgeX = -W / 2 + 80;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {items.map((t, i) => {
        const y = top + i * (RH + GAP);
        const cy = y + RH / 2;
        const at = f0 + i * 5;
        const e = enter(p.f, at, 10);
        const pk = popIn(p.f, at + 3, 10);
        return (
          <g key={i} opacity={e} transform={`translate(${(1 - e) * -160} 0)`}>
            <Card x={-W / 2} y={y} w={W} h={RH} u={u} r={28} />
            <g transform={`translate(${badgeX} ${cy}) scale(${pk})`}>
              <circle r={50} fill={u.accent} stroke={u.ink} strokeWidth={5} />
              <Txt x={0} y={18} u={u} size={56} weight={900} fill={u.white}>{String(i + 1)}</Txt>
            </g>
            <Txt x={badgeX + 80} y={cy + 15} u={u} size={44} weight={700} anchor="start" maxW={W / 2 - 30 - (badgeX + 80)}>{t}</Txt>
          </g>
        );
      })}
    </g>
  );
}

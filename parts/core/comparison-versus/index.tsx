import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Comparison versus: two side-by-side cards with titles and three stats each, and a round VS badge in the middle.
// leftTitle / rightTitle = card titles, leftStats / rightStats = string[] of up to three lines each.

/* eslint-disable @typescript-eslint/no-explicit-any */
const wrap = (text: string, max: number) => {
  const lines: string[] = [];
  let cur = "";
  for (const w of String(text).split(/\s+/).filter(Boolean)) {
    const t = cur ? `${cur} ${w}` : w;
    if (t.length > max && cur) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
};
const topRound = (x: number, y: number, w: number, h: number, r: number) =>
  `M ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h} L ${x} ${y + h} Z`;

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const CW = 400, CH = 680, TOP = -340;
  const cards = [
    { x: -450, title: String(p.leftTitle ?? "Old way"), stats: (Array.isArray(p.leftStats) ? p.leftStats : ["Takes three hours", "Errors on every batch", "Hard to share"]) as string[], head: u.ink, dir: -1 },
    { x: 50, title: String(p.rightTitle ?? "New way"), stats: (Array.isArray(p.rightStats) ? p.rightStats : ["Done in ten minutes", "Checks itself", "Shared in one click"]) as string[], head: u.accent, dir: 1 },
  ];
  const badge = popIn(p.f, at + 12, 10);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      {cards.map((c, ci) => {
        const e = enter(p.f, at, 16);
        return (
          <g key={ci} opacity={e} transform={`translate(${-c.dir * (1 - e) * 60} 0)`}>
            <Card x={c.x} y={TOP} w={CW} h={CH} u={u} />
            <path d={topRound(c.x, TOP, CW, 180, 28)} fill={c.head} />
            <Txt x={c.x + CW / 2} y={TOP + 112} u={u} size={56} weight={900} fill={u.white} maxW={CW - 60}>{c.title}</Txt>
            {c.stats.slice(0, 3).map((st, i) => {
              const y = TOP + 220 + i * 160;
              const lines = wrap(st, 14);
              return (
                <g key={i}>
                  <circle cx={c.x + 40} cy={y - 12} r={11} fill={c.head} />
                  {lines.map((l, j) => (
                    <Txt key={j} x={c.x + 66} y={y + j * 44} u={u} size={34} weight={700} anchor="start" maxW={CW - 102}>{l}</Txt>
                  ))}
                </g>
              );
            })}
            <rect x={c.x} y={TOP} width={CW} height={CH} rx={28} fill="none" stroke={u.cardEdge} strokeWidth={5} />
          </g>
        );
      })}
      <g transform={`translate(0 0) scale(${Math.max(0.001, badge)})`}>
        <circle r={72} fill={u.accent} stroke={u.cardEdge} strokeWidth={6} />
        <Txt x={0} y={20} u={u} size={56} weight={900} fill={u.white}>VS</Txt>
      </g>
    </g>
  );
}

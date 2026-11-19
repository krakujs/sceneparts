import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Card, Txt } from "../stat-card/index";

// Rank list reveal: up to five ranked rows that reveal one by one from the bottom (last place) up to #1.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const items = String(p.items ?? "Hummingbirds|Sloths|Octopuses|Mantis shrimp|Axolotls")
    .split("|").map((s) => s.trim()).filter(Boolean).slice(0, 5);
  const n = items.length;
  const W = 860, RH = 128, GAP = 24;
  const total = n * RH + Math.max(0, n - 1) * GAP;
  const top = -total / 2;
  const step = Number(p.step ?? 14);
  const eTitle = enter(p.f, at, 10);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <g opacity={eTitle}>
        <Txt x={0} y={top - 80} u={u} size={60} weight={900} maxW={W}>{String(p.title ?? "Top 5 weirdest animals")}</Txt>
      </g>
      {items.map((label, i) => {
        const rank = i + 1;
        const revealIdx = n - 1 - i;
        const t0 = at + revealIdx * step;
        const e = enter(p.f, t0, 12);
        const y = top + i * (RH + GAP);
        return (
          <g key={i} transform={`translate(${(1 - e) * 90} ${y})`} opacity={e}>
            <Card x={-W / 2} y={0} w={W} h={RH} u={u} r={28} />
            <circle cx={-W / 2 + 84} cy={RH / 2} r={50} fill={rank === 1 ? u.warn : u.accent} stroke={u.ink} strokeWidth={5} />
            <Txt x={-W / 2 + 84} y={RH / 2 + 19} u={u} size={52} weight={900} fill={u.white}>{String(rank)}</Txt>
            <Txt x={-W / 2 + 170} y={RH / 2 + 17} u={u} size={50} weight={800} anchor="start" maxW={W - 220}>{label}</Txt>
          </g>
        );
      })}
    </g>
  );
}

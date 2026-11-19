import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fitSize, Txt } from "../stat-card/index";

// Scoreboard UI: a sports-style score bug with two team names, two scores and a period / clock box.
// homeScore and awayScore are numbers, so pass [from, to] to tick them up. Team names are generic placeholders.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 10);
  const drop = enter(p.f, at, 14);
  const hs = Math.max(0, Math.round(Number(p.homeScore ?? 0)));
  const as = Math.max(0, Math.round(Number(p.awayScore ?? 0)));
  const home = String(p.home ?? "RED");
  const away = String(p.away ?? "BLUE");
  const clock = String(p.clock ?? "07:42");
  const period = String(p.period ?? "Q3");
  const H = 150;
  const wName = 240, wScore = 124, wClock = 190;
  const total = wName * 2 + wScore * 2 + wClock;
  const x0 = -total / 2;
  const xs = {
    nameA: x0,
    scoreA: x0 + wName,
    clock: x0 + wName + wScore,
    scoreB: x0 + wName + wScore + wClock,
    nameB: x0 + wName + wScore * 2 + wClock,
  };
  const box = (x: number, w: number, fill: string) => (
    <rect x={x} y={-H / 2} width={w} height={H} rx={18} fill={fill} stroke={u.cardEdge} strokeWidth={5} />
  );

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <g opacity={drop} transform={`translate(0 ${(1 - drop) * -60})`}>
        {box(xs.nameA, wName, u.ink)}
        {box(xs.scoreA, wScore, u.accent)}
        {box(xs.clock, wClock, u.card)}
        {box(xs.scoreB, wScore, u.series[1])}
        {box(xs.nameB, wName, u.ink)}
        <Txt x={xs.nameA + wName / 2} y={20} u={u} size={fitSize(home, 56, wName - 30)} weight={900} fill={u.white} maxW={wName - 30}>{home}</Txt>
        <Txt x={xs.scoreA + wScore / 2} y={42} u={u} size={110} weight={900} fill={u.white} maxW={wScore - 20}>{String(hs)}</Txt>
        <Txt x={xs.clock + wClock / 2} y={-22} u={u} size={30} weight={800} fill={u.accent} maxW={wClock - 30}>{period}</Txt>
        <Txt x={xs.clock + wClock / 2} y={36} u={u} size={60} weight={900} maxW={wClock - 24}>{clock}</Txt>
        <Txt x={xs.scoreB + wScore / 2} y={42} u={u} size={110} weight={900} fill={u.white} maxW={wScore - 20}>{String(as)}</Txt>
        <Txt x={xs.nameB + wName / 2} y={20} u={u} size={fitSize(away, 56, wName - 30)} weight={900} fill={u.white} maxW={wName - 30}>{away}</Txt>
      </g>
    </g>
  );
}

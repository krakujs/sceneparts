import React from "react";
import { type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, enter, Card, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Tear-off calendar page: coloured header with the month, a big day number and the weekday below.
// With `from` set, the page for that day collapses onto its bottom edge to reveal `day` underneath.
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const W = 640, H = 700, top = -350, HEAD = 200;
  const month = String(p.month ?? "NOVEMBER");
  const day = String(p.day ?? 19);
  const weekday = String(p.weekday ?? "Wednesday");
  const hasFrom = p.from !== undefined && p.from !== null && p.from !== "" && String(p.from) !== day;
  const flip = enter(p.f, f0 + 14, 22);
  const pop = popIn(p.f, f0, 12);

  const page = (d: string, key: string) => (
    <g key={key}>
      <Card x={-W / 2} y={top} w={W} h={H} u={u} r={36} />
      <rect x={-W / 2} y={top} width={W} height={HEAD} rx={36} fill={u.accent} stroke={u.ink} strokeWidth={6} />
      <rect x={-W / 2 + 3} y={top + HEAD - 40} width={W - 6} height={40} fill={u.accent} />
      <rect x={-W / 2 + 3} y={top + HEAD - 3} width={W - 6} height={6} fill={u.ink} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={-W / 2 + 110 + k * (W - 220) / 2 - 14} y={top - 22} width={28} height={76} rx={14} fill={u.muted} stroke={u.ink} strokeWidth={5} />
      ))}
      <Txt x={0} y={top + 124} u={u} size={64} weight={900} fill={u.white} maxW={W - 100} ls={4}>{month}</Txt>
      <Txt x={0} y={top + HEAD + 250} u={u} size={300} weight={900} maxW={W - 120}>{d}</Txt>
      <Txt x={0} y={top + H - 70} u={u} size={60} weight={700} fill={u.accent} maxW={W - 100}>{weekday}</Txt>
    </g>
  );

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * pop})`}>
      {page(day, "new")}
      {hasFrom ? (
        <g transform={`translate(0 ${top}) scale(1 ${Math.max(0.001, 1 - flip)}) translate(0 ${-top})`}>
          {page(String(p.from), "old")}
        </g>
      ) : null}
    </g>
  );
}

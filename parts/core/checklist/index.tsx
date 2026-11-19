import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Card, Txt, DrawPath } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Checklist card: 3-6 boxes. The first `done` items get ticked one after another (the check stroke draws in),
// and ticked items dim slightly.
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const items: string[] = (p.items ?? []).slice(0, 6);
  const n = Math.max(1, items.length);
  const done = Math.max(0, Math.min(n, Math.round(Number(p.done ?? 2))));
  const W = 860, HEAD = 150, RH = 100;
  const H = HEAD + n * RH + 30;
  const top = -H / 2;
  const bx = -W / 2 + 50;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <Card x={-W / 2} y={top} w={W} h={H} u={u} />
      <Txt x={-W / 2 + 50} y={top + 88} u={u} size={60} weight={900} anchor="start" maxW={W - 100}>{p.title ?? "Launch checklist"}</Txt>
      <rect x={-W / 2 + 50} y={top + 110} width={110} height={10} rx={5} fill={u.accent} />
      {items.map((t, i) => {
        const e = enter(p.f, f0 + i * 3, 10);
        const cy = top + HEAD + i * RH + RH / 2;
        const isDone = i < done;
        const tk = isDone ? enter(p.f, f0 + 8 + i * 5, 8) : 0;
        return (
          <g key={i} opacity={e} transform={`translate(0 ${(1 - e) * 16})`}>
            <rect x={bx} y={cy - 28} width={56} height={56} rx={12} fill={u.white} stroke={u.ink} strokeWidth={5} />
            {isDone ? (
              <DrawPath
                transform={`translate(${bx + 28} ${cy})`}
                d="M-16 2 L-5 13 L17 -13"
                fill="none" stroke={u.good} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round"
                k={tk}
              />
            ) : null}
            <Txt x={bx + 90} y={cy + 15} u={u} size={44} weight={700} anchor="start" maxW={W - 200} opacity={1 - 0.4 * tk}>{t}</Txt>
          </g>
        );
      })}
    </g>
  );
}

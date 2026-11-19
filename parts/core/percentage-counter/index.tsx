import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Percentage counter: a huge percentage counts up to `value`, a thin bar fills under it, and a caption sits below.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const target = Math.max(0, Math.min(100, Number(p.value ?? 0)));
  const v = count(p.f, Number(p.from ?? 0), target, at, 45);
  const shown = Math.max(0, Math.min(100, v));
  const bx = -350, bw = 700;
  const g = enter(p.f, at, 45);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-440} y={-280} w={880} h={480} u={u} />
      <Txt x={0} y={-50} u={u} size={230} weight={900} maxW={800}>{fmt(shown, Number(p.decimals ?? 0), "", "%")}</Txt>
      <rect x={bx} y={40} width={bw} height={16} rx={8} fill={u.soft} />
      <rect x={bx} y={40} width={(bw * shown) / 100} height={16} rx={8} fill={u.accent} opacity={Math.max(0.2, g)} />
      <Txt x={0} y={150} u={u} size={46} weight={700} fill={u.muted} maxW={800}>{p.caption ?? "of customers renew after year one"}</Txt>
    </g>
  );
}

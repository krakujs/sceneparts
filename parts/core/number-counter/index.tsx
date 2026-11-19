import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Number counter: a big number counts from `from` to `value` with thousands separators, prefix/suffix and a caption.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const v = count(p.f, Number(p.from ?? 0), Number(p.value ?? 0), at, 45);
  const txt = fmt(v, Number(p.decimals ?? 0), p.prefix ?? "", p.suffix ?? "");
  const g = enter(p.f, at + 40, 12);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-440} y={-260} w={880} h={460} u={u} />
      <Txt x={0} y={-30} u={u} size={200} weight={900} maxW={800}>{txt}</Txt>
      <rect x={-60} y={34} width={120} height={10} rx={5} fill={u.accent} opacity={g} />
      <Txt x={0} y={120} u={u} size={46} weight={700} fill={u.muted} maxW={800} opacity={g}>{p.caption ?? "visitors this week"}</Txt>
    </g>
  );
}

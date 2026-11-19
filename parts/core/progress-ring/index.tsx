import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Progress ring: a circular ring that fills to `value` (0..100) with the percentage in the centre and a label below.
// The ring fills from `from` (default 0) to `value` over about 50 frames.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const target = Math.max(0, Math.min(100, Number(p.value ?? 0)));
  const vv = Math.max(0, Math.min(100, count(p.f, Number(p.from ?? 0), target, at, 50)));
  const R = 230, SW = 50, cx = 0, cy = -90;
  const C = 2 * Math.PI * R;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-400} y={-420} w={800} h={780} u={u} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={u.soft} strokeWidth={SW} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={u.accent} strokeWidth={SW} strokeDasharray={`${(C * vv) / 100} ${C}`} transform={`rotate(-90 ${cx} ${cy})`} />
      <Txt x={cx} y={cy + 46} u={u} size={130} weight={900} maxW={330}>{fmt(Math.round(vv), Number(p.decimals ?? 0), "", "%")}</Txt>
      <Txt x={0} y={265} u={u} size={46} weight={800} maxW={720}>{p.label ?? "Completed"}</Txt>
    </g>
  );
}

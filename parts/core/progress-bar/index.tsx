import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Progress bar: rounded pill that fills to `value` (0..100), label above, percentage at the right,
// with subtle stripes that drift along the fill.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const target = Math.max(0, Math.min(100, Number(p.value ?? 0)));
  const vv = Math.max(0, Math.min(100, count(p.f, 0, target, at, 40)));
  const g = enter(p.f, at, 4);
  const TX = -400, TW = 580, TY = -16, TH = 100;
  const fillW = Math.max(0, (TW * vv) / 100);
  const off = (p.f * 2) % 56;
  const cid = `pbc${Math.round(p.x ?? 540)}_${Math.round(p.y ?? 960)}_${Math.round(s * 100)}`;
  const stripes: string[] = [];
  for (let j = -2; j < 16; j++) {
    const x = TX + j * 56 + off;
    stripes.push(`M ${x} ${TY + TH} L ${x + 28} ${TY + TH} L ${x + 78} ${TY} L ${x + 50} ${TY} Z`);
  }

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-480} y={-180} w={960} h={360} u={u} />
      <Txt x={TX} y={-88} u={u} size={46} weight={800} anchor="start" maxW={880}>{p.label ?? "Onboarding complete"}</Txt>
      <rect x={TX} y={TY} width={TW} height={TH} rx={50} fill={u.soft} stroke={u.cardEdge} strokeWidth={5} />
      <defs>
        <clipPath id={cid}>
          <rect x={TX} y={TY} width={fillW} height={TH} rx={50} />
        </clipPath>
      </defs>
      <rect x={TX} y={TY} width={fillW} height={TH} rx={50} fill={u.accent} />
      <g clipPath={`url(#${cid})`} opacity={g}>
        {stripes.map((d, i) => <path key={i} d={d} fill="rgba(255,255,255,0.22)" />)}
      </g>
      <Txt x={210} y={TY + TH / 2 + 40} u={u} size={110} weight={900} anchor="start" maxW={230}>{fmt(Math.round(vv), 0, "", "%")}</Txt>
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Ranked horizontal bars: rank and label at the left, bars grow left to right, value at the end of each bar.
// Pass values sorted from largest to smallest for the ranked look.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const vals: number[] = Array.isArray(p.values) ? p.values.map((v: any) => Number(v) || 0) : [];
  const labels: string[] = Array.isArray(p.labels) ? p.labels.map((l: any) => String(l)) : [];
  const max = Math.max(1, ...vals);
  const dec = vals.some((v) => v % 1 !== 0) ? 1 : 0;
  const unit = p.unit ?? "";
  const rowH = 130;
  const H = 160 + vals.length * rowH;
  const Y0 = -H / 2;
  const BX = -140, BW = 440;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-480} y={Y0} w={960} h={H} u={u} />
      <Txt x={0} y={Y0 + 85} u={u} size={50} weight={900} maxW={860}>{p.title ?? "Favourite drinks"}</Txt>
      {vals.map((v, i) => {
        const t0 = at + 6 + i * 5;
        const g = enter(p.f, t0, 26);
        const cy = Y0 + 175 + i * rowH;
        const len = Math.max(0, BW * (v / max) * g);
        const shown = count(p.f, 0, v, t0, 26);
        return (
          <g key={i}>
            <Txt x={-440} y={cy + 13} u={u} size={36} weight={900} anchor="start" fill={u.muted}>{String(i + 1)}</Txt>
            <Txt x={-395} y={cy + 13} u={u} size={36} weight={800} anchor="start" maxW={230}>{labels[i] ?? ""}</Txt>
            <rect x={BX} y={cy - 26} width={BW} height={52} rx={26} fill={u.soft} />
            <rect x={BX} y={cy - 26} width={len} height={52} rx={26} fill={u.accent} stroke={u.cardEdge} strokeWidth={4} />
            <Txt x={BX + len + 18} y={cy + 13} u={u} size={38} weight={900} anchor="start" opacity={g}>{fmt(shown, dec, "", unit)}</Txt>
          </g>
        );
      })}
    </g>
  );
}

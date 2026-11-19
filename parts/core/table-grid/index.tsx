import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fmt, fitSize, Card, Txt } from "../stat-card/index";

// Table grid: a card with an accent header row and data rows that slide in one after another.
// columns = header names (string[]); rows = array of string arrays, one per row.

/* eslint-disable @typescript-eslint/no-explicit-any */
const topRound = (x: number, y: number, w: number, h: number, r: number) =>
  `M ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h} L ${x} ${y + h} Z`;

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const cols: string[] = Array.isArray(p.columns) ? p.columns.map((c: any) => String(c)) : [];
  const rows: string[][] = Array.isArray(p.rows) ? p.rows.map((r: any) => (Array.isArray(r) ? r.map((c: any) => String(c)) : [String(r)])) : [];
  const W = 900, HDR = 100, RH = 110;
  const H = HDR + rows.length * RH + 20;
  const top = -H / 2, left = -W / 2;
  const wts = cols.map((_, j) => (j === 0 ? 1.4 : 1));
  const wsum = wts.reduce((a, b) => a + b, 0) || 1;
  const xs: number[] = [];
  let cur = left;
  wts.forEach((w) => { xs.push(cur); cur += (W * w) / wsum; });
  const cwOf = (j: number) => (W * wts[j]) / wsum;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={left} y={top} w={W} h={H} u={u} />
      <path d={topRound(left, top, W, HDR, 28)} fill={u.accent} />
      {cols.map((c, j) => {
        const cw = cwOf(j);
        const x = j === 0 ? xs[j] + 28 : xs[j] + cw / 2;
        return (
          <Txt key={j} x={x} y={top + 62} u={u} size={fitSize(c, 40, cw - 36)} weight={900} anchor={j === 0 ? "start" : "middle"} fill={u.white} maxW={cw - 36}>{c}</Txt>
        );
      })}
      {rows.map((row, i) => {
        const e = enter(p.f, at + 10 + i * 8, 16);
        const y = top + HDR + i * RH;
        return (
          <g key={i} opacity={e} transform={`translate(${(1 - e) * 50} 0)`}>
            <rect x={left + 5} y={y} width={W - 10} height={RH} fill={i % 2 ? u.soft : u.card} />
            {row.slice(0, cols.length || row.length).map((cell, j) => {
              const cw = cwOf(j);
              const x = j === 0 ? xs[j] + 28 : xs[j] + cw / 2;
              return (
                <Txt key={j} x={x} y={y + 68} u={u} size={38} weight={j === 0 ? 800 : 700} anchor={j === 0 ? "start" : "middle"} maxW={cw - 36}>{cell}</Txt>
              );
            })}
          </g>
        );
      })}
      <rect x={left} y={top} width={W} height={H} rx={28} fill="none" stroke={u.cardEdge} strokeWidth={5} />
    </g>
  );
}

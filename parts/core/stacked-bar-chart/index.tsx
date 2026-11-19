import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Stacked bar chart: each column is a stack of 2-4 coloured segments that grow up one after another.
// values = one array per column (segment values bottom to top), labels = column names, legend = segment names.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const cols: number[][] = Array.isArray(p.values)
    ? p.values.map((c: any) => (Array.isArray(c) ? c : [c]).map((v: any) => Number(v) || 0))
    : [];
  const labels: string[] = Array.isArray(p.labels) ? p.labels.map((l: any) => String(l)) : [];
  const legend: string[] = Array.isArray(p.legend) ? p.legend.map((l: any) => String(l)) : [];
  const n = Math.max(1, cols.length);
  const totals = cols.map((c) => c.reduce((a, b) => a + b, 0));
  const max = Math.max(1, ...totals) * 1.12;
  const unit = p.unit ?? "";
  const PL = -400, PR = 400, PT = -300, PB = 220;
  const plotH = PB - PT;
  const slot = (PR - PL) / n;
  const bw = Math.min(170, slot * 0.6);

  // legend rows, wrapped to the card width
  const items: { x: number; y: number; i: number; name: string }[] = [];
  let lx = -420, ly = 330;
  legend.forEach((name, i) => {
    const w = 60 + name.length * 30 * 0.6 + 40;
    if (lx + w > 430) { lx = -420; ly += 50; }
    items.push({ x: lx, y: ly, i, name });
    lx += w;
  });

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-470} y={-520} w={940} h={1040} u={u} />
      <Txt x={0} y={-440} u={u} size={52} weight={900} maxW={840}>{p.title ?? "Traffic by source"}</Txt>
      {[0.25, 0.5, 0.75, 1].map((q) => (
        <line key={q} x1={PL} x2={PR} y1={PB - plotH * q} y2={PB - plotH * q} stroke={u.soft} strokeWidth={3} />
      ))}
      {cols.map((c, j) => {
        const t0 = at + 6 + j * 6;
        const g = enter(p.f, t0, 26);
        const cx = PL + slot * (j + 0.5);
        let acc = 0;
        const segs = c.map((v, i) => {
          const top = PB - ((acc + v) / max) * plotH * g;
          const h = (v / max) * plotH * g;
          acc += v;
          return <rect key={i} x={cx - bw / 2} y={top} width={bw} height={Math.max(0, h)} fill={u.series[i % 8]} stroke={u.cardEdge} strokeWidth={4} />;
        });
        const shown = count(p.f, 0, totals[j], t0, 26);
        return (
          <g key={j}>
            {segs}
            <Txt x={cx} y={PB - (totals[j] / max) * plotH * g - 16} u={u} size={40} weight={900} maxW={slot * 0.95} opacity={g}>{fmt(shown, 0, "", unit)}</Txt>
            <Txt x={cx} y={PB + 60} u={u} size={34} weight={700} fill={u.muted} maxW={slot * 0.95}>{labels[j] ?? ""}</Txt>
          </g>
        );
      })}
      <line x1={PL} x2={PR} y1={PB} y2={PB} stroke={u.cardEdge} strokeWidth={5} strokeLinecap="round" />
      {items.map((it) => {
        const e = enter(p.f, at + 30 + it.i * 3, 12);
        return (
          <g key={it.i} opacity={e}>
            <rect x={it.x} y={it.y - 24} width={26} height={26} rx={6} fill={u.series[it.i % 8]} stroke={u.cardEdge} strokeWidth={3} />
            <Txt x={it.x + 38} y={it.y} u={u} size={30} weight={700} anchor="start">{it.name}</Txt>
          </g>
        );
      })}
    </g>
  );
}

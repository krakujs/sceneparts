import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Vertical bar chart: bars grow up one after another, value above each bar, category below, light gridlines.
// values = numbers (one per bar), labels = category names. Colour defaults to the style accent.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const vals: number[] = Array.isArray(p.values) ? p.values.map((v: any) => Number(v) || 0) : [];
  const labels: string[] = Array.isArray(p.labels) ? p.labels.map((l: any) => String(l)) : [];
  const n = Math.max(1, vals.length);
  const max = Math.max(1, ...vals) * 1.12;
  const dec = vals.some((v) => v % 1 !== 0) ? 1 : 0;
  const unit = p.unit ?? "";
  const PL = -400, PR = 400, PT = -330, PB = 250;
  const plotH = PB - PT;
  const slot = (PR - PL) / n;
  const bw = Math.min(150, slot * 0.6);
  const stagger = 5, len = 26;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-470} y={-520} w={940} h={1040} u={u} />
      <Txt x={0} y={-440} u={u} size={52} weight={900} maxW={840}>{p.title ?? "Revenue by quarter"}</Txt>
      {[0.25, 0.5, 0.75, 1].map((q) => (
        <line key={q} x1={PL} x2={PR} y1={PB - plotH * q} y2={PB - plotH * q} stroke={u.soft} strokeWidth={3} />
      ))}
      {vals.map((v, i) => {
        const t0 = at + 6 + i * stagger;
        const g = enter(p.f, t0, len);
        const h = (v / max) * plotH * g;
        const cx = PL + slot * (i + 0.5);
        const shown = count(p.f, 0, v, t0, len);
        return (
          <g key={i}>
            <rect x={cx - bw / 2} y={PB - h} width={bw} height={Math.max(0, h)} rx={12} fill={u.accent} stroke={u.cardEdge} strokeWidth={4} />
            <Txt x={cx} y={PB - h - 16} u={u} size={40} weight={900} maxW={slot * 0.95} opacity={g}>{fmt(shown, dec, "", unit)}</Txt>
            <Txt x={cx} y={PB + 70} u={u} size={34} weight={700} fill={u.muted} maxW={slot * 0.95}>{labels[i] ?? ""}</Txt>
          </g>
        );
      })}
      <line x1={PL} x2={PR} y1={PB} y2={PB} stroke={u.cardEdge} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
}

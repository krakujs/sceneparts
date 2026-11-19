import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt, DrawPath } from "../stat-card/index";

// Line chart: axes and gridlines, the line draws itself left to right, dots pop in at each point,
// and the last value gets a label. values = numbers, labels = x-axis names.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const vals: number[] = Array.isArray(p.values) ? p.values.map((v: any) => Number(v) || 0) : [];
  const labels: string[] = Array.isArray(p.labels) ? p.labels.map((l: any) => String(l)) : [];
  const n = Math.max(1, vals.length);
  const unit = p.unit ?? "";
  const dec = vals.some((v) => v % 1 !== 0) ? 1 : 0;
  const lo0 = Math.min(0, ...vals), hi0 = Math.max(1, ...vals);
  const span = hi0 - lo0 || 1;
  const lo = Math.max(0, lo0 - span * 0.25), hi = hi0 + span * 0.2;
  const PL = -360, PR = 340, PT = -300, PB = 250;
  const plotH = PB - PT;
  const X = (i: number) => PL + (PR - PL) * (i / Math.max(1, n - 1));
  const Y = (v: number) => PB - ((v - lo) / (hi - lo)) * plotH;
  const pts = vals.map((v, i) => [X(i), Y(v)]);
  const d = pts.map((q, i) => `${i ? "L" : "M"} ${q[0]} ${q[1]}`).join(" ");
  const g = enter(p.f, at, 36);
  const last = vals.length - 1;
  const lastShown = count(p.f, 0, vals[last] ?? 0, at + 30, 10);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-470} y={-520} w={940} h={1040} u={u} />
      <Txt x={0} y={-440} u={u} size={52} weight={900} maxW={840}>{p.title ?? "Signups per month"}</Txt>
      {[0.25, 0.5, 0.75, 1].map((q) => (
        <line key={q} x1={PL} x2={PR} y1={PB - plotH * q} y2={PB - plotH * q} stroke={u.soft} strokeWidth={3} />
      ))}
      <DrawPath d={d} fill="none" stroke={u.accent} strokeWidth={12} strokeLinejoin="round" strokeLinecap="butt" k={g} />
      {pts.map((q, i) => {
        const tP = at + 36 * (i / Math.max(1, n - 1));
        return (
          <g key={i} transform={`translate(${q[0]} ${q[1]}) scale(${popIn(p.f, tP, 8)})`}>
            <circle r={16} fill={u.accent} stroke={u.cardEdge} strokeWidth={5} />
          </g>
        );
      })}
      {labels.map((l, i) => (
        <Txt key={i} x={X(i)} y={PB + 62} u={u} size={34} weight={700} fill={u.muted} maxW={130}>{l}</Txt>
      ))}
      {vals.length ? (
        <g opacity={enter(p.f, at + 36, 10)}>
          <rect x={pts[last][0] - 95} y={pts[last][1] - 96} width={190} height={66} rx={33} fill={u.ink} stroke={u.cardEdge} strokeWidth={4} />
          <Txt x={pts[last][0]} y={pts[last][1] - 50} u={u} size={40} weight={900} fill={u.white}>{fmt(lastShown, dec, "", unit)}</Txt>
        </g>
      ) : null}
      <line x1={PL - 20} x2={PL - 20} y1={PT} y2={PB} stroke={u.cardEdge} strokeWidth={5} />
      <line x1={PL - 20} x2={PR} y1={PB} y2={PB} stroke={u.cardEdge} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
}

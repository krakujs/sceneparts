import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Donut chart: ring segments sweep in clockwise, a big total sits in the hole.
// values = numbers, labels = segment names, total = optional centre number (defaults to the sum).

/* eslint-disable @typescript-eslint/no-explicit-any */
const R = 240, SW = 110, cx = 0, cy = -90;
const pt = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
};
const arc = (a: number, b: number) => {
  const [x1, y1] = pt(a);
  const [x2, y2] = pt(b);
  const large = b - a > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`;
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const vals: number[] = Array.isArray(p.values) ? p.values.map((v: any) => Math.max(0, Number(v) || 0)) : [];
  const labels: string[] = Array.isArray(p.labels) ? p.labels.map((l: any) => String(l)) : [];
  const sum = vals.reduce((a, b) => a + b, 0) || 1;
  const target = p.total != null && p.total !== "" ? Number(p.total) : sum;
  const unit = p.unit ?? "";
  const limit = -90 + enter(p.f, at, 44) * 360;

  let acc = -90;
  const segs = vals.map((v, i) => {
    const a = acc;
    const b = acc + (v / sum) * 360;
    acc = b;
    return { a, b: Math.min(b, a + 359.9), i, end: Math.min(b, limit), frac: v / sum };
  }).filter((sg) => sg.end - sg.a > 0.5);

  const shown = count(p.f, 0, target, at, 44);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-470} y={-520} w={940} h={1040} u={u} />
      <Txt x={0} y={-440} u={u} size={52} weight={900} maxW={840}>{p.title ?? "Traffic sources"}</Txt>
      {segs.map((sg) => (
        <path key={`o${sg.i}`} d={arc(sg.a, Math.min(sg.end, sg.a + 359.9))} fill="none" stroke={u.cardEdge} strokeWidth={SW + 12} />
      ))}
      {segs.map((sg) => (
        <path key={`c${sg.i}`} d={arc(sg.a, Math.min(sg.end, sg.a + 359.9))} fill="none" stroke={u.series[sg.i % 8]} strokeWidth={SW} />
      ))}
      <Txt x={cx} y={cy + 30} u={u} size={110} weight={900} maxW={300}>{fmt(shown, 0, "", unit)}</Txt>
      <Txt x={cx} y={cy + 86} u={u} size={36} weight={700} fill={u.muted} maxW={300}>{p.centerLabel ?? "visits"}</Txt>
      {labels.map((l, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const lx = -400 + col * 440, ly = 260 + row * 70;
        const pct = Math.round(((vals[i] ?? 0) / sum) * 100);
        return (
          <g key={i} opacity={enter(p.f, at + 36 + i * 3, 12)}>
            <rect x={lx} y={ly - 26} width={30} height={30} rx={7} fill={u.series[i % 8]} stroke={u.cardEdge} strokeWidth={4} />
            <Txt x={lx + 46} y={ly} u={u} size={36} weight={700} anchor="start" maxW={330}>{`${l}  ${pct}%`}</Txt>
          </g>
        );
      })}
    </g>
  );
}

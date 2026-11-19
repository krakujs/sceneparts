import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Pie chart: slices sweep in clockwise from the top, percentage on each slice, legend below.
// values = numbers (any scale; shares are computed), labels = slice names.

/* eslint-disable @typescript-eslint/no-explicit-any */
const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
const slice = (cx: number, cy: number, r: number, a: number, b: number) => {
  const [x1, y1] = pt(cx, cy, r, a);
  const [x2, y2] = pt(cx, cy, r, b);
  const large = b - a > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const vals: number[] = Array.isArray(p.values) ? p.values.map((v: any) => Math.max(0, Number(v) || 0)) : [];
  const labels: string[] = Array.isArray(p.labels) ? p.labels.map((l: any) => String(l)) : [];
  const total = vals.reduce((a, b) => a + b, 0) || 1;
  const cx = 0, cy = -100, r = 250;
  const G = enter(p.f, at, 44) * 360;
  const limit = -90 + G;

  let acc = -90;
  const segs = vals.map((v, i) => {
    const frac = v / total;
    const a = acc;
    const b = acc + frac * 360;
    acc = b;
    return { a, b, i, frac };
  });

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-470} y={-520} w={940} h={1040} u={u} />
      <Txt x={0} y={-440} u={u} size={52} weight={900} maxW={840}>{p.title ?? "Visits by device"}</Txt>
      {segs.map((sg) => {
        const e = Math.min(sg.b, limit);
        const mid = (sg.a + sg.b) / 2;
        const [lx, ly] = pt(cx, cy, r * 0.62, mid);
        return (
          <g key={sg.i}>
            {e - sg.a > 0.5 ? (
              <path d={slice(cx, cy, r, sg.a, Math.min(e, sg.a + 359.9))} fill={u.series[sg.i % 8]} stroke={u.cardEdge} strokeWidth={5} strokeLinejoin="round" />
            ) : null}
            <Txt x={lx} y={ly + 14} u={u} size={44} weight={900} fill={u.white} stroke={u.cardEdge} sw={7} opacity={enter(p.f, at + 28 + sg.i * 3, 10)}>
              {`${Math.round(sg.frac * 100)}%`}
            </Txt>
          </g>
        );
      })}
      {labels.map((l, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const lx = -400 + col * 440, ly = 240 + row * 70;
        return (
          <g key={i} opacity={enter(p.f, at + 40 + i * 3, 12)}>
            <rect x={lx} y={ly - 26} width={30} height={30} rx={7} fill={u.series[i % 8]} stroke={u.cardEdge} strokeWidth={4} />
            <Txt x={lx + 46} y={ly} u={u} size={36} weight={700} anchor="start" maxW={360}>{l}</Txt>
          </g>
        );
      })}
    </g>
  );
}

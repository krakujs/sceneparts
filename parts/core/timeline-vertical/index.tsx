import React from "react";
import { type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, enter, Card, Txt, DrawPath } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Vertical timeline: a line draws top to bottom, each row has a dot, a date on the left and an event card on the right.
const wrap = (t: string, size: number, maxW: number) => {
  const per = Math.max(4, Math.floor(maxW / (size * 0.56)));
  const out: string[] = [];
  let cur = "";
  for (const w of String(t ?? "").split(/\s+/).filter(Boolean)) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > per && cur) { out.push(cur); cur = w; } else cur = next;
  }
  if (cur) out.push(cur);
  return out.length ? out : [""];
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const dates: string[] = (p.dates ?? []).slice(0, 6);
  const evs: string[] = (p.events ?? []).slice(0, 6);
  const n = Math.max(1, Math.min(6, Math.max(dates.length, evs.length)));
  const RH = 190, H = n * RH, top = -H / 2;
  const ox = -60; // shifts the date + card group so the whole row reads as centred
  const lineE = enter(p.f, f0, n * 5 + 6);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <g transform={`translate(${ox} 0)`}>
        <DrawPath d={`M0 ${top} L0 ${-top}`} fill="none" stroke={u.ink} strokeWidth={8} strokeLinecap="round"
          k={lineE} />
        {Array.from({ length: n }, (_, i) => {
          const cy = top + RH * (i + 0.5);
          const at = f0 + i * 6 + 4;
          const e = enter(p.f, at, 10);
          const lines = wrap(evs[i] ?? "", 40, 380);
          const L = lines.length;
          return (
            <g key={i}>
              <g transform={`translate(0 ${cy}) scale(${popIn(p.f, at, 10)})`}>
                <circle r={22} fill={u.series[i % u.series.length]} stroke={u.ink} strokeWidth={5} />
              </g>
              <Txt x={-44} y={cy + 15} u={u} size={44} weight={900} anchor="end" maxW={320} opacity={e}>{dates[i] ?? ""}</Txt>
              <g opacity={e} transform={`translate(${(1 - e) * 60} 0)`}>
                <Card x={40} y={cy - 70} w={440} h={140} u={u} r={24} />
                {lines.map((l, j) => (
                  <Txt key={j} x={70} y={cy + (j - (L - 1) / 2) * 48 + 14} u={u} size={40} weight={700} anchor="start" maxW={380}>{l}</Txt>
                ))}
              </g>
            </g>
          );
        })}
      </g>
    </g>
  );
}

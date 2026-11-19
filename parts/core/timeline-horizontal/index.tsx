import React from "react";
import { type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, enter, Card, Txt, DrawPath } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Horizontal timeline: the line draws left to right, dots pop along it with year labels above and captions below.
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
  const years: string[] = (p.years ?? []).slice(0, 5);
  const caps: string[] = (p.captions ?? []).slice(0, 5);
  const n = Math.max(2, Math.min(5, years.length || 2));
  const W = 940, H = 380;
  const x0 = -340, x1 = 340;
  const LINE = 30;
  const xs = (i: number) => x0 + ((x1 - x0) * i) / (n - 1);
  const lineE = enter(p.f, f0, LINE);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <Card x={-W / 2} y={-H / 2} w={W} h={H} u={u} />
      <DrawPath d={`M${x0} 0 L${x1} 0`} fill="none" stroke={u.ink} strokeWidth={10} strokeLinecap="round"
        k={lineE} />
      {Array.from({ length: n }, (_, i) => {
        const at = f0 + (LINE * i) / (n - 1);
        const e = enter(p.f, at, 8);
        const lines = wrap(caps[i] ?? "", 38, 165);
        return (
          <g key={i}>
            <g transform={`translate(${xs(i)} 0) scale(${popIn(p.f, at, 10)})`}>
              <circle r={22} fill={u.series[i % u.series.length]} stroke={u.ink} strokeWidth={5} />
            </g>
            <Txt x={xs(i)} y={-70} u={u} size={60} weight={900} maxW={190} opacity={e}>{years[i] ?? ""}</Txt>
            {lines.map((l, j) => (
              <Txt key={j} x={xs(i)} y={112 + j * 46} u={u} size={38} weight={600} fill={u.muted} maxW={170} opacity={e}>{l}</Txt>
            ))}
          </g>
        );
      })}
    </g>
  );
}

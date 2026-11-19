import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Poll bars: 2-4 answer options as horizontal pill bars filling to their percentage.
// The winner (highest value) is filled in the accent colour and gets a check; the others are muted.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const opts: string[] = Array.isArray(p.options) ? p.options.map((o: any) => String(o)) : [];
  const vals: number[] = Array.isArray(p.values) ? p.values.map((v: any) => Number(v) || 0) : [];
  const n = Math.max(1, Math.min(4, opts.length || vals.length));
  let win = 0;
  for (let i = 1; i < n; i++) if ((vals[i] ?? 0) > (vals[win] ?? 0)) win = i;
  const H = 200 + n * 170;
  const Y0 = -H / 2;
  const TX = -400, TW = 800;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-470} y={Y0} w={940} h={H} u={u} />
      <Txt x={0} y={Y0 + 88} u={u} size={52} weight={900} maxW={840}>{p.question ?? "Which feature should we build next?"}</Txt>
      {Array.from({ length: n }).map((_, i) => {
        const v = Math.max(0, Math.min(100, vals[i] ?? 0));
        const t0 = at + 6 + i * 6;
        const g = enter(p.f, t0, 30);
        const shown = count(p.f, 0, v, t0, 30);
        const y0 = Y0 + 170 + i * 170;
        const isWin = i === win;
        const fillW = Math.max(0, (TW * v) / 100 * g);
        return (
          <g key={i}>
            <Txt x={TX} y={y0} u={u} size={42} weight={800} anchor="start" maxW={600}>{opts[i] ?? `Option ${i + 1}`}</Txt>
            <Txt x={TX + TW} y={y0} u={u} size={44} weight={900} anchor="end" fill={isWin ? u.accent : u.ink}>{fmt(shown, 0, "", "%")}</Txt>
            <rect x={TX} y={y0 + 24} width={TW} height={96} rx={48} fill={u.soft} stroke={u.cardEdge} strokeWidth={5} />
            <rect x={TX} y={y0 + 24} width={fillW} height={96} rx={48} fill={isWin ? u.accent : u.muted} />
            {isWin && fillW > 140 ? (
              <g opacity={enter(p.f, t0 + 26, 10)} transform={`translate(${TX + fillW - 62} ${y0 + 72})`}>
                <circle r={30} fill={u.white} stroke={u.cardEdge} strokeWidth={4} />
                <path d="M -13 1 L -4 10 L 13 -10" fill="none" stroke={u.cardEdge} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

import React from "react";
import { ui, startFrame, enter, popIn, fitSize, Txt, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Search pill: magnifier, query typed letter by letter from frame ~6 with a blinking caret, then optional
// suggestion rows that fade in under it once typing has finished.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 860, H = 124, R = H / 2, TX = -W / 2 + 120, SIZE = 56;
  const k = popIn(p.f, at, 12);
  const q = String(p.query ?? "");
  const len = p.len ?? 24;
  const typeStart = at + 6;
  const typed = q.length ? Math.floor(q.length * Math.min(1, Math.max(0, (p.f - typeStart) / len))) : 0;
  const shown = q.slice(0, typed);
  const typing = p.f >= typeStart && typed < q.length;
  const done = q.length === 0 || typed >= q.length;
  const showPh = typed === 0 && p.f < typeStart;
  const sz = fitSize(q || "x", SIZE, W - 240); // fixed from the full query so the text never jumps
  const caretX = TX + shown.length * sz * 0.56;
  const blink = Math.floor(p.f / 15) % 2 === 0 || typing;
  const sugg: string[] = (Array.isArray(p.suggestions) ? (p.suggestions as unknown[]) : []).slice(0, 3).map((v) => String(v));
  const rowH = 96, panelTop = H / 2 + 26, panelH = sugg.length * rowH + (sugg.length ? 28 : 0);
  const sugIn = enter(p.f, typeStart + len, 10);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 800}) scale(${s * k})`}>
      <rect x={-W / 2 + 8} y={-H / 2 + 14} width={W} height={H} rx={R} fill="rgba(0,0,0,0.18)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={R} fill={u.white} stroke={u.ink} strokeWidth={6} />
      <g transform={`translate(${-W / 2 + 64} 0)`}>
        <circle cx={0} cy={-6} r={24} fill="none" stroke={p.color ?? u.accent} strokeWidth={9} />
        <line x1={17} y1={12} x2={34} y2={29} stroke={p.color ?? u.accent} strokeWidth={10} strokeLinecap="round" />
      </g>
      {showPh ? (
        <Txt x={TX} y={14} u={u} size={SIZE} weight={600} anchor="start" fill={u.muted}>{String(p.placeholder ?? "Search")}</Txt>
      ) : (
        <Txt x={TX} y={14} u={u} size={sz} weight={700} anchor="start">{shown}</Txt>
      )}
      {(blink && (typing || done) && !showPh) ? (
        <rect x={showPh ? TX : caretX + 4} y={-30} width={6} height={60} rx={3} fill={p.color ?? u.accent} />
      ) : null}
      {sugg.length ? (
        <g opacity={sugIn} transform={`translate(0 ${(1 - sugIn) * -14})`}>
          <rect x={-W / 2 + 20} y={panelTop} width={W - 40} height={panelH} rx={36} fill={u.white} stroke={u.ink} strokeWidth={5} />
          {sugg.map((t, i) => (
            <g key={i}>
              <Txt x={-W / 2 + 70} y={panelTop + 14 + i * rowH + rowH / 2 + 14} u={u} size={fitSize(t, 40, W - 170)} weight={600} anchor="start" fill={u.ink} maxW={W - 170}>{t}</Txt>
            </g>
          ))}
        </g>
      ) : null}
    </g>
  );
}

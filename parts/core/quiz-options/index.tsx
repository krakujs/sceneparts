import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Card, Txt, DrawPath } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Quiz: question card and 2-4 answer pills (A-D). After `reveal` frames the answer turns green with a check and the others dim.
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
  const opts: string[] = (p.options ?? []).slice(0, 4);
  const n = Math.max(2, Math.min(4, opts.length || 2));
  const ans = Math.max(0, Math.min(n - 1, Math.round(Number(p.answer ?? 0))));
  const revealAt = f0 + Number(p.reveal ?? 30);
  const W = 880, PH = 124, GAP = 22;
  const qLines = wrap(String(p.question ?? ""), 54, W - 80);
  const qH = Math.max(200, 80 + qLines.length * 66);
  const total = n * PH + (n - 1) * GAP;
  const H = qH + 40 + total;
  const top = -H / 2;
  const rv = enter(p.f, revealAt, 10);
  const pulse = Math.sin(Math.PI * clamp((p.f - revealAt) / 14));
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <Card x={-W / 2} y={top} w={W} h={qH} u={u} />
      {qLines.map((l, j) => (
        <Txt key={j} x={0} y={top + qH / 2 + (j - (qLines.length - 1) / 2) * 62 + 19} u={u} size={54} weight={900} maxW={W - 80}>{l}</Txt>
      ))}
      {opts.slice(0, n).map((t, i) => {
        const py = top + qH + 40 + i * (PH + GAP);
        const cy = py + PH / 2;
        const e = enter(p.f, f0 + 6 + i * 5, 10);
        const correct = i === ans;
        const dim = correct ? 1 : 1 - 0.65 * rv;
        const sc = correct ? 1 + 0.05 * pulse : 1;
        const chk = enter(p.f, revealAt + 8, 10);
        return (
          <g key={i} opacity={e * dim} transform={`translate(0 ${(1 - e) * 30})`}>
            <g transform={`translate(0 ${cy}) scale(${sc}) translate(0 ${-cy})`}>
              <rect x={-W / 2} y={py} width={W} height={PH} rx={62} fill={u.card} stroke={u.ink} strokeWidth={5} />
              {correct ? <rect x={-W / 2} y={py} width={W} height={PH} rx={62} fill={u.good} opacity={rv} stroke={u.ink} strokeWidth={5} /> : null}
              <circle cx={-W / 2 + 62} cy={cy} r={38} fill={u.accent} stroke={u.ink} strokeWidth={4} />
              <Txt x={-W / 2 + 62} y={cy + 16} u={u} size={46} weight={900} fill={u.white}>{String.fromCharCode(65 + i)}</Txt>
              <Txt x={-W / 2 + 130} y={cy + 15} u={u} size={46} weight={700} anchor="start" maxW={W - 280} opacity={correct ? 1 - rv : 1}>{t}</Txt>
              {correct ? (
                <g>
                  <Txt x={-W / 2 + 130} y={cy + 15} u={u} size={46} weight={700} anchor="start" maxW={W - 280} fill={u.white} opacity={rv}>{t}</Txt>
                  <circle cx={W / 2 - 62} cy={cy} r={30} fill={u.white} opacity={rv} />
                  <DrawPath transform={`translate(${W / 2 - 62} ${cy})`} d="M-13 1 L-4 11 L13 -10" fill="none" stroke={u.good}
                    strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" k={chk} />
                </g>
              ) : null}
            </g>
          </g>
        );
      })}
    </g>
  );
}

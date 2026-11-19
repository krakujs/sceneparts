import React from "react";
import { type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, fitSize, Card, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Step process: 3-5 rounded step boxes joined by arrows; each box pops in order with its number and label.
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
  const steps: string[] = (p.steps ?? []).slice(0, 5);
  const n = Math.max(1, steps.length);
  const W = 960, GAP = 64, BH = 230;
  const bw = (W - (n - 1) * GAP) / n;
  const left = -W / 2;
  const labelSize = n >= 5 ? 36 : 42;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {steps.map((label, i) => {
        const bx = left + i * (bw + GAP);
        const cx = bx + bw / 2;
        const at = f0 + i * 7;
        const lines = wrap(label, labelSize, bw - 24);
        const L = lines.length;
        return (
          <g key={i}>
            <g transform={`translate(${cx} 0) scale(${popIn(p.f, at, 10)})`}>
              <Card x={-bw / 2} y={-BH / 2} w={bw} h={BH} u={u} r={26} />
              <circle cx={0} cy={-50} r={40} fill={u.series[i % u.series.length]} stroke={u.ink} strokeWidth={5} />
              <Txt x={0} y={-50 + 16} u={u} size={44} weight={900} fill={u.white}>{String(i + 1)}</Txt>
              {lines.map((l, j) => (
                <Txt key={j} x={0} y={50 + (j - (L - 1) / 2) * labelSize * 1.15 + labelSize * 0.35} u={u} size={fitSize(l, labelSize, bw - 24)} weight={800}>{l}</Txt>
              ))}
            </g>
            {i < n - 1 ? (
              <g transform={`translate(${bx + bw + GAP / 2} 0) scale(${popIn(p.f, at + 6, 8)})`}>
                <path d="M-18 -24 L18 0 L-18 24 Z" fill={u.accent} stroke={u.ink} strokeWidth={4} strokeLinejoin="round" />
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

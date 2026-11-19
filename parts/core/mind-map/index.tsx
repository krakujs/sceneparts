import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, enter, Txt, DrawPath } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Mind map: a central bubble with 3-6 branch bubbles; curved lines grow out from the centre and the bubbles pop at their ends.
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
  const branches: string[] = (p.branches ?? []).slice(0, 6);
  const n = clamp(branches.length, 3, 6);
  const RX = 330, RY = 430, BW = 270, BH = 110, CW = 300, CH = 150;
  const pos = (i: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [RX * Math.cos(a), RY * Math.sin(a)];
  };
  const centreLines = wrap(String(p.center ?? "Main idea"), 52, CW - 60);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {Array.from({ length: n }, (_, i) => {
        const [bx, by] = pos(i);
        const cx = bx * 0.5 - by * 0.12;
        const cy = by * 0.5 + bx * 0.12;
        const dr = enter(p.f, f0 + 4 + i * 5, 14);
        return (
          <DrawPath key={`l${i}`} d={`M0 0 Q${cx} ${cy} ${bx} ${by}`} fill="none" stroke={u.ink} strokeWidth={9}
            strokeLinecap="round" k={dr} />
        );
      })}
      {Array.from({ length: n }, (_, i) => {
        const [bx, by] = pos(i);
        const lines = wrap(branches[i] ?? "", 38, BW - 40);
        const L = lines.length;
        const at = f0 + 14 + i * 5;
        return (
          <g key={`b${i}`} transform={`translate(${bx} ${by}) scale(${popIn(p.f, at, 10)})`}>
            <rect x={-BW / 2} y={-BH / 2} width={BW} height={BH} rx={40} fill={u.card} stroke={u.series[(i + 1) % u.series.length]} strokeWidth={8} />
            {lines.map((l, j) => (
              <Txt key={j} x={0} y={(j - (L - 1) / 2) * 44 + 14} u={u} size={38} weight={800} maxW={BW - 40}>{l}</Txt>
            ))}
          </g>
        );
      })}
      <g transform={`scale(${popIn(p.f, f0, 10)})`}>
        <rect x={-CW / 2} y={-CH / 2} width={CW} height={CH} rx={75} fill={u.accent} stroke={u.ink} strokeWidth={6} />
        {centreLines.map((l, j) => (
          <Txt key={j} x={0} y={(j - (centreLines.length - 1) / 2) * 56 + 18} u={u} size={52} weight={900} fill={u.white} maxW={CW - 60}>{l}</Txt>
        ))}
      </g>
    </g>
  );
}

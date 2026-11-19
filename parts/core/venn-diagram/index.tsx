import React from "react";
import { type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, enter, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Venn diagram: 2 or 3 translucent overlapping circles with set labels and an overlap label in the middle.
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
  const three = String(p.sets ?? "3") !== "2";
  const R = 230;
  const centres = three ? [[-130, -70], [130, -70], [0, 110]] : [[-130, 0], [130, 0]];
  const labelAt = three ? [[-220, -120], [220, -120], [0, 250]] : [[-230, 0], [230, 0]];
  const overlapAt = three ? [0, -10] : [0, 0];
  const labels: string[] = p.labels ?? ["Design", "Code", "Business"];
  const overlap = String(p.overlap ?? "Sweet spot");
  const count = three ? 3 : 2;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {centres.slice(0, count).map(([cx, cy], i) => {
        const at = f0 + i * 8;
        return (
          <g key={i} transform={`translate(${cx} ${cy}) scale(${popIn(p.f, at, 12)})`}>
            <circle r={R} fill={u.series[i % u.series.length]} fillOpacity={0.5} stroke={u.ink} strokeWidth={5} />
          </g>
        );
      })}
      {labelAt.slice(0, count).map(([lx, ly], i) => {
        const lines = wrap(labels[i] ?? "", 46, 200);
        const L = lines.length;
        const e = enter(p.f, f0 + 22 + i * 3, 10);
        return lines.map((l, j) => (
          <Txt key={`${i}-${j}`} x={lx} y={ly + (j - (L - 1) / 2) * 50 + 16} u={u} size={46} weight={900} maxW={200} opacity={e}>{l}</Txt>
        ));
      })}
      {(() => {
        const lines = wrap(overlap, 40, 180);
        const L = lines.length;
        const e = enter(p.f, f0 + 26, 10);
        return lines.map((l, j) => (
          <Txt key={`o${j}`} x={overlapAt[0]} y={overlapAt[1] + (j - (L - 1) / 2) * 46 + 14} u={u} size={40} weight={900} maxW={180} opacity={e}>{l}</Txt>
        ));
      })()}
    </g>
  );
}

import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Funnel: 3-5 narrowing layers from top to bottom, each with a label and a value (e.g. Visitors 10,000 -> Buyers 300).
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const labels: string[] = (p.labels ?? []).slice(0, 5);
  const values: string[] = (p.values ?? []).slice(0, 5);
  const n = clamp(Math.min(labels.length, values.length || labels.length), 3, 5);
  const LH = 170, GAP = 12;
  const Htot = n * LH + (n - 1) * GAP;
  const top = -Htot / 2;
  const WT = 880, WMIN = 300;
  const wAt = (i: number) => WT - (i * (WT - WMIN)) / n;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {Array.from({ length: n }, (_, i) => {
        const yt = top + i * (LH + GAP);
        const wt = wAt(i), wb = wAt(i + 1);
        const at = f0 + i * 8;
        const grow = enter(p.f, at, 12);
        const txt = enter(p.f, at + 6, 10);
        const maxW = (wt + wb) / 2 - 50;
        return (
          <g key={i} transform={`translate(0 ${yt}) scale(1 ${Math.max(0.001, grow)})`}>
            <polygon points={`${-wt / 2},0 ${wt / 2},0 ${wb / 2},${LH} ${-wb / 2},${LH}`}
              fill={u.series[i % u.series.length]} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
            <g opacity={txt}>
              <Txt x={0} y={LH / 2 - 4} u={u} size={46} weight={900} fill={u.white} stroke={u.ink} sw={7} maxW={maxW}>{labels[i] ?? ""}</Txt>
              <Txt x={0} y={LH / 2 + 46} u={u} size={42} weight={800} fill={u.white} stroke={u.ink} sw={6} maxW={maxW}>{values[i] ?? ""}</Txt>
            </g>
          </g>
        );
      })}
    </g>
  );
}

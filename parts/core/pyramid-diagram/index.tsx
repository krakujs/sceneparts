import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Pyramid: 3-5 stacked trapezoid layers, narrow at the top. The first label is the bottom (widest) layer;
// layers build from the bottom up, each in its series colour.
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const levels: string[] = (p.levels ?? []).slice(0, 5);
  const n = clamp(levels.length, 3, 5);
  const LH = 168, GAP = 14;
  const Htot = n * LH + (n - 1) * GAP;
  const top = -Htot / 2;
  const WT = 240, WB = 900;
  const wAt = (y: number) => WT + ((WB - WT) * (y - top)) / Htot;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {Array.from({ length: n }, (_, i) => {
        // i = 0 is the bottom layer; it is drawn at row (n - 1 - i) from the top
        const yt = top + (n - 1 - i) * (LH + GAP);
        const yb = yt + LH;
        const wt = wAt(yt), wb = wAt(yb);
        const at = f0 + i * 10;
        const e = enter(p.f, at, 12);
        const label = levels[i] ?? "";
        const mid = (yt + yb) / 2;
        return (
          <g key={i} opacity={e} transform={`translate(0 ${(1 - e) * 60})`}>
            <polygon points={`${-wt / 2},${yt} ${wt / 2},${yt} ${wb / 2},${yb} ${-wb / 2},${yb}`}
              fill={u.series[i % u.series.length]} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
            <Txt x={0} y={mid + 17} u={u} size={50} weight={900} fill={u.white} stroke={u.ink} sw={7} maxW={(wt + wb) / 2 - 40}>{label}</Txt>
          </g>
        );
      })}
    </g>
  );
}

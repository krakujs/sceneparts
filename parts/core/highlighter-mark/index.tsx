import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter } from "../stat-card/index";

// Highlighter band of w x h that wipes in left to right with ragged ends. Translucent (about 0.45), default colour u.warn.
// x,y = centre of the band.
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const col = p.color || base.warn;
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const w = p.w ?? 520, h = p.h ?? 60;
  const left = -w / 2, top = -h / 2;
  const prog = enter(p.f, at, 20);
  const xr = left + w * prog;
  const N = 24;
  const top_: V[] = [], bot: V[] = [];
  for (let i = 0; i <= N; i++) {
    const x = left + ((xr - left) * i) / N;
    const ragged = i === N ? (random("hr") - 0.5) * 22 : 0;
    top_.push([x + ragged, top + (random(`ht${i}`) - 0.5) * 6]);
    bot.unshift([x + ragged * 0.6, top + h + (random(`hb${i}`) - 0.5) * 6]);
  }
  const d = `M${[...top_, ...bot].map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")} Z`;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      <path d={d} fill={col} opacity={0.45} />
    </g>
  );
}

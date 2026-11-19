import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, fitSize, Txt } from "../stat-card/index";

// Hashtag tag: a pill chip "#word" that pops in with a short wobble.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const word = String(p.word ?? "trending").replace(/^#+/, "").replace(/\s+/g, "");
  const label = "#" + word;
  const fs = fitSize(label, 60, 860, 0.62);
  const W = Math.max(260, label.length * fs * 0.62 + 100), H = 120;
  const t = clamp((p.f - at) / 20);
  const wob = Math.sin(t * Math.PI * 3) * 10 * (1 - t);
  const sc = popIn(p.f, at, 12);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1400}) scale(${(p.s ?? 1) * sc}) rotate(${wob})`}>
      <rect x={-W / 2 + 8} y={-H / 2 + 12} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.18)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.accent} stroke={u.ink} strokeWidth={6} />
      <Txt x={0} y={fs * 0.36} u={u} size={fs} weight={900} fill={u.white} ls={1}>{label}</Txt>
    </g>
  );
}

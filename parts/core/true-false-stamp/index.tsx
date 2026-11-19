import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize, Txt } from "../stat-card/index";

// True false stamp: a big rotated TRUE (green) or FALSE (red) stamp that slams down onto the frame.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const verdict = String(p.verdict ?? "TRUE").toUpperCase() === "FALSE" ? "FALSE" : "TRUE";
  const c = p.color ?? (verdict === "TRUE" ? u.good : u.bad);
  const W = 780, H = 300;
  const fs = fitSize(verdict, 230, W - 100, 0.68);
  const k = Math.min(1, Math.max(0, (p.f - at) / 8));
  const e = 1 - (1 - k) * (1 - k) * (1 - k);
  const sc = 2.2 - 1.2 * e;
  const op = Math.min(1, Math.max(0, (p.f - at) / 3));
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * sc}) rotate(-10)`} opacity={op}>
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={36} fill={c} fillOpacity={0.12} stroke={c} strokeWidth={20} />
      <rect x={-W / 2 + 34} y={-H / 2 + 34} width={W - 68} height={H - 68} rx={20} fill="none" stroke={c} strokeWidth={6} opacity={0.6} />
      <Txt x={0} y={fs * 0.36} u={u} size={fs} weight={900} fill={c} ls={4}>{verdict}</Txt>
    </g>
  );
}

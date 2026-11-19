import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, fitSize, Txt } from "../stat-card/index";

// Subtitle bar: a dark translucent rounded bar at the bottom with one or two caption lines that slide up and fade in.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const lines = [p.line1, p.line2].map((t) => String(t ?? "").trim()).filter(Boolean);
  const W = p.w ?? 920;
  const e = enter(p.f, at, 14);
  const size = Math.min(54, ...lines.map((l) => fitSize(l, 54, W - 80)));
  const H = lines.length > 1 ? 210 : 130;
  const lh = 68;
  return (
    <g transform={`translate(${p.x ?? 540} ${(p.y ?? 1500) + (1 - e) * 36}) scale(${p.s ?? 1})`} opacity={e}>
      <rect x={-W / 2 + 6} y={-H / 2 + 10} width={W} height={H} rx={34} fill="rgba(0,0,0,0.22)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={34} fill="rgba(10,10,14,0.72)" />
      <rect x={-W / 2 + 34} y={-H / 2} width={W - 68} height={6} rx={3} fill={u.accent} />
      {lines.map((l, i) => (
        <Txt key={i} x={0} y={(i - (lines.length - 1) / 2) * lh + size * 0.36} u={u} size={size} weight={800} fill={u.white}>{l}</Txt>
      ))}
    </g>
  );
}

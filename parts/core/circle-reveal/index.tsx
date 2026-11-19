import React from "react";
import { clamp, ease, lerp, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Circle reveal: the frame is covered in colour with a circular hole at (x, y).
// mode "out": the hole grows until the frame is clear. mode "in": the hole shrinks until the frame is covered.
// Drawn as one evenodd path (frame minus circle), with a thin accent ring on the hole's edge.

export const holePath = (cx: number, cy: number, r: number) =>
  `M-40 -40 H1120 V1960 H-40 Z M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const c = String(p.color || base.ink);
  const cx = Number(p.x ?? 540), cy = Number(p.y ?? 960);
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(4, Number(p.len ?? 24));
  const prog = ease(clamp(lf / len));
  const R = Math.max(...[[-40, -40], [1120, -40], [-40, 1960], [1120, 1960]].map(([X, Y]) => Math.hypot(X - cx, Y - cy))) + 20;
  const rad = R * (out ? prog : 1 - prog);
  if (rad >= R - 1) return null;
  if (rad < 0.5) return <rect x={-40} y={-40} width={1160} height={2000} fill={c} />;
  return (
    <g>
      <path d={holePath(cx, cy, rad)} fill={c} fillRule="evenodd" />
      <circle cx={cx} cy={cy} r={rad} fill="none" stroke={base.accent} strokeWidth={6} opacity={0.9} />
    </g>
  );
}

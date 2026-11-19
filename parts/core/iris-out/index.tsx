import React from "react";
import { clamp, ease, lerp, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Iris out: the classic old-cartoon iris. A black frame closes to a small circle at (x, y), holds briefly,
// then the last pinhole closes and the frame is fully black for the rest of the shot.

const holePath = (cx: number, cy: number, r: number) =>
  `M-40 -40 H1120 V1960 H-40 Z M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;

export default function Part(p: PartProps<any>) {
  const c = String(p.color || "#000000");
  const cx = Number(p.x ?? 540), cy = Number(p.y ?? 960);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const len = Math.max(4, Number(p.len ?? 26));
  const hold = Math.max(0, Number(p.hold ?? 10));
  const small = 56;
  const R = Math.max(...[[-40, -40], [1120, -40], [-40, 1960], [1120, 1960]].map(([X, Y]) => Math.hypot(X - cx, Y - cy))) + 20;
  let rad: number;
  if (lf < len) rad = lerp(R, small, ease(lf / len));
  else if (lf < len + hold) rad = small;
  else rad = lerp(small, 0, ease(clamp((lf - len - hold) / 8)));
  if (rad < 0.5) return <rect x={-40} y={-40} width={1160} height={2000} fill={c} />;
  return <path d={holePath(cx, cy, rad)} fill={c} fillRule="evenodd" />;
}

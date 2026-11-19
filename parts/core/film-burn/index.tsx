import React from "react";
import { clamp, ease, lerp, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Film burn: an orange / yellow / white glowing blob burns in from one edge, drifts across the frame,
// blows out to a white core and fades. It is an overlay drawn on top, so it needs no cover colour.

const uid = (v: unknown) => String(v).replace(/[^a-zA-Z0-9]/g, "_");

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  const len = Math.max(12, Number(p.len ?? 40));
  if (lf < 0 || lf > len) return null;
  const edge = String(p.edge ?? "left");
  const op = clamp(Number(p.opacity ?? 0.95), 0, 1);
  const s = ease(clamp(lf / len));
  const env = clamp(lf / (len * 0.2)) * (1 - ease(clamp((lf - len * 0.55) / (len * 0.45))));
  if (env <= 0.001) return null;
  const D = edge === "left" || edge === "right" ? 1600 : 2440;
  const [sx, sy, dx, dy] =
    edge === "right" ? [1380, 960, -1, 0]
    : edge === "top" ? [540, -300, 0, 1]
    : edge === "bottom" ? [540, 2220, 0, -1]
    : [-300, 960, 1, 0];
  const cx = sx + dx * D * s, cy = sy + dy * D * s;
  const horiz = dx !== 0;
  const rx = horiz ? 520 : 900, ry = horiz ? 900 : 520;
  const id = `fb-${uid(edge)}`;
  return (
    <g opacity={env * op}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#ffffff" stopOpacity={1} />
          <stop offset="0.22" stopColor="#fff7d6" stopOpacity={1} />
          <stop offset="0.45" stopColor="#ffd23f" stopOpacity={0.95} />
          <stop offset="0.7" stopColor="#ff7a1a" stopOpacity={0.7} />
          <stop offset="1" stopColor="#b83a0b" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id})`} />
      <ellipse cx={cx - dx * lerp(120, 260, s)} cy={cy - dy * lerp(120, 260, s)} rx={rx * 0.6} ry={ry * 0.6} fill={`url(#${id})`} opacity={0.6} />
    </g>
  );
}

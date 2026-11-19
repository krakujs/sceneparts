import React from "react";
import { clamp, ease, lerp, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Diagonal wipe: a two-tone band (colour + accent) sweeps corner to corner, top-left to bottom-right.
// Drawn in a group rotated 45 degrees, so the wipe edge is a straight vertical line in local space.
// mode "in": the band covers the frame. mode "out": the band starts covering and sweeps back out.

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const c = String(p.color || base.ink);
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(4, Number(p.len ?? 24));
  const prog = ease(clamp(lf / len));
  const k = out ? 1 - prog : prog;
  const e = lerp(-1300, 1300, k);
  if (e <= -1290) return null;
  return (
    <g transform="translate(540 960) rotate(45)">
      <rect x={-1300} y={-1500} width={e + 1300 - 26} height={3000} fill={c} />
      <rect x={e - 26} y={-1500} width={26} height={3000} fill={base.accent} />
    </g>
  );
}

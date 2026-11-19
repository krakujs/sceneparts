import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Scanlines: thin dark horizontal lines across the whole frame, with a slow brighter band rolling down.
// Overlay, runs continuously from its start frame. `opacity` sets how strong the lines are.

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const op = clamp(Number(p.opacity ?? 0.35), 0, 1);
  const gap = clamp(Number(p.gap ?? 8), 4, 40);
  const dark = String(p.color || "#000000");
  const sd = String(p.seed ?? "scan").replace(/[^a-zA-Z0-9]/g, "_");
  let d = "";
  for (let y = 0; y < 1920; y += gap) d += `M-40 ${y}H1120`;
  const bandY = ((lf * 5) % 2200) - 200;
  const id = `sl-band-${sd}`;
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity={0} />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity={0.18} />
          <stop offset="1" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={d} stroke={dark} strokeWidth={Math.max(1, gap * 0.4)} opacity={op} />
      <rect x={-40} y={bandY} width={1160} height={300} fill={`url(#${id})`} opacity={Math.min(1, op * 1.5)} />
    </g>
  );
}

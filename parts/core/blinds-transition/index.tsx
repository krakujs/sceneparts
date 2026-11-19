import React from "react";
import { clamp, ease, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Blinds transition: 4 to 16 slats (horizontal or vertical) grow shut one after another, staggered across the shot.
// mode "in": slats grow until the frame is covered. mode "out": slats start full and shrink to reveal the frame.
// Each slat is a band of colour anchored at its slot centre; a 1.5px overlap hides hairline gaps.

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const c = String(p.color || base.ink);
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(8, Number(p.len ?? 24));
  const n = clamp(Math.round(Number(p.count ?? 10)), 4, 16);
  const horiz = p.dir !== "vertical";
  const stag = (len * 0.4) / (n - 1);
  const dur = len - (n - 1) * stag;
  const total = horiz ? 1960 : 1120;
  const slot = total / n;
  const slats: React.ReactElement[] = [];
  for (let i = 0; i < n; i++) {
    const q = clamp((lf - i * stag) / dur);
    const k = out ? 1 - ease(q) : ease(q);
    if (k <= 0.001) continue;
    const size = slot * k + 1.5;
    const off = -20 + i * slot + (slot - size) / 2;
    slats.push(
      horiz
        ? <rect key={i} x={-40} y={off} width={1160} height={size} fill={c} />
        : <rect key={i} x={off} y={-40} width={size} height={2000} fill={c} />
    );
  }
  if (!slats.length) return null;
  return <g>{slats}</g>;
}

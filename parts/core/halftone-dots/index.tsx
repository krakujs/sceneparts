import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter } from "../stat-card/index";

// Halftone dots: a comic-style dot grid fading out from one corner. Each dot's radius falls off with its
// distance from that corner, so the dots are biggest in the corner and vanish toward the middle of the frame.
// The whole pattern grows in over the first 20 frames. All dots are one path for speed.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const corner = String(p.corner ?? "bottom-right");
  const x0 = corner.includes("right") ? 1080 : 0;
  const y0 = corner.includes("bottom") ? 1920 : 0;
  const S = clamp(Number(p.spacing ?? 56), 24, 120);
  const reach = Math.max(200, Number(p.reach ?? 1200));
  const op = clamp(Number(p.opacity ?? 0.55), 0, 1);
  const grow = enter(lf, 0, 20);
  let d = "";
  for (let gy = 0; gy <= 1920 + S / 2; gy += S) {
    for (let gx = 0; gx <= 1080 + S / 2; gx += S) {
      const f = 1 - Math.hypot(gx - x0, gy - y0) / reach;
      if (f <= 0) continue;
      const r = S * 0.5 * Math.pow(f, 0.9) * grow;
      if (r < 0.8) continue;
      const a = r.toFixed(2);
      d += `M${(gx + r).toFixed(1)} ${gy} A${a} ${a} 0 1 0 ${(gx - r).toFixed(1)} ${gy} A${a} ${a} 0 1 0 ${(gx + r).toFixed(1)} ${gy} Z`;
    }
  }
  if (!d) return null;
  return <path d={d} fill={String(p.color || u.ink)} opacity={op} />;
}

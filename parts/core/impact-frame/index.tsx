import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Impact frame: a full-frame hit. For its first 14 frames the whole canvas flips between inverted white and black,
// with a radial burst of wedges that springs out of a centre point. Then the burst holds and fades. Full-frame, so use it alone.
// Everything is clipped to the canvas so the shot's frame-wide filters always see a canvas-sized bounding box.

export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 960;
  const s = p.s ?? 1;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "impact");
  const cid = `impact-clip-${sd.replace(/[^a-zA-Z0-9]/g, "")}`;
  const FLASH = 14;
  const flashWhite = lf < FLASH && Math.floor(lf / 2) % 2 === 0;
  const bg = flashWhite ? "#FFFFFF" : "#000000";
  const ray = flashWhite ? "#000000" : "#FFFFFF";
  const fade = lf < 36 ? 1 : clamp(1 - (lf - 36) / 24);
  const n = Math.round(clamp(Number(p.count ?? 28), 8, 60));
  const r0 = (60 + 300 * ease(clamp(lf / 10))) * s;
  const core = 70 * ease(clamp(lf / 6)) * s;
  const R = 1400 * s;
  const wedges = Array.from({ length: n }, (_, i) => {
    if (i % 2 === 1) return null;
    const a0 = (i / n) * Math.PI * 2 + (random(`${sd}-${i}`) - 0.5) * 0.05;
    const a1 = a0 + (Math.PI * 2) / n;
    const c = (a: number, r: number) => `${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}`;
    return `M${c(a0, r0)} L${c(a0, R * (0.9 + 0.2 * random(`${sd}-r${i}`)))} L${c(a1, R)} L${c(a1, r0)} Z`;
  }).filter((d): d is string => d !== null);
  return (
    <g opacity={fade.toFixed(3)}>
      <defs>
        <clipPath id={cid}>
          <rect x={0} y={0} width={1080} height={1920} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid})`}>
        <rect x={0} y={0} width={1080} height={1920} fill={bg} />
        {wedges.map((d, i) => <path key={i} d={d} fill={ray} />)}
        <circle cx={x} cy={y} r={core.toFixed(1)} fill={ray} stroke={bg} strokeWidth={12} />
      </g>
    </g>
  );
}

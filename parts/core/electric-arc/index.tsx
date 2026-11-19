import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Electric arc: a jagged lightning bolt between (x1, y1) and (x2, y2). The zigzag is re-rolled every two frames,
// drawn as a blurred glow, a coloured halo and a white hot core, with an occasional fork. It fades out after ~40 frames.

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x1 = Number(p.x1 ?? 200), y1 = Number(p.y1 ?? 900), x2 = Number(p.x2 ?? 880), y2 = Number(p.y2 ?? 1000);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const fade = 1 - clamp((lf - 40) / 20);
  if (fade <= 0) return null;
  const glow = String(p.color ?? "#6FD3FF");
  const sd = `${String(p.seed ?? "arc")}-${Math.floor(lf / 2)}`;
  const gid = `arc-glow-${String(p.seed ?? "arc").replace(/[^a-zA-Z0-9]/g, "")}`;
  const dx = x2 - x1, dy = y2 - y1;
  const L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L, ny = dx / L;
  const amp = Number(p.jag ?? 70);
  const N = 16;
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const off = i === 0 || i === N ? 0 : (random(`${sd}-p${i}`) - 0.5) * 2 * amp * Math.sin(Math.PI * t);
    return [x1 + dx * t + nx * off, y1 + dy * t + ny * off];
  });
  const path = pts.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)} ${b.toFixed(1)}`).join(" ");
  const b0 = pts[6];
  const fx = b0[0] + (random(`${sd}-fx`) - 0.5) * 180;
  const fy = b0[1] + 100 + random(`${sd}-fy`) * 90;
  const fork = `M${b0[0].toFixed(1)} ${b0[1].toFixed(1)} L${((b0[0] + fx) / 2 + 20).toFixed(1)} ${((b0[1] + fy) / 2).toFixed(1)} L${fx.toFixed(1)} ${fy.toFixed(1)}`;
  const hasFork = random(`${sd}-fork`) < 0.5;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return (
    <g transform={`translate(${mx} ${my}) scale(${s}) translate(${-mx} ${-my})`} opacity={fade.toFixed(3)}>
      <defs>
        <filter id={gid} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <path d={path} fill="none" stroke={glow} strokeWidth={28} strokeLinejoin="round" strokeLinecap="round" opacity={0.7} filter={`url(#${gid})`} />
      <path d={path} fill="none" stroke={glow} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" />
      <path d={path} fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      {hasFork ? (
        <g>
          <path d={fork} fill="none" stroke={glow} strokeWidth={6} strokeLinecap="round" />
          <path d={fork} fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
}

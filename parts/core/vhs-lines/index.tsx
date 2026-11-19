import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// VHS lines: retro tape overlay. A rolling tracking band, horizontal noise lines that re-seed every two frames,
// faint red and cyan colour-fringe stripes at the edges, and a corner "PLAY" label with a triangle.
// Overlay, runs continuously from its start frame. `intensity` scales everything.

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const k = clamp(Number(p.intensity ?? 0.6), 0, 1);
  const sd = String(p.seed ?? "vhs").replace(/[^a-zA-Z0-9]/g, "_");
  const epoch = Math.floor(lf / 2);
  const noise: React.ReactElement[] = [];
  for (let i = 0; i < 26; i++) {
    const y = random(`${sd}-y-${epoch}-${i}`) * 1920;
    const x = random(`${sd}-x-${epoch}-${i}`) * 1080;
    const w = 200 + random(`${sd}-w-${epoch}-${i}`) * 880;
    const h = 2 + random(`${sd}-h-${epoch}-${i}`) * 6;
    const bright = random(`${sd}-b-${epoch}-${i}`) < 0.5;
    noise.push(<rect key={i} x={x} y={y} width={w} height={h} fill={bright ? "#ffffff" : "#000000"} opacity={(bright ? 0.55 : 0.5) * k} />);
  }
  const jit = (random(`${sd}-fr-${epoch}`) - 0.5) * 10;
  const bandY = ((lf * 9) % 2100) - 180;
  const bandId = `vhs-band-${sd}`;
  return (
    <g>
      <defs>
        <linearGradient id={bandId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity={0} />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity={0.45} />
          <stop offset="1" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={-40} y={bandY} width={1160} height={140} fill={`url(#${bandId})`} opacity={k} />
      <rect x={-40} y={bandY + 62} width={1160} height={6} fill="#000000" opacity={0.45 * k} />
      <rect x={-40} y={bandY + 74} width={1160} height={3} fill="#ffffff" opacity={0.6 * k} />
      {noise}
      <rect x={jit} y={-40} width={16} height={2000} fill="#ff2d6f" opacity={0.35 * k} />
      <rect x={1070 - jit} y={-40} width={16} height={2000} fill="#2de2ff" opacity={0.35 * k} />
      <g transform="translate(80 120)" opacity={0.9 * k}>
        <path d="M0 0 L40 22 L0 44 Z" fill="#ffffff" stroke="#000000" strokeWidth={4} paintOrder="stroke" />
        <text x={60} y={36} fontFamily="Courier New, monospace" fontSize={40} fontWeight={700} fill="#ffffff" stroke="#000000" strokeWidth={4} paintOrder="stroke">PLAY</text>
      </g>
    </g>
  );
}

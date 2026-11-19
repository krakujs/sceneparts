import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Underwater ripple: a blue-green tint over the frame, wavy light caustic lines drifting across it,
// and small bubbles rising from the bottom. Overlay, runs continuously from its start frame.

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const k = clamp(Number(p.intensity ?? 0.5), 0, 1);
  const sd = String(p.seed ?? "water").replace(/[^a-zA-Z0-9]/g, "_");
  const tint = String(p.color || "#0b7f8c");

  const waves: React.ReactElement[] = [];
  for (let i = 0; i < 10; i++) {
    const y0 = 60 + i * 200;
    const amp = 26 + (i % 3) * 10;
    const freq = 0.009 + i * 0.0009;
    const ph = lf * 0.05 * (1 + (i % 2) * 0.6) + i * 1.7;
    let d = "";
    for (let x = -60; x <= 1140; x += 40) {
      const yy = y0 + amp * Math.sin(x * freq + ph) + 12 * Math.sin(x * freq * 2.3 - ph * 1.3);
      d += `${x === -60 ? "M" : "L"}${x} ${yy.toFixed(1)}`;
    }
    waves.push(<path key={`w${i}`} d={d} fill="none" stroke="#e8fff9" strokeWidth={i % 3 ? 4 : 7} strokeLinecap="round" opacity={0.35 * k} />);
  }

  const bubbles: React.ReactElement[] = [];
  for (let i = 0; i < 14; i++) {
    const r0 = random(`${sd}-b-${i}`);
    const speed = 1.2 + random(`${sd}-s-${i}`) * 1.6;
    const cx0 = random(`${sd}-x-${i}`) * 1080;
    const r = 4 + random(`${sd}-r-${i}`) * 9;
    const cy = 1980 - ((lf * speed + r0 * 2000) % 2050);
    const cx = cx0 + Math.sin(lf * 0.05 + i) * 14;
    bubbles.push(
      <g key={`b${i}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeWidth={2.5} opacity={0.55 * k} />
        <circle cx={cx - r * 0.35} cy={cy - r * 0.35} r={r * 0.25} fill="#ffffff" opacity={0.6 * k} />
      </g>
    );
  }

  return (
    <g>
      <rect x={-40} y={-40} width={1160} height={2000} fill={tint} opacity={0.22 * k} />
      {waves}
      {bubbles}
    </g>
  );
}

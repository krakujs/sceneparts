import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Coin rain: full-frame gold coins falling and swaying, each flipping over via a cosine scaleX.
// The emboss is a plain five-point star inside a ring, with no lettering. Falling wraps, so it loops.
// Covers the full frame and ignores x and y.

const GOLD = "#FFC83D", RIM = "#E0A21F";

const starD = (R: number, r: number) => {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2, rr = i % 2 ? r : R;
    d += `${i ? "L" : "M"}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} `;
  }
  return d + "Z";
};

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const n = Math.round(clamp(Number(p.count ?? 34), 4, 80));
  const speed = Number(p.speed ?? 1), sd = String(p.seed ?? "coin");
  const coins = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const R = 26 + q(0) * 22;
    const span = 1920 + 2 * R;
    const vy = speed * (4 + q(1) * 5);
    const y = ((q(2) * span + lf * vy) % span) - R;
    const x = q(3) * 1080 + Math.sin(lf * 0.04 + q(4) * 6.28) * 28;
    const flip = Math.cos(lf * (0.08 + q(5) * 0.12) + q(6) * 6.28);
    const tilt = Math.sin(lf * 0.05 + q(7) * 6.28) * 12;
    return { x, y, R, flip, tilt };
  });
  return (
    <g>
      {coins.map((c, i) => (
        <g key={i} transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)}) rotate(${c.tilt.toFixed(1)})`}>
          <g transform={`scale(${c.flip.toFixed(3)} 1)`}>
            <circle r={c.R} fill={RIM} />
            <circle r={c.R * 0.9} fill={GOLD} />
            <circle r={c.R * 0.72} fill="none" stroke={RIM} strokeWidth={Math.max(2, c.R * 0.07)} />
            <path d={starD(c.R * 0.42, c.R * 0.18)} fill={RIM} />
            <path d={`M${(-c.R * 0.6).toFixed(1)} ${(-c.R * 0.1).toFixed(1)} A${(c.R * 0.62).toFixed(1)} ${(c.R * 0.62).toFixed(1)} 0 0 1 ${(-c.R * 0.1).toFixed(1)} ${(-c.R * 0.62).toFixed(1)}`}
              fill="none" stroke="#FFF1B8" strokeWidth={Math.max(2, c.R * 0.08)} strokeLinecap="round" opacity={0.85} />
          </g>
        </g>
      ))}
    </g>
  );
}

import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Film grain overlay: full-frame subtle grain. A few hundred tiny specks are re-seeded every 2 frames,
// with an occasional vertical scratch. Covers 0..1080 x 0..1920 and ignores x and y.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const n = Math.round(clamp(Number(p.count ?? 240), 20, 320));
  const str = clamp(Number(p.strength ?? 0.35), 0, 1);
  const epoch = Math.floor(lf / 2);
  const sd = String(p.seed ?? "grain");
  const specks = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${epoch}-${i}-${k}`);
    return { x: q(0) * 1080, y: q(1) * 1920, r: 0.6 + q(2) * 1.6, dark: q(3) < 0.5 };
  });
  const sc = random(`${sd}-scratch-${epoch}`);
  const scratch = sc < 0.22;
  const sx = random(`${sd}-sx-${epoch}`) * 1080;
  const sy = random(`${sd}-sy-${epoch}`) * 900;
  const sl = 500 + random(`${sd}-sl-${epoch}`) * 700;
  const sdx = (random(`${sd}-sd-${epoch}`) - 0.5) * 40;
  return (
    <g opacity={str}>
      {specks.map((q, i) => (
        <circle key={i} cx={q.x.toFixed(1)} cy={q.y.toFixed(1)} r={q.r.toFixed(2)} fill={q.dark ? u.ink : u.white} />
      ))}
      {scratch ? <path d={`M${sx.toFixed(1)} ${sy.toFixed(1)} L${(sx + sdx).toFixed(1)} ${(sy + sl).toFixed(1)}`} stroke={u.white} strokeWidth={1.4} opacity={0.8} /> : null}
    </g>
  );
}

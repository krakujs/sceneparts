import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Explosion: a cartoon blast. A jagged star pops out in red, orange and yellow, debris flies out under gravity
// and a smoke ring rolls outward behind it. The star fades after about 20 frames, so the debris and ring carry the end.

function jagged(R: number, sd: string) {
  const pts: string[] = [];
  const N = 11;
  for (let i = 0; i < N * 2; i++) {
    const a = (i / (N * 2)) * Math.PI * 2 - Math.PI / 2;
    const k = i % 2 === 0 ? 0.85 + 0.3 * random(`${sd}-s${i}`) : 0.5 * (0.8 + 0.4 * random(`${sd}-t${i}`));
    pts.push(`${(Math.cos(a) * R * k).toFixed(1)} ${(Math.sin(a) * R * k).toFixed(1)}`);
  }
  return "M" + pts.join(" L") + " Z";
}

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "boom");
  const size = Math.max(40, Number(p.size ?? 260));
  const grow = ease(clamp(lf / 7));
  const starFade = 1 - clamp((lf - 20) / 10);
  const ringT = clamp((lf - 8) / 70);
  const ringR = 90 + 300 * ease(ringT);
  const ringW = 60 * (1 - ringT) + 6;
  const ringOp = lf > 8 ? 0.7 * (1 - ringT) : 0;
  const TAU = 14;
  const t = Math.max(0, lf - 4);
  const decay = 1 - Math.exp(-t / TAU);
  const debris = Array.from({ length: 16 }, (_, i) => {
    const q = (k: number) => random(`${sd}-d${i}-${k}`);
    const a = q(0) * Math.PI * 2;
    const v = 14 + q(1) * 16;
    return {
      dx: Math.cos(a) * v * TAU * decay,
      dy: Math.sin(a) * v * TAU * decay + 0.12 * t * t,
      rot: q(2) * 360 + t * (q(3) - 0.5) * 20,
      w: 14 + q(4) * 16,
      c: i % 2 ? "#2B2118" : u.series[2],
      op: lf < 4 ? 0 : 1 - clamp((lf - 40) / 20),
    };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={ringR.toFixed(1)} fill="none" stroke="#9C968E" strokeWidth={ringW.toFixed(1)} opacity={ringOp.toFixed(3)} />
      <g opacity={starFade}>
        <path d={jagged(size * grow, sd)} fill={u.accent} stroke={u.ink} strokeWidth={10} strokeLinejoin="round" />
        <path d={jagged(size * 0.7 * grow, sd)} fill={u.series[5]} />
        <path d={jagged(size * 0.4 * grow, sd)} fill="#FFE14D" />
      </g>
      {debris.map((q, i) => (
        <rect key={i} x={(q.dx - q.w / 2).toFixed(1)} y={(q.dy - q.w / 2).toFixed(1)} width={q.w} height={q.w * 0.7}
          transform={`rotate(${q.rot.toFixed(1)} ${q.dx.toFixed(1)} ${q.dy.toFixed(1)})`}
          fill={q.c} stroke={u.ink} strokeWidth={3} opacity={q.op} />
      ))}
    </g>
  );
}

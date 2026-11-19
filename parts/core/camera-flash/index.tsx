import React from "react";
import { type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Camera flash: a white flash with a bloom and a four-point glare star at (x, y), fading out.
// A short attack, then the flash, bloom and star all decay together over `len` frames.

const star = (x: number, y: number, L: number, w: number) =>
  `M${x} ${y - L} L${x + w} ${y} L${x} ${y + L} L${x - w} ${y} Z M${x - L} ${y} L${x} ${y - w} L${x + L} ${y} L${x} ${y + w} Z`;

export default function Part(p: PartProps<any>) {
  const x = Number(p.x ?? 540), y = Number(p.y ?? 800);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const len = Math.max(4, Number(p.len ?? 26));
  const a = 2;
  const env = lf < a ? (lf + 1) / (a + 1) : Math.max(0, 1 - (lf - a) / len);
  if (env <= 0.01) return null;
  const id = `cf-bloom-${Math.round(x)}-${Math.round(y)}`;
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#ffffff" stopOpacity={1} />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity={0.6} />
          <stop offset="1" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={-40} y={-40} width={1160} height={2000} fill="#ffffff" opacity={0.5 * env} />
      <circle cx={x} cy={y} r={520} fill={`url(#${id})`} opacity={env} />
      <path d={star(x, y, 620, 14)} fill="#ffffff" opacity={0.9 * env} />
      <g transform={`rotate(45 ${x} ${y})`}>
        <path d={star(x, y, 300, 9)} fill="#ffffff" opacity={0.7 * env} />
      </g>
      <circle cx={x} cy={y} r={18} fill="#ffffff" opacity={env} />
    </g>
  );
}

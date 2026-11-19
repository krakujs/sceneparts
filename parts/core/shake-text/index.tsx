import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Shake text: jittering letters for anger, fear or shock. The jitter is hashed from the frame, so it is deterministic.
// One text element; per-letter dx/dy/rotate offsets keep the natural letter spacing.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 130), 980, 0.74);
  const seed = String(p.seed ?? "shake");
  const amp = Number(p.intensity ?? 9) * (sz / 130);
  const k = Math.min(1, lf / 4);
  let px = 0, py = 0;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
        fill={u.accent} stroke={u.ink} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round">
        {Array.from(text).map((ch, i) => {
          if (ch === " ") return " ";
          const jx = (random(`${seed}-x-${i}-${lf}`) - 0.5) * 2 * amp * k;
          const jy = (random(`${seed}-y-${i}-${lf}`) - 0.5) * 2 * amp * k;
          const jr = (random(`${seed}-r-${i}-${lf}`) - 0.5) * 12 * k;
          const dx = jx - px, dy = jy - py;
          px = jx; py = jy;
          return <tspan key={i} dx={dx.toFixed(2)} dy={dy.toFixed(2)} rotate={jr.toFixed(2)}>{ch}</tspan>;
        })}
      </text>
    </g>
  );
}

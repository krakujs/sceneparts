import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Bounce text: letters drop in from above and bounce to rest, staggered left to right.
// One text element with per-letter dy offsets, so the natural letter spacing is kept.

const bounceOut = (t: number) => {
  const n = 7.5625, d = 2.75;
  if (t < 1 / d) return n * t * t;
  if (t < 2 / d) { const q = t - 1.5 / d; return n * q * q + 0.75; }
  if (t < 2.5 / d) { const q = t - 2.25 / d; return n * q * q + 0.9375; }
  const q = t - 2.625 / d;
  return n * q * q + 0.984375;
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 130), 980, 0.74);
  const stagger = Math.max(0, Number(p.stagger ?? 3));
  const drop = sz * 2.6;
  let prev = 0;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
        fill={u.accent} stroke={u.ink} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round">
        {Array.from(text).map((ch, i) => {
          if (ch === " ") return " ";
          const st = i * stagger;
          const t = Math.min(1, Math.max(0, (lf - st) / 26));
          const off = (1 - bounceOut(t)) * -drop;
          const alpha = Math.min(1, Math.max(0, (lf - st) / 3));
          const dy = off - prev;
          prev = off;
          return <tspan key={i} dy={dy.toFixed(2)} fillOpacity={alpha} strokeOpacity={alpha}>{ch}</tspan>;
        })}
      </text>
    </g>
  );
}

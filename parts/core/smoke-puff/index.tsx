import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Smoke puff: a cartoon cloud of overlapping grey circles. It swells out from (x, y), drifts up and thins away.
// The ink outline is drawn under the whole cloud first, so the overlaps merge into one outlined shape.

const SMOKE = "#CFCBC4";

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "smoke");
  const n = Math.round(clamp(Number(p.count ?? 9), 3, 16));
  const size = Math.max(40, Number(p.size ?? 180));
  const swell = ease(clamp(lf / 22));
  const alpha = 1 - clamp((lf - 20) / 60) * 0.6;
  const grow = 1 + 0.2 * clamp((lf - 20) / 60);
  const puffs = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const a = (i / n) * Math.PI * 2 + q(0) * 0.6;
    const d = size * 0.45 * (0.4 + q(1) * 0.6);
    const R = size * (0.32 + q(2) * 0.22);
    const drift = lf * 0.9 * (0.6 + q(3) * 0.6);
    return {
      cx: Math.cos(a) * d * (0.6 + 0.6 * swell) + (q(4) - 0.5) * 10,
      cy: Math.sin(a) * d * 0.6 * (0.6 + 0.6 * swell) - drift,
      r: R * (0.3 + 0.7 * swell) * grow * (1 + 0.04 * Math.sin(lf * 0.2 + i)),
    };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={alpha}>
      <g>
        {puffs.map((q, i) => <circle key={i} cx={q.cx.toFixed(1)} cy={q.cy.toFixed(1)} r={(q.r + 7).toFixed(1)} fill={u.ink} />)}
      </g>
      <g>
        {puffs.map((q, i) => <circle key={i} cx={q.cx.toFixed(1)} cy={q.cy.toFixed(1)} r={q.r.toFixed(1)} fill={SMOKE} />)}
      </g>
    </g>
  );
}

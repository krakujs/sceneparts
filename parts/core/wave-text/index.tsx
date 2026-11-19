import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Wave text: letters ride a continuous sine wave that travels along the word. Pure function of the frame.
// One text element with per-letter dy offsets, so the natural letter spacing is kept.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 120), 980, 0.74);
  const amp = Number(p.amp ?? 28) * (sz / 120);
  const speed = Number(p.speed ?? 0.12);
  const e = 1 - Math.pow(1 - Math.min(1, lf / 18), 3);
  let prev = 0;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
        fill={u.accent} stroke={u.ink} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round">
        {Array.from(text).map((ch, i) => {
          if (ch === " ") return " ";
          const off = Math.sin(lf * speed - i * 0.55) * amp * e;
          const dy = off - prev;
          prev = off;
          const alpha = Math.min(1, lf / 8);
          return <tspan key={i} dy={dy.toFixed(2)} fillOpacity={alpha} strokeOpacity={alpha}>{ch}</tspan>;
        })}
      </text>
    </g>
  );
}

import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Zoom text: punches in from huge and transparent, slams to size, then settles with a small undershoot.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 150), 980, 0.74);
  const t = clamp(lf / Math.max(4, Number(p.len ?? 18)));
  const sc = 1 + 2.6 * Math.pow(1 - t, 3) - 0.08 * Math.sin(Math.PI * t);
  const op = clamp(t * 2.5);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`} opacity={op}>
      <g transform={`scale(${sc.toFixed(4)})`}>
        <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
          fill={u.accent} stroke={u.ink} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round">{text}</text>
      </g>
    </g>
  );
}

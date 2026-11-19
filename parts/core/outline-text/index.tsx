import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Outline text: hollow stroked letters that draw on with a stroke-dash, then fill in.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 170), 980, 0.74);
  const draw = Math.max(4, Number(p.draw ?? 40));
  const k = clamp(lf / draw);
  // Estimated outline length; the dash is one long segment that slides in from the left.
  const L = Math.max(1, text.replace(/\s/g, "").length * sz * 3.2);
  const dash = k < 1 ? { strokeDasharray: `${L} ${L * 4}`, strokeDashoffset: L * (1 - k) } : {};
  const fill = clamp((lf - draw) / 12);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
        fill={u.accent} fillOpacity={fill} stroke={u.ink} strokeWidth={sz * 0.045} strokeLinejoin="round" {...dash}>{text}</text>
    </g>
  );
}

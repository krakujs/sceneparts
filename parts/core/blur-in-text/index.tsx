import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Blur in text: the words fade from a heavy blur to sharp focus with an ease-out.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 130), 980, 0.74);
  const uid = String(p.seed ?? "blur").replace(/[^a-zA-Z0-9]/g, "") || "blur";
  const t = clamp(lf / Math.max(4, Number(p.len ?? 26)));
  const e = 1 - Math.pow(1 - t, 3);
  const sd = (1 - e) * sz * 0.22;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`} opacity={clamp(t * 1.6)}>
      <defs>
        <filter id={`${uid}-blur`} x="-50%" y="-80%" width="200%" height="260%">
          <feGaussianBlur stdDeviation={sd.toFixed(2)} />
        </filter>
      </defs>
      <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
        fill={u.accent} stroke={u.ink} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round" filter={`url(#${uid}-blur)`}>{text}</text>
    </g>
  );
}

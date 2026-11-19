import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Neon text: tube-light lettering with a blurred glow. Flickers on for the first moments, then holds a steady glow.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 140), 980, 0.74);
  const uid = String(p.seed ?? "neon").replace(/[^a-zA-Z0-9]/g, "") || "neon";
  const flicker = lf < 26 ? (random(`${uid}-f-${lf}`) > 0.45 ? 1 : 0.12) : 1;
  const on = Math.min(1, lf / 3) * flicker;
  const base = sz * 0.35;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`} opacity={on}>
      <defs>
        <filter id={`${uid}-glow`} x="-30%" y="-80%" width="160%" height="260%">
          <feGaussianBlur stdDeviation={sz * 0.14} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text x={0} y={base} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz} fill={u.accent}
        stroke={u.accent} strokeWidth={sz * 0.04} strokeLinejoin="round" filter={`url(#${uid}-glow)`}>{text}</text>
      <text x={0} y={base} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz} fill={u.white} opacity={0.95}>{text}</text>
    </g>
  );
}

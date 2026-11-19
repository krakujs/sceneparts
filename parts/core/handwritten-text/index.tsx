import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Handwritten text: script italic written on left to right. Each letter fades in as the pen reaches it; a pen dot rides the leading edge.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const n = text.length;
  const sz = fitSize(text, Number(p.size ?? 150), 980, 0.5);
  const W = n * sz * 0.5;
  const k = clamp(lf / Math.max(4, Number(p.write ?? 42)));
  const base = sz * 0.35;
  const edge = -W / 2 + k * W;
  const wob = Math.sin(lf * 0.6) * sz * 0.04;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <text x={0} y={base} textAnchor="middle" fontFamily="'Segoe Script', 'Brush Script MT', 'Snell Roundhand', cursive" fontStyle="italic"
        fontWeight={700} fontSize={sz} fill={u.accent} stroke={u.ink} strokeWidth={sz * 0.02} paintOrder="stroke">
        {Array.from(text).map((ch, i) => {
          const vis = clamp(k * n - i);
          return ch === " " ? " " : <tspan key={i} fillOpacity={vis} strokeOpacity={vis}>{ch}</tspan>;
        })}
      </text>
      {k < 1 ? (
        <circle cx={edge} cy={-sz * 0.25 + wob} r={sz * 0.07} fill={u.ink} stroke={u.white} strokeWidth={sz * 0.02} />
      ) : null}
    </g>
  );
}

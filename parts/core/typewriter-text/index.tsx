import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Typewriter text: letters appear one by one on a monospace grid (so the caret always lands exactly after the last letter), with a blinking caret.

const MONO = "'DejaVu Sans Mono', 'Liberation Mono', 'Courier New', monospace";

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 120), 980, 0.6);
  const cw = sz * 0.6;
  const x0 = -(text.length * cw) / 2;
  const speed = Math.max(1, Number(p.speed ?? 2));
  const n = Math.min(text.length, Math.floor(lf / speed) + 1);
  const done = n >= text.length;
  const caret = !done || Math.floor(lf / 14) % 2 === 0;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {Array.from({ length: n }, (_, i) => (
        <text key={i} x={x0 + (i + 0.5) * cw} y={sz * 0.35} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={sz}
          fill={u.accent} stroke={u.ink} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round">{text[i]}</text>
      ))}
      {caret ? (
        <rect x={x0 + n * cw + cw * 0.1} y={-sz * 0.37} width={sz * 0.07} height={sz * 0.72} rx={sz * 0.03}
          fill={u.accent} stroke={u.ink} strokeWidth={sz * 0.02} />
      ) : null}
    </g>
  );
}

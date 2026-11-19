import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize, popIn } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Pop words: each word pops in with overshoot, slightly rotated, staggered left to right.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 110), 980, 0.74);
  const cw = sz * 0.62;
  const x0 = -(text.length * cw) / 2;
  const stagger = Math.max(1, Number(p.stagger ?? 7));
  let pos = 0;
  const words = text.split(" ").map((w) => {
    const start = pos;
    pos += w.length + 1;
    return { w, cx: x0 + (start + w.length / 2) * cw };
  }).filter((q) => q.w);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {words.map(({ w, cx }, j) => {
        const t = Math.max(0, lf - j * stagger);
        const sc = popIn(lf, j * stagger, 10);
        const rot = (j % 2 ? -1 : 1) * 7 * Math.max(0, 1 - t / 12);
        return (
          <g key={j} transform={`translate(${cx.toFixed(1)} 0) rotate(${rot.toFixed(2)}) scale(${sc.toFixed(3)})`}>
            <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
              fill={j % 2 ? u.white : u.accent} stroke={u.ink} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round">{w}</text>
          </g>
        );
      })}
    </g>
  );
}

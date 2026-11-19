import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Word by word: a sentence is shown one word at a time (layout is fixed, unseen words are transparent).
// The word being read is highlighted in the accent colour; when the sentence is done, all words settle to white.

const wrap = (words: string[], max: number) => {
  const lines: string[][] = [];
  let cur: string[] = [];
  let len = 0;
  for (const w of words) {
    if (cur.length && len + 1 + w.length > max) { lines.push(cur); cur = []; len = 0; }
    len += (cur.length ? 1 : 0) + w.length;
    cur.push(w);
  }
  if (cur.length) lines.push(cur);
  return lines;
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const words = String(p.text ?? "").split(/\s+/).filter(Boolean);
  if (!words.length) return null;
  let sz = Number(p.size ?? 96);
  let lines = wrap(words, Math.floor(980 / (sz * 0.62)));
  while (lines.length > 4 && sz > 40) { sz -= 4; lines = wrap(words, Math.floor(980 / (sz * 0.62))); }
  const stagger = Math.max(1, Number(p.stagger ?? 12));
  const done = lf >= words.length * stagger + 24;
  const cur = done ? -1 : Math.min(words.length - 1, Math.floor(lf / stagger));
  const lh = sz * 1.25;
  let base = 0;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {lines.map((line, li) => {
        const start = base;
        base += line.length;
        const yb = (li - (lines.length - 1) / 2) * lh + sz * 0.35;
        const nodes: React.ReactNode[] = [];
        line.forEach((w, wi) => {
          const i = start + wi;
          const vis = lf >= i * stagger;
          if (wi > 0) nodes.push(" ");
          nodes.push(
            <tspan key={i} fill={i === cur ? u.accent : u.white} stroke={u.ink} strokeWidth={sz * 0.05}
              fillOpacity={vis ? 1 : 0} strokeOpacity={vis ? 1 : 0} paintOrder="stroke">{w}</tspan>
          );
        });
        return (
          <text key={li} x={0} y={yb} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz} strokeLinejoin="round">{nodes}</text>
        );
      })}
    </g>
  );
}

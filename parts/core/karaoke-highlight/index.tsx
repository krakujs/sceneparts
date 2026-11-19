import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Karaoke highlight: the whole sentence is visible; letters turn accent as the sweep passes them, line by line.

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
  let sz = Number(p.size ?? 90);
  let lines = wrap(words, Math.floor(980 / (sz * 0.62)));
  while (lines.length > 4 && sz > 40) { sz -= 4; lines = wrap(words, Math.floor(980 / (sz * 0.62))); }
  const total = lines.reduce((a, l) => a + l.join(" ").length, 0);
  const prog = clamp((lf - Number(p.delay ?? 6)) / Math.max(1, Number(p.dur ?? 60)));
  const sweep = prog * total;
  const lh = sz * 1.25;
  let g = 0;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {lines.map((line, li) => {
        const str = line.join(" ");
        const yb = (li - (lines.length - 1) / 2) * lh + sz * 0.35;
        const kids = Array.from(str).map((ch, i) => {
          const idx = g++;
          if (ch === " ") return " ";
          return <tspan key={i} fill={idx + 0.5 < sweep ? u.accent : u.white}>{ch}</tspan>;
        });
        return (
          <text key={li} x={0} y={yb} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
            fill={u.white} stroke={u.ink} strokeWidth={sz * 0.05} paintOrder="stroke" strokeLinejoin="round">{kids}</text>
        );
      })}
    </g>
  );
}

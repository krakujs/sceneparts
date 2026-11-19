import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Question card: a card with a big question-mark badge on top and the question text, which pops in.
const wrap = (text: string, maxChars: number) => {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? cur + " " + w : w;
    if (next.length > maxChars && cur) { lines.push(cur); cur = w; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const W = p.w ?? 820;
  const size = 52;
  const lines = wrap(String(p.question ?? "Which animal has three hearts?"), Math.floor((W - 150) / (size * 0.56))).slice(0, 4);
  const lh = size * 1.3;
  const H = 170 + lines.length * lh + 50;
  const k = popIn(p.f, at, 12);
  const eBadge = popIn(p.f, at + 6, 10);
  const eText = enter(p.f, at + 10, 14);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1400}) scale(${(p.s ?? 1) * k})`}>
      <Card x={-W / 2} y={-H / 2} w={W} h={H} u={u} r={36} />
      <g transform={`translate(0 ${-H / 2}) scale(${eBadge})`}>
        <circle r={78} fill={p.color ?? u.accent} stroke={u.ink} strokeWidth={6} />
        <Txt x={0} y={42} u={u} size={112} weight={900} fill={u.white}>?</Txt>
      </g>
      <g opacity={eText}>
        {lines.map((l, i) => (
          <Txt key={i} x={0} y={-H / 2 + 190 + i * lh} u={u} size={size} weight={800}>{l}</Txt>
        ))}
      </g>
    </g>
  );
}

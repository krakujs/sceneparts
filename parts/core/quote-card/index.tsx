import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Quote card: a big decorative quotation mark, the quote word-wrapped over several lines, and an "— Author" line.
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
  const quote = String(p.quote ?? "Small steps still move you forward.");
  const author = String(p.author ?? "Jordan Lee");
  const W = 900, TEXT_W = 780, PAD = 60;

  // biggest size that gives at most six lines
  let size = 52, lines: string[] = [];
  let mc = 0;
  for (const sz of [52, 48, 44, 40, 36]) {
    size = sz;
    mc = Math.floor(TEXT_W / (sz * 0.56));
    lines = wrap(quote, mc);
    if (lines.length <= 6) break;
  }
  if (lines.length > 6) lines = [...lines.slice(0, 5), lines[5].slice(0, mc - 1) + "…"];

  const lh = size * 1.32;
  const first = 150 + size * 0.9;
  const last = first + (lines.length - 1) * lh;
  const authorY = last + 84;
  const H = authorY + 60;

  const k = popIn(p.f, at, 12);
  const eMark = enter(p.f, at + 6, 14);
  const eQ = enter(p.f, at + 12, 18);
  const eA = enter(p.f, at + 26, 14);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <g transform={`translate(${-W / 2} ${-H / 2})`}>
        <Card x={0} y={0} w={W} h={H} u={u} r={28} />
        <g opacity={eMark} transform={`translate(0 ${(1 - eMark) * -20})`}>
          <Txt x={PAD - 8} y={216} u={u} size={260} weight={900} anchor="start" fill={u.accent}>{"“"}</Txt>
        </g>
        <g opacity={eQ}>
          {lines.map((l, i) => (
            <Txt key={i} x={PAD} y={first + i * lh} u={u} size={size} weight={700} anchor="start">{l}</Txt>
          ))}
        </g>
        <g opacity={eA}>
          <Txt x={PAD} y={authorY} u={u} size={36} weight={800} anchor="start" fill={u.accent} maxW={W - 2 * PAD}>{"— " + author}</Txt>
        </g>
      </g>
    </g>
  );
}

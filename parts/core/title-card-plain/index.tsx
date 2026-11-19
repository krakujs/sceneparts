import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Txt } from "../stat-card/index";

// Full-frame plain title card: solid background, big centred title that rises in, subtitle and a small accent rule.
// x, y = centre of the frame (540, 960 covers the whole 1080x1920 frame).
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
  const bg = p.bg ?? u.card;
  const title = String(p.title ?? "The Long Road Home");
  const sub = String(p.subtitle ?? "A short film");

  // biggest size where the title wraps to at most three lines in 920 px
  let size = 112, lines = [title];
  for (let sz = 112; sz >= 60; sz -= 4) {
    size = sz;
    lines = wrap(title, Math.floor(920 / (sz * 0.6)));
    if (lines.length <= 3) break;
  }
  const lh = size * 1.12;
  const ruleGap = 56, subGap = 92;
  const blockH = size * 0.8 + (lines.length - 1) * lh + ruleGap + subGap + 16;
  const firstBase = -blockH / 2 + size * 0.8;
  const lastBase = firstBase + (lines.length - 1) * lh;
  const ruleY = lastBase + ruleGap;
  const subY = ruleY + subGap;

  const eT = enter(p.f, at, 26);
  const eR = enter(p.f, at + 20, 16);
  const eS = enter(p.f, at + 26, 16);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <rect x={-540} y={-960} width={1080} height={1920} fill={bg} />
      <rect x={-500} y={-920} width={1000} height={1840} rx={24} fill="none" stroke={u.soft} strokeWidth={4} />
      <g opacity={eT} transform={`translate(0 ${(1 - eT) * 60})`}>
        {lines.map((l, i) => (
          <Txt key={i} x={0} y={firstBase + i * lh} u={u} size={size} weight={900}>{l}</Txt>
        ))}
      </g>
      <rect x={-80 * eR} y={ruleY - 4} width={160 * eR} height={8} fill={u.accent} />
      <g opacity={eS}>
        <Txt x={0} y={subY} u={u} size={48} weight={600} fill={u.muted} maxW={900}>{sub}</Txt>
      </g>
    </g>
  );
}

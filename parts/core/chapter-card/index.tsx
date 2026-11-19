import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Centred chapter card for section breaks: a small label, a big chapter title and an accent line that grows.
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
  const label = String(p.label ?? "CHAPTER 2").toUpperCase();
  const title = String(p.title ?? "The Turning Point");
  const W = 880, LINE_W = 360;

  let size = 112, lines = [title];
  for (let sz = 112; sz >= 56; sz -= 4) {
    size = sz;
    lines = wrap(title, Math.floor(780 / (sz * 0.6)));
    if (lines.length <= 2) break;
  }
  const lh = size * 1.1;
  const labelBase = 96;
  const titleFirst = labelBase + 52 + size * 0.85;
  const titleLast = titleFirst + (lines.length - 1) * lh;
  const lineY = titleLast + 50;
  const H = lineY + 64;

  const k = popIn(p.f, at, 12);
  const eL = enter(p.f, at + 6, 14);
  const eT = enter(p.f, at + 14, 18);
  const eLine = enter(p.f, at + 26, 18);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <g transform={`translate(${-W / 2} ${-H / 2})`}>
        <Card x={0} y={0} w={W} h={H} u={u} r={24} />
        <g opacity={eL}>
          <Txt x={W / 2} y={labelBase} u={u} size={40} weight={900} fill={u.accent} ls={12}>{label}</Txt>
        </g>
        <g opacity={eT} transform={`translate(0 ${(1 - eT) * 24})`}>
          {lines.map((l, i) => (
            <Txt key={i} x={W / 2} y={titleFirst + i * lh} u={u} size={size} weight={900}>{l}</Txt>
          ))}
        </g>
        <rect x={(W - LINE_W * eLine) / 2} y={lineY - 4} width={LINE_W * eLine} height={8} fill={u.accent} />
      </g>
    </g>
  );
}

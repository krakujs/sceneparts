import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Big stat: a very large headline number ("1 in 3") that pops in, then a short line of context fades in under it.

/* eslint-disable @typescript-eslint/no-explicit-any */
const wrap = (text: string, max: number) => {
  const lines: string[] = [];
  let cur = "";
  for (const w of String(text).split(/\s+/).filter(Boolean)) {
    const t = cur ? `${cur} ${w}` : w;
    if (t.length > max && cur) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const pop = popIn(p.f, at, 14);
  const txtIn = enter(p.f, at + 20, 16);
  const lines = wrap(p.context ?? "of visitors leave before the first scene loads.", 30);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-460} y={-270} w={920} h={480} u={u} />
      <g transform={`translate(0 -40) scale(${Math.max(0.001, pop)})`}>
        <Txt x={0} y={0} u={u} size={240} weight={900} fill={u.accent} maxW={840}>{p.stat ?? "1 in 3"}</Txt>
      </g>
      <rect x={-60} y={24} width={120} height={12} rx={6} fill={u.accent} opacity={txtIn} />
      {lines.map((l, i) => (
        <Txt key={i} x={0} y={110 + i * 56} u={u} size={48} weight={700} maxW={820} opacity={txtIn} fill={u.ink}>{l}</Txt>
      ))}
    </g>
  );
}

import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, DrawPath, Card, Txt } from "../stat-card/index";

// Myth fact card: split card. MYTH on top is struck through with a red cross; FACT below reveals with a green tick.
const wrap = (text: string, maxChars: number) => {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? cur + " " + w : w;
    if (next.length > maxChars && cur) { lines.push(cur); cur = w; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const W = 860, H = 640, PAD = 60;
  const size = 42, lh = 56;
  const maxChars = Math.floor((W - 2 * PAD) / (size * 0.62));
  const myth = wrap(String(p.myth ?? "Goldfish only have a three second memory"), maxChars);
  const fact = wrap(String(p.fact ?? "Goldfish can remember things for months"), maxChars);
  const factAt = Number(p.factAt ?? 30);
  const k = popIn(p.f, at, 12);
  const eMyth = enter(p.f, at + 4, 12);
  const eCross = enter(p.f, at + 10, 10);
  const eFact = enter(p.f, at + factAt, 14);
  const eTick = popIn(p.f, at + factAt + 8, 10);
  const strike = clamp((p.f - at - 16) / 12);
  const top = -H / 2;
  const mythBase = top + 170;
  const factBase = 150;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <Card x={-W / 2} y={-H / 2} w={W} h={H} u={u} r={36} />
      <g opacity={eMyth}>
        <rect x={-W / 2 + PAD} y={top + 36} width={170} height={60} rx={30} fill={u.bad} stroke={u.ink} strokeWidth={4} />
        <Txt x={-W / 2 + PAD + 85} y={top + 36 + 42} u={u} size={34} weight={900} fill={u.white} ls={2}>MYTH</Txt>
      </g>
      <g opacity={eCross}>
        <DrawPath d={`M${W / 2 - 110} ${top + 50} L${W / 2 - 50} ${top + 110}`} k={eCross} fill="none" stroke={u.bad} strokeWidth={14} strokeLinecap="round" />
        <DrawPath d={`M${W / 2 - 50} ${top + 50} L${W / 2 - 110} ${top + 110}`} k={eCross} fill="none" stroke={u.bad} strokeWidth={14} strokeLinecap="round" />
      </g>
      <g opacity={eMyth}>
        {myth.map((l, i) => {
          const y = mythBase + i * lh;
          const w = l.length * size * 0.56;
          return (
            <g key={i}>
              <Txt x={-W / 2 + PAD} y={y} u={u} size={size} weight={700} anchor="start" fill={u.muted}>{l}</Txt>
              <rect x={-W / 2 + PAD} y={y - size * 0.32} width={w * strike} height={7} rx={3} fill={u.bad} />
            </g>
          );
        })}
      </g>
      <line x1={-W / 2 + PAD} x2={W / 2 - PAD} y1={0} y2={0} stroke={u.muted} strokeWidth={4} strokeDasharray="14 12" />
      <g opacity={eFact} transform={`translate(0 ${(1 - eFact) * 20})`}>
        <rect x={-W / 2 + PAD} y={28} width={170} height={60} rx={30} fill={u.good} stroke={u.ink} strokeWidth={4} />
        <Txt x={-W / 2 + PAD + 85} y={28 + 42} u={u} size={34} weight={900} fill={u.white} ls={2}>FACT</Txt>
        {fact.map((l, i) => (
          <Txt key={i} x={-W / 2 + PAD} y={factBase + i * lh} u={u} size={size} weight={800} anchor="start">{l}</Txt>
        ))}
      </g>
      <g transform={`translate(${W / 2 - 90} 58) scale(${eTick})`}>
        <circle r={42} fill={u.good} stroke={u.ink} strokeWidth={5} />
        <path d="M-18 2 L-5 16 L20 -12" fill="none" stroke={u.white} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

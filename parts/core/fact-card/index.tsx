import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Fact card: a small accent header pill ("DID YOU KNOW?"), a bulb or info icon and a 2 to 4 line fact.
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
  const header = String(p.header ?? "DID YOU KNOW?").toUpperCase();
  const fact = String(p.fact ?? "Octopuses have three hearts and blue blood.");
  const icon = p.icon === "info" ? "info" : "bulb";
  const W = 900, PAD = 56, TEXT_W = W - 2 * PAD;

  let size = 50, lines: string[] = [];
  let mc = 0;
  for (const sz of [50, 46, 42, 40, 38, 36]) {
    size = sz;
    mc = Math.floor(TEXT_W / (sz * 0.56));
    lines = wrap(fact, mc);
    if (lines.length <= 4) break;
  }
  if (lines.length > 4) lines = [...lines.slice(0, 3), lines[3].slice(0, mc - 1) + "…"];

  const pillW = Math.round(header.length * 34 * 0.8 + 60);
  const lh = size * 1.32;
  const first = 196;
  const last = first + (lines.length - 1) * lh;
  const H = last + 76;

  const k = popIn(p.f, at, 12);
  const ePill = enter(p.f, at + 6, 12);
  const eIcon = popIn(p.f, at + 10, 12);
  const eText = enter(p.f, at + 16, 16);
  const glow = 0.25 + 0.15 * Math.sin(p.f * 0.2);
  const IX = W - 96, IY = 100;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <g transform={`translate(${-W / 2} ${-H / 2})`}>
        <Card x={0} y={0} w={W} h={H} u={u} r={30} />
        <g opacity={ePill} transform={`translate(${(1 - ePill) * -40} 0)`}>
          <rect x={PAD} y={44} width={pillW} height={60} rx={30} fill={u.accent} stroke={u.ink} strokeWidth={4} />
          <Txt x={PAD + pillW / 2} y={86} u={u} size={34} weight={900} fill={u.white} ls={1}>{header}</Txt>
        </g>
        <g transform={`translate(${IX} ${IY}) scale(${eIcon})`}>
          {icon === "bulb" ? (
            <g>
              <circle cx={0} cy={0} r={60} fill={u.warn} opacity={glow} />
              <circle cx={0} cy={0} r={44} fill={u.warn} stroke={u.ink} strokeWidth={5} />
              <circle cx={0} cy={-6} r={18} fill={u.white} opacity={0.85} />
              <rect x={-14} y={30} width={28} height={16} rx={4} fill={u.ink} />
              <path d="M-20 -48 L-26 -62 M0 -52 L0 -68 M20 -48 L26 -62" stroke={u.ink} strokeWidth={5} strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <circle cx={0} cy={0} r={44} fill={u.accent} stroke={u.ink} strokeWidth={5} />
              <rect x={-5} y={-16} width={10} height={30} rx={4} fill={u.white} />
              <circle cx={0} cy={-27} r={6} fill={u.white} />
            </g>
          )}
        </g>
        <g opacity={eText}>
          {lines.map((l, i) => (
            <Txt key={i} x={PAD} y={first + i * lh} u={u} size={size} weight={700} anchor="start">{l}</Txt>
          ))}
        </g>
      </g>
    </g>
  );
}

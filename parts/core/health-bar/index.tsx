import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, enter, Txt } from "../stat-card/index";

// Game health bar: a heart icon, a chunky bar that runs red -> yellow -> green with the value,
// a lighter ghost where health was lost, and a red flash while it falls.
// `value` 0..1 (animate with [from, to]); `from` is the value before this shot, for the ghost and flash.
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixHex = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};
const HEART = "M50 88 C20 66 0 46 0 26 C0 10 12 0 27 0 C38 0 46 7 50 15 C54 7 62 0 73 0 C88 0 100 10 100 26 C100 46 80 66 50 88 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const v = clamp(Number(p.value ?? 0.7));
  const from = typeof p.from === "number" ? clamp(p.from) : v;
  const falling = v < from - 0.01 && p.t < 0.6;
  const W = 860, BAR_H = 84, HEART_X = -W / 2 + 64;
  const x0 = -W / 2 + 150, BL = W / 2 - x0, inner = BL - 16;
  const k = popIn(p.f, at, 12);
  const eBar = enter(p.f, at + 4, 16);
  const shake = falling ? Math.sin(p.f * 2.9) * 6 : 0;
  const beat = falling ? 1 + 0.12 * Math.max(0, Math.sin(p.f * 0.9)) : 1;
  const hit = falling ? 0.55 * Math.max(0, Math.sin(p.f * 0.7)) : 0;

  const col = v < 0.5 ? mixHex(u.bad, u.warn, v * 2) : mixHex(u.warn, u.good, (v - 0.5) * 2);
  const fillW = Math.max(0, inner * v * eBar);
  const ghostW = Math.max(0, inner * (from - v) * eBar);
  const ghostOp = falling ? 0.85 * (1 - clamp(p.t / 0.6)) + 0.15 : 0;
  const pct = `${Math.round(v * 100)}%`;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      {p.label ? <Txt x={x0} y={-BAR_H / 2 - 22} u={u} size={36} weight={900} anchor="start" ls={4}>{String(p.label)}</Txt> : null}
      <g transform={`translate(${HEART_X + shake} 0) scale(${1.25 * beat}) translate(-50 -44)`}>
        <path d={HEART} fill={u.bad} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
        <path d="M22 22 C22 14 28 10 34 10" fill="none" stroke={u.white} strokeWidth={6} strokeLinecap="round" opacity={0.7} />
      </g>
      <rect x={x0} y={-BAR_H / 2} width={BL} height={BAR_H} rx={BAR_H / 2} fill={u.soft} stroke={u.ink} strokeWidth={7} />
      <rect x={x0 + 8} y={-BAR_H / 2 + 8} width={fillW} height={BAR_H - 16} rx={(BAR_H - 16) / 2} fill={col} />
      {ghostW > 0 ? (
        <rect x={x0 + 8 + fillW} y={-BAR_H / 2 + 8} width={ghostW} height={BAR_H - 16} fill={u.white} opacity={ghostOp} />
      ) : null}
      <rect x={x0 + 8} y={-BAR_H / 2 + 10} width={Math.max(0, fillW - 8)} height={(BAR_H - 16) * 0.3} rx={8} fill={u.white} opacity={0.35} />
      {[0.25, 0.5, 0.75].map((q) => (
        <rect key={q} x={x0 + 8 + inner * q - 2} y={-BAR_H / 2 + 8} width={4} height={BAR_H - 16} fill={u.card} opacity={0.6} />
      ))}
      <rect x={x0 + 8} y={-BAR_H / 2 + 8} width={Math.max(0, fillW)} height={BAR_H - 16} rx={(BAR_H - 16) / 2} fill={u.bad} opacity={hit} />
      <Txt x={x0 + BL / 2} y={16} u={u} size={44} weight={900} fill={u.white} stroke={u.ink} sw={8}>{pct}</Txt>
    </g>
  );
}

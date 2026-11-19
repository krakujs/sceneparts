import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, count, fmt, Txt } from "../stat-card/index";

// Like prompt: an outline heart that gets tapped, fills red, bursts small hearts and the count ticks up.
const HEART = "M0 50 C-130 -30 -90 -120 0 -50 C90 -120 130 -30 0 50 Z";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const click = at + (p.clickAt ?? 24);
  const base = Number(p.likes ?? 1200);
  const red = p.color ?? u.bad;
  const k = popIn(p.f, at, 12);
  const liked = p.f >= click;
  const ft = clamp((p.f - click) / 8);
  const pt = clamp((p.f - click) / 12);
  const press = liked ? 1 + 0.3 * Math.sin(pt * Math.PI) : 1;
  const bt = clamp((p.f - click) / 16);
  const bEase = 1 - (1 - bt) * (1 - bt);
  const shown = Math.round(count(p.f, base, base + 1, click, 10));
  const hx = -150, hy = 0;
  const minis = [-160, -132, -104, -76, -48, -20].map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const dist = 110 + 110 * bEase;
    return { x: hx + Math.cos(a) * dist, y: hy + Math.sin(a) * dist, o: liked ? 1 - bt : 0, r: deg + 90, i };
  });
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <g transform={`translate(${hx} ${hy}) scale(${1.0 * press})`}>
        <path d={HEART} fill={liked ? mixHex(u.white, red, ft) : u.white} stroke={u.ink} strokeWidth={12} strokeLinejoin="round" />
      </g>
      {minis.map((m) => (
        <g key={m.i} transform={`translate(${m.x} ${m.y}) rotate(${m.r * 0.2}) scale(0.2)`} opacity={m.o}>
          <path d={HEART} fill={red} />
        </g>
      ))}
      <Txt x={-20} y={24} u={u} size={84} weight={900} anchor="start" fill={u.ink}>{fmt(shown)}</Txt>
    </g>
  );
}

// Blend two hex colours; falls back to the target colour for non-hex input.
function mixHex(a: string, b: string, t: number) {
  if (!/^#[0-9a-fA-F]{6}$/.test(a) || !/^#[0-9a-fA-F]{6}$/.test(b)) return t < 0.5 ? a : b;
  const A = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const B = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
}

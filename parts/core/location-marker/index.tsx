import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, Card, Txt } from "../stat-card/index";

// Location marker: a flat accent dot with radar rings that keep pulsing outwards, and a small label card above it.
// x,y = centre of the dot.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const f = p.f - at;
  const dot = popIn(p.f, at, 12);
  const lab = String(p.label ?? "You are here");
  const H = 70;
  const W = Math.max(240, Math.min(780, lab.length * 28 + 70));
  const lk = popIn(p.f, at + 8, 12);
  const rings = [0, 1, 2].map((i) => {
    const ph = (f / 42 + i / 3) % 1;
    return { r: 34 + ph * 120, o: (1 - ph) * 0.7 * clamp(f / 8) };
  });
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      {rings.map((g, i) => (
        <circle key={i} cx={0} cy={0} r={g.r} fill="none" stroke={u.accent} strokeWidth={6} opacity={g.o} />
      ))}
      <circle cx={0} cy={0} r={30 * dot} fill={u.accent} stroke={u.ink} strokeWidth={6} />
      <circle cx={-10} cy={-11} r={8 * dot} fill={u.white} opacity={0.75} />
      <g transform={`translate(0 -54) scale(${lk})`}>
        <path d="M-14 -22 L0 0 L14 -22 Z" fill={u.card} stroke={u.ink} strokeWidth={5} strokeLinejoin="round" />
        <Card x={-W / 2} y={-22 - H} w={W} h={H} u={u} r={H / 2} />
        <rect x={-13} y={-26} width={26} height={6} fill={u.card} />
        <Txt x={0} y={-22 - H / 2 + 13} u={u} size={38} weight={800} maxW={W - 40}>{lab}</Txt>
      </g>
    </g>
  );
}

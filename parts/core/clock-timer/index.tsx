import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, Txt } from "../stat-card/index";

// Round analogue clock or stopwatch face with ticks and numbers; the hand sweeps `turns` times over the shot.
// x,y = centre, r = radius, turns = number of full sweeps, color = hand colour.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const R = p.r ?? 230;
  const turns = Number(p.turns ?? 1);
  const t = clamp((p.f - at) / Math.max(1, p.d - at));
  const ang = -90 + 360 * turns * t;
  const k = popIn(p.f, at, 12);
  const size = R * 0.22;
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const big = i % 5 === 0;
    const r1 = R * (big ? 0.78 : 0.88), r2 = R * 0.94;
    return (
      <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
        stroke={u.ink} strokeWidth={big ? 12 : 4} strokeLinecap="round" />
    );
  });
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <circle cx={0} cy={0} r={R} fill={u.card} stroke={u.ink} strokeWidth={10} />
      {ticks}
      {[["12", -90], ["3", 0], ["6", 90], ["9", 180]].map(([label, a]) => {
        const rad = ((a as number) * Math.PI) / 180;
        return (
          <Txt key={String(label)} x={Math.cos(rad) * R * 0.6} y={Math.sin(rad) * R * 0.6 + size * 0.36} u={u} size={size} weight={800}>{String(label)}</Txt>
        );
      })}
      <g transform={`rotate(${ang})`}>
        <line x1={-R * 0.14} y1={0} x2={R * 0.74} y2={0} stroke={u.ink} strokeWidth={22} strokeLinecap="round" />
        <line x1={-R * 0.14} y1={0} x2={R * 0.74} y2={0} stroke={u.accent} strokeWidth={12} strokeLinecap="round" />
      </g>
      <circle cx={0} cy={0} r={16} fill={u.ink} />
      <rect x={-10} y={-R - 14} width={20} height={20} fill={u.ink} />
      <rect x={-24} y={-R - 44} width={48} height={34} rx={8} fill={u.accent} stroke={u.ink} strokeWidth={6} />
    </g>
  );
}

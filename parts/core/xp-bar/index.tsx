import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, count, fmt, Txt } from "../stat-card/index";

// Game experience bar: a chunky "LV 7" chip at the left, a segmented bar filling to `value` (0..1)
// with a gloss highlight, and an "XP" count underneath. x, y = centre.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const W = 900, CHIP_W = 190, CHIP_H = 120, BAR_H = 72;
  const value = Math.min(1, Math.max(0, Number(p.value ?? 0.62)));
  const max = Math.max(1, Number(p.max ?? 2000));
  const segs = Math.max(1, Math.round(Number(p.segments ?? 10)));
  const level = String(p.level ?? 7);

  const bx = -W / 2 + CHIP_W - 16;
  const bw = W / 2 - bx;
  const inner = bw - 16;
  const eFill = enter(p.f, at + 6, 26);
  const fillW = inner * value * eFill;
  const xpNow = count(p.f, 0, value * max, at + 6, 26);

  const seps: React.ReactNode[] = [];
  for (let i = 1; i < segs; i++) {
    seps.push(<rect key={i} x={bx + 8 + (inner * i) / segs - 2.5} y={-BAR_H / 2 + 8} width={5} height={BAR_H - 16} fill={u.card} />);
  }

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <rect x={-W / 2} y={-CHIP_H / 2} width={CHIP_W} height={CHIP_H} rx={26} fill={u.ink} stroke={u.ink} strokeWidth={6} />
      <rect x={-W / 2 + 8} y={-CHIP_H / 2 + 8} width={CHIP_W - 16} height={CHIP_H - 16} rx={20} fill="none" stroke={u.white} strokeWidth={2} opacity={0.35} />
      <Txt x={-W / 2 + CHIP_W / 2} y={18} u={u} size={60} weight={900} fill={u.white} maxW={CHIP_W - 24}>{`LV ${level}`}</Txt>
      <rect x={bx} y={-BAR_H / 2} width={bw} height={BAR_H} rx={22} fill={u.soft} stroke={u.ink} strokeWidth={6} />
      <rect x={bx + 8} y={-BAR_H / 2 + 8} width={Math.max(0, fillW)} height={BAR_H - 16} rx={14} fill={u.accent} />
      <rect x={bx + 8} y={-BAR_H / 2 + 10} width={Math.max(0, fillW - 8)} height={(BAR_H - 16) * 0.32} rx={7} fill={u.white} opacity={0.4} />
      {seps}
      <Txt x={W / 2} y={BAR_H / 2 + 58} u={u} size={40} weight={800} anchor="end">
        {`${fmt(Math.round(xpNow))} / ${fmt(max)} XP`}
      </Txt>
    </g>
  );
}

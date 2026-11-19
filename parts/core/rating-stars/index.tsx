import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, count, fmt, Card, Txt } from "../stat-card/index";

// Rating stars: five stars fill one after another up to `value` (0..5, halves allowed),
// with "4.5 / 5" under them and an optional review count.

/* eslint-disable @typescript-eslint/no-explicit-any */
const starPath = (cx: number, cy: number, R: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = ((-90 + i * 36) * Math.PI) / 180;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M ${pts.join(" L ")} Z`;
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const val = Math.max(0, Math.min(5, Number(p.value ?? 0)));
  const shown = count(p.f, 0, val, at, 50);
  const R = 84, r = 38, cy = -120;
  const cid = `rs${Math.round(p.x ?? 540)}_${Math.round(p.y ?? 960)}_${Math.round(s * 100)}`;
  const xs = [0, 1, 2, 3, 4].map((i) => i * 180 - 360);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-480} y={-260} w={960} h={520} u={u} />
      <defs>
        {xs.map((cx, i) => {
          const frac = Math.max(0, Math.min(1, val - i));
          const t = enter(p.f, at + i * 10, 12);
          return (
            <clipPath key={i} id={`${cid}_${i}`}>
              <rect x={cx - R} y={cy - R} width={Math.max(0, 2 * R * frac * t)} height={2 * R} />
            </clipPath>
          );
        })}
      </defs>
      {xs.map((cx, i) => {
        const sc = popIn(p.f, at + i * 10, 10);
        const d = starPath(cx, cy, R, r);
        return (
          <g key={i} transform={`translate(${cx} ${cy}) scale(${sc}) translate(${-cx} ${-cy})`}>
            <path d={d} fill={u.soft} stroke={u.cardEdge} strokeWidth={5} strokeLinejoin="round" />
            <path d={d} fill={u.accent} stroke={u.cardEdge} strokeWidth={5} strokeLinejoin="round" clipPath={`url(#${cid}_${i})`} />
          </g>
        );
      })}
      <Txt x={0} y={110} u={u} size={120} weight={900} maxW={860}>{`${fmt(Math.round(shown * 10) / 10, 1)} / 5`}</Txt>
      {p.reviews != null && p.reviews !== "" ? (
        <Txt x={0} y={200} u={u} size={46} weight={700} fill={u.muted} maxW={800}>
          {`${fmt(count(p.f, 0, Number(p.reviews), at + 10, 40), 0)} ${p.reviewsLabel ?? "reviews"}`}
        </Txt>
      ) : null}
    </g>
  );
}

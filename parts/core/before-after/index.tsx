import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Before / after: one card split in two halves with a slider handle that sweeps across.
// The halves show neutral placeholder shapes (muted rough layout vs accent tidy layout), no content needed.

/* eslint-disable @typescript-eslint/no-explicit-any */
const BEFORE: [number, number, number][] = [[-400, 560, -160], [-380, 300, -80], [-410, 700, 0], [-360, 420, 80], [-400, 240, 160]];
const AFTER: [number, number, number][] = [[-400, 800, -160], [-400, 800, -80], [-400, 700, 0], [-400, 520, 80], [-400, 320, 160]];

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 12);
  const W = 900, H = 600, X0 = -450, Y0 = -300;
  const g = enter(p.f, at, 50);
  const idle = Math.sin((p.f - at) / 25) * 18 * enter(p.f, at + 50, 20);
  const pos = 420 * (1 - g) + idle;
  const cid = `ba${Math.round(p.x ?? 540)}_${Math.round(p.y ?? 960)}_${Math.round(s * 100)}`;
  const bl = String(p.beforeLabel ?? "BEFORE"), al = String(p.afterLabel ?? "AFTER");
  const bw = bl.length * 30 + 50, aw = al.length * 30 + 50;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <defs>
        <clipPath id={`${cid}c`}><rect x={X0} y={Y0} width={W} height={H} rx={28} /></clipPath>
        <clipPath id={`${cid}L`}><rect x={X0} y={Y0} width={Math.max(0, pos - X0)} height={H} /></clipPath>
        <clipPath id={`${cid}R`}><rect x={pos} y={Y0} width={Math.max(0, X0 + W - pos)} height={H} /></clipPath>
      </defs>
      <Card x={X0} y={Y0} w={W} h={H} u={u} />
      <g clipPath={`url(#${cid}c)`}>
        <g clipPath={`url(#${cid}L)`}>
          <rect x={X0} y={Y0} width={W} height={H} fill={u.soft} />
          {BEFORE.map(([x, w, y], i) => <rect key={i} x={x} y={y - 22} width={w} height={44} rx={22} fill={u.muted} opacity={0.45} />)}
          <rect x={X0 + 30} y={Y0 + 30} width={bw} height={60} rx={30} fill={u.muted} />
          <Txt x={X0 + 30 + bw / 2} y={Y0 + 72} u={u} size={34} weight={900} fill={u.white}>{bl}</Txt>
        </g>
        <g clipPath={`url(#${cid}R)`}>
          <rect x={X0} y={Y0} width={W} height={H} fill={u.card} />
          {AFTER.map(([x, w, y], i) => <rect key={i} x={x} y={y - 22} width={w} height={44} rx={22} fill={u.accent} />)}
          <rect x={X0 + W - 30 - aw} y={Y0 + 30} width={aw} height={60} rx={30} fill={u.accent} />
          <Txt x={X0 + W - 30 - aw / 2} y={Y0 + 72} u={u} size={34} weight={900} fill={u.white}>{al}</Txt>
        </g>
      </g>
      <line x1={pos} x2={pos} y1={Y0} y2={Y0 + H} stroke={u.cardEdge} strokeWidth={16} />
      <line x1={pos} x2={pos} y1={Y0} y2={Y0 + H} stroke={u.white} strokeWidth={7} />
      <g transform={`translate(${pos} 0)`}>
        <circle r={46} fill={u.white} stroke={u.cardEdge} strokeWidth={6} />
        <path d="M -26 0 L -14 -12 L -14 12 Z" fill={u.cardEdge} />
        <path d="M 26 0 L 14 -12 L 14 12 Z" fill={u.cardEdge} />
      </g>
      <rect x={X0} y={Y0} width={W} height={H} rx={28} fill="none" stroke={u.cardEdge} strokeWidth={5} />
    </g>
  );
}

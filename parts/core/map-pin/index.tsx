import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, Card, Txt } from "../stat-card/index";

// Map pin: accent teardrop with a white centre. It drops in with a bounce and a shadow on the ground.
// x,y = the pin's tip (the spot on the map). Optional label bubble above the head.
/* eslint-disable @typescript-eslint/no-explicit-any */
const PIN = "M0 0 C-22 -40 -62 -62 -62 -108 A62 62 0 1 1 62 -108 C62 -62 22 -40 0 0 Z";
const DROP = 340; // height the pin falls from
const LAND = 20; // frames of fall before the bounce

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const f = p.f - at;
  const t = clamp(f / LAND);
  const fall = DROP * (1 - t * t); // gravity: accelerates onto the tip
  const bu = clamp((f - LAND) / 14);
  const bounce = bu > 0 && bu < 1 ? -24 * Math.sin(bu * Math.PI) * (1 - bu * 0.5) : 0;
  const squash = bu > 0 && bu < 0.2 ? 1 - 0.1 * Math.sin((bu / 0.2) * Math.PI) : 1;
  const pinY = -fall + bounce;
  const shadow = enter(p.f, at, 6) * (0.35 + 0.65 * t * t);
  const lab = String(p.label ?? "");
  const H = 68;
  const lw = Math.max(180, Math.min(820, lab.length * 28 + 70));
  const lk = popIn(p.f, at + LAND, 12);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={50 * (0.6 + 0.4 * shadow)} ry={15 * (0.6 + 0.4 * shadow)} fill="rgba(0,0,0,0.22)" opacity={shadow} />
      <g transform={`translate(0 ${pinY}) scale(1 ${squash})`}>
        <path d={PIN} fill={u.accent} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={0} cy={-108} r={24} fill={u.white} stroke={u.ink} strokeWidth={4} />
      </g>
      {lab ? (
        <g transform={`translate(0 ${pinY - 176}) scale(${lk})`}>
          <path d="M-14 -22 L0 0 L14 -22 Z" fill={u.card} stroke={u.ink} strokeWidth={5} strokeLinejoin="round" />
          <Card x={-lw / 2} y={-22 - H} w={lw} h={H} u={u} r={H / 2} />
          <rect x={-13} y={-26} width={26} height={6} fill={u.card} />
          <Txt x={0} y={-22 - H / 2 + 13} u={u} size={38} weight={800} maxW={lw - 40}>{lab}</Txt>
        </g>
      ) : null}
    </g>
  );
}

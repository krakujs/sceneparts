import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, fitSize, Txt } from "../stat-card/index";

// Mention tag: a pill chip "@name" with a small generic avatar circle; pops in.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const name = String(p.name ?? "alex").replace(/^@+/, "").replace(/\s+/g, "");
  const label = "@" + name;
  const H = 128, AV = 48;
  const fs = fitSize(label, 58, 600, 0.6);
  const textW = label.length * fs * 0.6;
  const W = H + 30 + textW + 60;
  const sc = popIn(p.f, at, 12);
  const tx = -W / 2 + H + 16;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1400}) scale(${(p.s ?? 1) * sc})`}>
      <rect x={-W / 2 + 8} y={-H / 2 + 12} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.18)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.card} stroke={u.ink} strokeWidth={6} />
      <g transform={`translate(${-W / 2 + H / 2} 0)`}>
        <circle r={AV} fill={u.accent} stroke={u.ink} strokeWidth={5} />
        <circle cx={0} cy={-10} r={16} fill={u.white} />
        <path d="M-30 38 Q-30 6 0 6 Q30 6 30 38 Z" fill={u.white} />
      </g>
      <Txt x={tx} y={fs * 0.36} u={u} size={fs} weight={900} anchor="start">{label}</Txt>
    </g>
  );
}

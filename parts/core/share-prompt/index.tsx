import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, Txt } from "../stat-card/index";

// Share prompt: a pill with a paper-plane icon that gets tapped; the plane flies off with a dotted trail.
const PLANE = "M-34 -26 L40 0 L-34 26 L-22 0 Z";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const W = p.w ?? 460, H = 130;
  const click = at + (p.clickAt ?? 24);
  const k = popIn(p.f, at, 12);
  const pressT = clamp((p.f - click) / 6);
  const press = p.f < click || pressT >= 1 ? 1 : 1 - 0.06 * Math.sin(pressT * Math.PI);
  const ft = clamp((p.f - click) / 22);
  const ease = 1 - (1 - ft) * (1 - ft);
  const fade = clamp((p.f - click - 14) / 10);
  const accent = p.color ?? u.accent;
  const sx = -W / 2 + 90, sy = 0;
  const dx = 300 * ease, dy = -240 * ease;
  const planeOp = p.f >= click ? 1 - fade : 1;
  const trail = [1, 2, 3, 4, 5].map((i) => ({ x: sx + (dx * i) / 6, y: sy + (dy * i) / 6, o: ft * (i / 6) * (1 - fade) }));
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1000}) scale(${(p.s ?? 1) * k * press})`}>
      <rect x={-W / 2 + 6} y={-H / 2 + 12} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.2)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={accent} stroke={u.ink} strokeWidth={6} />
      <Txt x={50} y={20} u={u} size={60} weight={900} fill={u.white}>Share</Txt>
      {trail.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={8} fill={u.white} opacity={d.o} />
      ))}
      <g transform={`translate(${sx + dx} ${sy + dy}) rotate(-30)`} opacity={planeOp}>
        <path d={PLANE} fill={u.white} stroke={u.ink} strokeWidth={4} strokeLinejoin="round" />
      </g>
    </g>
  );
}

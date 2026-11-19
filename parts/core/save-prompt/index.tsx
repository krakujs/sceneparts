import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, Txt } from "../stat-card/index";

// Save prompt: a bookmark icon in a pill that is tapped (ripple), fills in and the label switches to "Saved".
const BM = "M-34 -50 L34 -50 L34 56 L0 26 L-34 56 Z";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const W = p.w ?? 440, H = 130;
  const click = at + (p.clickAt ?? 24);
  const k = popIn(p.f, at, 12);
  const pressT = clamp((p.f - click) / 6);
  const press = p.f < click || pressT >= 1 ? 1 : 1 - 0.06 * Math.sin(pressT * Math.PI);
  const sw = clamp((p.f - click - 4) / 10);
  const sw2 = sw * sw * (3 - 2 * sw);
  const rip = p.f >= click ? clamp((p.f - click) / 18) : -1;
  const bmScale = p.f >= click ? 1 + 0.18 * Math.sin(clamp((p.f - click) / 12) * Math.PI) : 1;
  const accent = p.color ?? u.accent;
  const lx = -W / 2 + 90;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1000}) scale(${(p.s ?? 1) * k * press})`}>
      <rect x={-W / 2 + 6} y={-H / 2 + 12} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.2)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.card} stroke={u.ink} strokeWidth={6} />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={accent} opacity={sw2} />
      {rip >= 0 && rip < 1 ? (
        <circle cx={0} cy={0} r={W * 0.1 + rip * W * 0.5} fill="none" stroke={u.ink} strokeWidth={8} opacity={1 - rip} />
      ) : null}
      <g transform={`translate(${lx} 0) scale(${bmScale * 0.9})`}>
        <path d={BM} fill={u.white} opacity={sw2} />
        <path d={BM} fill="none" stroke={sw2 > 0.5 ? u.white : u.ink} strokeWidth={8} strokeLinejoin="round" />
      </g>
      <g opacity={1 - sw2}>
        <Txt x={50} y={20} u={u} size={60} weight={900} fill={u.ink}>Save</Txt>
      </g>
      <g opacity={sw2}>
        <Txt x={50} y={20} u={u} size={60} weight={900} fill={u.white}>Saved</Txt>
      </g>
    </g>
  );
}

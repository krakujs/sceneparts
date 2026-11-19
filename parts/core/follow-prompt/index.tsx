import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, fitSize, Txt } from "../stat-card/index";

// Follow prompt: a pill with a person-plus icon and "Follow" that is tapped (ripple) and turns into "Following" with a tick.
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(a) || !/^#[0-9a-fA-F]{6}$/.test(b)) return t < 0.5 ? a : b;
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 520, H = 130;
  const red = p.color ?? u.accent;
  const k = popIn(p.f, at, 12);
  const click = at + (p.clickAt ?? 24);
  const pressT = clamp((p.f - click) / 6);
  const press = p.f < click || pressT >= 1 ? 1 : 1 - 0.06 * Math.sin(pressT * Math.PI);
  const sw = clamp((p.f - click - 6) / 10);
  const sw2 = sw * sw * (3 - 2 * sw);
  const rip = p.f >= click ? clamp((p.f - click) / 18) : -1;
  const fill = mix(red, u.muted, sw2);
  const tw = W - 300;
  const lx = -W / 2 + 80;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1000}) scale(${s * k * press})`}>
      <rect x={-W / 2 + 6} y={-H / 2 + 12} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.2)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={fill} stroke={u.ink} strokeWidth={6} />
      {rip >= 0 && rip < 1 ? (
        <circle cx={0} cy={0} r={W * 0.1 + rip * W * 0.55} fill="none" stroke={u.white} strokeWidth={8} opacity={1 - rip} />
      ) : null}
      <g opacity={1 - sw2} transform={`translate(${lx} 0)`}>
        <circle cx={-6} cy={-12} r={16} fill={u.white} stroke={u.ink} strokeWidth={3} />
        <path d="M-34 36 Q-34 2 -6 2 Q22 2 22 36 Z" fill={u.white} stroke={u.ink} strokeWidth={3} />
        <path d="M40 -10 L40 14 M28 2 L52 2" stroke={u.white} strokeWidth={8} strokeLinecap="round" />
      </g>
      <g opacity={sw2} transform={`translate(${lx} 0)`}>
        <path d="M-22 2 L-6 18 L24 -14" fill="none" stroke={u.white} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g opacity={1 - sw2}>
        <Txt x={40} y={20} u={u} size={fitSize("Follow", 56, tw)} weight={900} fill={u.white} ls={2} maxW={tw}>Follow</Txt>
      </g>
      <g opacity={sw2}>
        <Txt x={40} y={20} u={u} size={fitSize("Following", 56, tw)} weight={900} fill={u.white} ls={2} maxW={tw}>Following</Txt>
      </g>
    </g>
  );
}

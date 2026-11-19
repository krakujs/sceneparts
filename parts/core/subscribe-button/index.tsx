import React from "react";
import { ui, startFrame, enter, popIn, fitSize, Txt, type UI } from "../stat-card/index";
import { clamp, type PartProps } from "@sceneparts/core";

// Subscribe pill: pops in, is pressed at `clickAt` with a ripple, then switches to a grey SUBSCRIBED with a tick.
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(a) || !/^#[0-9a-fA-F]{6}$/.test(b)) return t < 0.5 ? a : b;
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};
const BELL = "M-14 6 L-14 -4 Q-14 -18 0 -18 Q14 -18 14 -4 L14 6 L19 14 L-19 14 Z";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 640, H = 140;
  const red = p.color ?? u.bad;
  const grey = u.muted;
  const k = popIn(p.f, at, 12);
  const click = at + (p.clickAt ?? 24);
  const pressT = clamp((p.f - click) / 6);
  const press = p.f < click ? 1 : pressT < 1 ? 1 - 0.06 * Math.sin(pressT * Math.PI) : 1;
  const sw = clamp((p.f - click - 6) / 10); // colour and text switch, 0..1
  const sw2 = (sw * sw * (3 - 2 * sw)); // smoothstep
  const rippleT = clamp((p.f - click) / 18);
  const ripple = p.f >= click ? rippleT : -1;
  const fill = mix(red, grey, sw2);
  const tw = W - 300;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1000}) scale(${s * k * press})`}>
      <rect x={-W / 2 + 6} y={-H / 2 + 12} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.2)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={fill} stroke={u.ink} strokeWidth={6} />
      {ripple >= 0 && ripple < 1 ? (
        <circle cx={0} cy={0} r={W * 0.1 + ripple * W * 0.55} fill="none" stroke={u.white} strokeWidth={8} opacity={1 - ripple} />
      ) : null}
      <g opacity={1 - sw2} transform={`translate(${-W / 2 + 80} 0)`}>
        <path d={BELL} fill={u.white} stroke={u.ink} strokeWidth={3} />
        <circle cx={0} cy={22} r={5} fill={u.white} />
      </g>
      <g opacity={sw2} transform={`translate(${-W / 2 + 80} 0)`}>
        <path d="M-22 2 L-6 18 L24 -14" fill="none" stroke={u.white} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g opacity={1 - sw2}>
        <Txt x={40} y={20} u={u} size={fitSize("SUBSCRIBE", 52, tw)} weight={900} fill={u.white} ls={3} maxW={tw}>SUBSCRIBE</Txt>
      </g>
      <g opacity={sw2}>
        <Txt x={40} y={20} u={u} size={fitSize("SUBSCRIBED", 52, tw)} weight={900} fill={u.white} ls={3} maxW={tw}>SUBSCRIBED</Txt>
      </g>
    </g>
  );
}

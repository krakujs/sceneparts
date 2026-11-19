import React from "react";
import { ui, startFrame, enter, popIn, count, fmt, fitSize, Txt, type UI } from "../stat-card/index";
import { clamp, type PartProps } from "@sceneparts/core";

// Follower counter: person silhouette pill, count running up to `value`, then a green "+gain" floats up and fades.
const shortN = (n: number, on: boolean) => {
  const a = Math.abs(n);
  if (!on) return fmt(n, 0);
  const one = (v: number) => v.toFixed(1).replace(/\.0$/, "");
  if (a >= 1e6) return `${one(n / 1e6)}M`;
  if (a >= 1000) return `${one(n / 1000)}K`;
  return fmt(n, 0);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = 600, H = 190, ix = -W / 2 + 118;
  const k = popIn(p.f, at, 12);
  const pill = enter(p.f, at, 8);
  const len = p.len ?? 30;
  const v = count(p.f, Number(p.from ?? 0), Number(p.value ?? 0), at + 4, len);
  const num = shortN(Math.round(v), !!p.short);
  const raw = (p.f - (at + len + 4)) / 10;
  const bt = clamp(raw);
  const bumpOp = raw <= 0 || raw >= 1 ? 0 : 1 - raw;
  const gain = p.gain == null ? "" : `+${fmt(Number(p.gain), 0, "", "", !!p.short)}`;
  const tw = W - 260;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <rect x={-W / 2 + 8} y={-H / 2 + 14} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.18)" opacity={pill} />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.white} stroke={u.ink} strokeWidth={6} opacity={pill} />
      <g transform={`translate(${ix} 0)`} opacity={pill}>
        <circle cx={0} cy={-26} r={30} fill={p.color ?? u.accent} stroke={u.ink} strokeWidth={6} />
        <path d="M-52 58 Q-52 10 0 10 Q52 10 52 58 Z" fill={p.color ?? u.accent} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
      </g>
      <Txt x={-W / 2 + 220} y={38} u={u} size={fitSize(num, 100, tw)} weight={900} anchor="start" maxW={tw} opacity={pill}>{num}</Txt>
      {gain && p.gain ? (
        <g opacity={bumpOp} transform={`translate(${W / 2 - 70} ${-H / 2 + 30 - bt * 60})`}>
          <rect x={-70} y={-34} width={140} height={58} rx={29} fill={u.good} stroke={u.ink} strokeWidth={4} />
          <Txt x={0} y={8} u={u} size={fitSize(gain, 34, 120)} weight={900} fill={u.white} maxW={120}>{gain}</Txt>
        </g>
      ) : null}
    </g>
  );
}

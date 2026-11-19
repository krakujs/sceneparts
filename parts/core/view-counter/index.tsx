import React from "react";
import { ui, startFrame, enter, popIn, count, fmt, fitSize, Txt, type UI } from "../stat-card/index";
import { clamp, type PartProps } from "@sceneparts/core";

// View counter: pill with an eye icon; the eye opens (lid sweep) as the count runs up to `value`.
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
  const W = 600, H = 190, ex = -W / 2 + 118;
  const pill = enter(p.f, at, 8);
  const k = popIn(p.f, at, 12);
  const open = enter(p.f, at + 2, 14);
  const v = count(p.f, Number(p.from ?? 0), Number(p.value ?? 0), at + 4, p.len ?? 34);
  const num = shortN(Math.round(v), !!p.short);
  const cap = String(p.caption ?? "views");
  const lidY = 40 * (1 - open);
  const tw = W - 260;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <rect x={-W / 2 + 8} y={-H / 2 + 14} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.18)" opacity={pill} />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.white} stroke={u.ink} strokeWidth={6} opacity={pill} />
      <g transform={`translate(${ex} 0)`} opacity={pill}>
        <path d="M-74 0 Q0 -70 74 0 Q0 70 -74 0 Z" fill={u.white} stroke={u.ink} strokeWidth={7} strokeLinejoin="round" />
        <circle cx={0} cy={0} r={28} fill={p.color ?? u.accent} stroke={u.ink} strokeWidth={5} />
        <circle cx={0} cy={0} r={10} fill={u.ink} />
        <circle cx={9} cy={-9} r={5} fill={u.white} />
        <rect x={-80} y={-80 + lidY} width={160} height={80} fill={u.white} opacity={1 - open} />
      </g>
      <Txt x={-W / 2 + 220} y={-2} u={u} size={fitSize(num, 100, tw)} weight={900} anchor="start" maxW={tw} opacity={pill}>{num}</Txt>
      <Txt x={-W / 2 + 224} y={56} u={u} size={fitSize(cap, 38, tw)} weight={700} anchor="start" fill={u.muted} maxW={tw} opacity={pill * clamp(open + 0.2)}>{cap}</Txt>
    </g>
  );
}

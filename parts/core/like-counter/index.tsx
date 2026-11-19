import React from "react";
import { ui, startFrame, enter, popIn, count, fmt, fitSize, Txt, type UI } from "../stat-card/index";
import { clamp, type PartProps } from "@sceneparts/core";

// Like counter: heart pill with a counting number. On start the heart pops, then six small hearts burst outwards once.
const HEART = "M0 28 C-64 -12 -44 -58 0 -24 C44 -58 64 -12 0 28 Z";
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
  const W = 540, H = 190, hx = -W / 2 + 120;
  const pill = enter(p.f, at, 8);
  const heartPop = popIn(p.f, at, 12);
  const pulse = 1 + 0.12 * Math.sin(clamp((p.f - at - 12) / 10) * Math.PI) * (p.f > at + 12 ? 1 : 0);
  const v = count(p.f, Number(p.from ?? 0), Number(p.value ?? 0), at + 4, p.len ?? 34);
  const num = shortN(Math.round(v), !!p.short);
  const bt = clamp((p.f - at) / 26);
  const burst = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (-150 + i * 60) * Math.PI / 180;
    const r = 70 + 150 * (1 - Math.pow(1 - bt, 3));
    return { x: hx + Math.cos(a) * r, y: Math.sin(a) * r, o: 1 - bt, sc: 0.35 + 0.25 * (1 - bt) };
  });
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      <g opacity={pill}>
        <rect x={-W / 2 + 8} y={-H / 2 + 14} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.18)" />
        <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.white} stroke={u.ink} strokeWidth={6} />
      </g>
      {p.f > at ? burst.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.sc})`} opacity={b.o * pill}>
          <path d={HEART} fill={u.accent} stroke={u.ink} strokeWidth={6} />
        </g>
      )) : null}
      <g transform={`translate(${hx} 0) scale(${heartPop * pulse * 1.05})`} opacity={pill}>
        <path d={HEART} fill={p.color ?? u.accent} stroke={u.ink} strokeWidth={7} strokeLinejoin="round" />
      </g>
      <Txt x={-W / 2 + 220} y={38} u={u} size={fitSize(num, 110, W - 260)} weight={900} anchor="start" maxW={W - 260} opacity={pill}>{num}</Txt>
    </g>
  );
}

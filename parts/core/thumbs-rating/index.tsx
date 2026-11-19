import React from "react";
import { ui, startFrame, enter, popIn, count, fmt, Txt, type UI } from "../stat-card/index";
import { clamp, type PartProps } from "@sceneparts/core";

// Thumbs up / thumbs down rating: two round buttons with clear thumb icons and their counts. At `pickAt` frames
// after the start the chosen button fills, pops and its count ticks up by one. Centred on (x, y).
/* eslint-disable @typescript-eslint/no-explicit-any */

/** Thumbs-up icon, about 150 × 170 px, centred on (0, 0): sleeve on the left, fist with wrapped fingers, thumb up. */
export function Thumb(q: { ink: string; fill: string; sleeve: string; sw?: number }) {
  const sw = q.sw ?? 8;
  const st = { stroke: q.ink, strokeWidth: sw, strokeLinejoin: "round" as const };
  return (
    <g transform="translate(-14 -6)">
      {/* thumb: a rounded upright stub leaning slightly back */}
      <path d="M -22 -6 L -14 -64 Q -10 -96 16 -92 Q 38 -88 32 -58 L 24 -10 Z" fill={q.fill} {...st} />
      {/* fist */}
      <rect x={-34} y={-14} width={104} height={100} rx={26} fill={q.fill} {...st} />
      {/* four wrapped fingers stacked on the right */}
      {[-14, 11, 36, 61].map((fy, i) => (
        <rect key={i} x={34} y={fy} width={50} height={25} rx={12.5} fill={q.fill} {...st} />
      ))}
      {/* sleeve cuff */}
      <rect x={-70} y={-20} width={40} height={112} rx={10} fill={q.sleeve} {...st} />
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const x = p.x ?? 540, y = p.y ?? 960;
  const f = p.f ?? 0;
  const pick: string = p.pick ?? "up";
  const pickAt = at + (p.pickAt ?? 20);
  const up0 = Number(p.up ?? 1240), down0 = Number(p.down ?? 36);
  const k = at <= 0 ? 1 : enter(f, at, 12);
  const pk = clamp((f - pickAt) / 10);
  const bump = f >= pickAt ? popIn(f, pickAt, 12) : 1;
  const btn = (side: number, isUp: boolean) => {
    const on = pick === (isUp ? "up" : "down");
    const col = isUp ? (p.color ?? u.good) : (p.color2 ?? u.bad);
    const active = on ? pk : 0;
    const base = isUp ? up0 : down0;
    const n = on ? Math.round(count(f, base, base + 1, pickAt, 6)) : base;
    const sc = on && f >= pickAt ? 0.85 + 0.15 * bump : 1;
    return (
      <g transform={`translate(${side * 180} 0)`}>
        <g transform={`scale(${sc})`}>
          <circle cx={6} cy={10} r={120} fill="rgba(0,0,0,0.16)" />
          <circle cx={0} cy={0} r={120} fill={u.card} stroke={u.ink} strokeWidth={8} />
          <circle cx={0} cy={0} r={120} fill={col} opacity={active} />
          <g transform={isUp ? "scale(0.82)" : "scale(0.82 -0.82)"}>
            <Thumb ink={u.ink} fill={active > 0.5 ? u.white : col} sleeve={active > 0.5 ? u.soft : u.ink} />
          </g>
        </g>
        <Txt x={0} y={200} u={u} size={64} weight={800}>{fmt(n, 0, "", "", true)}</Txt>
      </g>
    );
  };
  return (
    <g opacity={k} transform={`translate(${x} ${y}) scale(${s})`}>
      {btn(-1, true)}
      {btn(1, false)}
    </g>
  );
}

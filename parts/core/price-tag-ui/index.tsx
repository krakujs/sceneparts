import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fmt, Card, Txt } from "../stat-card/index";

// Rounded price label: the old price struck through (optional `was`), the new price big, with a currency prefix.
// x, y = centre.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const cur = String(p.currency ?? "$");
  const dec = typeof p.decimals === "number" ? p.decimals : 2;
  const priceStr = fmt(Number(p.price ?? 19.99), dec);
  const hasWas = p.was !== undefined && p.was !== null && p.was !== "";
  const wasStr = hasWas ? cur + fmt(Number(p.was), dec) : "";
  const CS = 84, PS = 168, WS = 46;
  const curW = cur.length * CS * 0.6;
  const priceW = priceStr.length * PS * 0.6;
  const W = Math.round(Math.max(340, Math.max(curW + 12 + priceW, hasWas ? wasStr.length * WS * 0.6 : 0) + 96));
  const H = hasWas ? 300 : 210;
  const wasBase = 92;
  const priceBase = hasWas ? 236 : 168;
  const k = popIn(p.f, at, 12);
  const ePrice = enter(p.f, at + 6, 14);
  const eWas = enter(p.f, at + 12, 12);
  const wasW = wasStr.length * WS * 0.6;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <g transform={`translate(${-W / 2} ${-H / 2})`}>
        <Card x={0} y={0} w={W} h={H} u={u} r={36} fill={u.accent} stroke={u.ink} sw={5} />
        <circle cx={W - 42} cy={42} r={12} fill={u.card} stroke={u.ink} strokeWidth={4} />
        {hasWas ? (
          <g opacity={eWas}>
            <Txt x={48} y={wasBase} u={u} size={WS} weight={700} anchor="start" fill={u.white} opacity={0.9}>{wasStr}</Txt>
            <rect x={44} y={wasBase - 17} width={wasW + 8} height={6} rx={3} fill={u.ink} />
          </g>
        ) : null}
        <g opacity={ePrice} transform={`translate(0 ${(1 - ePrice) * 18})`}>
          <Txt x={48} y={priceBase - 58} u={u} size={CS} weight={900} anchor="start" fill={u.white}>{cur}</Txt>
          <Txt x={48 + curW + 10} y={priceBase} u={u} size={PS} weight={900} anchor="start" fill={u.white}>{priceStr}</Txt>
        </g>
      </g>
    </g>
  );
}

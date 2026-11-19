import React from "react";
import { ui, startFrame, enter, fmt, fitSize, Txt, type UI, drawDash } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Square ink frame. The border draws on corner to corner (clockwise from the top-left), then an optional caption tab pops in.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 900, H = p.h ?? 1000;
  const sw = 14;
  const draw = enter(p.f, at, p.len ?? 30);
  const cap = String(p.caption ?? "");
  const tabIn = enter(p.f, at + (p.len ?? 30) * 0.7, 10);
  const tabW = cap ? Math.min(W - 80, Math.max(160, cap.length * 34 + 60)) : 0;
  const tabH = 74;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      <rect x={-W / 2 + 8} y={-H / 2 + 10} width={W} height={H} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={sw} opacity={draw} />
      <rect
        x={-W / 2} y={-H / 2} width={W} height={H}
        fill="none" stroke={u.ink} strokeWidth={sw} strokeLinejoin="miter"
        {...drawDash(2 * (W + H), draw)}
      />
      {cap ? (
        <g transform={`translate(${-W / 2 + 40} ${-H / 2 - tabH / 2}) scale(${tabIn}, ${tabIn})`} opacity={tabIn > 0 ? 1 : 0}>
          <rect x={0} y={0} width={tabW} height={tabH} fill={u.accent} stroke={u.ink} strokeWidth={6} />
          <Txt x={tabW / 2} y={tabH / 2 + 14} u={u} size={fitSize(cap, 38, tabW - 40)} weight={900} fill={u.white} maxW={tabW - 40}>{cap}</Txt>
        </g>
      ) : null}
    </g>
  );
}

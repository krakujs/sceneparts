import React from "react";
import { ui, startFrame, popIn, enter, fitSize, Txt, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Rounded frame: accent border, soft shadow, pops in from the centre. Optional title chip sits on the top edge.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 900, H = p.h ?? 1000, R = 44, sw = 10;
  const k = popIn(p.f, at, 14);
  const title = String(p.title ?? "");
  const chipIn = enter(p.f, at + 10, 12);
  const chipW = title ? Math.min(W - 120, Math.max(220, title.length * 36 + 80)) : 0;
  const chipH = 80;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`} opacity={enter(p.f, at, 6)}>
      <rect x={-W / 2 + 6} y={-H / 2 + 22} width={W} height={H} rx={R} fill="rgba(0,0,0,0.2)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={R} fill={u.card} stroke={u.accent} strokeWidth={sw} />
      {title ? (
        <g transform={`translate(${-chipW / 2} ${-H / 2 - chipH / 2}) scale(${chipIn}, ${chipIn})`} opacity={chipIn > 0 ? 1 : 0}>
          <rect x={0} y={0} width={chipW} height={chipH} rx={chipH / 2} fill={u.accent} stroke={u.ink} strokeWidth={6} />
          <Txt x={chipW / 2} y={chipH / 2 + 14} u={u} size={fitSize(title, 40, chipW - 50)} weight={900} fill={u.white} maxW={chipW - 50}>{title}</Txt>
        </g>
      ) : null}
    </g>
  );
}

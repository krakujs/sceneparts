import React from "react";
import { ui, startFrame, enter, fitSize, Txt, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Lock-screen style notification: slides down from above and settles. Icon is a generic accent rounded square with a
// bell glyph; no real app icon or brand mark.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = 920, H = 240, R = 40, IC = 110;
  const k = enter(p.f, at, 18);
  const dy = (1 - k) * -320;
  const on = enter(p.f, at, 6);
  const left = -W / 2, top = -H / 2;
  const icX = left + 30 + IC / 2, icY = top + 30 + IC / 2; // icon centre
  const tx = left + 30 + IC + 30; // text column start
  const tw = W - (tx - left) - 36;
  const title = String(p.title ?? ""), body = String(p.body ?? ""), app = String(p.app ?? "Alerts");
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 420}) scale(${s})`} opacity={on}>
      <g transform={`translate(0 ${dy})`}>
        <rect x={left + 10} y={top + 16} width={W} height={H} rx={R} fill="rgba(0,0,0,0.2)" />
        <rect x={left} y={top} width={W} height={H} rx={R} fill={u.white} stroke={u.ink} strokeWidth={6} />
        <g transform={`translate(${icX} ${icY})`}>
          <rect x={-IC / 2} y={-IC / 2} width={IC} height={IC} rx={28} fill={u.accent} stroke={u.ink} strokeWidth={5} />
          <path d="M-26 18 L-26 -6 Q-26 -32 0 -32 Q26 -32 26 -6 L26 18 L34 28 L-34 28 Z" fill={u.white} />
          <circle cx={0} cy={40} r={9} fill={u.white} />
        </g>
        <Txt x={tx} y={top + 72} u={u} size={fitSize(app, 32, tw - 170)} weight={700} anchor="start" fill={u.muted} maxW={tw - 170}>{app}</Txt>
        <Txt x={left + W - 36} y={top + 72} u={u} size={30} weight={700} anchor="end" fill={u.muted}>{String(p.time ?? "now")}</Txt>
        <Txt x={tx} y={top + 126} u={u} size={fitSize(title, 42, tw)} weight={900} anchor="start" maxW={tw}>{title}</Txt>
        <Txt x={tx} y={top + 180} u={u} size={fitSize(body, 32, tw)} weight={600} anchor="start" fill={u.muted} maxW={tw}>{body}</Txt>
      </g>
    </g>
  );
}

import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Txt } from "../stat-card/index";

// Scroll hint: a mouse outline with a dot that slides down in a loop, two fading chevrons and a "scroll" label.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const t = Math.max(0, p.f - at);
  const phase = (t % 36) / 36;
  const e = enter(p.f, at, 10);
  const dot = p.color ?? u.accent;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 900}) scale(${(p.s ?? 1) * (0.9 + 0.1 * e)})`} opacity={e}>
      <rect x={-90 + 8} y={-140 + 12} width={180} height={280} rx={90} fill="rgba(0,0,0,0.18)" />
      <rect x={-90} y={-140} width={180} height={280} rx={90} fill={u.card} stroke={u.ink} strokeWidth={7} />
      <circle cx={0} cy={-78 + 56 * phase} r={13} fill={dot} opacity={1 - phase * 0.6} />
      {[0, 1].map((i) => {
        const o = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 0.2 - i * 1.2));
        return (
          <path key={i} d="M-26 0 L0 22 L26 0" transform={`translate(0 ${170 + i * 26})`} fill="none"
            stroke={u.ink} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={o} />
        );
      })}
      <Txt x={0} y={262} u={u} size={44} weight={800} fill={u.muted}>scroll</Txt>
    </g>
  );
}

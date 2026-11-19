import React from "react";
import { ui, startFrame, enter, popIn, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// "Them" bubble with three dots that bounce in turn. Pops in once, then loops.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = 220, H = 116, R = H / 2;
  const per = Math.max(12, p.period ?? 36);
  const k = popIn(p.f, at, 12);
  const on = enter(p.f, at, 8);
  const since = p.f - at;
  const dotCol = p.color ?? u.muted;
  return (
    <g transform={`translate(${p.x ?? 300} ${p.y ?? 960}) scale(${s * k})`} opacity={on}>
      <rect x={-W / 2 + 6} y={-H / 2 + 12} width={W} height={H} rx={R} fill="rgba(0,0,0,0.18)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={R} fill={u.white} stroke={u.ink} strokeWidth={6} />
      <path d={`M${-W / 2 + 34} ${H / 2 - 14} L${-W / 2 + 6} ${H / 2 + 26} L${-W / 2 + 70} ${H / 2 - 8} Z`} fill={u.white} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-W / 2 + 30} y={H / 2 - 16} width={44} height={20} fill={u.white} />
      {[0, 1, 2].map((i) => {
        const ph = ((since - i * (per / 9)) % per + per) % per / per;
        const bounce = ph < 0.3 ? Math.sin((ph / 0.3) * Math.PI) : 0;
        return (
          <circle key={i} cx={-42 + i * 42} cy={-bounce * 16} r={14} fill={since < 0 ? u.soft : dotCol} />
        );
      })}
    </g>
  );
}

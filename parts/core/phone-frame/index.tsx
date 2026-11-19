import React from "react";
import { ui, startFrame, enter, popIn, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Generic smartphone: rounded ink body, thin bezel, punch-hole camera, side buttons. Not modelled on any brand.
// The screen (u.soft, or `screen`) is left empty for content placed on top.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 520, H = Math.round(W * 2.1);
  const bez = Math.round(W * 0.03), R = Math.round(W * 0.14), sr = R - bez;
  const k = popIn(p.f, at, 14);
  const on = enter(p.f, at, 8);
  const btn = (y: number) => <rect x={-W / 2 - 8} y={-H / 2 + y} width={10} height={H * 0.07} rx={5} fill={u.ink} />;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`} opacity={on}>
      <rect x={-W / 2 + 8} y={-H / 2 + 18} width={W} height={H} rx={R} fill="rgba(0,0,0,0.2)" />
      {btn(H * 0.2)}{btn(H * 0.3)}
      <rect x={W / 2 - 2} y={-H / 2 + H * 0.26} width={10} height={H * 0.13} rx={5} fill={u.ink} />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={R} fill={u.ink} />
      <rect x={-W / 2 + bez} y={-H / 2 + bez} width={W - bez * 2} height={H - bez * 2} rx={sr} fill={p.screen ?? u.soft} />
      <circle cx={0} cy={-H / 2 + bez * 3.2} r={Math.round(W * 0.025)} fill={u.ink} />
    </g>
  );
}

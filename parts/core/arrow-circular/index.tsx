import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn } from "../stat-card/index";

// Circular arrow (refresh / repeat / cycle): a ~300 degree arc that draws itself while rotating into place, with a head at the end.
// x,y = centre, radius = arc radius.
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];
const DEG = Math.PI / 180;

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const cx = p.x ?? 540, cy = p.y ?? 960, R = p.radius ?? 180;
  const a0 = 150, span = 300; // degrees; the arc runs clockwise from the lower left
  const pt = (deg: number): V => [cx + R * Math.cos(deg * DEG), cy + R * Math.sin(deg * DEG)];
  const S = pt(a0), E = pt(a0 + span);
  const Lc = (R * span * Math.PI) / 180;
  const prog = enter(p.f, at, 26);
  const rot = -120 * (1 - enter(p.f, at, 30));
  const headK = popIn(p.f, at + 22, 10);
  const d = `M${S[0]} ${S[1]} A${R} ${R} 0 1 1 ${E[0]} ${E[1]}`;
  return (
    <g transform={`translate(0 0) scale(${s})`}>
      <g transform={`rotate(${rot} ${cx} ${cy})`}>
        <path d={d} fill="none" stroke={u.accent} strokeWidth={20} strokeLinecap="round" strokeDasharray={`${Lc} ${Lc * 2}`} strokeDashoffset={Lc * (1 - prog)} />
        <path d="M0 0 L-52 -34 L-52 34 Z" fill={u.accent} stroke={u.accent} strokeWidth={8} strokeLinejoin="round"
          transform={`translate(${E[0]} ${E[1]}) rotate(${a0 + span + 90}) scale(${headK})`} />
      </g>
    </g>
  );
}

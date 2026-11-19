import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, DrawPath } from "../stat-card/index";

// Check animation: a green circle draws in, a tick draws inside it, and a small burst of dots flies out.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const c = p.color ?? u.good;
  const R = 150;
  const circ = `M0 ${-R} A ${R} ${R} 0 1 1 0 ${R} A ${R} ${R} 0 1 1 0 ${-R} Z`;
  const k = popIn(p.f, at, 10);
  const ring = enter(p.f, at, 12);
  const fill = enter(p.f, at + 10, 8);
  const tick = enter(p.f, at + 12, 10);
  const bt = clamp((p.f - at - 12) / 14);
  const bEase = bt * (2 - bt);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <circle r={R} fill={c} opacity={fill} />
      <DrawPath d={circ} k={ring} fill="none" stroke={c} strokeWidth={24} strokeLinecap="round" />
      <DrawPath d="M-64 6 L-20 50 L66 -42" k={tick} fill="none" stroke={u.white} strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const r = R + 24 + 90 * bEase;
        return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={10} fill={c} opacity={1 - bt} />;
      })}
    </g>
  );
}

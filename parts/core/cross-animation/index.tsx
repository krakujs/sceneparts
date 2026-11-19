import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, DrawPath } from "../stat-card/index";

// Cross animation: a red circle draws in, an X draws inside it, then the whole thing gives a little shake.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const c = p.color ?? u.bad;
  const R = 150;
  const circ = `M0 ${-R} A ${R} ${R} 0 1 1 0 ${R} A ${R} ${R} 0 1 1 0 ${-R} Z`;
  const k = popIn(p.f, at, 10);
  const ring = enter(p.f, at, 12);
  const fill = enter(p.f, at + 10, 8);
  const cross = enter(p.f, at + 12, 10);
  const st = clamp((p.f - at - 26) / 14);
  const dx = Math.sin(st * Math.PI * 4) * 18 * (1 - st);
  const bt = clamp((p.f - at - 12) / 14);
  const bEase = bt * (2 - bt);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <g transform={`translate(${dx} 0)`}>
        <circle r={R} fill={c} opacity={fill} />
        <DrawPath d={circ} k={ring} fill="none" stroke={c} strokeWidth={24} strokeLinecap="round" />
        <DrawPath d="M-70 -70 L70 70 M70 -70 L-70 70" k={cross} fill="none" stroke={u.white} strokeWidth={28} strokeLinecap="round" />
      </g>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4 + Math.PI / 8;
        const r = R + 24 + 90 * bEase;
        return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={10} fill={c} opacity={1 - bt} />;
      })}
    </g>
  );
}

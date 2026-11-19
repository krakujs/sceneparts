import React from "react";
import { ui, startFrame, enter, type UI } from "../stat-card/index";
import { clamp, type PartProps } from "@sceneparts/core";

// Arrow cursor: glides from (ax, ay) to (x, y), presses (a small squeeze) and sends a ripple ring from the tip.
const ARROW = "M0 0 L0 70 L18 54 L32 86 L44 80 L30 50 L54 50 Z";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const gl = p.glide ?? 24;
  const tx = p.x ?? 540, ty = p.y ?? 960;
  const ax = p.ax ?? 300, ay = p.ay ?? 1300;
  const g = enter(p.f, at, gl);
  const cx = ax + (tx - ax) * g, cy = ay + (ty - ay) * g;
  const clickF = at + gl + 2;
  const press = p.f < clickF ? 1 : 1 - 0.14 * Math.sin(clamp((p.f - clickF) / 8) * Math.PI);
  const rip = clamp((p.f - clickF) / 18);
  const fade = p.f < clickF ? 0 : 1 - rip;
  const col = p.color ?? u.accent;
  return (
    <g>
      {p.f >= clickF ? (
        <g transform={`translate(${tx} ${ty}) scale(${s})`} opacity={fade}>
          <circle cx={0} cy={0} r={18 + rip * 90} fill="none" stroke={col} strokeWidth={10} />
          <circle cx={0} cy={0} r={6 + rip * 40} fill={col} opacity={0.25} />
        </g>
      ) : null}
      <g transform={`translate(${cx} ${cy}) scale(${s * press})`} opacity={enter(p.f, at, 4)}>
        <path d="M5 8 L5 78 L23 62 L37 94 L49 88 L35 58 L59 58 Z" fill="rgba(0,0,0,0.2)" />
        <path d={ARROW} fill={u.white} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
      </g>
    </g>
  );
}

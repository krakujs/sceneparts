import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn } from "../stat-card/index";

// Arrow bounce: a big chunky arrow that pops in and then bounces toward what it points at.
const DIRS: Record<string, { a: number; dx: number; dy: number }> = {
  up: { a: 0, dx: 0, dy: -1 },
  down: { a: 180, dx: 0, dy: 1 },
  left: { a: -90, dx: -1, dy: 0 },
  right: { a: 90, dx: 1, dy: 0 },
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const d = DIRS[p.dir] ?? DIRS.down;
  const k = popIn(p.f, at, 12);
  const b = p.f > at + 12 ? 28 * Math.abs(Math.sin((p.f - at - 12) * 0.22)) : 0;
  return (
    <g transform={`translate(${(p.x ?? 540) + d.dx * b} ${(p.y ?? 960) + d.dy * b}) scale(${(p.s ?? 1) * k}) rotate(${d.a})`}>
      <path d="M-50 130 L-50 -10 L-120 -10 L0 -150 L120 -10 L50 -10 L50 130 Z" fill={p.color ?? u.accent}
        stroke={u.ink} strokeWidth={8} strokeLinejoin="round" />
    </g>
  );
}

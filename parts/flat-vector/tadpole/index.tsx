import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector tadpole. Origin = body centre, faces right, honours flip, s and vx. About 115 px long.
// The tail wiggles from f: a wave travels from the body to the fin tip.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const col = p.color ?? "#2F3B30", fin = shade(col, 0.15), eye = C.white;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1000;
  const bob = Math.sin(f * 0.24) * 2;
  // tail spine and fin edges
  const N = 24, top: string[] = [], bot: string[] = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    const tx = -18 - u * 74, ty = Math.sin(f * 0.24 - u * 6.5) * 18 * u;
    const hw = 10 * (1 - 0.6 * u) + 1;
    top.push(`${tx.toFixed(1)} ${(ty - hw).toFixed(1)}`);
    bot.unshift(`${tx.toFixed(1)} ${(ty + hw).toFixed(1)}`);
  }
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s})`}>
      <path d={`M ${top.join(" L ")} L ${bot.join(" L ")} Z`} fill={fin} />
      <circle cx={0} cy={0} r={24} fill={col} />
      <circle cx={10} cy={-6} r={7} fill={eye} />
      <circle cx={13} cy={-6} r={3.5} fill={C.ink} />
    </g>
  );
}

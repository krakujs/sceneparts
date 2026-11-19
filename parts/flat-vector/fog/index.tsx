import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Fog: long soft semi-transparent grey-white bands across the frame. Origin = centre of the stack.
// anim "drift": each band slides gently sideways, out of step with the others.
const BANDS: [number, number, string, number, number][] = [
  [-300, 940, C.white, 0.7, 0], [-170, 1000, "#E9EEF4", 0.8, 1.2], [-40, 880, C.white, 0.65, 2.1],
  [90, 1000, "#E9EEF4", 0.75, 0.7], [220, 900, C.white, 0.6, 3.3], [340, 980, "#E9EEF4", 0.7, 1.9],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const drift = (p.anim ?? "none") === "drift";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {BANDS.map(([by, w, c, o, ph], i) => {
        const dx = drift ? 30 * Math.sin((f * 2 * Math.PI) / 150 + ph) : 0;
        return (
          <g key={i} transform={`translate(${dx.toFixed(1)} 0)`}>
            <rect x={-w / 2} y={by + 14} width={w} height={44} rx={22} fill={C.greyLight} opacity={0.45} />
            <rect x={-w / 2} y={by} width={w} height={70} rx={35} fill={c} opacity={o} />
          </g>
        );
      })}
    </g>
  );
}

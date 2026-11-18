import React from "react";
import type { PartProps } from "@sceneparts/core";

// Thick crescent moon with a soft glow: a disc masked by an offset disc. Origin = centre of the full disc.
const ease = (f: number, n: number) => { const t = Math.min(1, Math.max(0, f / n)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const MASK = "sp-crescent-mask";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const body = p.color && p.color !== "none" ? p.color : "#F7E7A1";
  const anim: string = p.anim ?? "none";
  const dy = anim === "float" ? 14 * Math.sin((f * 2 * Math.PI) / 120) : 0;
  const sc = anim === "pop" ? ease(f, 20) : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${dy.toFixed(1)}) scale(${sc.toFixed(3)})`}>
        <defs>
          <mask id={MASK} maskUnits="userSpaceOnUse" x={-300} y={-300} width={600} height={600}>
            <rect x={-300} y={-300} width={600} height={600} fill="#fff" />
            <circle cx={74} cy={-40} r={152} fill="#000" />
          </mask>
        </defs>
        <circle r={262} fill="#FFF4C4" opacity={0.2} />
        <circle r={214} fill="#FFF4C4" opacity={0.26} />
        <circle r={172} fill={body} mask={`url(#${MASK})`} />
      </g>
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Full moon: pale disc with soft grey craters and a warm halo. Origin = centre of the moon.
const ease = (f: number, n: number) => { const t = Math.min(1, Math.max(0, f / n)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const CRATERS: [number, number, number][] = [[-60, -40, 36], [56, 52, 24], [-34, 78, 17], [80, -66, 14], [-104, 40, 12]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const body = p.color && p.color !== "none" ? p.color : "#EFE8C8";
  const anim: string = p.anim ?? "none";
  const dy = anim === "float" ? 14 * Math.sin((f * 2 * Math.PI) / 120) : 0;
  const glow = anim === "glow" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 80) : 0.5;
  const sc = anim === "pop" ? ease(f, 20) : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${dy.toFixed(1)}) scale(${sc.toFixed(3)})`}>
        <circle r={262} fill="#FFF4C4" opacity={(0.1 + 0.12 * glow).toFixed(3)} />
        <circle r={218} fill="#FFF4C4" opacity={(0.16 + 0.16 * glow).toFixed(3)} />
        <circle r={178} fill={body} />
        {CRATERS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={shade(body, 0.12)} />)}
      </g>
    </g>
  );
}

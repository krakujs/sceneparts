import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bow tie in front view: two wings joined by a centre knot with dots. Origin = bottom centre (y).
// About 420 px wide and 220 px tall at s = 1. anim "sway": the bow tilts gently.
const f1 = (v: number) => v.toFixed(1);

const Wing = ({ c, d }: { c: string; d: string }) => (
  <g>
    <path d={d} fill={c} />
    <path d={d} fill={shade(c, 0.2)} opacity={0.35} transform="translate(0 14)" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wing = p.color && p.color !== "none" ? p.color : C.navy;
  const dot = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 50) * 4 : 0;
  const leftWing = "M -18 -120 Q -120 -240 -206 -206 Q -236 -120 -206 -34 Q -120 -100 -18 -120 Z";
  const dots: [number, number][] = [[-120, -150], [-168, -120], [-120, -90]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(0 34) rotate(${f1(tilt)} 0 -120)`}>
        <Wing c={wing} d={leftWing} />
        <g transform="scale(-1 1)"><Wing c={wing} d={leftWing} /></g>
        {dots.map(([dx, dy], i) => (
          <React.Fragment key={i}>
            <circle cx={dx} cy={dy} r={12} fill={dot} />
            <circle cx={-dx} cy={dy} r={12} fill={dot} />
          </React.Fragment>
        ))}
        {/* centre knot */}
        <rect x={-40} y={-160} width={80} height={82} rx={22} fill={shade(wing, 0.15)} />
        <rect x={-26} y={-146} width={16} height={54} rx={8} fill={C.white} opacity={0.18} />
      </g>
    </g>
  );
}

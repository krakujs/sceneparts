import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat brown mud patch seen low: splatters, bubbles and a boot print. Origin = bottom centre (lies on y).
// About 840 px wide and 200 px tall at s = 1. anim "bubble" lifts bubbles that rise and pop, looping.
const f1 = (v: number) => v.toFixed(1);
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const BUBBLES: [number, number, number][] = [[-80, -60, 12], [-40, -40, 8], [120, -70, 14], [160, -44, 7]];
const SPLATS: [number, number, number][] = [[-300, -150, 14], [-250, -190, 9], [250, -165, 16], [300, -110, 9], [330, -200, 8]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const mud = pick(p.color, "#7A5230");
  const anim: string = p.anim ?? "none";
  const bubbles: React.ReactElement[] = BUBBLES.map(([bx, by, r], i) => {
    const t = anim === "bubble" ? ((f + i * 17) % 60) / 60 : 0;
    const cy = by - 14 * t;
    const op = anim === "bubble" ? 1 - t : 1;
    const rr = r * (1 + 0.25 * t);
    return (
      <g key={i} opacity={op}>
        <circle cx={bx} cy={f1(cy)} r={f1(rr) as any} fill={shade(mud, -0.2)} />
        <circle cx={bx - rr * 0.3} cy={f1(cy - rr * 0.3)} r={rr * 0.3} fill={C.white} opacity={0.5} />
      </g>
    );
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-2} rx={420} ry={14} fill={C.shadow} />
      {/* patch: dark rim, then the lighter wet top */}
      <path d="M -410 0 C -430 -70 -300 -112 -180 -102 C -60 -122 60 -116 200 -102 C 330 -92 430 -52 410 0 Z" fill={shade(mud, 0.25)} />
      <path d="M -400 0 C -410 -60 -300 -96 -180 -88 C -60 -106 60 -100 200 -88 C 320 -78 410 -44 400 0 Z" fill={mud} />
      {/* splatters thrown up from the patch */}
      {SPLATS.map(([sx, sy, r], i) => (
        <ellipse key={i} cx={sx} cy={sy} rx={r} ry={r * 1.2} fill={mud} />
      ))}
      {bubbles}
      {/* boot print: a darker sole and heel pressed into the mud */}
      <g transform="translate(0 -40)">
        <path d="M -30 -72 Q 0 -84 30 -72 L 34 -6 L 46 14 Q 48 30 30 30 L -28 30 Q -42 30 -40 14 L -30 -6 Z" fill={shade(mud, 0.35)} />
        {[-22, 0, 22].map((tx) => (
          <line key={tx} x1={tx} y1={-52} x2={tx} y2={-14} stroke={shade(mud, 0.15)} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
        ))}
        <line x1={-36} y1={8} x2={40} y2={8} stroke={shade(mud, 0.15)} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
      </g>
    </g>
  );
}

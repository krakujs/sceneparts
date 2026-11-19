import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cut tree stump: a bark-covered stump with a pale cut top showing concentric growth rings, and roots spreading into the ground.
// Origin = centre of the stump base on the ground. About 420 px wide and 330 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const top = -290;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={20} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* roots spreading into the ground */}
        <path d="M -150 -40 Q -235 -30 -250 0 L -130 0 Z" fill={bark} />
        <path d="M 150 -40 Q 235 -30 250 0 L 130 0 Z" fill={bark} />
        <ellipse cx={-120} cy={-6} rx={44} ry={14} fill={shade(bark, 0.2)} />
        <ellipse cx={120} cy={-6} rx={44} ry={14} fill={shade(bark, 0.2)} />
        {/* trunk body */}
        <path d={`M -160 ${top} L -160 -40 Q 0 -14 160 -40 L 160 ${top} Z`} fill={bark} />
        <path d={`M 40 ${top} L 160 ${top} L 160 -40 Q 110 -30 40 -26 Z`} fill={shade(bark, 0.2)} />
        {[-110, -40, 60, 120].map((gx, i) => (
          <path key={i} d={`M ${gx} ${top + 40} Q ${gx + 6} -120 ${gx - 2} -60`} stroke={shade(bark, 0.28)} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.6} />
        ))}
        {/* cut top with growth rings */}
        <ellipse cx={0} cy={top} rx={160} ry={46} fill={shade(bark, 0.15)} />
        {[150, 124, 98, 72, 48, 26].map((rx, i) => (
          <ellipse key={i} cx={0} cy={top} rx={rx} ry={rx * 0.29} fill={i % 2 ? shade(wood, 0.2) : wood} />
        ))}
        <circle cx={0} cy={top} r={5} fill={shade(wood, 0.35)} />
      </g>
    </g>
  );
}

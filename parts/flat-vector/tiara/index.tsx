import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Delicate tiara: a tall arched band with a central peak, jewels along the band and pearls between them.
// Origin = bottom centre (y). About 700 px wide and 510 px tall at s = 1. anim "sparkle": the gems twinkle.
const f1 = (v: number) => v.toFixed(1);
// Gem positions on the band curve (quadratic from (-230,-10) via (0,-200) to (230,-10)).
const GEMS: [number, number, number][] = [[-175, -50, 16], [-115, -81, 18], [115, -81, 18], [175, -50, 16]];
const PEARLS: [number, number][] = [[-55, -99], [55, -99], [-143, -69], [143, -69]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.yellow;
  const gem = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const tw = (i: number) => (anim === "sparkle" ? 0.55 + 0.45 * Math.sin((f * 2 * Math.PI) / 36 + i * 1.1) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s * 1.5 : s * 1.5} ${s * 1.5})`}>
      <ellipse cx={0} cy={6} rx={210} ry={12} fill={C.shadow} />
      {/* band: a thick arch with a darker edge underneath */}
      <path d="M -230 -10 Q 0 -200 230 -10" stroke={shade(metal, 0.22)} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d="M -230 -16 Q 0 -206 230 -16" stroke={metal} strokeWidth={24} fill="none" strokeLinecap="round" />
      {/* central peak rising from the middle of the band */}
      <path d="M -58 -104 Q -8 -200 0 -330 Q 8 -200 58 -104 Z" fill={metal} />
      <path d="M 0 -330 Q 8 -200 58 -104 L 22 -110 Q 6 -210 0 -330 Z" fill={shade(metal, 0.22)} />
      <circle cx={0} cy={-252} r={26} fill={gem} opacity={tw(0)} />
      <circle cx={-8} cy={-260} r={9} fill={C.white} opacity={0.55 * tw(0)} />
      {/* side jewels */}
      {GEMS.map(([gx, gy, r], i) => (
        <g key={gx} opacity={tw(i + 1)}>
          <circle cx={gx} cy={gy} r={r} fill={gem} />
          <circle cx={gx - r * 0.3} cy={gy - r * 0.35} r={r * 0.32} fill={C.white} opacity={0.6} />
        </g>
      ))}
      {/* pearls between the jewels */}
      {PEARLS.map(([px, py]) => <circle key={px + "," + py} cx={px} cy={py} r={8} fill={C.white} />)}
      {/* drops at the two ends */}
      <circle cx={-236} cy={-12} r={12} fill={gem} opacity={tw(5)} />
      <circle cx={236} cy={-12} r={12} fill={gem} opacity={tw(6)} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bangle bracelet standing as an ellipse ring seen at 3/4, with a row of beads along the front. The band has real
// thickness (a shaded lower edge). Origin = bottom centre (the bangle's lowest edge rests on y).
// About 480 px wide and 290 px tall at s = 1.
// anim "sparkle": glints pulse on the top of the band; "bob": the bangle rocks gently.
const f1 = (v: number) => v.toFixed(1);

const CY = -160;
const ring = `M -240 ${CY} A 240 130 0 1 0 240 ${CY} A 240 130 0 1 0 -240 ${CY} Z M -186 ${CY} A 186 84 0 1 0 186 ${CY} A 186 84 0 1 0 -186 ${CY} Z`;

const Star = ({ x, y, k }: { x: number; y: number; k: number }) => (
  <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(k)})`} opacity={f1(Math.min(1, k))}>
    <path d="M 0 -20 L 5 -5 L 20 0 L 5 5 L 0 20 L -5 5 L -20 0 L -5 -5 Z" fill={C.white} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.yellow;
  const bead = p.color2 && p.color2 !== "none" ? p.color2 : C.pink;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? Math.sin((f * 2 * Math.PI) / 60) * 3 : 0;
  const tw = (phase: number) => (anim === "sparkle" ? 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 45 + phase)) : 0);
  // beads sit on the middle of the band, along the front (lower) half
  const beads = [30, 65, 90, 115, 150].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { bx: 213 * Math.cos(a), by: CY + 107 * Math.sin(a) };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* the band's thickness, showing below the front edge */}
        <path d={ring} fillRule="evenodd" fill={shade(metal, 0.3)} transform="translate(0 26)" />
        {/* the band */}
        <path d={ring} fillRule="evenodd" fill={metal} />
        {/* highlight along the top */}
        <path d={`M -170 ${f1(CY - 92)} A 240 130 0 0 1 170 ${f1(CY - 92)}`} fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.4} />
        {/* beads on the front */}
        {beads.map(({ bx, by }, i) => (
          <g key={i}>
            <circle cx={f1(bx)} cy={f1(by)} r={20} fill={bead} />
            <circle cx={f1(bx - 6)} cy={f1(by - 7)} r={5} fill={C.white} opacity={0.6} />
          </g>
        ))}
        {anim === "sparkle" && (
          <g>
            <Star x={-200} y={-240} k={tw(0)} />
            <Star x={190} y={-226} k={tw(2.2)} />
            <Star x={0} y={-296} k={tw(4.4)} />
          </g>
        )}
      </g>
    </g>
  );
}

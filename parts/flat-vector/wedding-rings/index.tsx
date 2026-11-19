import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two interlocked bands: the left band passes over the right at the top crossing and under it at the bottom.
// Origin = centre of the pair. A small diamond sits on the right band and sparkles.
const f1 = (v: number) => v.toFixed(1);
const R = 150, OFF = 80, W = 34;
const CROSS_Y = Math.sqrt(R * R - OFF * OFF); // where the two bands cross, at x = 0

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const g1 = p.color && p.color !== "none" ? p.color : C.yellow;
  const g2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellowDark;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 10 : 0;
  const glint = anim === "sparkle" ? (f % 40) / 40 : 0.5;
  const gl = 0.4 + 0.6 * Math.sin(glint * Math.PI);
  const sparkleOn = anim === "sparkle";
  const DX = OFF, DY = -R - 20; // diamond base sits on the top of the right band
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s})`}>
      <defs>
        <clipPath id="wedding-rings-bottom">
          <circle cx={0} cy={CROSS_Y} r={W + 10} />
        </clipPath>
      </defs>
      <ellipse cx={0} cy={R + 40} rx={R + 30} ry={22} fill={C.shadow} />
      {/* right band (drawn first) */}
      <circle cx={OFF} cy={0} r={R} fill="none" stroke={g2} strokeWidth={W} />
      <circle cx={OFF} cy={0} r={R - W / 2 + 4} fill="none" stroke={shade(g2, 0.25)} strokeWidth={5} opacity={0.5} />
      {/* left band, drawn over the right band everywhere */}
      <circle cx={-OFF} cy={0} r={R} fill="none" stroke={g1} strokeWidth={W} />
      <circle cx={-OFF} cy={0} r={R - W / 2 + 4} fill="none" stroke={shade(g1, 0.25)} strokeWidth={5} opacity={0.5} />
      {/* at the bottom crossing the right band goes back over the left: redraw the right band there */}
      <circle cx={OFF} cy={0} r={R} fill="none" stroke={g2} strokeWidth={W} clipPath="url(#wedding-rings-bottom)" />
      {/* diamond on top of the right band */}
      <g transform={`translate(${DX} ${DY})`}>
        <path d="M -34 -6 L -20 -40 L 20 -40 L 34 -6 L 0 58 Z" fill={shade(C.teal, 0.1)} />
        <path d="M -34 -6 L 34 -6 L 0 58 Z" fill={C.skyDeep} opacity={0.9} />
        <path d="M -20 -40 L -34 -6 L 0 -6 Z" fill={C.white} opacity={0.5} />
        <path d="M 20 -40 L 34 -6 L 0 -6 Z" fill={C.sky} opacity={0.6} />
        {sparkleOn && <g opacity={f1(gl)} transform="translate(-40 -50)"><path d="M 0 -16 L 4 -4 L 16 0 L 4 4 L 0 16 L -4 4 L -16 0 L -4 -4 Z" fill={C.yellow} /></g>}
        {sparkleOn && <g opacity={f1(1 - gl)} transform="translate(44 -30) scale(0.7)"><path d="M 0 -16 L 4 -4 L 16 0 L 4 4 L 0 16 L -4 4 L -16 0 L -4 -4 Z" fill={C.white} /></g>}
      </g>
    </g>
  );
}

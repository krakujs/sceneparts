import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector manatee, side view: round grey body, paddle tail, side flipper and a whiskered snout.
// Centre (x, y), faces right, honours flip. About 540 px long at s = 1.
// pose swim: paddle tail beats and body rocks, from p.f. pose idle: slow bob only.

const BODY = "#9AA6B2", DARK = shade(BODY, 0.2), BELLY = "#B9C3CD", BRISTLE = "#5D6875";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1100;
  const swim = (p.pose ?? "swim") === "swim";
  const ph = f * 0.07;
  const bob = swim ? Math.sin(ph * 0.5) * 8 : Math.sin(f * 0.05) * 8;
  const bodyRot = swim ? Math.sin(ph) * 2 : 0;
  const paddle = swim ? Math.sin(ph - 1.1) * 16 : Math.sin(f * 0.05) * 2;
  const flip = swim ? Math.sin(ph * 2) * 8 : 0;
  const bristles = [[262, 14], [267, 24], [263, 34], [254, 42], [248, 22], [256, 52]] as [number, number][];
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${bodyRot})`}>
        <g transform={`translate(-244 2) rotate(${paddle})`}>
          <path d="M 6 -10 C -40 -26 -100 -40 -150 -56 C -180 -66 -198 -40 -196 0 C -198 40 -180 66 -150 56 C -100 40 -40 26 6 10 Z" fill={DARK} />
        </g>
        <path d="M 270 6 C 270 -60 230 -112 150 -130 C 60 -150 -80 -136 -170 -92 C -210 -72 -240 -42 -252 -10 L -252 16 C -240 52 -200 92 -120 116 C 0 140 150 126 230 84 C 262 60 272 32 270 6 Z" fill={BODY} />
        <path d="M -120 100 C 0 126 150 112 230 74 C 200 96 110 112 -10 110 C -90 108 -150 94 -210 40 L -240 20 C -180 74 -130 92 -120 100 Z" fill={BELLY} opacity={0.7} />
        <g transform={`rotate(${flip} 110 40)`}>
          {taper([110, 40], [90, 120], [60, 176], 70, 18, DARK, "fl", true)}
        </g>
        <circle cx={172} cy={-44} r={6} fill={BRISTLE} />
        <path d="M 200 -18 Q 212 -10 206 4" fill="none" stroke={DARK} strokeWidth={4} strokeLinecap="round" />
        {bristles.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={3.5} fill={BRISTLE} />)}
      </g>
    </g>
  );
}

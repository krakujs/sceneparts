import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector dolphin. Centre (x, y), faces right, honours flip. About 580 px long at s = 1.
// pose swim: body wave and fluke beat from p.f. pose idle: slow bob only.

const BODY = "#7E9DB8", DARK = shade(BODY, 0.2), BELLY = "#EAF3F9", BEAK = "#9DB6CB";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1100;
  const swim = (p.pose ?? "swim") === "swim";
  const ph = f * 0.09;
  const bob = swim ? Math.sin(ph * 0.5) * 8 : Math.sin(f * 0.05) * 8;
  const bodyRot = swim ? Math.sin(ph) * 2.5 : 0;
  const tailRot = swim ? Math.sin(ph - 0.9) * 8 : 0;
  const flukeRot = swim ? Math.sin(ph - 1.7) * 16 : Math.sin(f * 0.05) * 3;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${bodyRot})`}>
        <g transform={`rotate(${tailRot} -90 0)`}>
          <path d="M -60 -62 C -140 -58 -190 -40 -232 -26 L -236 6 C -190 22 -140 40 -60 44 Z" fill={BODY} />
          <g transform={`translate(-232 0) rotate(${flukeRot})`}>
            <path d="M 4 -4 C -24 -26 -52 -48 -84 -58 C -78 -40 -72 -20 -62 0 C -72 20 -78 40 -84 58 C -52 48 -24 26 4 4 Z" fill={DARK} />
          </g>
        </g>
        <path d="M 236 8 C 214 -28 150 -66 60 -78 C 0 -86 -50 -80 -90 -66 L -90 46 C -20 52 60 54 130 42 C 180 34 218 22 236 8 Z" fill={BODY} />
        <path d="M -90 18 C -20 26 60 28 130 18 C 170 12 210 8 236 8 C 218 22 180 34 130 42 C 60 54 -20 52 -90 46 Z" fill={BELLY} />
        <path d="M 180 -4 C 210 -6 240 0 262 4 C 266 8 262 13 254 13 C 225 16 200 18 180 20 Z" fill={BEAK} />
        <path d="M 6 -78 C 8 -108 14 -128 30 -146 C 40 -120 50 -98 66 -78 Z" fill={DARK} />
        <path d="M 110 22 C 100 56 80 78 52 90 C 60 64 70 44 84 24 Z" fill={DARK} />
        <circle cx={168} cy={-16} r={6.5} fill={C.ink} />
        <circle cx={170} cy={-18} r={2} fill="#FFFFFF" />
        <path d="M 210 8 Q 192 16 176 10" fill="none" stroke={DARK} strokeWidth={4} strokeLinecap="round" />
      </g>
    </g>
  );
}

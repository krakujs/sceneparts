import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector blue whale, side view. Centre (x, y), faces right, honours flip. About 900 px wide at s = 1.
// pose swim: slow body wave and fluke beat from p.f. pose idle: gentle breathing bob.

const BODY = "#4F6E9C", DARK = shade(BODY, 0.22), PALE = "#B9D0E4", PLEAT = "#9DB8D6";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1100;
  const swim = (p.pose ?? "swim") === "swim";
  const ph = f * 0.07;
  const bob = swim ? Math.sin(ph * 0.5) * 10 : Math.sin(f * 0.04) * 8;
  const bodyRot = swim ? Math.sin(ph) * 2 : 0;
  const tailRot = swim ? Math.sin(ph - 0.9) * 6 : 0;
  const flukeRot = swim ? Math.sin(ph - 1.6) * 10 : Math.sin(f * 0.04) * 2;
  const pleats = [0, 1, 2, 3, 4].map((i) => {
    const x0 = -10 + i * 58, y0 = 62 + i * 2;
    return <path key={i} d={`M ${x0} ${y0} Q ${x0 + 30} ${y0 + 22} ${x0 + 64} ${y0 + 18}`} fill="none" stroke={PLEAT} strokeWidth={6} strokeLinecap="round" />;
  });
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${bodyRot})`}>
        <g transform={`rotate(${tailRot} -240 0)`}>
          <path d="M -236 -66 C -290 -58 -320 -40 -340 -28 L -344 36 C -320 44 -290 56 -236 58 Z" fill={BODY} />
          <g transform={`translate(-336 0) rotate(${flukeRot})`}>
            <path d="M 6 -10 C -30 -40 -72 -90 -122 -128 C -110 -90 -96 -40 -78 0 C -96 40 -110 90 -122 128 C -72 90 -30 40 6 10 Z" fill={DARK} />
          </g>
        </g>
        <path d="M 430 36 C 436 -8 414 -62 330 -98 C 226 -140 70 -142 -50 -112 C -130 -92 -190 -78 -240 -64 L -240 52 C -170 66 -90 92 0 100 C 120 108 230 96 300 70 C 370 46 410 52 430 36 Z" fill={BODY} />
        <path d="M -240 22 C -170 36 -90 60 0 70 C 120 80 230 62 300 44 C 350 30 400 30 430 36 C 410 52 370 56 300 70 C 230 92 120 108 0 100 C -90 94 -170 70 -240 52 Z" fill={PALE} />
        {pleats}
        <path d="M -140 -96 C -134 -118 -128 -128 -118 -140 C -116 -118 -110 -104 -100 -92 Z" fill={DARK} />
        {taper([230, 40], [214, 100], [168, 170], 60, 14, DARK)}
        <circle cx={352} cy={-4} r={7} fill={DARK} />
        <path d="M 430 36 Q 360 42 300 26" fill="none" stroke={DARK} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      </g>
    </g>
  );
}

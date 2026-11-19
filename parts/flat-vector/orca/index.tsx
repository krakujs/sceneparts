import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector orca (killer whale), side view. Centre (x, y), faces right, honours flip. About 710 px long at s = 1.
// pose swim: body wave and fluke beat from p.f. pose idle: slow bob only.

const BLACK = "#2B3142", DARK = shade(BLACK, 0.3), WHITE = "#F6F7F9", GREYW = "#DDE2EA";

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
        <g transform={`rotate(${tailRot} -300 0)`}>
          <path d="M -176 -70 C -240 -62 -282 -46 -306 -30 L -306 22 C -280 34 -230 46 -176 46 Z" fill={BLACK} />
          <g transform={`translate(-300 0) rotate(${flukeRot})`}>
            <path d="M 6 -8 C -30 -40 -66 -82 -104 -106 C -92 -74 -82 -40 -74 0 C -82 40 -92 74 -104 106 C -66 82 -30 40 6 8 Z" fill={BLACK} />
          </g>
        </g>
        <path d="M 300 6 C 300 -48 262 -92 178 -104 C 80 -116 -40 -110 -180 -72 L -180 44 C -100 66 0 88 90 84 C 180 80 262 56 300 6 Z" fill={BLACK} />
        <path d="M -180 14 C -80 32 40 42 120 40 C 200 38 262 22 300 6 C 286 40 236 62 170 68 C 80 78 0 86 -90 72 C -130 66 -160 56 -180 46 Z" fill={WHITE} />
        <path d="M -40 -110 C -26 -150 0 -196 26 -238 C 40 -200 50 -158 60 -110 Z" fill={BLACK} />
        {taper([60, 30], [40, 90], [4, 130], 58, 14, DARK)}
        <ellipse cx={150} cy={-62} rx={52} ry={20} transform="rotate(-12 150 -62)" fill={WHITE} />
        <circle cx={178} cy={-50} r={8} fill={C.ink} />
        <circle cx={181} cy={-53} r={2.5} fill={GREYW} />
      </g>
    </g>
  );
}

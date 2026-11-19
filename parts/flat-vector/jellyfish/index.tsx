import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector jellyfish. Centre (x, y), honours flip. About 300 px tall at s = 1.
// Translucent bell (opacity 0.85) that pulses from p.f, with six wavy tentacles that sway from p.f.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const col = p.color ?? "#E58BD0", dark = shade(col, 0.22), core = shade(col, 0.4);
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1000;
  const swim = (p.pose ?? "swim") === "swim";
  const ph = f * (swim ? 0.12 : 0.05);
  const pulse = Math.sin(ph);
  const bob = Math.sin(f * (swim ? 0.06 : 0.04)) * (swim ? 10 : 6);
  const bell = "M -120 -10 C -122 -110 -70 -152 0 -152 C 70 -152 122 -110 120 -10 C 100 4 80 -6 60 2 C 40 10 20 -4 0 2 C -20 10 -40 -4 -60 2 C -80 -6 -100 4 -120 -10 Z";
  const inner = "M -74 -28 C -74 -96 -40 -128 0 -128 C 40 -128 74 -96 74 -28 C 40 -18 -40 -18 -74 -28 Z";

  const tentacles = [-96, -58, -20, 18, 56, 94].map((x0, i) => {
    const L = 165 - (i % 3) * 18;
    const pts = Array.from({ length: 15 }, (_, k) => {
      const u = k / 14;
      const px = x0 + Math.sin(ph * 1.1 - u * 4 + i * 0.9) * (4 + 26 * u);
      return `${px.toFixed(1)} ${(-12 + u * L).toFixed(1)}`;
    });
    return <path key={i} d={`M ${pts.join(" L ")}`} fill="none" stroke={col} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />;
  });

  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s})`}>
      {tentacles}
      <g opacity={0.85} transform={`translate(0 -10) scale(${(1 - 0.03 * pulse).toFixed(3)} ${(1 + 0.08 * pulse).toFixed(3)}) translate(0 10)`}>
        <path d={bell} fill={col} />
        <path d={inner} fill={dark} opacity={0.35} />
        <circle cx={0} cy={-60} r={22} fill={core} opacity={0.5} />
        <ellipse cx={-48} cy={-100} rx={16} ry={9} transform="rotate(-25 -48 -100)" fill="#FFFFFF" opacity={0.45} />
      </g>
    </g>
  );
}

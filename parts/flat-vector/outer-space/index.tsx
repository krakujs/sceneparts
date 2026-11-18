import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Stars, mix, rnd } from "../backdrop/index";

// Outer space (flat-vector background): deep starfield, soft nebula colour clouds and distant planets with
// rings. No time or weather here, so the palette param chooses the nebula colours.
const PALETTES: Record<string, [string, string, string]> = {
  violet: ["#2A1B5E", "#7B5CD6", "#F27BA6"],
  teal: ["#0E2A3F", "#1FA39A", "#A8D85A"],
  ember: ["#2A1420", "#E8503F", "#FFC83D"],
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, drift = (p.anim ?? "drift") !== "none", seed = p.seed ?? 9;
  const [deep, a, b] = PALETTES[p.palette as string] ?? PALETTES.violet;
  const space = mix(deep, "#05060F", 0.55);
  const drift2 = drift ? Math.sin(f / 120) * 10 : 0;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={space} />
      {/* nebula clouds */}
      {[[220, 380, 380, a], [820, 1000, 420, b], [300, 1420, 320, a], [860, 300, 280, b]].map(([x, y, r, col], i) => (
        <g key={i}>
          <circle cx={f1(Number(x) + drift2 * (i % 2 ? -1 : 1))} cy={y as number} r={r as number} fill={col as string} opacity={0.18} />
          <circle cx={Number(x) - 40} cy={Number(y) + 30} r={Number(r) * 0.6} fill={col as string} opacity={0.14} />
          <circle cx={Number(x) + 50} cy={Number(y) - 20} r={Number(r) * 0.4} fill={mix(col as string, "#FFFFFF", 0.3)} opacity={0.1} />
        </g>
      ))}
      <Stars f={f} count={150} seed={seed} maxY={1920} />
      {/* ringed planet, upper right */}
      <g transform={`translate(${840 + drift2 * 0.5} 420)`}>
        <ellipse cx={0} cy={0} rx={190} ry={44} fill="none" stroke={shade(b, 0.2)} strokeWidth={18} transform="rotate(-14)" opacity={0.9} />
        <circle cx={0} cy={0} r={110} fill={b} />
        <path d="M -110 -10 Q -40 -60 30 -20 Q 60 10 -20 40 Q -80 50 -110 -10 Z" fill={shade(b, 0.14)} />
        <ellipse cx={0} cy={0} rx={190} ry={44} fill="none" stroke={a} strokeWidth={18} transform="rotate(-14) translate(0 24)" opacity={0.0} />
      </g>
      {/* small planet, lower left */}
      <g transform={`translate(${200 - drift2 * 0.4} 1500)`}>
        <circle cx={0} cy={0} r={64} fill={a} />
        <path d="M -64 4 Q -20 -20 30 8 Q 60 24 40 40 Q -10 56 -64 4 Z" fill={shade(a, 0.2)} />
        <ellipse cx={0} cy={0} rx={112} ry={24} fill="none" stroke={mix(a, "#FFFFFF", 0.35)} strokeWidth={10} transform="rotate(18)" />
      </g>
      {/* tiny moon */}
      <circle cx={700} cy={1220} r={22} fill={mix(a, "#FFFFFF", 0.5)} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

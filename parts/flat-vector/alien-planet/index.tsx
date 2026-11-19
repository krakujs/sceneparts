import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Alien planet: a strange two-tone world (violet above, teal below) with swirling bands, glowing craters
// and two small moons on tilted orbits. Origin = centre of the planet; about 520 px across at s = 1 (moons orbit wider).
// anim "orbit": the surface swirls and both moons travel round the planet.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const R = 240;
const BANDS: [number, string][] = [[-150, "#C9B6FF"], [-70, "#B8FFE6"], [10, "#C9B6FF"], [90, "#B8FFE6"], [170, "#C9B6FF"]];
const CRATERS: [number, number, number][] = [[-90, -60, 30], [100, 30, 40], [-30, 130, 22], [70, -150, 18]];

const moon = (cx: number, cy: number, r: number, col: string, key: string) => (
  <g key={key}>
    <circle cx={f1(cx)} cy={f1(cy)} r={r} fill={col} />
    <circle cx={f1(cx + r * 0.3)} cy={f1(cy - r * 0.2)} r={r * 0.28} fill={shade(col, 0.18)} />
    <circle cx={f1(cx - r * 0.35)} cy={f1(cy + r * 0.3)} r={r * 0.18} fill={shade(col, 0.18)} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const orbit = p.anim === "orbit";
  const dx = orbit ? -((f * 1.2) % 400) : 0;
  const pulse = 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50);
  const th1 = (f * 2 * Math.PI) / 300;
  const th2 = 2 - (f * 2 * Math.PI) / 220;
  const m1 = { x: 420 * Math.cos(th1), y: 120 * Math.sin(th1) };
  const m2 = { x: 330 * Math.cos(th2), y: 80 * Math.sin(th2) };
  const m1Front = Math.sin(th1) > 0;
  const m2Front = Math.sin(th2) > 0;
  const moonsBack = [
    !m1Front && moon(m1.x, m1.y, 34, C.yellow, "m1"),
    !m2Front && moon(m2.x, m2.y, 22, "#DDE2EA", "m2"),
  ];
  const moonsFront = [
    m1Front && moon(m1.x, m1.y, 34, C.yellow, "m1"),
    m2Front && moon(m2.x, m2.y, 22, "#DDE2EA", "m2"),
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* orbit tracks */}
      <ellipse cx={0} cy={0} rx={420} ry={120} fill="none" stroke={C.white} strokeWidth={2} strokeDasharray="6 10" opacity={0.25} transform="rotate(-18)" />
      <ellipse cx={0} cy={0} rx={330} ry={80} fill="none" stroke={C.white} strokeWidth={2} strokeDasharray="6 10" opacity={0.25} transform="rotate(12)" />
      {moonsBack}
      {/* planet: two-tone base and swirling bands */}
      <clipPath id="alien-planet-clip">
        <circle cx={0} cy={0} r={R} />
      </clipPath>
      <circle cx={0} cy={0} r={R} fill="#7B5CD6" />
      <g clipPath="url(#alien-planet-clip)">
        <path d={`M ${-R} 0 A ${R} ${R} 0 0 0 ${R} 0 Z`} fill="#3DE0B0" />
        <g transform={`translate(${f1(dx)} 0)`}>
          {BANDS.map(([by, col], i) => (
            <path key={i} d={`M -800 ${by} Q -700 ${by - 34} -600 ${by} T -400 ${by} T -200 ${by} T 0 ${by} T 200 ${by} T 400 ${by} T 600 ${by} T 800 ${by}`} fill="none" stroke={col} strokeWidth={18} strokeLinecap="round" opacity={0.55} />
          ))}
        </g>
        {CRATERS.map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#4A2F9E" />
            <circle cx={cx} cy={cy} r={r * 0.55} fill={C.lime} opacity={0.5 + 0.4 * pulse} />
            <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke={C.lime} strokeWidth={4} opacity={0.6} />
          </g>
        ))}
      </g>
      <path d="M -200 -110 A 240 240 0 0 1 -110 -200" stroke={C.white} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.25} />
      {moonsFront}
    </g>
  );
}

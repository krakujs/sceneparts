import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { mix, rnd, asTime } from "../backdrop/index";

// Cave interior: rocky walls framing the view, stalactites and stalagmites, glowing crystals and light from the cave mouth.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const rock = p.rock ?? "#6E6A78", crystal = p.crystal ?? "#5BE0F0";
  const dark = time === "night" ? 0.25 : 0;
  const R = (c: string) => mix(c, "#0E0B1A", dark);
  const pulse = drift ? 0.7 + 0.3 * Math.sin(f / 14) : 1;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={R(shade(rock, 0.45))} />
      {/* cave mouth light at the top centre */}
      <ellipse cx={540} cy={160} rx={300} ry={210} fill="#FFF3C4" opacity={0.25 * pulse} />
      <path d="M 380 0 Q 400 180 540 220 Q 680 180 700 0 Z" fill="#CFE6F5" />
      <path d="M 430 0 Q 450 120 540 150 Q 630 120 650 0 Z" fill="#F7F0D0" />
      {/* far cave floor */}
      <path d="M 0 1300 Q 540 1180 1080 1300 L 1080 1920 L 0 1920 Z" fill={R(shade(rock, 0.2))} />
      {/* stalactites hanging from the top */}
      {[300, 360, 700, 760].map((x, i) => (
        <path key={i} d={`M ${x - 30} 0 L ${x + 30} 0 L ${x} ${280 + rnd(3, i) * 160} Z`} fill={R(shade(rock, 0.1))} />
      ))}
      {/* left and right rock walls with lighter facets */}
      <path d="M 0 0 L 300 0 Q 230 400 260 800 Q 280 1200 150 1920 L 0 1920 Z" fill={R(rock)} />
      <path d="M 1080 0 L 780 0 Q 850 420 820 820 Q 800 1200 930 1920 L 1080 1920 Z" fill={R(rock)} />
      <path d="M 40 0 L 180 0 Q 130 400 160 800 L 80 800 Z" fill={R(shade(rock, -0.12))} opacity={0.7} />
      <path d="M 900 0 L 1040 0 L 1000 800 L 930 800 Q 960 400 900 0 Z" fill={R(shade(rock, -0.12))} opacity={0.7} />
      {/* stalagmites at the sides, kept clear of the centre */}
      {[[70, 1500, 1.7], [170, 1640, 1.3], [980, 1480, 1.8], [870, 1640, 1.2]].map(([x, y, s], i) => (
        <path key={i} d={`M ${x - 60 * s} ${y + 160} L ${x - 14 * s} ${y - 150 * s} L ${x + 14 * s} ${y - 150 * s} L ${x + 60 * s} ${y + 160} Z`} fill={R(shade(rock, 0.15 + i * 0.03))} />
      ))}
      {/* glowing crystals on the walls and floor */}
      {[[110, 720, 1], [210, 980, 0.8], [940, 760, 1], [860, 1060, 0.9], [120, 1500, 0.7], [950, 1560, 0.8]].map(([x, y, s], i) => (
        <g key={i} opacity={0.75 + 0.25 * Math.sin(f / 9 + i)}>
          <path d={`M ${x} ${y - 70 * s} L ${x + 26 * s} ${y} L ${x} ${y + 40 * s} L ${x - 26 * s} ${y} Z`} fill={crystal} />
          <ellipse cx={x} cy={y} rx={60 * s} ry={50 * s} fill={crystal} opacity={0.18} />
        </g>
      ))}
    </g>
  );
}

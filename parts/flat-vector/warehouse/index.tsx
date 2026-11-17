import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big corrugated warehouse with a row of loading dock doors. Origin = base on the ground.
// About 960 px wide and 500 px tall at s = 1.
// anim "lights": the dock lamps above each door blink on one after another.
const f1 = (v: number) => v.toFixed(1);
const RIBS = Array.from({ length: 22 }, (_, i) => -450 + i * 42);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.greyLight;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.blueDark;
  const anim: string = p.anim ?? "none";
  const doorXs = [-330, -110, 110, 330];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={500} ry={22} fill={C.shadow} />
      {/* corrugated wall */}
      <rect x={-480} y={-400} width={960} height={400} rx={10} fill={wall} />
      {RIBS.map((rx, i) => (
        <rect key={i} x={rx} y={-400} width={10} height={400} fill={i % 2 ? shade(wall, 0.08) : shade(wall, 0.03)} />
      ))}
      {/* low pitched roof with a lip */}
      <path d="M -500 -400 L -460 -470 L 460 -470 L 500 -400 Z" fill={roof} />
      <rect x={-500} y={-410} width={1000} height={18} rx={6} fill={shade(roof, 0.2)} />
      {/* roof vents */}
      {[-300, 0, 300].map((vx) => (
        <rect key={vx} x={vx - 40} y={-500} width={80} height={32} rx={6} fill={C.greyDark} />
      ))}
      {/* loading dock doors */}
      {doorXs.map((dx, i) => (
        <g key={dx}>
          <rect x={dx - 80} y={-300} width={160} height={300} rx={6} fill={C.greyDark} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
            <rect key={k} x={dx - 80} y={-296 + k * 36} width={160} height={6} fill={shade(C.greyDark, 0.25)} />
          ))}
          {/* dock lamp */}
          <rect x={dx - 14} y={-340} width={28} height={18} rx={4} fill={C.greyDark} />
          <circle cx={dx} cy={-318} r={9} fill={C.yellow} opacity={anim === "lights" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((f - i * 12) / 5)) : 0.95} />
          {/* bumper pad */}
          <rect x={dx - 90} y={-22} width={180} height={22} rx={6} fill={C.yellowDark} />
        </g>
      ))}
      {/* small side windows high up */}
      {[-420, 420].map((wx) => (
        <rect key={wx} x={wx - 30} y={-370} width={60} height={34} rx={4} fill={C.skyDeep} />
      ))}
      {/* ground strip */}
      <rect x={-520} y={-6} width={1040} height={12} rx={4} fill={C.grey} opacity={0.5} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Forest path: tall trunks on both sides, a dirt path winding into the distance, ferns and light shafts.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const leaf = L(p.leaf ?? "#3E8F5A");
  const shafts = p.shafts !== false;
  const trunk = (x: number, w: number, col: string, k: string) => <rect key={k} x={x} y={300} width={w} height={1620} fill={L(col)} />;
  const fern = (x: number, y: number, s: number, k: string) => (
    <g key={k} transform={`translate(${x} ${y}) scale(${s})`}>
      {[-70, -35, 0, 35, 70].map((a, i) => <ellipse key={i} cx={0} cy={-60} rx={18} ry={70} fill={shade(leaf, -0.2)} transform={`rotate(${a})`} />)}
    </g>
  );
  return (
    <g>
      {/* forest floor and back wall */}
      <rect x={0} y={0} width={1080} height={1920} fill={L("#2F7A4E")} />
      <rect x={0} y={880} width={1080} height={220} fill={L("#8CC9A0")} opacity={0.3} />
      {Array.from({ length: 9 }, (_, i) => <circle key={`f${i}`} cx={i * 130} cy={990} r={120} fill={shade(leaf, 0.25)} />)}
      {/* distant trunks behind the path */}
      {trunk(440, 16, "#6B4530", "d1")}
      {trunk(620, 14, "#6B4530", "d2")}
      <rect x={0} y={1100} width={1080} height={820} fill={L("#3B8A58")} />
      {/* winding dirt path */}
      <path d="M 300 1920 Q 430 1500 500 1100 L 580 1100 Q 700 1500 780 1920 Z" fill={L("#C9A06B")} />
      <path d="M 360 1920 Q 470 1520 520 1120 L 560 1120 Q 650 1520 720 1920 Z" fill={L("#D9B07F")} />
      <circle cx={540} cy={1080} r={120} fill={L("#FFF1B0")} opacity={0.3} />
      {/* near trunks at the sides */}
      {trunk(-10, 92, "#5E3B26", "l1")}
      {trunk(110, 56, "#6B4530", "l2")}
      {trunk(196, 20, "#7A5238", "l3")}
      {trunk(892, 40, "#7A5238", "r3")}
      {trunk(956, 56, "#6B4530", "r2")}
      {trunk(1034, 60, "#5E3B26", "r1")}
      {/* canopy across the top */}
      {Array.from({ length: 9 }, (_, i) => <circle key={`c${i}`} cx={i * 140 - 20} cy={120 + rnd(4, i) * 90} r={110 + rnd(4, i + 9) * 40} fill={i % 2 ? leaf : shade(leaf, 0.12)} />)}
      {/* ferns along the edges */}
      {fern(120, 1700, 1.4, "f1")}
      {fern(960, 1680, 1.4, "f2")}
      {fern(170, 1400, 0.8, "f3")}
      {fern(930, 1420, 0.9, "f4")}
      {/* light shafts through the canopy */}
      {shafts && <path d="M 330 0 L 420 0 L 600 1920 L 470 1920 Z" fill="#FFF6C8" opacity={0.14 + 0.05 * Math.sin(t / 30)} />}
      {shafts && <path d="M 610 0 L 660 0 L 820 1300 L 760 1300 Z" fill="#FFF6C8" opacity={0.12 + 0.05 * Math.sin(t / 25 + 1)} />}
      <WeatherFx kind={weather} f={t} seed={6} />
    </g>
  );
}

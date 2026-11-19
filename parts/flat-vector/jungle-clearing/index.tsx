import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Ground, WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Jungle clearing: big leaves framing the edges, hanging vines, layered jungle canopy, mossy ground and mist.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const deep = L(p.canopy ?? "#2F8A5B"), mid = L("#3FA06A"), leafCol = L(p.leaf ?? "#4BB46A");
  const leaf = (x: number, y: number, s: number, rot: number, col: string, k: string) => (
    <g key={k} transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M 0 0 Q 90 -120 0 -330 Q -90 -120 0 0 Z" fill={col} />
      <rect x={-3} y={-300} width={6} height={290} fill={shade(col, 0.3)} />
    </g>
  );
  const vine = (d: string, k: string) => <path key={k} d={d} stroke={L(C.tealDark)} strokeWidth={12} fill="none" strokeLinecap="round" />;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={mid} />
      {/* layered canopy: dark back row, lighter front row */}
      <rect x={0} y={560} width={1080} height={720} fill={L("#246B47")} />
      {Array.from({ length: 8 }, (_, i) => <circle key={`b${i}`} cx={i * 150 + 40} cy={640 + rnd(12, i) * 60} r={130 + rnd(12, i + 8) * 40} fill={deep} />)}
      {/* far tree trunks */}
      <rect x={380} y={640} width={34} height={640} fill={L("#5E3B26")} />
      <rect x={700} y={600} width={40} height={680} fill={L("#5E3B26")} />
      {Array.from({ length: 6 }, (_, i) => <circle key={`f${i}`} cx={i * 190 + 10} cy={260 + rnd(13, i) * 70} r={120 + rnd(13, i + 6) * 40} fill={i % 2 ? deep : leafCol} />)}
      {/* mist drifting between the trees */}
      {[0, 1, 2, 3].map((i) => <ellipse key={`m${i}`} cx={((((t * 0.4 + i * 330) % 1400) + 1400) % 1400) - 160} cy={820 + i * 40} rx={320} ry={46} fill="#E6F4EC" opacity={0.2} />)}
      {/* vines hanging from the top */}
      {vine("M 170 0 Q 140 200 180 400 Q 150 560 200 760", "v1")}
      {vine("M 905 0 Q 940 220 900 420 Q 930 600 880 790", "v2")}
      {/* mossy ground */}
      <Ground y={1290} color={L("#6E9A4A")} kind="grass" time={time} f={t} />
      <ellipse cx={120} cy={1360} rx={120} ry={18} fill={L("#4F7D3A")} />
      <ellipse cx={980} cy={1400} rx={130} ry={20} fill={L("#4F7D3A")} />
      <ellipse cx={100} cy={1560} rx={90} ry={14} fill={L("#4F7D3A")} />
      {/* big leaves framing the corners and edges */}
      {leaf(0, 0, 1.3, 120, shade(leafCol, 0.25), "tl")}
      {leaf(1080, 0, 1.3, -120, shade(leafCol, 0.25), "tr")}
      {leaf(0, 900, 1.1, 80, shade(leafCol, 0.12), "ml")}
      {leaf(1080, 1000, 1.1, -75, shade(leafCol, 0.12), "mr")}
      {leaf(0, 1920, 1.2, 25, leafCol, "bl")}
      {leaf(1080, 1920, 1.2, -25, leafCol, "br")}
      <WeatherFx kind={weather} f={t} seed={14} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, TreeLine, Ground, WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Riverbank: a river flowing across the middle distance with moving ripples, grassy banks, stones, reeds and trees.
// The river sits behind the stage, so the near bank is clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const water = L(p.water ?? "#4E9ED8");
  const reed = (x: number, base: number, h: number, k: string) => (
    <g key={k}>
      <rect x={x - 3} y={base - h} width={6} height={h} fill={L("#6FA35A")} />
      <ellipse cx={x} cy={base - h + 26} rx={8} ry={20} fill={L(C.brownDark)} />
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1040} f={t} seed={18} />
      {/* far bank with trees */}
      <rect x={0} y={1060} width={1080} height={80} fill={L("#6FB077")} />
      <TreeLine y={1100} color={L(C.greenDark)} seed={19} size={0.9} kind="mixed" f={t} />
      {/* the river, curving across the frame */}
      <path d="M 0 1110 C 260 1080 520 1150 760 1120 S 1000 1100 1080 1130 L 1080 1270 C 900 1250 700 1300 480 1270 S 200 1260 0 1290 Z" fill={water} />
      <path d="M 0 1150 C 300 1130 500 1180 760 1154 S 1000 1140 1080 1160 L 1080 1190 C 900 1180 700 1220 480 1200 S 200 1196 0 1214 Z" fill="#FFFFFF" opacity={0.12} />
      {/* ripples moving with the current */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = (((rnd(22, i) * 1300 + t * (1.2 + rnd(22, i + 5))) % 1300) + 1300) % 1300 - 110;
        const y = 1130 + rnd(23, i) * 110;
        return <path key={i} d={`M ${x.toFixed(1)} ${y.toFixed(1)} q 18 -8 36 0`} stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.7} />;
      })}
      {/* near bank */}
      <Ground y={1290} color={L("#8CC66E")} kind="grass" time={time} f={t} />
      {[[60, 1350, 40], [120, 1380, 26], [930, 1340, 36], [1000, 1392, 24], [180, 1560, 30], [900, 1600, 34]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.6} fill={i % 2 ? L(C.grey) : L(C.greyDark)} />
      ))}
      {reed(30, 1306, 190, "r1")}
      {reed(72, 1312, 230, "r2")}
      {reed(116, 1304, 160, "r3")}
      {reed(1040, 1306, 210, "r4")}
      {reed(996, 1300, 150, "r5")}
      <WeatherFx kind={weather} f={t} seed={18} />
    </g>
  );
}

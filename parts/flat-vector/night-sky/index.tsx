import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, TreeLine, Stars, asTime, asWeather, lit, mix } from "../backdrop/index";

// Night sky (flat-vector background): a big starry sky with a moon, a soft Milky Way band and dark
// silhouette hills and trees along the bottom. The stage sits in the open middle of the ground.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "night"), weather = asWeather(p.weather ?? "clear");
  const drift = (p.anim ?? "drift") !== "none", seed = p.seed ?? 12;
  const silhouette = lit(p.silhouette ?? "#1B2445", time);
  const treeCol = mix(silhouette, "#05070F", 0.4);
  const horizon = 1420;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={horizon} f={drift ? f : 0} seed={seed} sun={false} clouds={weather === "clear" ? 1 : 3} />
      {/* Milky Way band: soft diagonal haze of tiny stars */}
      <g transform="rotate(-24 540 760)" opacity={0.55}>
        <ellipse cx={540} cy={760} rx={900} ry={170} fill="#B9C6F2" opacity={0.12} />
        <ellipse cx={540} cy={760} rx={760} ry={100} fill="#D9E2FF" opacity={0.12} />
      </g>
      <Stars f={f} count={140} seed={seed + 3} maxY={horizon - 200} />
      {/* big moon, upper left */}
      <circle cx={220} cy={360} r={170} fill="#FFF6D8" opacity={0.1} />
      <circle cx={220} cy={360} r={110} fill="#F4F1EA" />
      <circle cx={190} cy={336} r={18} fill="#DDD8CB" />
      <circle cx={250} cy={390} r={13} fill="#DDD8CB" />
      <circle cx={262} cy={330} r={9} fill="#DDD8CB" />
      {/* silhouette hills and trees */}
      <Hills y={horizon + 60} color={silhouette} seed={seed + 1} amp={60} waves={2} />
      <TreeLine y={horizon + 170} color={treeCol} seed={seed + 2} size={0.9} kind="mixed" f={drift ? f : 0} />
      <Hills y={horizon + 230} color={mix(silhouette, "#05070F", 0.3)} seed={seed + 5} amp={35} waves={3} />
      <rect x={0} y={horizon + 300} width={1080} height={620} fill={shade(silhouette, 0.1)} />
      {/* fireflies: tiny glowing dots that blink from p.f */}
      {drift && [0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={f1(120 + i * 170 + Math.sin(f / 30 + i) * 22)} cy={f1(1500 + (i % 3) * 90 + Math.cos(f / 40 + i) * 18)} r={5} fill="#FFF09A" opacity={f1(0.3 + 0.6 * Math.abs(Math.sin(f / 15 + i)))} />
      ))}
      <rect x={0} y={0} width={0} height={0} fill={C.ink} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

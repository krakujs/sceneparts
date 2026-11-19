import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Mountains, Hills, Ground, WeatherFx, lit, asTime, asWeather } from "../backdrop/index";

// Snowy mountains: snow-capped peaks, snow-covered slopes and ground, and snowy pines at the sides.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather ?? "snow");
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const white = L("#F2F5FA");
  const snowPine = (x: number, base: number, h: number, k: string) => (
    <g key={k}>
      <rect x={x - 6} y={base - h * 0.18} width={12} height={h * 0.2} fill={L(C.brownDark)} />
      <path d={`M ${x} ${base - h} L ${x + h * 0.3} ${base - h * 0.3} L ${x - h * 0.3} ${base - h * 0.3} Z`} fill={L("#2F6B5A")} />
      <path d={`M ${x} ${base - h} L ${x + h * 0.18} ${base - h * 0.7} L ${x - h * 0.18} ${base - h * 0.7} Z`} fill={white} />
      <path d={`M ${x} ${base - h * 0.62} L ${x + h * 0.36} ${base - h * 0.12} L ${x - h * 0.36} ${base - h * 0.12} Z`} fill={L("#2F6B5A")} />
      <path d={`M ${x} ${base - h * 0.62} L ${x + h * 0.2} ${base - h * 0.42} L ${x - h * 0.2} ${base - h * 0.42} Z`} fill={white} />
    </g>
  );
  const treeCover = p.treeCover !== false;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1060} f={t} seed={40} />
      <Mountains y={1060} color={L("#6C7DA6")} h={640} seed={40} snow peaks={4} />
      <Mountains y={1160} color={L("#8FA0C4")} h={380} seed={41} snow peaks={5} />
      <Hills y={1230} color={white} amp={40} seed={42} waves={2} />
      {treeCover && [300, 400, 690, 780].map((x, i) => snowPine(x, 1262, 120 + (i % 2) * 30, `m${i}`))}
      <Ground y={1290} color={white} kind="snow" time={time} />
      {treeCover && snowPine(44, 1300, 230, "l1")}
      {treeCover && snowPine(130, 1310, 170, "l2")}
      {treeCover && snowPine(1040, 1300, 250, "r1")}
      {treeCover && snowPine(950, 1310, 180, "r2")}
      <WeatherFx kind={weather} f={t} seed={40} />
    </g>
  );
}

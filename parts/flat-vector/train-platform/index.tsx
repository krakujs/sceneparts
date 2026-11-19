import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, WeatherFx, lit, asTime, asWeather, mix } from "../backdrop/index";

// Train platform (flat-vector background): canopy roof on pillars, a clock, benches, the yellow safety
// line on the platform edge, tracks beyond, and a train at the right side. The stage stays clear below y 1330.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const trainCol = p.train ?? C.red;
  const L = (c: string) => lit(c, time);
  const roof = L(C.greyDark), pillar = L(C.greyDark), platform = L("#C9CED8");
  const trainX = p.trainSide === "left" ? -120 : 300;
  const trainSlide = drift ? (f % 240) / 240 * 12 : 0;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={drift ? f : 0} seed={3} />
      {/* far city blocks */}
      {[[40, 430, 180], [260, 360, 150], [560, 470, 200], [820, 390, 170]].map(([x, h, w], i) => (
        <rect key={i} x={x} y={1000 - h} width={w} height={h} fill={L(mix("#8A97B8", "#DCEFF9", 0.2))} />
      ))}
      {/* track bed and rails */}
      <rect x={0} y={1000} width={1080} height={300} fill={L(C.greyLight)} opacity={0.9} />
      <rect x={0} y={1140} width={1080} height={10} fill={L(C.greyDark)} />
      <rect x={0} y={1205} width={1080} height={10} fill={L(C.greyDark)} />
      {new Array(18).fill(0).map((_, i) => <rect key={i} x={i * 64 - 20} y={1150} width={14} height={50} fill={L(C.brownDark)} />)}
      {/* train side view on the right (or left) */}
      <g transform={`translate(${trainX + trainSlide} 0)`}>
        <rect x={0} y={880} width={820} height={210} rx={30} fill={L(trainCol)} />
        <rect x={0} y={1060} width={820} height={30} fill={L(shade(trainCol, 0.25))} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={40 + i * 150} y={910} width={110} height={90} rx={12} fill={time === "night" ? "#FFE9A8" : L("#CFE6F5")} />
        ))}
        <rect x={0} y={1090} width={820} height={12} fill={L(C.greyDark)} />
        {[120, 380, 640].map((x) => <circle key={x} cx={x} cy={1125} r={24} fill={L(C.ink)} />)}
        <rect x={760} y={860} width={60} height={20} rx={8} fill={L(C.yellow)} />
      </g>
      {/* platform */}
      <rect x={0} y={1320} width={1080} height={600} fill={platform} />
      <rect x={0} y={1320} width={1080} height={12} fill={shade(platform, 0.12)} />
      <rect x={0} y={1338} width={1080} height={20} fill={L(C.yellow)} />
      <rect x={0} y={1358} width={1080} height={5} fill={L(C.yellowDark)} />
      {new Array(8).fill(0).map((_, i) => <rect key={i} x={i * 150 + 10} y={1600} width={70} height={6} rx={3} fill={shade(platform, 0.1)} />)}
      {/* canopy roof on pillars */}
      <rect x={0} y={0} width={1080} height={210} fill={roof} />
      <rect x={0} y={190} width={1080} height={34} fill={shade(roof, 0.18)} />
      {new Array(9).fill(0).map((_, i) => <path key={i} d={`M ${i * 128 - 30} 224 L ${i * 128 + 34} 224 L ${i * 128 + 2} 262 Z`} fill={shade(roof, 0.12)} />)}
      {[40, 1020].map((x) => <rect key={x} x={x - 18} y={224} width={36} height={1100} fill={pillar} />)}
      {[360, 720].map((x) => <rect key={x} x={x - 14} y={224} width={28} height={1100} fill={shade(pillar, 0.1)} />)}
      {/* station clock on a pillar */}
      <rect x={440} y={250} width={10} height={80} fill={L(C.ink)} />
      <circle cx={445} cy={300} r={62} fill={L(C.white)} />
      <circle cx={445} cy={300} r={62} fill="none" stroke={L(C.ink)} strokeWidth={12} />
      <line x1={445} y1={300} x2={445} y2={256} stroke={L(C.ink)} strokeWidth={8} strokeLinecap="round" />
      <line x1={445} y1={300} x2={478} y2={300} stroke={L(C.red)} strokeWidth={6} strokeLinecap="round" transform={`rotate(${f * 0.5} 445 300)`} />
      {/* benches on the far platform edge */}
      {[[60, 1480], [880, 1500]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={160} height={18} rx={6} fill={L(C.brown)} />
          <rect x={x + 10} y={y + 18} width={12} height={60} fill={L(C.brownDark)} />
          <rect x={x + 138} y={y + 18} width={12} height={60} fill={L(C.brownDark)} />
        </g>
      ))}
      <WeatherFx kind={weather} f={f} seed={5} />
    </g>
  );
}

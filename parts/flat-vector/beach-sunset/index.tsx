import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Sky, Ground, WeatherFx, lit, asTime, asWeather } from "../backdrop/index";

// Beach at sunset: a low sun setting on the horizon, a glowing reflection streak on the sea, a silhouetted palm and sand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "dusk"), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const horizon = 1000, sunX = 700;
  const silhouette = p.silhouette ?? "#2B2540";
  const streak = [0, 1, 2, 3, 4, 5].map((i) => {
    const w = 300 - i * 40, y = 1024 + i * 30;
    return <rect key={i} x={sunX - w / 2 + Math.sin(t / 20 + i) * 12} y={y} width={w} height={9} rx={4.5} fill={L("#FFD08A")} opacity={0.85 - i * 0.1} />;
  });
  return (
    <g>
      <Sky time={time} weather={weather} horizon={horizon} f={t} seed={9} sun={false} clouds={3} />
      {/* setting sun, half hidden by the sea */}
      <circle cx={sunX} cy={horizon} r={170} fill="#FFB36B" opacity={0.3} />
      <circle cx={sunX} cy={horizon} r={118} fill="#FF8A3D" />
      <circle cx={sunX} cy={horizon} r={96} fill={C.yellow} opacity={0.9} />
      {/* sea */}
      <rect x={0} y={horizon} width={1080} height={340} fill={L("#E77F6B")} />
      <rect x={0} y={horizon + 60} width={1080} height={80} fill={L("#C8667E")} />
      <rect x={0} y={horizon + 140} width={1080} height={200} fill={L("#8A5A92")} />
      {streak}
      {/* sand */}
      <Ground y={1330} color={L(C.sand)} kind="sand" time={time} />
      {/* silhouetted palm at the right edge */}
      <path d="M 960 1350 Q 920 1100 965 790" stroke={silhouette} strokeWidth={24} fill="none" strokeLinecap="round" />
      {[[965, 790, 880, 770], [965, 790, 930, 700], [965, 790, 1010, 690], [965, 790, 1060, 720], [965, 790, 1080, 800]].map(([x, y, ex, ey], i) => (
        <path key={i} d={`M ${x} ${y} Q ${(x + ex) / 2} ${Math.min(y, ey) - 70} ${ex} ${ey}`} stroke={silhouette} strokeWidth={20} fill="none" strokeLinecap="round" />
      ))}
      <WeatherFx kind={weather} f={t} seed={9} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Skyline, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Rainy street: dark buildings, glowing lamp posts, a wet road with puddles that reflect the light, and wet
// pavement at the sides. Rain falls from p.f. The stage in the middle stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "night"), weather = asWeather(p.weather ?? "rain"), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 129, glow = time !== "day" && time !== "morning";
  const road = lit(p.pavement ?? "#5D6578", time), wet = shade(road, 0.2);
  const reflect = p.reflections ?? true;
  const lamp = (x: number, flip = false) => (
    <g>
      <rect x={x - 6} y={1020} width={12} height={300} fill={C.ink} />
      <path d={`M ${x} 1040 Q ${x + (flip ? -40 : 40)} 1000 ${x + (flip ? -70 : 70)} 1025`} fill="none" stroke={C.ink} strokeWidth={10} />
      {glow && <ellipse cx={x + (flip ? -75 : 75)} cy={1050} rx={120} ry={100} fill="#FFD66B" opacity={0.2} />}
      <circle cx={x + (flip ? -75 : 75)} cy={1034} r={12} fill={glow ? "#FFF3C4" : C.greyLight} />
    </g>
  );
  const puddles = [[120, 1560, 150], [930, 1480, 130], [560, 1800, 170], [90, 1780, 120], [980, 1700, 110]];
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={ff} seed={seed} sun={false} clouds={4} />
      <Skyline y={1080} color={lit("#3E4A6E", time)} seed={seed} minH={300} maxH={720} lit={glow} />
      {/* wet sidewalks */}
      <rect x={0} y={1200} width={1080} height={120} fill={lit("#7D8599", time)} />
      {new Array(9).fill(0).map((_, i) => <rect key={i} x={i * 130 + 60} y={1200} width={4} height={120} fill={shade(lit("#7D8599", time), 0.2)} />)}
      <rect x={0} y={1320} width={1080} height={14} fill={lit("#9AA3B5", time)} />
      {/* road with puddles */}
      <rect x={0} y={1334} width={1080} height={586} fill={road} />
      {new Array(12).fill(0).map((_, i) => <rect key={i} x={0} y={1334 + i * 50} width={1080} height={2} fill={wet} opacity={0.5} />)}
      {puddles.map(([x, y, w], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={w} ry={w * 0.22} fill={wet} />
          <ellipse cx={x} cy={y} rx={w * 0.82} ry={w * 0.16} fill={lit("#3A4157", time)} opacity={0.6} />
          {reflect && glow && <rect x={x - 6} y={y + 4} width={12} height={w * 0.5} rx={6} fill="#FFD66B" opacity={0.4 + 0.2 * Math.sin(ff / 14 + i)} />}
          {reflect && !glow && <rect x={x - 6} y={y + 4} width={12} height={w * 0.4} rx={6} fill="#FFFFFF" opacity={0.15} />}
          {new Array(3).fill(0).map((_, k) => <ellipse key={k} cx={x + (rnd(seed, i * 5 + k) - 0.5) * w} cy={y + (rnd(seed, i * 5 + k + 9) - 0.5) * w * 0.14} rx={18} ry={3} fill="#E8F2FB" opacity={0.35} />)}
        </g>
      ))}
      {/* lamp posts at the sides */}
      {lamp(100)}
      {lamp(980, true)}
      {/* stripes of light on the road from the lamps */}
      {glow && <rect x={0} y={1334} width={1080} height={586} fill="#FFD66B" opacity={0.04} />}
      <WeatherFx kind={weather} f={f} seed={seed} intensity={1.2} />
    </g>
  );
}

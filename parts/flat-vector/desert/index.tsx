import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, Ground, WeatherFx, lit, asTime, asWeather } from "../backdrop/index";

// Desert: layered dunes, a far flat-topped mesa, heat haze above the horizon, saguaro cacti and rocks.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const sand = L(p.sand ?? "#E9CB94"), cactus = L("#5FAF6A"), rock = L("#A07C60");
  const saguaro = (x: number, base: number, h: number, k: string) => (
    <g key={k}>
      <rect x={x - 16} y={base - h} width={32} height={h} rx={16} fill={cactus} />
      <rect x={x - 60} y={base - h * 0.55} width={44} height={18} rx={9} fill={cactus} />
      <rect x={x - 70} y={base - h * 0.55 - 70} width={18} height={88} rx={9} fill={cactus} />
      <rect x={x + 16} y={base - h * 0.4} width={44} height={18} rx={9} fill={cactus} />
      <rect x={x + 52} y={base - h * 0.4 - 70} width={18} height={88} rx={9} fill={cactus} />
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1080} f={t} seed={7} />
      {/* far flat-topped mesa */}
      <path d="M 40 1090 L 100 1000 L 390 990 L 450 1090 Z" fill={L("#C98B5C")} />
      <path d="M 100 1000 L 390 990 L 380 1040 L 110 1044 Z" fill={L("#D99A6A")} />
      <path d="M 610 1090 L 650 1040 L 780 1034 L 820 1090 Z" fill={L("#D49A6A")} />
      {/* heat haze shimmering above the sand */}
      {[0, 1, 2].map((i) => <rect key={i} x={Math.sin(t / 12 + i) * 10} y={1044 + i * 22} width={1080} height={10} fill="#FFF6D8" opacity={0.28} />)}
      {/* dunes in layers */}
      <Hills y={1150} color={L("#E8C48A")} amp={60} seed={8} waves={2} />
      <Hills y={1240} color={L("#DDB071")} amp={70} seed={9} waves={3} />
      <Ground y={1330} color={sand} kind="sand" time={time} />
      <path d="M 0 1330 Q 300 1300 540 1336 T 1080 1322 L 1080 1340 L 0 1350 Z" fill={shade(sand, 0.06)} />
      {/* cacti at the sides */}
      {saguaro(90, 1380, 300, "c1")}
      {saguaro(1000, 1340, 230, "c2")}
      {/* rocks at the sides */}
      <ellipse cx={60} cy={1560} rx={62} ry={34} fill={rock} />
      <ellipse cx={40} cy={1550} rx={30} ry={20} fill={shade(rock, 0.15)} />
      <ellipse cx={1000} cy={1566} rx={72} ry={36} fill={rock} />
      <ellipse cx={1030} cy={1552} rx={34} ry={22} fill={shade(rock, 0.15)} />
      <WeatherFx kind={weather} f={t} seed={7} />
    </g>
  );
}

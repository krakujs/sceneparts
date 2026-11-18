import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, Ground, WeatherFx, lit, asTime, asWeather } from "../backdrop/index";

// Farm: a red barn and silo on the horizon, fence and ploughed field rows, hay bales at the sides, far hills.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const barn = L(p.barn ?? C.red), roof = L(C.greyDark), field = L(p.field ?? C.green);
  const white = L("#F4F1EA"), yel = L(C.yellow), yelDark = L(C.yellowDark);
  const bale = (x: number, y: number, r: number, k: string) => (
    <g key={k}>
      <circle cx={x} cy={y} r={r} fill={yel} />
      <circle cx={x} cy={y} r={r * 0.62} fill={yelDark} />
      <circle cx={x} cy={y} r={r * 0.34} fill={yel} />
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1040} f={t} seed={5} />
      <Hills y={1120} color={L("#7FB58A")} amp={40} seed={4} waves={2} />
      {/* red barn */}
      <rect x={580} y={1000} width={230} height={262} fill={barn} />
      <rect x={580} y={1000} width={230} height={10} fill={white} />
      <path d="M 562 1012 L 695 906 L 828 1012 Z" fill={roof} />
      <rect x={650} y={1130} width={84} height={132} fill={white} />
      <rect x={690} y={1130} width={4} height={132} fill={shade(barn, 0.3)} />
      <rect x={672} y={1030} width={42} height={40} fill={white} />
      <rect x={690} y={1030} width={4} height={40} fill={shade(barn, 0.3)} />
      {/* silo */}
      <rect x={846} y={900} width={84} height={362} fill={L("#D9DEE8")} />
      <ellipse cx={888} cy={900} rx={42} ry={30} fill={L("#B8C0D2")} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={846} y={960 + i * 52} width={84} height={6} fill={L("#B8C0D2")} />)}
      {/* field */}
      <Ground y={1262} color={field} kind="grass" time={time} f={t} />
      {[1290, 1318, 1352, 1394, 1446, 1510].map((y, i) => <rect key={y} x={0} y={y} width={1080} height={8 + i * 2} fill={shade(field, 0.1 + i * 0.02)} />)}
      {/* fence along the back of the field */}
      {Array.from({ length: 19 }, (_, i) => <rect key={`p${i}`} x={i * 60} y={1222} width={12} height={50} fill={L(C.brownDark)} />)}
      <rect x={0} y={1236} width={1080} height={8} fill={L(C.brown)} />
      <rect x={0} y={1256} width={1080} height={8} fill={L(C.brown)} />
      {/* round bush at the far left */}
      <circle cx={40} cy={1190} r={56} fill={L(C.greenDark)} />
      {/* hay bales at the sides */}
      {bale(96, 1330, 36, "a")}
      {bale(80, 1420, 52, "b")}
      {bale(170, 1452, 44, "c")}
      {bale(1000, 1430, 50, "d")}
      {bale(960, 1350, 32, "e")}
      <WeatherFx kind={weather} f={t} seed={5} />
    </g>
  );
}

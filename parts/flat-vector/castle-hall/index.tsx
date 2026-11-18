import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Castle hall: stone walls, hanging banners with simple shapes, flickering torches, arched-style Windows and a long table at the back.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const banner = L(p.banner ?? C.blue), floorY = 1300;
  const flick = (i: number) => (drift ? Math.sin(f / 4 + i * 1.9) * 3 : 0);
  const torch = (x: number, y: number, i: number) => (
    <g>
      <rect x={x - 8} y={y} width={16} height={60} rx={4} fill={L(C.brownDark)} />
      <path d={`M ${x - 4} ${y} Q ${x - 16 + flick(i)} ${y - 40} ${x + flick(i)} ${y - 70 - flick(i)} Q ${x + 16 - flick(i)} ${y - 40} ${x + 4} ${y} Z`} fill={C.orange} />
      <path d={`M ${x - 2} ${y - 4} Q ${x - 8} ${y - 30} ${x} ${y - 46} Q ${x + 8} ${y - 30} ${x + 2} ${y - 4} Z`} fill={C.yellow} />
      <circle cx={x} cy={y - 20} r={110} fill={C.yellow} opacity={time === "day" ? 0.06 : 0.12} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={L("#B8B2A6")} floor={L("#8C8778")} floorY={floorY} floorKind="tiles" panels={false} skirting={false} />
      {/* stone block joints */}
      {new Array(9).fill(0).map((_, r) => new Array(6).fill(0).map((__, c) => (
        <rect key={`${r}-${c}`} x={c * 180 + (r % 2 ? 90 : 0)} y={r * 110} width={180} height={110} fill="none" stroke={shade(L("#B8B2A6"), 0.12)} strokeWidth={4} />
      )))}
      {/* tall Windows on the back wall */}
      <Window x={120} y={300} w={180} h={320} time={time} weather={weather} f={drift ? f : 0} frame={L("#7D7A74")} curtains={undefined} />
      <Window x={780} y={300} w={180} h={320} time={time} weather={weather} f={drift ? f : 0} frame={L("#7D7A74")} curtains={undefined} />
      {/* banners hanging from the top with simple shapes */}
      {[400, 680].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y={60} width={12} height={20} fill={L(C.greyDark)} />
          <path d={`M ${x - 70} 80 L ${x + 70} 80 L ${x + 70} 460 L ${x} 520 L ${x - 70} 460 Z`} fill={banner} />
          <path d={`M ${x - 70} 80 L ${x + 70} 80 L ${x + 70} 110 L ${x - 70} 110 Z`} fill={L(C.yellow)} />
          <circle cx={x} cy={300} r={36} fill={L(C.yellow)} />
          <path d={`M ${x} 340 L ${x + 30} 400 L ${x - 30} 400 Z`} fill={L(C.yellow)} />
        </g>
      ))}
      {/* long table at the back, clear of the stage */}
      <rect x={300} y={960} width={480} height={22} rx={6} fill={L(C.brown)} />
      <rect x={320} y={982} width={14} height={110} fill={L(C.brownDark)} />
      <rect x={746} y={982} width={14} height={110} fill={L(C.brownDark)} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={340 + i * 110} y={900} width={60} height={60} rx={6} fill={L(C.brownDark)} />)}
      <rect x={420} y={930} width={60} height={30} rx={8} fill={L(C.orange)} />
      <rect x={560} y={936} width={40} height={24} rx={6} fill={L(C.yellowDark)} />
      {/* wall torches flicker from p.f */}
      {torch(90, 780, 0)}
      {torch(990, 780, 1)}
    </g>
  );
}

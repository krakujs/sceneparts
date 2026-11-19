import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Lamp, lit, asTime } from "../backdrop/index";

// Restaurant interior (flat-vector background): warm walls, booths along the back, a bar with shelves,
// tables with tablecloths and candles at the sides, and warm lamps. The centre of the floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const cloth = L(p.cloth ?? C.red), wall = p.wall ?? "#5E2A33";
  const floorY = 1360;
  const flicker = drift ? 0.85 + 0.15 * Math.sin(f / 6) : 1;
  const table = (x: number, y: number, w: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y - 30} width={w} height={200} rx={14} fill={cloth} />
      <path d={`M ${x} ${y + 150} L ${x + w} ${y + 150} L ${x + w + 30} ${y + 200} L ${x - 30} ${y + 200} Z`} fill={shade(cloth, 0.15)} opacity={0.6} />
      <rect x={x + w / 2 - 14} y={y - 14} width={28} height={70} rx={6} fill={L(C.white)} />
      <ellipse cx={x + w / 2} cy={y - 14} rx={22} ry={8} fill={L(C.yellow)} opacity={0.75 * flicker} />
      <circle cx={x + w / 2} cy={y - 26} r={10} fill={L("#FFE9A8")} opacity={flicker} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={wall} floor="#6B4029" floorY={floorY} floorKind="boards" panels={false} />
      {/* booths along the back wall */}
      {[40, 560].map((x, i) => (
        <g key={i}>
          <rect x={x} y={900} width={480} height={160} rx={40} fill={L(C.brownDark)} />
          <rect x={x + 20} y={880} width={440} height={60} rx={24} fill={L(C.greenDark)} />
          <rect x={x + 60} y={1030} width={360} height={24} rx={10} fill={L(C.brown)} />
        </g>
      ))}
      {/* bar with shelves at the back-right */}
      <rect x={820} y={560} width={260} height={20} rx={6} fill={L(C.brownDark)} />
      {[620, 700, 780].map((y, r) => (
        <g key={r}>
          <rect x={800} y={y} width={300} height={10} fill={L(C.brown)} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={820 + i * 70} y={y - 56} width={28} height={54} rx={8} fill={L([C.green, C.purple, C.yellow, C.orange][(i + r) % 4])} />)}
        </g>
      ))}
      <rect x={740} y={1050} width={320} height={60} rx={8} fill={L(C.brownDark)} />
      {/* warm lamps */}
      <Lamp x={300} y={240} on color={C.red} />
      <Lamp x={780} y={260} on color={C.red} />
      {/* side tables with tablecloths and candles */}
      {table(40, 1420, 190)}
      {table(850, 1450, 190)}
      {/* bar stool row by the bar */}
      {[840, 920, 1000].map((x) => (
        <g key={x}>
          <rect x={x - 22} y={1080} width={44} height={20} rx={8} fill={L(C.red)} />
          <rect x={x - 6} y={1100} width={12} height={90} fill={L(C.brownDark)} />
        </g>
      ))}
    </g>
  );
}

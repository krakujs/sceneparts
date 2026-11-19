import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, Lamp, lit, asTime, asWeather } from "../backdrop/index";

// Living room background (preset of flat-vector/backdrop): sofa on the left, framed picture, plant,
// side table with lamp on the right, rug in the middle. The centre of the floor stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const sofa = L(p.sofa ?? C.blue), wall = p.wall ?? "#F3E3C7";
  const floorY = 1360;
  return (
    <g>
      <Room time={time} wall={wall} floor="#C99A6B" floorY={floorY} floorKind="boards" />
      <Window x={620} y={430} w={300} h={360} time={time} weather={weather} f={drift ? f : 0} curtains={L("#E8C26A")} />
      <Lamp x={300} y={240} on={time === "night" || time === "dusk"} />
      {/* framed picture: abstract hills */}
      <rect x={120} y={560} width={260} height={190} rx={6} fill={L(C.brownDark)} />
      <rect x={136} y={576} width={228} height={158} fill={L("#CFE6F5")} />
      <path d="M 136 734 L 136 690 Q 200 640 260 690 Q 310 650 364 680 L 364 734 Z" fill={L(C.green)} />
      <circle cx={320} cy={620} r={18} fill={L(C.yellow)} />
      {/* rug */}
      <ellipse cx={540} cy={1640} rx={420} ry={110} fill={L(C.red)} opacity={0.85} />
      <ellipse cx={540} cy={1640} rx={330} ry={78} fill={L(shade(C.red, -0.2))} opacity={0.7} />
      {/* sofa on the left */}
      <g>
        <rect x={-40} y={1060} width={420} height={200} rx={40} fill={shade(sofa, 0.12)} />
        <rect x={-40} y={1200} width={440} height={150} rx={30} fill={sofa} />
        <rect x={350} y={1150} width={80} height={210} rx={30} fill={shade(sofa, 0.08)} />
        <rect x={40} y={1340} width={24} height={40} fill={L(C.brownDark)} />
        <rect x={380} y={1340} width={24} height={40} fill={L(C.brownDark)} />
        <rect x={60} y={1110} width={120} height={110} rx={24} fill={L(C.yellow)} transform="rotate(-8 120 1165)" />
      </g>
      {/* side table + table lamp on the right */}
      <rect x={880} y={1180} width={170} height={20} rx={6} fill={L(C.brown)} />
      <rect x={900} y={1200} width={16} height={180} fill={L(C.brownDark)} />
      <rect x={1014} y={1200} width={16} height={180} fill={L(C.brownDark)} />
      <rect x={955} y={1080} width={12} height={100} fill={L(C.greyDark)} />
      <path d="M 915 1080 L 935 1010 L 987 1010 L 1007 1080 Z" fill={time === "night" ? "#FFE9A8" : L(C.white)} />
      {/* potted plant */}
      <path d="M 760 1380 L 740 1290 L 840 1290 L 820 1380 Z" fill={L(C.orange)} />
      {[-40, -15, 10, 35].map((a, i) => (
        <ellipse key={i} cx={790} cy={1210} rx={22} ry={80} fill={L(i % 2 ? C.green : C.greenDark)} transform={`rotate(${a + Math.sin(f / 35 + i) * (drift ? 2 : 0)} 790 1290)`} />
      ))}
    </g>
  );
}

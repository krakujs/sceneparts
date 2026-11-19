import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, Lamp, lit, asTime, asWeather } from "../backdrop/index";

// Court room background (preset of flat-vector/backdrop): the judge's raised bench with a high chair at the back,
// a plain emblem shape above it, a witness stand at the right, a wooden rail and public bench at the left, and a
// Window with weather. The centre stays clear. No flags.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1340, wood = L(p.wood ?? "#B58A5E"), woodL = shade(wood, -0.12), woodD = shade(wood, 0.25), ink = L(C.ink);
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#F3E3C7"} floor="#A67B55" floorY={floorY} floorKind="boards" panels={false} />
      {/* wood panelling along the lower wall */}
      <rect x={0} y={900} width={1080} height={floorY - 900} fill={wood} />
      {Array.from({ length: 11 }, (_, i) => <rect key={i} x={i * 100 + 46} y={920} width={8} height={floorY - 940} fill={woodD} opacity={0.5} />)}
      <rect x={0} y={890} width={1080} height={16} fill={woodD} />
      {/* Window at the top left, with weather */}
      <Window x={60} y={300} w={230} h={260} time={time} weather={weather} f={drift ? f : 0} view="trees" curtains={L(C.greyDark)} />
      <Lamp x={800} y={200} on={time === "night" || time === "dusk"} />
      {/* plain emblem shape above the judge: a disc with a simple balance */}
      <circle cx={540} cy={600} r={88} fill={woodD} />
      <circle cx={540} cy={600} r={74} fill={L(C.yellow)} />
      <rect x={500} y={572} width={80} height={10} rx={5} fill={ink} />
      <rect x={535} y={560} width={10} height={70} rx={4} fill={ink} />
      <path d="M 486 630 L 506 590 L 526 630 Z" fill={ink} />
      <path d="M 554 630 L 574 590 L 594 630 Z" fill={ink} />
      {/* judge's high chair and raised bench at the back */}
      <rect x={470} y={740} width={140} height={250} rx={20} fill={woodD} />
      <rect x={490} y={760} width={100} height={190} rx={14} fill={L(C.brownDark)} />
      <rect x={270} y={990} width={540} height={350} fill={woodL} />
      <rect x={250} y={972} width={580} height={28} rx={6} fill={wood} />
      {[300, 420, 540, 660, 780].map((x) => <rect key={x} x={x - 4} y={1020} width={8} height={300} fill={woodD} opacity={0.5} />)}
      <rect x={250} y={1000} width={580} height={6} fill={woodD} opacity={0.6} />
      {/* witness stand at the right */}
      <rect x={862} y={1110} width={180} height={230} rx={4} fill={woodL} />
      <rect x={846} y={1084} width={212} height={26} rx={8} fill={wood} />
      <rect x={890} y={1168} width={100} height={18} rx={4} fill={woodD} opacity={0.6} />
      <rect x={880} y={1340} width={16} height={24} fill={woodD} />
      <rect x={1010} y={1340} width={16} height={24} fill={woodD} />
      {/* wooden rail and public bench at the left */}
      <rect x={0} y={1270} width={200} height={16} rx={6} fill={wood} />
      {[30, 130].map((x) => <rect key={x} x={x} y={1270} width={12} height={92} fill={woodD} />)}
      <rect x={0} y={1392} width={240} height={34} rx={8} fill={wood} />
      <rect x={14} y={1426} width={18} height={90} fill={woodD} />
      <rect x={196} y={1426} width={18} height={90} fill={woodD} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, Lamp, lit, asTime, asWeather, rnd } from "../backdrop/index";

// Shop interior (flat-vector background): shelves of goods on the back wall, a counter with a till, a shop
// Window onto the street and a hanging sign shape with no words. The centre of the floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360, wall = p.wall ?? "#F4EEE2", accent = p.accent ?? C.teal;
  const goods = [C.red, C.yellow, C.blue, C.green, C.orange, C.purple, C.pink, C.teal];
  return (
    <g>
      <Room time={time} wall={wall} floor="#B89066" floorY={floorY} floorKind="boards" panels={false} />
      {/* shop glass onto the street */}
      <Window x={80} y={380} w={300} h={380} time={time} weather={weather} f={drift ? f : 0} frame={L(C.white)} curtains={undefined} view="city" />
      {/* hanging sign shape, abstract, no words */}
      <line x1={540} y1={0} x2={540} y2={200} stroke={L(C.ink)} strokeWidth={4} />
      <line x1={480} y1={0} x2={480} y2={200} stroke={L(C.ink)} strokeWidth={4} />
      <rect x={440} y={200} width={200} height={110} rx={16} fill={L(accent)} />
      <rect x={470} y={240} width={140} height={14} rx={7} fill={L(C.white)} />
      <rect x={490} y={270} width={100} height={12} rx={6} fill={L(C.yellow)} />
      {/* shelves with goods on the back-right wall */}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x={560} y={450 + r * 150} width={460} height={14} fill={L(C.brownDark)} />
          {new Array(7).fill(0).map((_, i) => {
            const h = 60 + rnd(7, r * 10 + i) * 40;
            return <rect key={i} x={580 + i * 62} y={450 + r * 150 - h} width={44} height={h} rx={8} fill={L(goods[(i + r * 3) % goods.length])} />;
          })}
        </g>
      ))}
      {/* counter with till */}
      <rect x={560} y={1120} width={460} height={130} rx={10} fill={L(C.brown)} />
      <rect x={540} y={1100} width={500} height={28} rx={10} fill={L(C.brownDark)} />
      <rect x={640} y={1040} width={150} height={60} rx={10} fill={L(C.greyDark)} />
      <rect x={656} y={1052} width={118} height={28} rx={6} fill={time === "night" ? "#7CD0FF" : L("#CFE6F5")} />
      <rect x={830} y={1060} width={110} height={40} rx={8} fill={L(C.greyLight)} />
      {/* small goods on the counter */}
      {[600, 760, 900].map((x, i) => <rect key={i} x={x} y={1080} width={36} height={22} rx={6} fill={L(goods[(i + 3) % goods.length])} />)}
      {/* display table near the wall, left of the stage */}
      <rect x={40} y={1190} width={180} height={14} rx={6} fill={L(C.brownDark)} />
      {[0, 1, 2].map((i) => <rect key={i} x={60 + i * 56} y={1140} width={44} height={50} rx={8} fill={L(goods[i + 2])} />)}
      <Lamp x={260} y={200} on={time === "night" || time === "dusk"} color={accent} />
    </g>
  );
}

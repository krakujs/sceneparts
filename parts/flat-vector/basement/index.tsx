import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Basement background: concrete walls and floor, pipes along the ceiling, a boiler at the left, shelves of boxes
// on the right, a small high Window and a bare bulb. The stage in the middle of the floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const wall = p.wall ?? "#A7AAB3", pipe = L(p.pipe ?? C.greyDark), boiler = L(p.boiler ?? C.red);
  const floorY = 1360;
  const bulbOn = time === "night" || time === "dusk" || p.bulb !== false;
  return (
    <g>
      <Room time={time} wall={wall} floor="#8F8A86" floorY={floorY} floorKind="concrete" panels={false} skirting={false} />
      {/* small high window, right */}
      <Window x={700} y={250} w={200} h={110} time={time} weather={weather} f={drift ? f : 0} frame={C.greyLight} view="city" />
      {/* pipes along the ceiling */}
      <rect x={0} y={460} width={1080} height={16} fill={pipe} />
      <rect x={0} y={486} width={1080} height={10} fill={shade(pipe, 0.2)} />
      <rect x={160} y={300} width={14} height={160} fill={pipe} />
      <rect x={380} y={300} width={14} height={160} fill={pipe} />
      <rect x={160} y={300} width={60} height={14} fill={pipe} />
      <rect x={380} y={300} width={60} height={14} fill={pipe} />
      <circle cx={440} cy={460} r={14} fill={L(C.yellow)} />
      {/* bare bulb */}
      <rect x={537} y={0} width={6} height={250} fill={C.ink} />
      {bulbOn && <ellipse cx={540} cy={330} rx={200} ry={130} fill="#FFF1B0" opacity={0.2} />}
      <circle cx={540} cy={330} r={22} fill={bulbOn ? "#FFF6D8" : C.greyLight} />
      {/* boiler at the left, with a pipe up into the ceiling */}
      <rect x={30} y={820} width={210} height={540} rx={26} fill={boiler} />
      <rect x={50} y={840} width={170} height={20} rx={8} fill={shade(boiler, 0.2)} />
      <circle cx={100} cy={920} r={26} fill={L(C.white)} />
      <circle cx={100} cy={920} r={12} fill={shade(boiler, 0.3)} />
      <circle cx={170} cy={920} r={26} fill={L(C.white)} />
      <rect x={70} y={1000} width={130} height={60} rx={8} fill={shade(boiler, 0.15)} />
      <rect x={80} y={1010} width={110} height={8} rx={4} fill={L(C.yellow)} />
      <rect x={80} y={1030} width={60} height={8} rx={4} fill={L(C.greyLight)} />
      <rect x={210} y={486} width={18} height={334} fill={pipe} />
      <rect x={200} y={600} width={40} height={14} rx={4} fill={pipe} />
      <rect x={60} y={1290} width={20} height={70} fill={L(C.greyDark)} />
      <rect x={190} y={1290} width={20} height={70} fill={L(C.greyDark)} />
      {/* shelves of boxes, right */}
      {[880, 1040, 1200].map((y, s) => (
        <g key={s}>
          <rect x={650} y={y} width={400} height={14} fill={L(C.brownDark)} />
          <rect x={660} y={y + 14} width={10} height={160} fill={L(C.brownDark)} />
          <rect x={1030} y={y + 14} width={10} height={160} fill={L(C.brownDark)} />
          {[0, 1, 2, 3].map((b) => (
            <rect key={b} x={674 + b * 90} y={y - (b % 2 ? 60 : 84) + (s === 1 && b === 2 ? 20 : 0)} width={74} height={b % 2 ? 60 : 84} rx={4} fill={L(b % 2 ? C.sand : shade(C.sand, 0.1))} />
          ))}
        </g>
      ))}
      {/* stray boxes on the floor, at the far right */}
      <rect x={930} y={1280} width={120} height={80} rx={4} fill={L(C.sand)} />
      <rect x={940} y={1240} width={100} height={40} rx={4} fill={L(shade(C.sand, 0.08))} />
      <rect x={940} y={1296} width={100} height={10} fill={L(C.yellowDark)} opacity={0.7} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Home office background: a desk with a computer and desk lamp at the right, a bookshelf on the left, a Window
// with a plant, and an office chair. The centre of the floor stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const wood = L(p.wood ?? C.sand), woodDark = L(shade(C.sand, 0.3)), accent = L(p.accent ?? C.blue);
  const glow = time === "night" || time === "dusk";
  const floorY = 1360;
  const books = [C.red, C.teal, C.yellow, C.purple, C.green, C.orange, C.blue];
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#DCE9E4"} floor={p.floor ?? "#B58A5E"} floorY={floorY} floorKind="boards" />
      <Window x={380} y={330} w={240} h={300} time={time} weather={weather} f={drift ? f : 0} view="city" frame={C.white} />
      {/* bookshelf on the left */}
      <rect x={20} y={760} width={230} height={560} rx={6} fill={woodDark} />
      {[860, 980, 1100, 1220].map((y, s) => (
        <g key={s}>
          <rect x={36} y={y} width={198} height={12} fill={wood} />
          {new Array(8).fill(0).map((_, i) => <rect key={i} x={46 + i * 23} y={y - 58 - ((i + s) % 3) * 8} width={18} height={58 + ((i + s) % 3) * 8} rx={3} fill={L(books[(i + s * 2) % books.length])} />)}
        </g>
      ))}
      {/* plant on the floor, by the right end of the desk */}
      <g transform="translate(900 0)">
      <path d="M 40 1360 L 50 1290 L 120 1290 L 130 1360 Z" fill={L(C.orange)} />
      {[-34, -12, 12, 34].map((a, i) => <ellipse key={i} cx={86} cy={1200} rx={16} ry={88} fill={L(i % 2 ? C.green : C.greenDark)} transform={`rotate(${a + (drift ? Math.sin(f / 30 + i) * 2 : 0)} 86 1290)`} />)}
      </g>
      {/* desk at the right with a monitor and a desk lamp */}
      <rect x={700} y={1110} width={360} height={22} rx={6} fill={wood} />
      <rect x={700} y={1132} width={360} height={10} fill={woodDark} />
      <rect x={720} y={1142} width={14} height={200} fill={woodDark} />
      <rect x={1046} y={1142} width={14} height={200} fill={woodDark} />
      <rect x={880} y={1140} width={180} height={60} rx={6} fill={shade(wood, 0.1)} />
      {/* monitor */}
      <rect x={800} y={840} width={210} height={150} rx={10} fill={L(C.ink)} />
      <rect x={814} y={854} width={182} height={122} rx={6} fill={glow ? "#8EC5E8" : L(C.navy)} />
      <rect x={880} y={990} width={40} height={24} fill={L(C.greyDark)} />
      <rect x={850} y={1010} width={100} height={12} rx={6} fill={L(C.greyDark)} />
      <rect x={830} y={880} width={130} height={10} rx={4} fill={L(C.white)} opacity={0.6} />
      <rect x={830} y={900} width={90} height={10} rx={4} fill={L(C.white)} opacity={0.4} />
      {/* desk lamp */}
      <rect x={1000} y={1010} width={8} height={100} fill={L(C.greyDark)} />
      <path d="M 980 1010 L 1030 960 L 1044 972 L 1000 1020 Z" fill={L(accent)} />
      <circle cx={1020} cy={972} r={10} fill={glow ? "#FFF3C4" : L(C.white)} />
      {/* keyboard and mug on the desk */}
      <rect x={720} y={1094} width={130} height={16} rx={5} fill={L(C.greyLight)} />
      <rect x={880} y={1080} width={40} height={30} rx={6} fill={L(C.teal)} />
      {/* office chair in front of the desk */}
      <rect x={660} y={1000} width={100} height={110} rx={30} fill={accent} transform="rotate(-6 710 1055)" />
      <rect x={690} y={1110} width={56} height={34} rx={10} fill={shade(accent, 0.15)} />
      <rect x={714} y={1144} width={10} height={110} fill={L(C.greyDark)} />
      <path d="M 660 1260 L 760 1260 L 740 1282 L 680 1282 Z" fill={L(C.greyDark)} />
      <circle cx={664} cy={1288} r={8} fill={L(C.ink)} />
      <circle cx={756} cy={1288} r={8} fill={L(C.ink)} />
    </g>
  );
}

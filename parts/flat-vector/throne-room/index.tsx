import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, asTime, asWeather, Window } from "../backdrop/index";

// Throne room (flat-vector background): a long stone hall seen from the far end. A red carpet runs from the
// bottom of the frame up three steps to a raised dais with a gold-framed red-velvet throne (tall back, pointed
// finials, arms, seat cushion and legs). Stone columns line both sides, plain banners hang on the back wall,
// tall windows show the weather, and chandeliers hang from the ceiling. Nothing stands in the centre stage.
const WALL_Y = 1150; // where the back wall meets the floor
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "dusk"), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const stone = L(p.wall ?? "#B8B2A6"), joint = shade(stone, 0.16), col = L("#D9D3C7"), floor = L("#8C8778");
  const carpet = L(p.carpet ?? "#A8323A"), carpetDk = shade(carpet, 0.2), gold = L(C.yellowDark), goldHi = L(C.yellow);
  const velvet = L(p.throne ?? "#C2382C"), velvetHi = shade(velvet, -0.15), banner = L(p.banner ?? C.blue);
  const flick = (i: number) => (drift ? Math.sin(f / 4 + i * 1.9) * 3 : 0);

  const column = (x: number, base: number, s: number, key: string) => (
    <g key={key}>
      <rect x={f1(x - 46 * s)} y={f1(base - 640 * s)} width={f1(92 * s)} height={f1(640 * s)} fill={col} />
      <rect x={f1(x + 20 * s)} y={f1(base - 640 * s)} width={f1(26 * s)} height={f1(640 * s)} fill={shade(col, 0.1)} />
      <rect x={f1(x - 60 * s)} y={f1(base - 680 * s)} width={f1(120 * s)} height={f1(40 * s)} fill={shade(col, 0.06)} />
      <rect x={f1(x - 70 * s)} y={f1(base - 12 * s)} width={f1(140 * s)} height={f1(24 * s)} fill={shade(col, 0.1)} />
    </g>
  );
  const torch = (x: number, y: number, i: number) => (
    <g key={`t${i}`}>
      <rect x={x - 7} y={y} width={14} height={50} fill={C.brownDark} />
      <path d={`M ${x - 14} ${y} Q ${x - 24 + flick(i)} ${y - 36} ${x + flick(i)} ${y - 62 - flick(i)} Q ${x + 24 - flick(i)} ${y - 36} ${x + 14} ${y} Z`} fill={C.orange} />
      <path d={`M ${x - 6} ${y - 2} Q ${x - 10} ${y - 24} ${x} ${y - 36} Q ${x + 10} ${y - 24} ${x + 6} ${y - 2} Z`} fill={C.yellow} />
      <circle cx={x} cy={y - 24} r={100} fill={C.yellow} opacity={time === "day" ? 0.05 : 0.12} />
    </g>
  );
  const candles = [420, 480, 540, 600, 660];
  return (
    <g>
      {/* back wall with stone block joints, and the floor */}
      <rect x={0} y={0} width={1080} height={WALL_Y} fill={stone} />
      {new Array(10).fill(0).map((_, r) => (
        <g key={r}>
          <rect x={0} y={r * 115} width={1080} height={4} fill={joint} />
          {new Array(7).fill(0).map((__, c) => <rect key={c} x={c * 180 + (r % 2 ? 90 : 0)} y={r * 115} width={4} height={115} fill={joint} />)}
        </g>
      ))}
      <rect x={0} y={WALL_Y} width={1080} height={1920 - WALL_Y} fill={floor} />
      <rect x={0} y={WALL_Y - 22} width={1080} height={22} fill={shade(stone, 0.28)} />
      {/* tall windows, banners and chandeliers on the back wall */}
      <Window x={60} y={250} w={190} h={430} time={time} weather={weather} f={drift ? f : 0} frame={L("#7D7A74")} />
      <Window x={830} y={250} w={190} h={430} time={time} weather={weather} f={drift ? f : 0} frame={L("#7D7A74")} />
      {[330, 750].map((x, i) => (
        <g key={`b${i}`}>
          <rect x={x - 5} y={60} width={10} height={24} fill={gold} />
          <path d={`M ${x - 62} 84 L ${x + 62} 84 L ${x + 62} 500 L ${x} 556 L ${x - 62} 500 Z`} fill={banner} />
          <path d={`M ${x - 62} 84 L ${x + 62} 84 L ${x + 62} 112 L ${x - 62} 112 Z`} fill={goldHi} />
          <path d={`M ${x} 250 L ${x + 16} 290 L ${x + 58} 292 L ${x + 24} 318 L ${x + 36} 360 L ${x} 336 L ${x - 36} 360 L ${x - 24} 318 L ${x - 58} 292 L ${x - 16} 290 Z`} fill={goldHi} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={`ch${i}`}>
          <rect x={536} y={0} width={8} height={170 + i * 0} fill={C.ink} />
          <ellipse cx={540} cy={200} rx={150} ry={26} fill="none" stroke={gold} strokeWidth={9} />
          {candles.map((x, j) => (
            <g key={j}>
              <rect x={x - 6} y={196 + Math.abs(x - 540) * 0.1} width={12} height={22} fill={C.white} />
              <path d={`M ${x} ${190 + Math.abs(x - 540) * 0.1} Q ${x - 6 + flick(j)} ${180 + Math.abs(x - 540) * 0.1} ${x + flick(j)} ${172 + Math.abs(x - 540) * 0.1} Q ${x + 6 - flick(j)} ${180} ${x} ${190 + Math.abs(x - 540) * 0.1} Z`} fill={C.orange} />
            </g>
          ))}
        </g>
      ))}
      {/* dais: a raised block with three steps down to the floor */}
      <rect x={340} y={1040} width={400} height={110} fill={shade(stone, 0.08)} />
      <rect x={340} y={1040} width={400} height={8} fill={gold} />
      <rect x={300} y={WALL_Y} width={480} height={36} fill={shade(stone, 0.14)} />
      <rect x={250} y={WALL_Y + 36} width={580} height={34} fill={shade(stone, 0.2)} />
      {/* the throne: legs, tall back, seat, arms, finials */}
      <rect x={446} y={1000} width={20} height={42} fill={gold} />
      <rect x={614} y={1000} width={20} height={42} fill={gold} />
      <rect x={470} y={440} width={140} height={500} rx={26} fill={velvet} />
      <rect x={462} y={432} width={156} height={516} rx={32} fill="none" stroke={gold} strokeWidth={14} />
      <rect x={490} y={480} width={100} height={400} rx={18} fill={velvetHi} opacity={0.5} />
      <path d="M 452 440 L 478 368 L 504 440 Z" fill={gold} />
      <path d="M 576 440 L 602 368 L 628 440 Z" fill={gold} />
      <path d="M 512 446 L 540 330 L 568 446 Z" fill={goldHi} />
      <circle cx={540} cy={500} r={14} fill={gold} />
      <rect x={430} y={930} width={220} height={74} rx={16} fill={velvet} />
      <rect x={430} y={930} width={220} height={12} rx={6} fill={velvetHi} />
      <rect x={398} y={870} width={60} height={136} rx={18} fill={velvet} />
      <rect x={622} y={870} width={60} height={136} rx={18} fill={velvet} />
      <rect x={398} y={866} width={60} height={14} rx={6} fill={gold} />
      <rect x={622} y={866} width={60} height={14} rx={6} fill={gold} />
      {/* red carpet running from the dais to the bottom of the frame */}
      <path d="M 390 1040 L 690 1040 L 1040 1920 L 40 1920 Z" fill={carpet} />
      <path d="M 390 1040 L 404 1040 L 56 1920 L 40 1920 Z M 676 1040 L 690 1040 L 1040 1920 L 1024 1920 Z" fill={goldHi} />
      <path d="M 404 1040 L 690 1040 L 676 1050 L 418 1050 Z" fill={carpetDk} />
      {/* torches on the mid columns */}
      {torch(250, 600, 0)}
      {torch(830, 600, 1)}
      {/* columns: mid pair at the back, near pair at the edges */}
      {column(190, WALL_Y, 1, "cm1")}
      {column(890, WALL_Y, 1, "cm2")}
      {column(70, 1900, 1.5, "cn1")}
      {column(1010, 1900, 1.5, "cn2")}
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

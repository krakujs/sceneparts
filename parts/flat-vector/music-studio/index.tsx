import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Lamp, lit, asTime, mix } from "../backdrop/index";

// Music studio background: acoustic foam panels on the back wall, a mixing desk with glowing screen at the right,
// speakers at both sides, guitars on stands at the left and a microphone on the desk. The stage stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360, foam = L(p.foam ?? "#4B5282"), dark = L(C.ink), wood = L(p.wood ?? C.brown);
  const screen = time === "night" || time === "dusk" ? "#8EC5E8" : mix(C.teal, "#1F2433", 0.15);
  const glow = drift ? 0.85 + 0.15 * Math.sin(f / 16) : 1;
  const tiles: React.ReactNode[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) {
    const x = c * 120 + 4, y = 240 + r * 130;
    tiles.push(<path key={`${r}-${c}`} d={`M ${x} ${y} L ${x + 112} ${y} L ${x + 112} ${y + 122} L ${x} ${y + 122} Z`} fill={foam} />);
    tiles.push(<path key={`t${r}-${c}`} d={`M ${x + 8} ${y + 30} L ${x + 56} ${y + 8} L ${x + 104} ${y + 30} L ${x + 56} ${y + 60} Z M ${x + 8} ${y + 80} L ${x + 56} ${y + 56} L ${x + 104} ${y + 80} L ${x + 56} ${y + 110} Z`} fill={shade(foam, 0.2)} />);
  }
  const speaker = (x: number, y: number) => (
    <g>
      <rect x={x} y={y} width={150} height={230} rx={12} fill={dark} />
      <circle cx={x + 75} cy={y + 70} r={50} fill={L(C.greyDark)} />
      <circle cx={x + 75} cy={y + 70} r={24} fill={L(C.greyDark)} />
      <circle cx={x + 75} cy={y + 160} r={18} fill={L(C.greyDark)} />
    </g>
  );
  const guitar = (x: number, body: string) => (
    <g>
      <path d={`M ${x} 1340 L ${x + 40} 1160 M ${x + 60} 1340 L ${x + 40} 1160`} stroke={L(C.greyDark)} strokeWidth={8} fill="none" strokeLinecap="round" />
      <rect x={x + 34} y={1000} width={12} height={160} rx={4} fill={wood} />
      <path d={`M ${x + 40} 1180 C ${x + 10} 1180 ${x + 6} 1220 ${x + 24} 1236 C ${x + 6} 1252 ${x + 14} 1300 ${x + 40} 1296 C ${x + 66} 1300 ${x + 74} 1252 ${x + 56} 1236 C ${x + 74} 1220 ${x + 70} 1180 ${x + 40} 1180 Z`} fill={L(body)} />
      <rect x={x + 32} y={1098} width={16} height={18} fill={dark} />
      <rect x={x + 30} y={1000} width={20} height={20} rx={4} fill={wood} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#3B3F5C"} floor={p.floor ?? "#8A6A4E"} floorY={floorY} floorKind="boards" panels={false} />
      {tiles}
      <Lamp x={540} y={200} on={time === "night" || time === "dusk"} color={L(C.purple)} />
      {/* speakers at both sides */}
      {speaker(20, 1040)}
      {speaker(900, 720)}
      {/* guitars on stands at the left */}
      <g transform="translate(200 1340) scale(1.35) translate(-200 -1340)">{guitar(200, C.red)}</g>
      <g transform="translate(270 1340) scale(1.35) translate(-270 -1340)">{guitar(270, C.yellow)}</g>
      {/* mixing desk at the right */}
      <rect x={650} y={1100} width={380} height={34} rx={6} fill={wood} />
      <rect x={660} y={1134} width={360} height={60} rx={6} fill={shade(wood, 0.15)} />
      <rect x={680} y={1194} width={14} height={146} fill={dark} />
      <rect x={996} y={1194} width={14} height={146} fill={dark} />
      <rect x={690} y={1108} width={340} height={14} rx={4} fill={L(C.greyDark)} opacity={0.6} />
      {new Array(8).fill(0).map((_, i) => (
        <g key={i}>
          <rect x={700 + i * 40} y={1142} width={6} height={40} rx={3} fill={L(C.greyLight)} />
          <rect x={694 + i * 40} y={1150 + (i % 3) * 8} width={18} height={10} rx={3} fill={L(C.white)} />
        </g>
      ))}
      <rect x={690} y={1040} width={160} height={58} rx={6} fill={dark} />
      <rect x={698} y={1048} width={144} height={42} rx={4} fill={screen} opacity={glow} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={704 + i * 28} y={1058 + (i % 2) * 8} width={18} height={6} rx={3} fill={L(C.white)} opacity={0.8} />)}
      {/* knobs */}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={870 + (i % 3) * 36} cy={1064 + Math.floor(i / 3) * 30} r={11} fill={L(C.yellow)} />)}
      {/* microphone on the desk */}
      <rect x={1000} y={1000} width={10} height={100} fill={L(C.greyDark)} />
      <ellipse cx={1005} cy={996} rx={12} ry={18} fill={L(C.greyDark)} />
      {/* small floor cable */}
      <path d="M 880 1360 Q 900 1330 930 1350" stroke={dark} strokeWidth={5} fill="none" />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Lamp, lit, asTime } from "../backdrop/index";

// Garage interior background: a roller door at the back, a tool pegboard, shelves of tins, a workbench with a vice,
// a bicycle leaning on the left wall and an oil stain on the floor. The stage in front of the bench stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const L = (c: string) => lit(c, time, true);
  const door = L(p.door ?? C.greyLight), wall = p.wall ?? "#CBD2DE", bike = L(p.bike ?? C.red);
  const floorY = 1360;
  const slats = new Array(34).fill(0).map((_, i) => <rect key={i} x={330} y={390 + i * 28} width={420} height={6} fill={shade(door, 0.14)} />);
  return (
    <g>
      <Room time={time} wall={wall} floor="#9AA3B5" floorY={floorY} floorKind="concrete" panels={false} skirting={false} />
      {/* roller door at the back */}
      <rect x={320} y={340} width={440} height={20} fill={L(C.greyDark)} />
      <rect x={330} y={360} width={420} height={1000} fill={door} />
      {slats}
      <rect x={330} y={360} width={10} height={1000} fill={L(C.greyDark)} />
      <rect x={740} y={360} width={10} height={1000} fill={L(C.greyDark)} />
      {/* hanging light */}
      <Lamp x={540} y={230} on={time === "night" || time === "dusk"} color={L(C.yellowDark)} />
      {/* tool pegboard on the left */}
      <rect x={20} y={520} width={270} height={360} rx={8} fill={L(C.brown)} />
      {new Array(6).fill(0).map((_, r) => new Array(7).fill(0).map((__, c) => <circle key={`${r}-${c}`} cx={44 + c * 38} cy={548 + r * 52} r={3} fill={shade(C.brown, 0.3)} />))}
      <rect x={44} y={560} width={12} height={110} rx={4} fill={L(C.greyDark)} />
      <rect x={38} y={540} width={24} height={40} rx={6} fill={L(C.red)} />
      <rect x={116} y={560} width={8} height={100} rx={3} fill={L(C.greyDark)} />
      <path d="M 100 680 L 150 660 L 150 672 L 110 690 Z" fill={L(C.greyDark)} />
      <rect x={180} y={556} width={60} height={28} rx={6} fill={L(C.yellow)} />
      <rect x={210} y={600} width={12} height={80} rx={4} fill={L(C.greyDark)} />
      <circle cx={216} cy={700} r={14} fill={L(C.greyDark)} />
      <rect x={60} y={740} width={190} height={8} rx={3} fill={L(C.greyDark)} />
      <rect x={70} y={748} width={50} height={60} rx={5} fill={L(C.blue)} />
      <rect x={140} y={748} width={60} height={60} rx={5} fill={L(C.green)} />
      {/* shelves of tins, right */}
      {[640, 760].map((y, s) => (
        <g key={s}>
          <rect x={800} y={y} width={250} height={12} fill={L(C.brownDark)} />
          {new Array(6).fill(0).map((_, i) => <rect key={i} x={816 + i * 38} y={y - 52 - (i % 2) * 8} width={28} height={52 + (i % 2) * 8} rx={4} fill={L(i % 3 === 0 ? C.orange : i % 3 === 1 ? C.teal : C.grey)} />)}
        </g>
      ))}
      {/* bicycle leaning on the left wall */}
      <g transform="translate(40 0)">
      <circle cx={70} cy={1230} r={80} fill="none" stroke={L(C.ink)} strokeWidth={12} />
      <circle cx={70} cy={1230} r={8} fill={L(C.ink)} />
      <path d="M 70 1230 L 130 1150 L 190 1230 L 70 1230 M 130 1150 L 110 1120 L 150 1120" stroke={bike} strokeWidth={12} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M 190 1230 L 210 1200" stroke={L(C.ink)} strokeWidth={8} strokeLinecap="round" />
      <rect x={20} y={1310} width={200} height={20} rx={8} fill={L(C.greyDark)} opacity={0.4} />
      </g>
      {/* workbench on the right with a vice */}
      <rect x={770} y={1080} width={300} height={24} rx={6} fill={L(C.brown)} />
      <rect x={770} y={1104} width={300} height={16} fill={L(C.brownDark)} />
      <rect x={790} y={1120} width={16} height={220} fill={L(C.brownDark)} />
      <rect x={1040} y={1120} width={16} height={220} fill={L(C.brownDark)} />
      <rect x={1000} y={1040} width={36} height={40} rx={4} fill={L(C.greyDark)} />
      <rect x={1010} y={1024} width={8} height={20} fill={L(C.greyDark)} />
      <rect x={820} y={1050} width={60} height={30} rx={6} fill={L(C.yellow)} />
      <rect x={900} y={1056} width={6} height={24} rx={3} fill={L(C.greyDark)} />
      <path d="M 906 1058 L 930 1040 L 934 1048 Z" fill={L(C.greyDark)} />
      {/* oil stain on the floor */}
      <ellipse cx={880} cy={1520} rx={110} ry={34} fill={shade("#9AA3B5", 0.45)} opacity={0.5} />
      <ellipse cx={920} cy={1534} rx={50} ry={14} fill={shade("#9AA3B5", 0.55)} opacity={0.5} />
    </g>
  );
}

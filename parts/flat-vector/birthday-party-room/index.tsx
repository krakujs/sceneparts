import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime, rnd } from "../backdrop/index";

// Birthday party room background: bunting across the top, balloons in the corners, streamers, a table with a cake
// and candles at the back, and wrapped presents at the sides. No text anywhere. The stage in the middle stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360, bunting = p.bunting !== false;
  const flags = [C.red, C.yellow, C.teal, C.pink, C.purple, C.green, C.orange];
  const balloons: [number, number, number, string][] = [
    [120, 430, 74, C.red], [230, 340, 62, C.yellow], [960, 420, 74, C.teal], [850, 330, 60, C.pink], [1010, 600, 52, C.purple],
  ];
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#FFE3EC"} floor={p.floor ?? "#E9D3A9"} floorY={floorY} floorKind="boards" panels={false} />
      {/* streamers from the top corners */}
      <path d="M 0 0 Q 60 180 20 360 Q -10 480 40 600" stroke={L(C.teal)} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M 1080 0 Q 1020 170 1060 330 Q 1090 440 1030 560" stroke={L(C.pink)} strokeWidth={14} fill="none" strokeLinecap="round" />
      {/* bunting across the top */}
      {bunting && <path d="M -20 140 Q 540 260 1100 140" stroke={L(C.greyDark)} strokeWidth={4} fill="none" />}
      {bunting && new Array(12).fill(0).map((_, i) => {
        const t = (i + 0.5) / 12, x = -20 + t * 1120, y = 140 + 4 * t * (1 - t) * 120 * 0.94 - 0;
        return <path key={i} d={`M ${x - 36} ${y + 2} L ${x + 36} ${y + 2} L ${x} ${y + 92} Z`} fill={L(flags[i % flags.length])} />;
      })}
      {/* balloons with strings */}
      {balloons.map(([x, y, r, c], i) => (
        <g key={i} transform={drift ? `translate(0 ${(Math.sin(f / 26 + i) * 6).toFixed(1)})` : undefined}>
          <path d={`M ${x} ${y + r} Q ${x - 14} ${y + r + 80} ${x + 6} ${y + r + 170}`} stroke={L(C.greyDark)} strokeWidth={2.5} fill="none" />
          <ellipse cx={x} cy={y} rx={r * 0.85} ry={r} fill={L(c)} />
          <ellipse cx={x - r * 0.3} cy={y - r * 0.4} rx={r * 0.18} ry={r * 0.28} fill="#FFFFFF" opacity={0.45} />
          <path d={`M ${x - 8} ${y + r - 2} L ${x + 8} ${y + r - 2} L ${x} ${y + r + 10} Z`} fill={L(shade(c, 0.2))} />
        </g>
      ))}
      {/* table with a cake, at the back */}
      <rect x={300} y={1080} width={480} height={18} rx={6} fill={L(C.white)} />
      <rect x={310} y={1098} width={18} height={200} fill={L(C.greyDark)} />
      <rect x={752} y={1098} width={18} height={200} fill={L(C.greyDark)} />
      <rect x={300} y={1080} width={480} height={6} fill={L(C.greyLight)} />
      <ellipse cx={540} cy={1074} rx={130} ry={16} fill={L(C.greyLight)} />
      <rect x={440} y={1000} width={200} height={74} rx={10} fill={L(C.pink)} />
      <rect x={470} y={940} width={140} height={60} rx={10} fill={L(C.white)} />
      {new Array(8).fill(0).map((_, i) => <circle key={i} cx={450 + i * 25} cy={1002} r={11} fill={L(C.white)} />)}
      {new Array(6).fill(0).map((_, i) => <circle key={i} cx={482 + i * 23} cy={945} r={9} fill={L(flags[i])} />)}
      {[500, 540, 580].map((x, i) => (
        <g key={i}>
          <rect x={x - 4} y={900} width={8} height={40} fill={L(flags[i + 1])} />
          <path d={`M ${x - 4} ${900 + 4} Q ${x} ${888} ${x + 4} ${900 + 4} Z`} fill={L(C.yellow)} />
        </g>
      ))}
      <path d="M 540 890 Q 546 878 540 868 Q 534 878 540 890 Z" fill={L(C.orange)} />
      {/* presents at the sides */}
      <rect x={30} y={1230} width={150} height={130} rx={6} fill={L(C.blue)} />
      <rect x={96} y={1230} width={18} height={130} fill={L(C.yellow)} />
      <rect x={30} y={1280} width={150} height={16} fill={L(C.yellow)} />
      <path d="M 105 1230 Q 80 1200 96 1218 Q 110 1226 105 1230 Z" fill={L(C.yellow)} />
      <rect x={200} y={1290} width={110} height={70} rx={6} fill={L(C.teal)} />
      <rect x={250} y={1290} width={14} height={70} fill={L(C.pink)} />
      <rect x={900} y={1240} width={140} height={120} rx={6} fill={L(C.pink)} />
      <rect x={950} y={1240} width={16} height={120} fill={L(C.white)} />
      <rect x={900} y={1290} width={140} height={14} fill={L(C.white)} />
      <rect x={1000} y={1300} width={70} height={60} rx={6} fill={L(C.green)} />
      <rect x={1026} y={1300} width={12} height={60} fill={L(C.red)} />
      {/* confetti dots on the floor */}
      {new Array(10).fill(0).map((_, i) => <circle key={i} cx={rnd(5, i) * 1080} cy={1400 + rnd(5, i + 20) * 300} r={6} fill={L(flags[i % flags.length])} opacity={0.8} />)}
    </g>
  );
}

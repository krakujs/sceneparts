import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime, mix } from "../backdrop/index";

// Gaming room background: a desk with two glowing monitors at the right, a gaming chair, LED strips along the wall,
// shelves with figures at the left and two posters with abstract shapes. The stage in the middle stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360, wall = p.wall ?? "#2B2F4A", accent = p.accent ?? C.purple;
  const strip = [C.purple, C.blue, C.teal, C.pink];
  const pulse = drift ? 0.85 + 0.15 * Math.sin(f / 14) : 1;
  return (
    <g>
      <Room time={time} wall={wall} floor={p.floor ?? "#3A3F63"} floorY={floorY} floorKind="carpet" panels={false} skirting={false} />
      {/* LED strips along the wall */}
      {strip.map((c, i) => <rect key={`g${i}`} x={0} y={548 + i * 14} width={1080} height={32} fill={L(c)} opacity={0.08 * pulse} />)}
      {strip.map((c, i) => <rect key={i} x={0} y={560 + i * 14} width={1080} height={8} fill={L(c)} opacity={pulse} />)}
      {/* posters with abstract shapes */}
      <rect x={300} y={330} width={150} height={210} rx={6} fill={L(C.greyDark)} />
      <rect x={314} y={344} width={122} height={182} fill={L(C.navy)} />
      <circle cx={375} cy={410} r={34} fill={L(C.pink)} />
      <path d="M 330 490 L 375 430 L 420 490 Z" fill={L(C.teal)} />
      <rect x={470} y={380} width={130} height={180} rx={6} fill={L(C.greyDark)} />
      <rect x={484} y={394} width={102} height={152} fill={L(C.purple)} />
      <rect x={500} y={420} width={70} height={18} rx={9} fill={L(C.yellow)} />
      <rect x={500} y={452} width={50} height={18} rx={9} fill={L(C.lime)} />
      {/* shelves with figures at the left */}
      {[760, 900].map((y, s) => (
        <g key={s}>
          <rect x={30} y={y} width={230} height={12} fill={L(C.greyDark)} />
          {new Array(4).fill(0).map((_, i) => <rect key={i} x={46 + i * 56} y={y - 60 - (i % 2) * 14} width={36} height={60 + (i % 2) * 14} rx={5} fill={L([C.red, C.teal, C.yellow, C.pink][(i + s) % 4])} />)}
        </g>
      ))}
      <rect x={30} y={1010} width={230} height={12} fill={L(C.greyDark)} />
      <rect x={40} y={960} width={60} height={50} rx={10} fill={L(C.greenDark)} />
      <circle cx={190} cy={975} r={24} fill={L(C.orange)} />
      {/* desk on the right with two monitors */}
      <rect x={620} y={1040} width={440} height={22} rx={6} fill={L(C.greyDark)} />
      <rect x={640} y={1062} width={14} height={278} fill={L(C.ink)} />
      <rect x={1046} y={1062} width={14} height={278} fill={L(C.ink)} />
      <rect x={640} y={1062} width={400} height={6} fill={shade(accent, 0.15)} opacity={pulse} />
      <rect x={650} y={1048} width={170} height={6} fill={L(accent)} opacity={pulse} />
      {/* monitors */}
      <rect x={650} y={770} width={200} height={130} rx={8} fill={L(C.ink)} />
      <rect x={662} y={782} width={176} height={106} rx={4} fill={mix(accent, "#1F2433", 0.2)} opacity={pulse} />
      <rect x={700} y={900} width={30} height={140} fill={L(C.ink)} />
      <rect x={670} y={1036} width={90} height={8} rx={4} fill={L(C.ink)} />
      <rect x={880} y={800} width={180} height={112} rx={8} fill={L(C.ink)} />
      <rect x={890} y={810} width={160} height={92} rx={4} fill={mix(C.teal, "#1F2433", 0.25)} opacity={pulse} />
      <rect x={955} y={912} width={30} height={124} fill={L(C.ink)} />
      <rect x={925} y={1036} width={90} height={8} rx={4} fill={L(C.ink)} />
      {/* keyboard and mouse */}
      <rect x={700} y={1024} width={120} height={14} rx={4} fill={L(C.greyLight)} />
      <rect x={842} y={1026} width={20} height={28} rx={9} fill={L(C.white)} />
      {/* gaming chair, right side in front of the desk */}
      <rect x={840} y={1100} width={130} height={150} rx={40} fill={L(accent)} transform="rotate(-6 905 1175)" />
      <rect x={870} y={1220} width={100} height={36} rx={14} fill={shade(accent, 0.2)} />
      <rect x={906} y={1254} width={12} height={70} fill={L(C.greyDark)} />
      <path d="M 860 1330 L 950 1330 L 930 1346 L 880 1346 Z" fill={L(C.greyDark)} />
      <circle cx={862} cy={1350} r={8} fill={L(C.ink)} />
      <circle cx={948} cy={1350} r={8} fill={L(C.ink)} />
    </g>
  );
}

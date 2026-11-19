import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Meeting room background (preset of flat-vector/backdrop): a long table toward the back with chairs around it, a
// screen with simple chart shapes on the back wall and a glass wall with a view at the left. The centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1300, tableC = L(p.table ?? C.brown), tableD = shade(tableC, 0.2), chair = L(C.greyDark);
  const screenOn = p.screen !== false;
  const Chair = ({ x, y, side }: { x: number; y: number; side?: boolean }) => (
    <g>
      {side ? <rect x={x} y={y} width={60} height={22} rx={10} fill={chair} /> : <rect x={x - 34} y={y - 110} width={68} height={100} rx={18} fill={chair} />}
      {!side && <rect x={x - 38} y={y - 12} width={76} height={20} rx={9} fill={shade(chair, 0.15)} />}
      {side && <rect x={x + 42} y={y - 60} width={18} height={84} rx={9} fill={shade(chair, 0.15)} />}
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#EEF1F6"} floor="#B8C7DA" floorY={floorY} floorKind="carpet" panels={false} />
      {/* screen on the back wall with simple chart shapes */}
      <rect x={300} y={330} width={480} height={300} rx={12} fill={L(C.greyDark)} />
      <rect x={314} y={344} width={452} height={272} rx={6} fill={screenOn ? L(C.navy) : L(C.greyDark)} />
      {screenOn && <g>
        <rect x={350} y={470} width={50} height={110} rx={6} fill={L(C.teal)} />
        <rect x={420} y={420} width={50} height={160} rx={6} fill={L(C.blue)} />
        <rect x={490} y={450} width={50} height={130} rx={6} fill={L(C.yellow)} />
        <rect x={560} y={390} width={50} height={190} rx={6} fill={L(C.orange)} />
        <polyline points="650 530 690 480 730 500 770 430" fill="none" stroke={L(C.pink)} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={770} cy={430} r={9} fill={L(C.white)} />
      </g>}
      {/* glass wall with a view, at the left */}
      <Window x={36} y={380} w={170} h={520} time={time} weather={weather} f={drift ? f : 0} view="trees" />
      {/* chairs behind the table (far side) */}
      {[300, 460, 620, 780].map((x, i) => <Chair key={`cb${i}`} x={x} y={1000} />)}
      {/* end chairs */}
      <Chair x={150} y={1120} side />
      <Chair x={890} y={1120} side />
      {/* long table */}
      <path d="M 250 1040 L 830 1040 L 900 1130 L 180 1130 Z" fill={tableC} />
      <path d="M 180 1130 L 900 1130 L 900 1146 L 180 1146 Z" fill={tableD} />
      <rect x={236} y={1146} width={18} height={150} fill={tableD} />
      <rect x={826} y={1146} width={18} height={150} fill={tableD} />
      {/* notebook, cups, water bottle */}
      <rect x={380} y={1060} width={80} height={52} rx={4} fill={L(C.white)} transform="rotate(-6 420 1086)" />
      <rect x={560} y={1068} width={24} height={26} rx={4} fill={L(C.teal)} />
      <rect x={600} y={1072} width={24} height={26} rx={4} fill={L(C.red)} />
      <rect x={700} y={1050} width={20} height={44} rx={8} fill={L(C.skyDeep)} />
      {/* floor plant in the far corner */}
      <rect x={930} y={1200} width={70} height={90} rx={6} fill={L(C.orange)} />
      {[-30, 0, 30].map((dx, i) => <ellipse key={i} cx={965 + dx} cy={1150} rx={18} ry={56} fill={L(i === 1 ? C.greenDark : C.green)} transform={`rotate(${dx} ${965 + dx} 1200)`} />)}
    </g>
  );
}

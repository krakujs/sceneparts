import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Single office background (preset of flat-vector/backdrop): desk with a computer at the left, a filing cabinet and
// plant at the right, a large Window with a city view and a wall clock. The centre floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360, deskC = L(p.desk ?? C.brown), deskD = shade(deskC, 0.2), ink = L(C.ink);
  const cab = L(C.greyLight), cabD = shade(cab, 0.14);
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#EEF1F6"} floor="#9FB0CC" floorY={floorY} floorKind="carpet" panels={false} />
      <Window x={560} y={340} w={340} h={380} time={time} weather={weather} f={drift ? f : 0} view={p.view ?? "city"} curtains={L(C.blue)} />
      {/* wall clock */}
      <g transform="translate(300 250)">
        <circle r={58} fill={L(C.white)} stroke={ink} strokeWidth={8} />
        <line x1={0} y1={0} x2={0} y2={-34} stroke={ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${drift ? f * 0.02 : 0})`} />
        <line x1={0} y1={0} x2={24} y2={0} stroke={ink} strokeWidth={4} strokeLinecap="round" transform={`rotate(${drift ? f * 0.5 : 60})`} />
        <circle r={5} fill={L(C.red)} />
      </g>
      {/* desk at the left with monitor, keyboard, mug */}
      <rect x={32} y={1110} width={230} height={26} rx={6} fill={deskC} />
      <rect x={44} y={1136} width={14} height={260} fill={deskD} />
      <rect x={226} y={1136} width={14} height={260} fill={deskD} />
      <rect x={122} y={1040} width={20} height={72} fill={ink} />
      <rect x={90} y={1104} width={84} height={8} rx={3} fill={ink} />
      <rect x={58} y={890} width={150} height={106} rx={8} fill={ink} />
      <rect x={68} y={900} width={130} height={86} rx={4} fill={L(C.navy)} />
      <rect x={80} y={916} width={50} height={12} rx={6} fill={L(C.teal)} />
      <rect x={80} y={934} width={90} height={12} rx={6} fill={L(C.skyDeep)} opacity={0.7} />
      <rect x={80} y={952} width={62} height={12} rx={6} fill={L(C.yellow)} opacity={0.8} />
      <rect x={112} y={1086} width={60} height={24} rx={3} fill={L(C.white)} />
      <path d="M 232 1078 q 22 0 0 24" stroke={L(C.teal)} strokeWidth={6} fill="none" />
      <rect x={226} y={1060} width={30} height={30} rx={4} fill={L(C.teal)} />
      {/* filing cabinet at the right with a plant on top */}
      <rect x={862} y={980} width={180} height={380} rx={6} fill={cab} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={874} y={994 + i * 120} width={156} height={104} rx={4} fill={cabD} />
          <rect x={928} y={1030 + i * 120} width={48} height={10} rx={5} fill={ink} opacity={0.6} />
        </g>
      ))}
      <rect x={884} y={900} width={136} height={80} rx={10} fill={L(C.orange)} />
      <rect x={880} y={892} width={144} height={16} rx={6} fill={shade(L(C.orange), 0.15)} />
      {[-44, -22, 0, 22, 44].map((dx, i) => (
        <ellipse key={i} cx={952 + dx * 0.4} cy={830} rx={18} ry={62} fill={L(i % 2 ? C.green : C.greenDark)} transform={`rotate(${dx + (drift ? Math.sin(f / 40 + i) * 3 : 0)} 952 900)`} />
      ))}
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Hospital room background (preset of flat-vector/backdrop): a hospital bed at the left, a monitor with a moving
// heartbeat line, an IV stand, a curtain rail and a Window. Everything sits at the sides so the centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1340, steel = L(C.greyLight), steelD = shade(steel, 0.2), ink = L(C.ink), curtain = L(p.curtains ?? "#9ED8CF");
  // heartbeat trace that scrolls left across the monitor screen
  const trace: string[] = [];
  for (let x = 0; x <= 124; x += 2) {
    const ph = (((x + (drift ? f * 2 : 0)) % 60) + 60) % 60;
    let y = 0;
    if (ph >= 22 && ph < 25) y = -34;
    else if (ph >= 25 && ph < 28) y = 26;
    else if (ph >= 28 && ph < 31) y = -10;
    trace.push(`${800 + x} ${850 + y}`);
  }
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#E4F3EE"} floor="#CFE3DE" floorY={floorY} floorKind="tiles" panels={false} />
      {/* curtain rail and Window with curtains */}
      <rect x={360} y={292} width={420} height={8} rx={4} fill={L(C.greyDark)} />
      <Window x={420} y={330} w={280} h={330} time={time} weather={weather} f={drift ? f : 0} curtains={curtain} />
      <path d="M 344 300 Q 330 540 352 780" stroke={curtain} strokeWidth={26} fill="none" opacity={0.8} />
      <path d="M 716 300 Q 730 540 708 780" stroke={curtain} strokeWidth={26} fill="none" opacity={0.8} />
      {/* IV stand and bag */}
      <rect x={326} y={720} width={8} height={620} fill={steelD} />
      <rect x={306} y={716} width={44} height={8} rx={4} fill={steelD} />
      <rect x={300} y={726} width={36} height={64} rx={12} fill={L(C.skyDeep)} opacity={0.85} />
      <path d="M 318 790 Q 340 820 336 1080" stroke={L(C.skyDeep)} strokeWidth={3} fill="none" strokeDasharray="6 5" />
      {/* hospital bed at the left: headboard, mattress, pillow and blanket */}
      <rect x={18} y={1000} width={30} height={200} rx={6} fill={steelD} />
      <rect x={40} y={1108} width={286} height={48} rx={14} fill={L("#F6FBFA")} stroke={steelD} strokeWidth={3} />
      <rect x={40} y={1156} width={300} height={26} rx={6} fill={steelD} />
      <rect x={120} y={1094} width={200} height={40} rx={12} fill={L(C.teal)} />
      <rect x={40} y={1078} width={62} height={40} rx={14} fill={L("#F6FBFA")} />
      <rect x={60} y={1182} width={12} height={160} fill={steelD} />
      <rect x={316} y={1182} width={12} height={160} fill={steelD} />
      <rect x={24} y={1120} width={8} height={60} rx={4} fill={steel} />
      {/* monitor on an arm at the right */}
      <rect x={852} y={890} width={14} height={112} fill={steelD} />
      <rect x={780} y={770} width={170} height={120} rx={10} fill={ink} />
      <rect x={790} y={780} width={150} height={100} rx={6} fill={L(C.navy)} />
      <polyline points={trace.join(" ")} fill="none" stroke={L(C.lime)} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      {/* bedside table */}
      <rect x={880} y={1236} width={170} height={16} rx={4} fill={L(C.brown)} />
      <rect x={896} y={1252} width={14} height={110} fill={L(C.brownDark)} />
      <rect x={1020} y={1252} width={14} height={110} fill={L(C.brownDark)} />
      <circle cx={960} cy={1218} r={22} fill={L(C.white)} />
      <rect x={944} y={1208} width={32} height={10} rx={4} fill={L(C.orange)} />
    </g>
  );
}

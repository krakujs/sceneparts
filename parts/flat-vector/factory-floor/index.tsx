import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Factory floor background (preset of flat-vector/backdrop): a conveyor belt with boxes moving along it at the back,
// machines at both sides, pipes overhead, yellow safety lines on the concrete and high Windows. The centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1300, ink = L(C.ink), pipe = L(C.greyDark), machine = L(p.machine ?? C.blue), steel = L(C.greyLight);
  const belt = L("#3A4157"), boxCols = [C.sand, C.brown, "#D9B98C"];
  const speed = drift ? 1.6 : 0;
  const boxes = [0, 1, 2, 3, 4].map((i) => {
    const x = ((i * 230 + f * speed) % 1000) + 40;
    return <g key={`bx${i}`}>
      <rect x={x} y={960} width={120} height={90} rx={4} fill={L(boxCols[i % 3])} />
      <rect x={x + 50} y={960} width={20} height={90} fill={shade(L(boxCols[i % 3]), 0.12)} />
      <rect x={x} y={960} width={120} height={12} fill={shade(L(boxCols[i % 3]), 0.15)} />
    </g>;
  });
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#C9D1DC"} floor="#9AA3B5" floorY={floorY} floorKind="concrete" panels={false} />
      {/* high Windows */}
      <Window x={330} y={96} w={180} h={150} time={time} weather={weather} f={drift ? f : 0} view="sky" frame={steel} />
      <Window x={590} y={96} w={180} h={150} time={time} weather={weather} f={drift ? f : 0} view="sky" frame={steel} />
      {/* overhead pipes */}
      <rect x={0} y={300} width={1080} height={26} fill={pipe} />
      <rect x={0} y={318} width={1080} height={6} fill={shade(pipe, 0.2)} />
      {[120, 960].map((x) => <rect key={x} x={x - 8} y={300} width={16} height={26} fill={shade(pipe, 0.25)} />)}
      <rect x={330} y={326} width={22} height={170} fill={pipe} />
      <rect x={736} y={326} width={22} height={150} fill={pipe} />
      <rect x={316} y={480} width={50} height={14} rx={5} fill={shade(pipe, 0.2)} />
      <rect x={722} y={460} width={50} height={14} rx={5} fill={shade(pipe, 0.2)} />
      {/* machines at the back */}
      <rect x={40} y={600} width={170} height={430} rx={10} fill={machine} />
      <rect x={70} y={540} width={110} height={66} rx={10} fill={shade(machine, 0.15)} />
      <circle cx={125} cy={720} r={30} fill={L(C.white)} />
      <g transform={`rotate(${drift ? f * 2 : 0} 125 720)`}>
        <rect x={123} y={696} width={4} height={26} rx={2} fill={ink} />
      </g>
      {[0, 1, 2].map((i) => <circle key={i} cx={80 + i * 40} cy={860} r={11} fill={L([C.yellow, C.green, C.red][i])} />)}
      <rect x={60} y={920} width={130} height={20} rx={5} fill={shade(machine, 0.2)} />
      <rect x={860} y={660} width={180} height={370} rx={10} fill={L(C.orange)} />
      <rect x={890} y={600} width={60} height={60} rx={8} fill={shade(L(C.orange), 0.15)} />
      <circle cx={960} cy={760} r={34} fill={L(C.white)} />
      <g transform={`rotate(${drift ? -f * 1.5 : 0} 960 760)`}>
        <rect x={958} y={738} width={4} height={24} rx={2} fill={ink} />
      </g>
      <rect x={880} y={860} width={150} height={60} rx={6} fill={shade(L(C.orange), 0.2)} />
      {/* conveyor belt with moving boxes */}
      <rect x={60} y={1050} width={960} height={44} rx={22} fill={belt} />
      <rect x={60} y={1046} width={960} height={8} rx={4} fill={L("#4A5470")} />
      {[120, 500, 900].map((x) => <rect key={x} x={x - 10} y={1094} width={20} height={210} fill={shade(steel, 0.2)} />)}
      {[80, 260, 440, 620, 800, 980].map((x, i) => <circle key={i} cx={x} cy={1072} r={14} fill={L("#4A5470")} stroke={shade(steel, 0.2)} strokeWidth={4} />)}
      {boxes}
      {/* yellow safety lines in perspective, kept to the edges */}
      <path d="M 120 1300 L 20 1920" stroke={L(C.yellow)} strokeWidth={14} />
      <path d="M 960 1300 L 1060 1920" stroke={L(C.yellow)} strokeWidth={14} />
      <rect x={0} y={1830} width={1080} height={14} fill={L(C.yellow)} />
    </g>
  );
}

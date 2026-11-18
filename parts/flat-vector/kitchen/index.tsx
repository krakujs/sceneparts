import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, Lamp, lit, asTime, asWeather } from "../backdrop/index";

// Kitchen background: counters with cabinets along the back wall, sink under a Window, stove, fridge,
// hanging pans, tiled splashback. The stage in front of the counters stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const cab = L(p.cabinets ?? C.teal), top = L(p.worktop ?? C.sand), tile = L(C.white), grout = L(C.greyLight);
  const floorY = 1360;
  const tiles: React.ReactNode[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 12; c++) {
    tiles.push(<rect key={`${r}-${c}`} x={c * 90 + 2} y={840 + r * 70 + 2} width={86} height={66} rx={4} fill={tile} stroke={grout} strokeWidth={3} />);
  }
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#F3E3C7"} floor={p.floor ?? "#E9E2D0"} floorY={floorY} floorKind="tiles" panels={false} />
      {tiles}
      {/* splashback tiles and upper cabinets */}
      <rect x={250} y={640} width={260} height={150} rx={10} fill={cab} />
      <rect x={640} y={640} width={360} height={150} rx={10} fill={cab} />
      {[0, 1].map((i) => <rect key={i} x={258 + i * 128} y={648} width={120} height={134} rx={6} fill={shade(cab, 0.1)} />)}
      {[0, 1, 2].map((i) => <rect key={i} x={648 + i * 116} y={648} width={108} height={134} rx={6} fill={shade(cab, 0.1)} />)}
      <rect x={300} y={716} width={6} height={22} rx={3} fill={L(C.white)} />
      {/* Window above the sink */}
      <Window x={360} y={330} w={230} h={260} time={time} weather={weather} f={drift ? f : 0} curtains={p.curtains === "none" ? undefined : p.curtains ?? L(C.yellow)} />
      {/* hanging pans on a rail */}
      <rect x={700} y={840} width={300} height={8} rx={4} fill={L(C.greyDark)} />
      {[[730, 70], [830, 90], [930, 60]].map(([x, h], i) => (
        <g key={i}>
          <rect x={x - 3} y={848} width={6} height={h - 20} fill={L(C.greyDark)} />
          <ellipse cx={x} cy={848 + h} rx={44} ry={12} fill={L(i === 1 ? C.greyDark : C.grey)} />
          <rect x={x - 44} y={848 + h - 6} width={88} height={18} rx={8} fill={L(i === 1 ? C.greyDark : C.grey)} />
          <rect x={x + 44} y={848 + h - 2} width={34} height={8} rx={4} fill={L(C.brownDark)} />
        </g>
      ))}
      {/* fridge on the left */}
      <rect x={20} y={700} width={200} height={660} rx={14} fill={L(C.white)} />
      <rect x={20} y={920} width={200} height={6} fill={L(C.greyLight)} />
      <rect x={196} y={760} width={8} height={110} rx={4} fill={L(C.grey)} />
      <rect x={196} y={960} width={8} height={160} rx={4} fill={L(C.grey)} />
      {/* base cabinets and worktop */}
      <rect x={0} y={1130} width={1080} height={30} fill={top} />
      <rect x={0} y={1160} width={1080} height={200} fill={cab} />
      {[220, 420, 620].map((x, i) => (
        <g key={i}>
          <rect x={x} y={1176} width={180} height={168} rx={8} fill={shade(cab, 0.1)} />
          <rect x={x + 150} y={1220} width={6} height={40} rx={3} fill={L(C.white)} />
        </g>
      ))}
      {/* sink in the worktop */}
      <rect x={440} y={1124} width={150} height={12} rx={4} fill={L(C.grey)} />
      <path d="M 510 1124 L 510 1080 Q 520 1062 540 1080 L 540 1124 Z" fill={L(C.greyDark)} />
      {/* hob with pan on the right */}
      <rect x={780} y={1120} width={230} height={20} rx={4} fill={L(C.ink)} />
      {[[820, 1126], [900, 1126], [960, 1126]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={18} ry={5} fill={L(C.greyDark)} />)}
      <rect x={860} y={1100} width={100} height={20} rx={8} fill={L(C.red)} />
      <rect x={958} y={1104} width={40} height={10} rx={5} fill={L(C.redDark)} />
      <rect x={800} y={1044} width={210} height={6} rx={3} fill={L(C.greyDark)} />
      {/* kettle and fruit bowl on the worktop */}
      <path d="M 250 1130 Q 250 1088 280 1088 Q 310 1088 310 1130 Z" fill={L(C.blue)} />
      <rect x={290} y={1072} width={18} height={18} rx={4} fill={L(shade(C.blue, 0.2))} />
      <ellipse cx={380} cy={1128} rx={40} ry={10} fill={L(C.orange)} />
      <circle cx={362} cy={1116} r={11} fill={L(C.orange)} />
      <circle cx={392} cy={1114} r={11} fill={L(C.lime)} />
      {/* lamp with a ceiling pendant */}
      <Lamp x={560} y={210} on={time === "night" || time === "dusk"} color={L(C.teal)} />
      {/* plant on the worktop */}
      <rect x={1000} y={1084} width={50} height={46} rx={6} fill={L(C.purple)} />
      {[-30, 0, 30].map((a, i) => <ellipse key={i} cx={1025} cy={1040} rx={12} ry={46} fill={L(i === 1 ? C.greenDark : C.green)} transform={`rotate(${a + (drift ? Math.sin(f / 30 + i) * 2 : 0)} 1025 1084)`} />)}
    </g>
  );
}

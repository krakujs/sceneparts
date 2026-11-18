import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, Lamp, lit, asTime, asWeather, rnd } from "../backdrop/index";

// Kids room background: bunk bed on the left, toy shelves on the right, a stack of building blocks, star stickers
// on the wall and a bright rug. The centre of the floor stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const wall = p.wall ?? "#CFE6F5", bed = L(p.bedColour ?? C.orange), wood = L(C.yellow);
  const floorY = 1360;
  const spots = new Array(20).fill(0).map((_, i) => [40 + rnd(21, i) * 1000, 120 + rnd(21, i + 30) * 500, i] as [number, number, number])
    .filter(([x, y]) => !(x > 290 && x < 430 && y < 280) && !(x > 600 && x < 910 && y > 320 && y < 700) && !(x > 780 && y > 800));
  const stars = spots.slice(0, 14).map(([x, y], i) => {
    return <path key={i} d={`M ${x.toFixed(0)} ${(y - 22).toFixed(0)} L ${(x + 6).toFixed(0)} ${(y - 6).toFixed(0)} L ${(x + 22).toFixed(0)} ${(y - 6).toFixed(0)} L ${(x + 9).toFixed(0)} ${(y + 6).toFixed(0)} L ${(x + 14).toFixed(0)} ${(y + 22).toFixed(0)} L ${x.toFixed(0)} ${(y + 10).toFixed(0)} L ${(x - 14).toFixed(0)} ${(y + 22).toFixed(0)} L ${(x - 9).toFixed(0)} ${(y + 6).toFixed(0)} L ${(x - 22).toFixed(0)} ${(y - 6).toFixed(0)} L ${(x - 6).toFixed(0)} ${(y - 6).toFixed(0)} Z`} fill={L([C.yellow, C.pink, C.lime, C.white][i % 4])} transform={drift ? `rotate(${(Math.sin(f / 50 + i) * 3).toFixed(1)} ${x.toFixed(0)} ${y.toFixed(0)})` : undefined} />;
  });
  return (
    <g>
      <Room time={time} wall={wall} floor={p.floor ?? "#D9B98C"} floorY={floorY} floorKind="boards" />
      {stars}
      <Window x={640} y={360} w={240} h={290} time={time} weather={weather} f={drift ? f : 0} curtains={p.curtains === "none" ? undefined : p.curtains ?? L(C.yellow)} />
      <Lamp x={360} y={220} on={time === "night" || time === "dusk"} color={L(C.purple)} />
      {/* bunk bed, left */}
      <rect x={20} y={820} width={20} height={540} fill={wood} />
      <rect x={380} y={820} width={20} height={540} fill={wood} />
      <rect x={20} y={1000} width={380} height={16} fill={wood} />
      <rect x={20} y={1200} width={380} height={16} fill={wood} />
      <rect x={36} y={1016} width={348} height={24} rx={6} fill={L(C.white)} />
      <rect x={36} y={1020} width={348} height={24} rx={6} fill={L(C.white)} />
      <rect x={36} y={1040} width={348} height={100} rx={8} fill={bed} />
      <rect x={36} y={1216} width={348} height={24} rx={6} fill={L(C.white)} />
      <rect x={36} y={1240} width={348} height={60} rx={8} fill={L(C.teal)} />
      <rect x={60} y={1028} width={80} height={38} rx={16} fill={L(C.white)} />
      <rect x={300} y={1028} width={70} height={38} rx={16} fill={L(C.white)} />
      <rect x={64} y={1050} width={60} height={14} rx={6} fill={L(C.yellow)} />
      {/* ladder */}
      <rect x={398} y={1010} width={8} height={300} fill={shade(wood, 0.15)} />
      {[1040, 1080, 1120, 1160].map((y) => <rect key={y} x={398} y={y} width={60} height={8} fill={shade(wood, 0.15)} />)}
      {/* toy shelves, right */}
      <rect x={820} y={860} width={240} height={14} fill={L(C.brown)} />
      <rect x={820} y={1060} width={240} height={14} fill={L(C.brown)} />
      <rect x={820} y={1260} width={240} height={14} fill={L(C.brown)} />
      <rect x={816} y={860} width={14} height={414} fill={L(C.brownDark)} />
      <rect x={1046} y={860} width={14} height={414} fill={L(C.brownDark)} />
      {[[840, 800, C.red], [900, 800, C.blue], [960, 800, C.green]].map(([x, y, c], i) => <rect key={i} x={x as number} y={(y as number) + 0} width={48} height={60} rx={6} fill={L(c as string)} />)}
      <circle cx={860} cy={1010} r={22} fill={L(C.pink)} />
      <rect x={910} y={990} width={44} height={70} rx={8} fill={L(C.teal)} />
      <rect x={972} y={1000} width={58} height={60} rx={8} fill={L(C.yellow)} />
      <ellipse cx={870} cy={1220} rx={32} ry={26} fill={L(C.orange)} />
      <ellipse cx={940} cy={1222} rx={22} ry={22} fill={L(C.blue)} />
      <rect x={986} y={1190} width={34} height={60} rx={6} fill={L(C.purple)} />
      {/* building blocks on the floor, front right */}
      <rect x={740} y={1430} width={90} height={90} rx={6} fill={L(C.red)} />
      <rect x={840} y={1450} width={80} height={70} rx={6} fill={L(C.blue)} />
      <rect x={770} y={1340} width={70} height={70} rx={6} fill={L(C.green)} />
      <rect x={760} y={1500} width={72} height={36} rx={5} fill={L(C.yellow)} />
      {/* colourful rug */}
      <rect x={160} y={1560} width={560} height={130} rx={60} fill={L(C.pink)} opacity={0.9} />
      <rect x={210} y={1585} width={460} height={80} rx={40} fill={L(C.yellow)} opacity={0.85} />
      <rect x={250} y={1603} width={380} height={44} rx={22} fill={L(C.teal)} opacity={0.85} />
    </g>
  );
}

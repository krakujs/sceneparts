import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Dining room background: a dining table with chairs in the back, a pendant lamp over the table, a sideboard
// with a bowl, and a framed picture. The front of the room, the stage, stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const wood = L(p.wood ?? C.brown), woodDark = L(C.brownDark), chair = L(p.chair ?? C.teal);
  const floorY = 1360;
  const chairAt = (x: number, y: number, back: boolean) => (
    <g key={`${x}-${y}`}>
      {back && <rect x={x - 34} y={y - 110} width={68} height={92} rx={10} fill={chair} />}
      <rect x={x - 40} y={y} width={80} height={16} rx={6} fill={shade(chair, 0.1)} />
      <rect x={x - 34} y={y + 16} width={10} height={56} fill={woodDark} />
      <rect x={x + 24} y={y + 16} width={10} height={56} fill={woodDark} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#F6E7CF"} floor={p.floor ?? "#B58A5E"} floorY={floorY} floorKind="boards" />
      <Window x={80} y={380} w={220} h={280} time={time} weather={weather} f={drift ? f : 0} curtains={p.curtains === "none" ? undefined : p.curtains ?? L(C.purple)} />
      {/* framed picture on the back wall, right */}
      <rect x={740} y={380} width={250} height={190} rx={6} fill={L(C.brownDark)} />
      <rect x={756} y={396} width={218} height={158} fill={L("#CFE6F5")} />
      <path d="M 756 554 L 756 500 Q 830 450 880 510 Q 930 480 974 520 L 974 554 Z" fill={L(C.green)} />
      <circle cx={900} cy={440} r={22} fill={L(C.yellow)} />
      {/* chairs in the back row */}
      {chairAt(360, 1020, true)}
      {chairAt(700, 1020, true)}
      {/* sideboard on the right back wall */}
      <rect x={810} y={1040} width={260} height={18} rx={4} fill={wood} />
      <rect x={820} y={1058} width={240} height={220} rx={6} fill={shade(wood, 0.08)} />
      <rect x={826} y={1064} width={108} height={208} rx={4} fill={wood} />
      <rect x={946} y={1064} width={108} height={208} rx={4} fill={wood} />
      <rect x={920} y={1160} width={8} height={40} rx={4} fill={L(C.greyDark)} />
      <rect x={952} y={1160} width={8} height={40} rx={4} fill={L(C.greyDark)} />
      <rect x={820} y={1278} width={240} height={14} fill={woodDark} />
      {/* fruit bowl and vases on the sideboard */}
      <path d="M 850 1040 Q 850 1010 880 1010 Q 910 1010 910 1040 Z" fill={L(C.white)} />
      <circle cx={868} cy={1006} r={11} fill={L(C.red)} />
      <circle cx={890} cy={1002} r={11} fill={L(C.orange)} />
      <path d="M 960 1040 L 956 990 L 982 990 L 978 1040 Z" fill={L(C.blue)} />
      <rect x={958} y={960} width={6} height={32} fill={L(C.greenDark)} />
      <circle cx={962} cy={952} r={12} fill={L(C.pink)} />
      {/* pendant lamp hanging over the table */}
      <rect x={537} y={0} width={6} height={520} fill={C.ink} />
      <path d="M 470 560 L 510 520 L 570 520 L 610 560 Z" fill={L(C.navy)} />
      <ellipse cx={540} cy={560} rx={70} ry={12} fill={shade(C.navy, 0.25)} />
      {(time === "night" || time === "dusk") && <ellipse cx={540} cy={640} rx={260} ry={150} fill="#FFE9A8" opacity={0.2} />}
      <circle cx={540} cy={572} r={16} fill={time === "night" || time === "dusk" ? "#FFF3C4" : C.greyLight} />
      {/* table with a runner, centre back */}
      <rect x={300} y={1100} width={480} height={22} rx={8} fill={wood} />
      <rect x={300} y={1122} width={480} height={10} rx={4} fill={woodDark} />
      <rect x={320} y={1132} width={12} height={150} fill={woodDark} />
      <rect x={748} y={1132} width={12} height={150} fill={woodDark} />
      <rect x={380} y={1094} width={320} height={8} rx={4} fill={L(C.yellow)} />
      <ellipse cx={460} cy={1088} rx={38} ry={10} fill={L(C.white)} />
      <rect x={620} y={1060} width={60} height={34} rx={10} fill={L(C.white)} />
      <ellipse cx={650} cy={1060} rx={30} ry={6} fill={L(C.pink)} />
      {/* rug under the table */}
      <ellipse cx={540} cy={1420} rx={400} ry={70} fill={L(C.sand)} opacity={0.9} />
    </g>
  );
}

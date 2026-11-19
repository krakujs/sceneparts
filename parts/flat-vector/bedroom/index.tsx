import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, Lamp, lit, asTime, asWeather } from "../backdrop/index";

// Bedroom background: bed with pillows and blanket on the left, nightstand with lamp, wardrobe on the right,
// a Window with curtains and a rug. The centre of the floor stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const blanket = L(p.blanket ?? C.purple), wood = L(C.brown), woodDark = L(C.brownDark);
  const floorY = 1360;
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#F3E3C7"} floor={p.floor ?? "#C99A6B"} floorY={floorY} floorKind="boards" />
      <Window x={600} y={340} w={250} h={300} time={time} weather={weather} f={drift ? f : 0} curtains={p.curtains === "none" ? undefined : p.curtains ?? L(C.pink)} />
      {p.lamp !== false && <Lamp x={360} y={220} on={time === "night" || time === "dusk"} color={L(C.navy)} />}
      {/* rug */}
      <ellipse cx={560} cy={1520} rx={380} ry={70} fill={L(C.teal)} opacity={0.8} />
      <ellipse cx={560} cy={1520} rx={300} ry={48} fill={L(shade(C.teal, 0.12))} opacity={0.5} />
      {/* bed, at the left */}
      <rect x={20} y={860} width={44} height={420} rx={10} fill={woodDark} />
      <rect x={20} y={1205} width={470} height={60} rx={8} fill={woodDark} />
      <rect x={60} y={1150} width={440} height={60} rx={14} fill={L(C.white)} />
      <rect x={60} y={1120} width={180} height={40} rx={18} fill={L(C.lime)} />
      <rect x={260} y={1120} width={150} height={40} rx={18} fill={L(C.skyDeep)} />
      <rect x={300} y={1096} width={200} height={70} rx={14} fill={blanket} />
      <rect x={180} y={1190} width={320} height={20} rx={8} fill={shade(blanket, 0.12)} />
      <rect x={20} y={1262} width={24} height={98} fill={woodDark} />
      <rect x={470} y={1262} width={24} height={98} fill={woodDark} />
      {/* nightstand with lamp, right of the bed */}
      <rect x={530} y={1160} width={110} height={18} rx={5} fill={wood} />
      <rect x={540} y={1178} width={90} height={162} rx={6} fill={shade(wood, 0.1)} />
      <rect x={544} y={1260} width={82} height={6} fill={woodDark} />
      <rect x={584} y={1060} width={10} height={100} fill={L(C.greyDark)} />
      <path d="M 552 1060 L 566 1000 L 614 1000 L 628 1060 Z" fill={L(C.yellow)} />
      <ellipse cx={590} cy={1060} rx={40} ry={8} fill={L(C.yellowDark)} />
      {time === "night" && <ellipse cx={590} cy={1080} rx={120} ry={60} fill="#FFE9A8" opacity={0.22} />}
      {/* wardrobe, right */}
      <rect x={800} y={780} width={250} height={580} rx={6} fill={L(C.sand)} />
      <rect x={800} y={780} width={250} height={16} fill={shade(C.sand, 0.15)} />
      <rect x={924} y={800} width={4} height={540} fill={L(shade(C.sand, 0.2))} />
      <rect x={890} y={1040} width={8} height={70} rx={4} fill={L(C.brownDark)} />
      <rect x={932} y={1040} width={8} height={70} rx={4} fill={L(C.brownDark)} />
      <rect x={800} y={1344} width={250} height={18} fill={shade(C.sand, 0.2)} />
      {/* small plant by the wardrobe */}
      <path d="M 1000 1360 L 990 1300 L 1040 1300 L 1032 1360 Z" fill={L(C.orange)} />
      {[-30, 0, 30].map((a, i) => <ellipse key={i} cx={1015} cy={1230} rx={14} ry={60} fill={L(i === 1 ? C.greenDark : C.green)} transform={`rotate(${a + (drift ? Math.sin(f / 30 + i) * 2 : 0)} 1015 1300)`} />)}
    </g>
  );
}

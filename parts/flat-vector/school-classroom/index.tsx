import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Classroom background (preset of flat-vector/backdrop): chalkboard with abstract chalk doodles and a clock on the
// back wall, a Window either side, a teacher desk at the left and student desks at the right. The centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360, wood = L(C.brown), woodDark = L(C.brownDark), frame = L(C.brownDark), ink = L(C.ink);
  const board = L(p.board ?? C.tealDark);
  const Desk = ({ x, y, w }: { x: number; y: number; w: number }) => (
    <g>
      <rect x={x + 10} y={y + 22} width={10} height={floorY + 40 - y - 22} fill={woodDark} />
      <rect x={x + w - 20} y={y + 22} width={10} height={floorY + 40 - y - 22} fill={woodDark} />
      <rect x={x} y={y} width={w} height={22} rx={6} fill={wood} />
      <rect x={x + 6} y={y + 22} width={w - 12} height={6} fill={shade(wood, 0.2)} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#F3E3C7"} floor="#C99A6B" floorY={floorY} floorKind="boards" panels={false} />
      {/* back wall: chalkboard with abstract doodles and a clock above */}
      <rect x={268} y={288} width={544} height={424} rx={14} fill={frame} />
      <rect x={280} y={300} width={520} height={400} rx={8} fill={board} />
      <rect x={300} y={690} width={480} height={14} rx={7} fill={frame} />
      <rect x={470} y={704} width={140} height={8} rx={4} fill={L(C.greyLight)} />
      <path d="M 330 420 q 25 -40 50 0 t 50 0 t 50 0" stroke={L(C.white)} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.9} />
      <circle cx={520} cy={430} r={34} stroke={L(C.yellow)} strokeWidth={6} fill="none" />
      <path d="M 610 490 L 660 400 L 710 490 Z" stroke={L(C.sky)} strokeWidth={6} fill="none" strokeLinejoin="round" />
      <path d="M 340 560 L 470 552 L 600 566 L 730 556" stroke={L(C.white)} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M 330 620 L 360 640 L 390 620 L 420 640 L 450 620" stroke={L(C.pink)} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="700 600 712 628 742 628 718 646 728 676 700 658 672 676 682 646 658 628 688 628" fill="none" stroke={L(C.yellow)} strokeWidth={4} strokeLinejoin="round" opacity={0.9} />
      {/* clock */}
      <g transform="translate(540 190)">
        <circle r={62} fill={frame} />
        <circle r={52} fill={L(C.white)} />
        <line x1={0} y1={0} x2={0} y2={-34} stroke={ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${drift ? f * 0.02 : 0})`} />
        <line x1={0} y1={0} x2={28} y2={0} stroke={L(C.red)} strokeWidth={4} strokeLinecap="round" transform={`rotate(${drift ? f * 0.5 : 0})`} />
        <circle r={5} fill={ink} />
      </g>
      {/* Windows either side of the board */}
      <Window x={34} y={330} w={180} h={270} time={time} weather={weather} f={drift ? f : 0} view="trees" curtains={L(C.yellow)} />
      <Window x={866} y={330} w={170} h={270} time={time} weather={weather} f={drift ? f : 0} view="city" curtains={L(C.yellow)} />
      {/* poster of coloured rings on the right wall */}
      <rect x={846} y={660} width={200} height={230} rx={8} fill={frame} />
      <rect x={858} y={672} width={176} height={206} rx={4} fill={L(C.greyLight)} />
      <circle cx={946} cy={750} r={46} fill={L(C.teal)} />
      <circle cx={946} cy={750} r={26} fill={L(C.lime)} />
      <rect x={886} y={820} width={120} height={14} rx={7} fill={L(C.orange)} />
      <rect x={886} y={846} width={80} height={14} rx={7} fill={L(C.blue)} />
      {/* teacher desk at the left with a stack of books and a cup */}
      <Desk x={28} y={1150} w={190} />
      <rect x={60} y={1126} width={70} height={24} rx={3} fill={L(C.red)} />
      <rect x={66} y={1102} width={60} height={24} rx={3} fill={L(C.blue)} />
      <rect x={180} y={1118} width={22} height={32} rx={4} fill={L(C.white)} />
      {/* student desks at the right, two rows */}
      <Desk x={846} y={1050} w={200} />
      <rect x={880} y={1010} width={120} height={40} rx={6} fill={L(C.greyLight)} />
      <Desk x={806} y={1230} w={250} />
      <rect x={830} y={1196} width={60} height={34} rx={6} fill={L(C.yellow)} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Lamp, lit, asTime } from "../backdrop/index";

// Laboratory background (preset of flat-vector/backdrop): a fume hood at the back left, shelves of bottles at the
// back right, a long bench with bubbling flasks and a microscope, and a ceiling lamp. The centre floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1330, steel = L("#DDE2EA"), steelD = shade(steel, 0.2), ink = L(C.ink), liquid = L(p.liquid ?? C.purple);
  const benchBody = L("#5D6578"), benchTop = L("#D9DEE7");
  const bottleCols = [C.teal, C.purple, C.orange, C.lime, C.pink, C.blue, C.yellow, C.red, C.green].map(L);
  const Flask = ({ x, y, col }: { x: number; y: number; col: string }) => (
    <g>
      <rect x={x - 5} y={y - 60} width={10} height={36} fill="#EAF6FB" opacity={0.9} />
      <path d={`M ${x - 6} ${y - 24} L ${x - 34} ${y} L ${x + 34} ${y} L ${x + 6} ${y - 24} Z`} fill="#EAF6FB" opacity={0.9} />
      <path d={`M ${x - 22} ${y - 8} L ${x - 34} ${y} L ${x + 34} ${y} L ${x + 22} ${y - 8} Z`} fill={col} />
      {drift && [0, 1, 2].map((k) => (
        <circle key={k} cx={x - 8 + k * 8} cy={y - 16 - ((f * 1.2 + k * 23 + x) % 46)} r={3 + k} fill="#FFFFFF" opacity={0.7} />
      ))}
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#DDEBEF"} floor="#B7C4D6" floorY={floorY} floorKind="tiles" panels={false} />
      <Lamp x={540} y={210} on={time === "night" || time === "dusk"} />
      {/* shelves of bottles at the back right */}
      {[500, 740].map((sy, s) => (
        <g key={`sh${s}`}>
          <rect x={470} y={sy} width={590} height={14} rx={4} fill={L(C.brown)} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const bx = 490 + i * 70, col = bottleCols[(i + s * 3) % bottleCols.length];
            return (
              <g key={i}>
                <rect x={bx + 12} y={sy - 26} width={14} height={14} fill="#EAF6FB" />
                <rect x={bx} y={sy - 72} width={38} height={46} rx={6} fill="#EAF6FB" />
                <rect x={bx + 4} y={sy - 50} width={30} height={22} rx={4} fill={col} />
              </g>
            );
          })}
        </g>
      ))}
      {/* fume hood at the back left */}
      <rect x={40} y={470} width={300} height={830} rx={8} fill={steel} />
      <rect x={40} y={440} width={300} height={40} rx={8} fill={steelD} />
      <rect x={70} y={540} width={240} height={640} rx={6} fill={L("#8EC5E8")} opacity={0.35} />
      <rect x={70} y={540} width={240} height={14} rx={6} fill={steelD} />
      <rect x={150} y={1020} width={80} height={12} rx={6} fill={steelD} />
      <rect x={100} y={1160} width={170} height={18} rx={4} fill={L(C.white)} opacity={0.6} />
      <rect x={112} y={1080} width={60} height={80} rx={6} fill={L(C.green)} opacity={0.9} />
      <rect x={190} y={1100} width={70} height={60} rx={6} fill={L(C.orange)} opacity={0.9} />
      {/* back bench with flasks, a microscope and beakers */}
      <rect x={380} y={1180} width={680} height={28} rx={4} fill={benchTop} />
      <rect x={380} y={1208} width={680} height={130} fill={benchBody} />
      <Flask x={470} y={1180} col={liquid} />
      <Flask x={600} y={1180} col={L(C.teal)} />
      <rect x={690} y={1140} width={64} height={40} rx={4} fill="#EAF6FB" opacity={0.9} />
      <rect x={690} y={1160} width={64} height={20} fill={L(C.lime)} />
      <rect x={770} y={1126} width={56} height={54} rx={4} fill="#EAF6FB" opacity={0.9} />
      <rect x={772} y={1152} width={52} height={28} fill={L(C.pink)} />
      <Flask x={900} y={1180} col={L(C.yellow)} />
      <rect x={520} y={1150} width={44} height={30} rx={3} fill={ink} />
      <path d="M 540 1150 L 540 1110 L 556 1096" stroke={ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      <rect x={560} y={1090} width={22} height={34} rx={6} fill={ink} transform="rotate(-18 571 1107)" />
      <rect x={520} y={1178} width={70} height={6} rx={3} fill={shade(ink, 0.3)} />
    </g>
  );
}

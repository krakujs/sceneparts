import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, font } from "../style/index";
import { Room, lit, asTime, mix } from "../backdrop/index";

// Podcast studio (flat-vector background): a bright, warm room with acoustic foam panels, shelves, plants and an
// ON AIR sign. A desk runs across the lower middle with two large broadcast mics on boom arms (their heads sit
// just above the stage), headphones and a laptop. Only the desk edge and mic arms reach into the stage.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "day"), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const foam = L(p.foam ?? "#5FB3A8"), foamDk = shade(foam, 0.22), wood = L(C.brown), woodDk = shade(wood, 0.2);
  const body = L("#4A5160"), metal = L(C.greyDark), ink = L(C.ink), onAir = time === "night" ? "#FF5A4A" : C.red;
  const pulse = drift ? 0.75 + 0.25 * Math.sin(f / 10) : 1;

  const panel = (x: number, y: number, w: number, h: number, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={foam} />
      {new Array(Math.floor(h / 60)).fill(0).map((_, r) => new Array(Math.floor(w / 60)).fill(0).map((__, c) => (
        <path key={`${r}-${c}`} d={`M ${x + c * 60 + 6} ${y + r * 60 + 6} L ${x + c * 60 + 54} ${y + r * 60 + 6} L ${x + c * 60 + 30} ${y + r * 60 + 50} Z`} fill={foamDk} opacity={0.6} />
      )))}
    </g>
  );
  // a broadcast mic: capsule body 120 px long, grill cap on one side, yoke under it
  const mic = (x0: number, y0: number, dir: number, key: string) => (
    <g key={key}>
      <rect x={x0 - 60} y={y0 - 22} width={120} height={44} rx={22} fill={body} />
      <rect x={x0 - 46} y={y0 - 16} width={84} height={6} rx={3} fill={metal} />
      <rect x={x0 - 8} y={y0 + 20} width={16} height={24} rx={4} fill={ink} />
      <circle cx={x0 + dir * 66} cy={y0} r={26} fill={ink} />
      <circle cx={x0 + dir * 66} cy={y0} r={18} fill="none" stroke={metal} strokeWidth={4} />
    </g>
  );
  const plant = (x: number, y: number, s: number, key: string) => (
    <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -10 -70 Q -70 -150 -40 -230 Q 0 -160 -10 -70 Z" fill={C.green} />
      <path d="M 0 -70 Q 60 -170 30 -250 Q 10 -170 0 -70 Z" fill={C.greenDark} />
      <path d="M -4 -70 Q -40 -110 -80 -100 Q -40 -80 -4 -62 Z" fill={C.green} />
      <rect x={-46} y={-70} width={92} height={70} rx={8} fill={C.orange} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#F6E7CF"} floor={p.floor ?? "#C99A6B"} floorY={1360} floorKind="boards" panels={false} skirting={true} />
      {/* ON AIR sign */}
      <circle cx={540} cy={190} r={170} fill={onAir} opacity={0.12 * pulse} />
      <rect x={380} y={140} width={320} height={96} rx={18} fill={ink} />
      <rect x={394} y={154} width={292} height={68} rx={12} fill={onAir} opacity={pulse} />
      <text x={540} y={206} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={50} fill={C.white}>ON AIR</text>
      {/* acoustic foam panels across the back wall */}
      {[40, 258, 476, 694, 912].map((x, i) => panel(x, 300, 128, 300, `f${i}`))}
      {/* shelves with books, a mug and a small plant */}
      {[[60, 860], [720, 860], [60, 990], [720, 990]].map(([x, y], i) => (
        <g key={`s${i}`}>
          <rect x={x} y={y} width={300} height={14} rx={4} fill={woodDk} />
          {new Array(6).fill(0).map((_, j) => <rect key={j} x={x + 12 + j * 44} y={y - 60 - (j % 2) * 8} width={30} height={60 + (j % 2) * 8} rx={3} fill={[C.blue, C.orange, C.teal, C.pink, C.yellow, C.purple][(j + i) % 6]} />)}
        </g>
      ))}
      {/* desk: a top across the lower middle with pedestals at the edges */}
      <rect x={60} y={1360} width={960} height={34} rx={10} fill={wood} />
      <rect x={60} y={1388} width={960} height={10} fill={woodDk} />
      <rect x={70} y={1398} width={40} height={522} fill={woodDk} />
      <rect x={970} y={1398} width={40} height={522} fill={woodDk} />
      {/* boom arms with the two large mics */}
      <path d="M 60 1400 Q 110 1100 300 1244" stroke={ink} strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M 1020 1400 Q 970 1100 780 1244" stroke={ink} strokeWidth={16} fill="none" strokeLinecap="round" />
      {mic(300, 1220, 1, "m1")}
      {mic(780, 1220, -1, "m2")}
      {/* headphones and a laptop on the desk */}
      <path d="M 140 1322 Q 160 1262 186 1322" stroke={ink} strokeWidth={10} fill="none" strokeLinecap="round" />
      <rect x={132} y={1316} width={22} height={44} rx={9} fill={ink} />
      <rect x={180} y={1316} width={22} height={44} rx={9} fill={ink} />
      <path d="M 862 1358 L 880 1296 L 990 1296 L 1000 1358 Z" fill={metal} />
      <rect x={890} y={1302} width={88} height={48} rx={3} fill={mix(C.teal, "#1F2433", 0.2)} />
      {/* plants at the room edges */}
      {plant(1050, 1356, 0.8, "p1")}
      {plant(60, 1356, 0.8, "p2")}
    </g>
  );
}

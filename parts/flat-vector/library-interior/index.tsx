import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Lamp, lit, asTime, rnd } from "../backdrop/index";

// Library interior (preset of flat-vector/backdrop): tall bookshelves with coloured spines at both sides, a reading
// table with a green lamp at the back, a step ladder and a pendant lamp. The centre floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time), drift = (p.anim ?? "drift") !== "none", f = p.f ?? 0;
  const L = (c: string) => lit(c, time, true);
  const wood = L(p.wood ?? C.brown), woodDark = L(C.brownDark);
  const BOOKS = [C.red, C.blue, C.teal, C.yellow, C.purple, C.orange, C.green, C.pink, C.navy, C.sand].map(L);
  const floorY = 1360, top = 330, rows = 11, rh = (floorY - top) / rows;
  const Shelf = ({ x, w, seed }: { x: number; w: number; seed: number }) => {
    const out: React.ReactNode[] = [];
    out.push(<rect key="frame" x={x - 10} y={top - 12} width={w + 20} height={floorY - top + 12} rx={6} fill={wood} />);
    for (let r = 0; r < rows; r++) {
      const y = top + r * rh;
      out.push(<rect key={`s${r}`} x={x} y={y + rh - 12} width={w} height={12} fill={woodDark} />);
      let bx = x + 6, i = 0;
      while (bx < x + w - 24) {
        const bw = 22 + rnd(seed, r * 40 + i) * 14, bh = rh - 30 - rnd(seed, r * 40 + i + 17) * 26;
        const col = BOOKS[Math.floor(rnd(seed, r * 40 + i + 5) * BOOKS.length) % BOOKS.length];
        out.push(<rect key={`b${r}-${i}`} x={bx} y={y + rh - 12 - bh} width={bw} height={bh} rx={3} fill={col} />);
        bx += bw + 3; i++;
      }
    }
    return <g>{out}</g>;
  };
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#E9DDC7"} floor="#B98A5B" floorY={floorY} floorKind="boards" panels={false} />
      <Lamp x={540} y={210} on={time === "night" || time === "dusk"} />
      <Shelf x={20} w={200} seed={11} />
      <Shelf x={860} w={200} seed={23} />
      {/* reading table at the back, with a green banker's lamp and books */}
      <rect x={360} y={1170} width={360} height={26} rx={6} fill={wood} />
      <rect x={384} y={1196} width={18} height={164} fill={woodDark} />
      <rect x={678} y={1196} width={18} height={164} fill={woodDark} />
      <rect x={420} y={1140} width={90} height={30} rx={4} fill={L(C.red)} />
      <rect x={426} y={1112} width={78} height={28} rx={4} fill={L(C.blue)} />
      <rect x={600} y={1146} width={110} height={24} rx={4} fill={L(C.yellow)} />
      <rect x={520} y={1128} width={8} height={42} fill={L(C.greyDark)} />
      <rect x={504} y={1164} width={44} height={8} rx={4} fill={L(C.greyDark)} />
      <path d="M 496 1130 L 524 1080 L 560 1130 Z" fill={L(C.green)} />
      <ellipse cx={528} cy={1128} rx={34} ry={6} fill={shade(L(C.green), 0.2)} />
      {(time === "night" || time === "dusk") && <ellipse cx={528} cy={1150} rx={70} ry={50} fill="#FFE9A8" opacity={0.22} />}
      {/* step ladder leaning at the right edge */}
      <path d="M 778 1360 L 808 1150 L 838 1360" stroke={L(C.greyDark)} strokeWidth={9} fill="none" strokeLinejoin="round" />
      {[1200, 1250, 1300].map((y, i) => <rect key={i} x={788 + (y - 1200) * 0.02} y={y} width={40} height={8} rx={3} fill={L(C.greyDark)} />)}
      {/* faint dust motes from the lamp */}
      {drift && [0, 1, 2, 3].map((i) => <circle key={i} cx={470 + i * 40} cy={300 + ((f * (0.6 + i * 0.2)) % 260)} r={3} fill="#FFF6D8" opacity={0.5} />)}
    </g>
  );
}

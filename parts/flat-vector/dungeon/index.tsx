import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, rnd, asTime } from "../backdrop/index";

// Dungeon: cartoon stone walls, a barred cell at the side, hanging chains, a torch with flicker and straw on the floor. Kept light and friendly.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const stone = L(p.stone ?? "#8F93A3"), iron = L(C.ink), floorY = 1300;
  const flick = drift ? Math.sin(f / 4) * 3 : 0;
  return (
    <g>
      <Room time={time} wall={stone} floor={L("#6E7283")} floorY={floorY} floorKind="concrete" panels={false} skirting={false} />
      {/* stone block joints */}
      {new Array(9).fill(0).map((_, r) => new Array(6).fill(0).map((__, c) => (
        <rect key={`${r}-${c}`} x={c * 180 + (r % 2 ? 90 : 0)} y={r * 110} width={180} height={110} fill="none" stroke={shade(stone, 0.14)} strokeWidth={4} />
      )))}
      {/* barred cell at the right */}
      <rect x={740} y={740} width={300} height={420} fill={shade(stone, 0.5)} />
      <rect x={740} y={720} width={300} height={24} fill={iron} />
      {new Array(7).fill(0).map((_, i) => <rect key={i} x={760 + i * 42} y={744} width={10} height={420} fill={iron} />)}
      <rect x={740} y={1140} width={300} height={20} fill={iron} />
      {/* straw bed inside the cell */}
      {new Array(18).fill(0).map((_, i) => <path key={i} d={`M ${770 + rnd(12, i) * 240} ${1160 - rnd(12, i + 40) * 20} q 14 -10 28 0`} stroke={L(C.yellow)} strokeWidth={5} fill="none" />)}
      {/* chains hanging on the left wall */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${140 + i * 50} ${260})`}>
          {new Array(5).fill(0).map((_, j) => <ellipse key={j} cx={0} cy={j * 40} rx={14} ry={22} fill="none" stroke={iron} strokeWidth={9} />)}
        </g>
      ))}
      {/* wall torch with a flickering flame */}
      <rect x={430} y={560} width={16} height={70} fill={L(C.brownDark)} />
      <path d={`M 422 560 Q ${414 + flick} 520 ${438 + flick} 500 Q ${462 - flick} 520 ${454} 560 Z`} fill={C.orange} />
      <circle cx={438} cy={560} r={120} fill={C.yellow} opacity={time === "day" ? 0.06 : 0.14} />
      {/* small high grate with light */}
      <rect x={300} y={300} width={140} height={100} rx={6} fill={shade(stone, 0.3)} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={318 + i * 32} y={306} width={8} height={88} fill={iron} />)}
    </g>
  );
}

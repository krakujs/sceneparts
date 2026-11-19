import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Lamp, lit, asTime } from "../backdrop/index";

// Workshop background (preset of flat-vector/backdrop): pegboard with hand tools, shelves of paint tins, a workbench
// with a vise at the left, sawhorses with planks at the right and a swinging pendant lamp. The centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1340, bench = L(p.bench ?? C.brown), benchD = shade(bench, 0.22), steel = L(C.greyDark), ink = L(C.ink);
  const peg = L(p.peg ?? "#C9A06A");
  const holes: React.ReactNode[] = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 9; c++) holes.push(<circle key={`${r}-${c}`} cx={92 + c * 46} cy={362 + r * 44} r={4} fill={shade(peg, 0.35)} />);
  const tins = [C.red, C.blue, C.yellow, C.green, C.orange, C.teal];
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#D9B98C"} floor="#B98A5B" floorY={floorY} floorKind="boards" panels />
      {/* pegboard with hand tools */}
      <rect x={60} y={330} width={420} height={370} rx={8} fill={shade(peg, 0.1)} />
      <rect x={70} y={340} width={400} height={350} rx={6} fill={peg} />
      {holes}
      <g transform="translate(120 420) rotate(-12)">
        <rect x={0} y={0} width={16} height={120} rx={6} fill={L(C.red)} />
        <rect x={-28} y={-6} width={72} height={26} rx={5} fill={steel} />
      </g>
      <g transform="translate(210 420)">
        <path d="M 0 0 L 90 0 L 90 40 L 0 60 Z" fill={steel} />
        <rect x={-4} y={40} width={22} height={70} rx={6} fill={L(C.blue)} />
      </g>
      <g transform="translate(330 430) rotate(8)">
        <rect x={0} y={20} width={14} height={110} rx={6} fill={L(C.yellow)} />
        <circle cx={7} cy={10} r={24} fill="none" stroke={steel} strokeWidth={12} />
      </g>
      <g transform="translate(410 440)">
        <rect x={0} y={0} width={8} height={130} fill={steel} />
        <rect x={-10} y={120} width={28} height={34} rx={6} fill={L(C.teal)} />
      </g>
      <rect x={120} y={600} width={200} height={14} rx={4} fill={L(C.greyDark)} opacity={0.6} />
      <g transform="translate(140 600)">
        <rect x={0} y={-60} width={36} height={60} rx={4} fill={L(C.orange)} />
        <rect x={60} y={-44} width={30} height={44} rx={4} fill={L(C.purple)} />
      </g>
      {/* shelves of paint tins at the right */}
      {[520, 720].map((sy, s) => (
        <g key={`sh${s}`}>
          <rect x={600} y={sy} width={440} height={16} rx={4} fill={benchD} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={618 + i * 70} y={sy - 84} width={52} height={84} rx={6} fill={L(tins[(i + s * 2) % tins.length])} />
              <rect x={618 + i * 70} y={sy - 84} width={52} height={12} rx={4} fill={shade(L(tins[(i + s * 2) % tins.length]), 0.25)} />
            </g>
          ))}
        </g>
      ))}
      {/* workbench at the left with a vise */}
      <rect x={24} y={1090} width={280} height={30} rx={5} fill={bench} />
      <rect x={44} y={1120} width={22} height={220} fill={benchD} />
      <rect x={252} y={1120} width={22} height={220} fill={benchD} />
      <rect x={210} y={1050} width={62} height={40} rx={5} fill={steel} />
      <rect x={196} y={1058} width={18} height={24} rx={4} fill={ink} />
      <rect x={160} y={1062} width={56} height={10} rx={4} fill={ink} />
      <rect x={60} y={1070} width={30} height={20} rx={4} fill={L(C.teal)} />
      {/* sawhorses with planks at the right */}
      <rect x={840} y={1200} width={230} height={22} rx={4} fill={L("#D9B98C")} />
      <rect x={862} y={1170} width={190} height={22} rx={4} fill={L("#E3C79C")} transform="rotate(-2 956 1181)" />
      <path d="M 900 1222 L 880 1340 M 960 1222 L 990 1340 M 1020 1222 L 1040 1340" stroke={L(C.brownDark)} strokeWidth={16} strokeLinecap="round" fill="none" />
      <path d="M 880 1300 L 1000 1300" stroke={L(C.brownDark)} strokeWidth={10} strokeLinecap="round" />
      {/* swinging pendant lamp */}
      <g transform={`rotate(${drift ? Math.sin(f / 40) * 3 : 0} 540 0)`}>
        <Lamp x={540} y={230} on={time === "night" || time === "dusk"} color={C.orange} />
      </g>
    </g>
  );
}

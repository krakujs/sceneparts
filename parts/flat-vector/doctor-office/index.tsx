import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime } from "../backdrop/index";

// Doctor office background (preset of flat-vector/backdrop): eye chart of abstract shapes on the back wall, an
// examination couch at the left, a desk with a monitor at the back and a cabinet at the right. Centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1340, couch = L(p.couch ?? C.teal), couchD = shade(couch, 0.2), ink = L(C.ink), steel = L(C.greyLight);
  // eye chart: rows of abstract shapes that shrink, no letters
  const shapes = [
    [C.ink], [C.blue, C.red], [C.green, C.orange, C.purple], [C.teal, C.pink, C.yellow, C.navy], [C.red, C.blue, C.green, C.orange, C.purple],
  ];
  const chart: React.ReactNode[] = [];
  shapes.forEach((row, r) => {
    const s = 58 - r * 10, gap = 22 - r * 2;
    const total = row.length * s + (row.length - 1) * gap;
    row.forEach((c, i) => {
      const cx = 230 - total / 2 + i * (s + gap) + s / 2, cy = 480 + r * 62;
      const col = L(c);
      if ((r + i) % 3 === 0) chart.push(<circle key={`${r}-${i}`} cx={cx} cy={cy} r={s / 2} fill={col} />);
      else if ((r + i) % 3 === 1) chart.push(<rect key={`${r}-${i}`} x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={4} fill={col} />);
      else chart.push(<polygon key={`${r}-${i}`} points={`${cx} ${cy - s / 2} ${cx + s / 2} ${cy + s / 2} ${cx - s / 2} ${cy + s / 2}`} fill={col} />);
    });
  });
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#E6F4F7"} floor="#CFE6F5" floorY={floorY} floorKind="tiles" panels={false} />
      {/* eye chart poster */}
      <rect x={80} y={400} width={300} height={330} rx={10} fill={shade(L(C.white), 0.08)} />
      <rect x={92} y={412} width={276} height={306} rx={6} fill={L(C.white)} />
      {chart}
      {/* wall clock */}
      <g transform="translate(540 280)">
        <circle r={46} fill={L(C.white)} stroke={ink} strokeWidth={7} />
        <line x1={0} y1={0} x2={0} y2={-28} stroke={ink} strokeWidth={5} strokeLinecap="round" />
        <line x1={0} y1={0} x2={20} y2={0} stroke={ink} strokeWidth={4} strokeLinecap="round" transform={`rotate(${drift ? f * 0.5 : 0})`} />
      </g>
      {/* desk with monitor at the back */}
      <rect x={400} y={1080} width={300} height={22} rx={5} fill={L(C.brown)} />
      <rect x={414} y={1102} width={14} height={240} fill={L(C.brownDark)} />
      <rect x={672} y={1102} width={14} height={240} fill={L(C.brownDark)} />
      <rect x={500} y={960} width={100} height={80} rx={6} fill={ink} />
      <rect x={508} y={968} width={84} height={64} rx={4} fill={L(C.navy)} />
      <rect x={544} y={1040} width={16} height={40} fill={ink} />
      <rect x={520} y={1076} width={64} height={6} rx={3} fill={ink} />
      <rect x={620} y={1054} width={50} height={26} rx={4} fill={L(C.white)} />
      {/* examination couch at the left, with paper sheet and head rest */}
      <rect x={20} y={1150} width={330} height={56} rx={18} fill={couch} />
      <rect x={40} y={1138} width={260} height={14} rx={6} fill={L(C.white)} />
      <rect x={60} y={1206} width={240} height={96} rx={14} fill={couchD} />
      <rect x={14} y={1076} width={44} height={84} rx={16} fill={couch} />
      <rect x={40} y={1262} width={16} height={100} fill={steel} />
      <rect x={300} y={1262} width={16} height={100} fill={steel} />
      {/* cabinet at the right with jars on top */}
      <rect x={830} y={900} width={210} height={440} rx={6} fill={L(C.greyLight)} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={844} y={916 + i * 104} width={182} height={92} rx={4} fill={shade(L(C.greyLight), 0.12)} />)}
      {[0, 1].map((i) => <rect key={i} x={950} y={950 + i * 104} width={34} height={10} rx={5} fill={ink} />)}
      <rect x={846} y={860} width={50} height={40} rx={8} fill={L(C.skyDeep)} />
      <rect x={910} y={864} width={50} height={36} rx={8} fill={L(C.skyDeep)} />
      <rect x={846} y={852} width={114} height={8} rx={4} fill={L(C.white)} />
    </g>
  );
}

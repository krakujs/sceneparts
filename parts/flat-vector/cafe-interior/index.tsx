import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Lamp, lit, asTime } from "../backdrop/index";

// Cafe interior (flat-vector background): a counter with a coffee machine and a pastry display, a menu board
// with abstract lines, small tables at the sides and pendant lamps. The centre of the floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360;
  const wood = L(p.wood ?? C.brown), wall = p.wall ?? "#F6E7D2";
  const on = time === "night" || time === "dusk";
  return (
    <g>
      <Room time={time} wall={wall} floor="#B98A5E" floorY={floorY} floorKind="tiles" />
      {/* menu board with abstract lines */}
      <rect x={90} y={420} width={330} height={260} rx={14} fill={C.ink} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={120} y={458 + i * 40} width={150 - (i % 2) * 40} height={12} rx={6} fill={C.white} opacity={0.85} />
          <rect x={300} y={458 + i * 40} width={60} height={12} rx={6} fill={i % 2 ? C.yellow : C.orange} />
        </g>
      ))}
      {/* pendant lamps */}
      <Lamp x={260} y={250} on={on} color={C.orange} />
      <Lamp x={800} y={250} on={on} color={C.teal} />
      {/* back counter with coffee machine */}
      <rect x={540} y={980} width={520} height={330} fill={wood} />
      <rect x={520} y={960} width={560} height={40} rx={10} fill={shade(wood, 0.2)} />
      <rect x={560} y={1000} width={130} height={150} rx={12} fill={L(C.greyDark)} />
      <rect x={576} y={1030} width={98} height={40} rx={6} fill={L(C.ink)} />
      <rect x={600} y={1078} width={50} height={14} rx={6} fill={L(C.greyLight)} />
      <circle cx={620} cy={1108} r={6} fill={drift && f % 40 < 20 ? C.green : L(C.greenDark)} />
      <rect x={720} y={1040} width={50} height={80} rx={8} fill={L(C.white)} />
      <rect x={732} y={1050} width={26} height={20} rx={4} fill={L(C.brownDark)} />
      {/* cake and pastry display case on the counter */}
      <rect x={820} y={920} width={220} height={60} rx={10} fill={L("#CFE6F5")} opacity={0.85} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <ellipse cx={850 + i * 50} cy={1000} rx={20} ry={10} fill={L(C.orange)} />
          <rect x={832 + i * 50} y={990} width={36} height={14} rx={4} fill={L(C.yellow)} />
        </g>
      ))}
      <rect x={540} y={1100} width={520} height={20} fill={shade(wood, 0.12)} />
      {/* cups on the counter */}
      {[600, 680, 900].map((x, i) => <rect key={i} x={x} y={1080} width={36} height={24} rx={6} fill={L(i % 2 ? C.red : C.white)} />)}
      {/* small tables at the sides */}
      {[[40, 1480], [860, 1500]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x + 90} cy={y} rx={110} ry={26} fill={L(C.brown)} />
          <rect x={x + 80} y={y} width={20} height={200} fill={L(C.brownDark)} />
          <ellipse cx={x + 90} cy={y + 200} rx={60} ry={12} fill={L(C.brownDark)} />
          <rect x={x + 40 + (i % 2) * 40} y={y - 70} width={70} height={46} rx={16} fill={L(C.teal)} />
        </g>
      ))}
    </g>
  );
}

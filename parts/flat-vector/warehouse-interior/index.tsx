import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Lamp, lit, asTime } from "../backdrop/index";

// Warehouse interior background (preset of flat-vector/backdrop): tall pallet racking with boxes at both sides, a
// roller door on the back wall, a forklift at the front right and pendant lamps. The centre floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1340, rack = L(p.racking ?? C.orange), rackD = shade(rack, 0.2), ink = L(C.ink);
  const cardboard = [C.sand, C.brown, "#D9B98C"].map(L), pallet = L("#B98A5B");
  const Racking = ({ x0, w, levels }: { x0: number; w: number; levels: number[] }) => (
    <g>
      {[x0, x0 + w - 16].map((x) => <rect key={x} x={x} y={330} width={16} height={floorY - 330} fill={rackD} />)}
      {levels.map((y, li) => (
        <g key={li}>
          <rect x={x0} y={y} width={w} height={14} fill={rack} />
          {[0, 1].map((k) => {
            const bx = x0 + 22 + k * ((w - 44) / 2);
            return (
              <g key={k}>
                <rect x={bx} y={y - 8} width={(w - 44) / 2 - 10} height={8} rx={2} fill={pallet} />
                <rect x={bx} y={y - 78} width={(w - 44) / 2 - 10} height={70} rx={3} fill={cardboard[(li + k) % 3]} />
                <rect x={bx + 12} y={y - 78} width={6} height={70} fill={shade(cardboard[(li + k) % 3], 0.15)} />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#D7DCE4"} floor="#A9B0BD" floorY={floorY} floorKind="concrete" panels={false} />
      {/* roller door on the back wall */}
      <rect x={350} y={400} width={380} height={floorY - 400} fill={shade(L("#AEB6C4"), 0.1)} />
      <rect x={362} y={390} width={356} height={26} rx={6} fill={shade(L("#AEB6C4"), 0.3)} />
      <rect x={362} y={416} width={356} height={floorY - 416} fill={L("#AEB6C4")} />
      {Array.from({ length: 40 }, (_, i) => <line key={i} x1={362} y1={432 + i * 22} x2={718} y2={432 + i * 22} stroke={shade(L("#AEB6C4"), 0.14)} strokeWidth={3} />)}
      <rect x={350} y={floorY - 10} width={380} height={14} fill={shade(L("#AEB6C4"), 0.25)} />
      {/* racking at both sides */}
      <Racking x0={24} w={200} levels={[430, 700, 970, 1240]} />
      <Racking x0={856} w={200} levels={[430, 700, 970]} />
      {/* pendant lamps */}
      <g transform={`rotate(${drift ? Math.sin(f / 50) * 2 : 0} 300 0)`}><Lamp x={300} y={210} on={time === "night" || time === "dusk"} /></g>
      <g transform={`rotate(${drift ? Math.sin(f / 50 + 2) * 2 : 0} 780 0)`}><Lamp x={780} y={210} on={time === "night" || time === "dusk"} /></g>
      {/* forklift at the front right */}
      <rect x={902} y={1230} width={14} height={230} fill={ink} />
      <rect x={922} y={1230} width={14} height={230} fill={ink} />
      <rect x={880} y={1440} width={70} height={12} rx={4} fill={L(C.yellow)} />
      <rect x={936} y={1360} width={130} height={92} rx={12} fill={L(C.yellow)} />
      <rect x={952} y={1300} width={92} height={70} rx={8} fill={shade(L(C.yellow), 0.12)} />
      <rect x={962} y={1312} width={70} height={36} rx={5} fill={L(C.skyDeep)} opacity={0.8} />
      <rect x={940} y={1280} width={100} height={14} rx={5} fill={ink} />
      <rect x={1040} y={1290} width={12} height={38} rx={4} fill={L(C.red)} />
      <circle cx={960} cy={1488} r={30} fill={ink} />
      <circle cx={1040} cy={1488} r={30} fill={ink} />
      <circle cx={960} cy={1488} r={11} fill={L(C.greyDark)} />
      <circle cx={1040} cy={1488} r={11} fill={L(C.greyDark)} />
      <rect x={936} y={1452} width={130} height={10} rx={4} fill={shade(L(C.yellow), 0.25)} />
      <rect x={900} y={1400} width={20} height={16} fill={ink} />
    </g>
  );
}

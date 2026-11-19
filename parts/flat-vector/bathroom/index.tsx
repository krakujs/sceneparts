import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime } from "../backdrop/index";

// Bathroom background: tiled walls, bathtub with a shower curtain on the left, sink with mirror on the right,
// toilet at the far right, towel rail and bath mat. The centre of the floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const tile = p.tile ?? "#D7F1EE", grout = L(C.white), curtain = L(p.curtain ?? C.skyDeep);
  const floorY = 1360;
  const tiles: React.ReactNode[] = [];
  for (let r = 0; r < 14; r++) for (let c = 0; c < 12; c++) {
    tiles.push(<rect key={`${r}-${c}`} x={c * 90} y={r * 100} width={90} height={100} fill={L(tile)} stroke={grout} strokeWidth={3} />);
  }
  const stripes = new Array(6).fill(0).map((_, i) => (
    <rect key={i} x={40 + i * 64} y={660} width={64} height={420 + (i % 2 ? 0 : 22)} fill={i % 2 ? curtain : shade(curtain, 0.12)} opacity={0.95} />
  ));
  return (
    <g>
      <Room time={time} wall="#E8F6F5" floor={p.floor ?? "#BFE6E1"} floorY={floorY} floorKind="tiles" panels={false} skirting={false} />
      {tiles}
      {/* shower head and curtain rail */}
      <rect x={30} y={640} width={400} height={10} rx={5} fill={L(C.greyDark)} />
      <rect x={420} y={520} width={60} height={12} rx={6} fill={L(C.greyDark)} />
      <path d="M 452 532 L 452 560 Q 452 570 442 570 L 420 570" stroke={L(C.greyDark)} strokeWidth={8} fill="none" strokeLinecap="round" />
      {stripes}
      {/* bathtub on the left */}
      <rect x={0} y={1080} width={430} height={170} rx={30} fill={L(C.white)} />
      <rect x={24} y={1100} width={382} height={110} rx={24} fill={L("#CFE6F5")} />
      <rect x={0} y={1080} width={430} height={20} rx={10} fill={L(C.greyLight)} />
      <rect x={380} y={1120} width={40} height={24} rx={10} fill={L(C.greyDark)} />
      <rect x={20} y={1250} width={20} height={110} fill={L(C.greyLight)} />
      <rect x={390} y={1250} width={20} height={110} fill={L(C.greyLight)} />
      {/* towel rail and towels between tub and sink */}
      <rect x={470} y={800} width={150} height={10} rx={5} fill={L(C.greyDark)} />
      <rect x={480} y={810} width={40} height={96} rx={8} fill={L(C.teal)} />
      <rect x={532} y={810} width={40} height={96} rx={8} fill={L(C.yellow)} />
      {/* mirror over the sink */}
      <rect x={650} y={360} width={240} height={300} rx={18} fill={L(C.greyDark)} />
      <rect x={668} y={378} width={204} height={264} rx={10} fill={L("#BFE6F5")} />
      <path d="M 668 560 L 668 500 Q 770 450 872 500 L 872 560 Z" fill={L("#A8D8EE")} />
      <rect x={700} y={400} width={40} height={6} rx={3} fill={L(C.white)} opacity={0.8} />
      {/* sink counter and basin */}
      <rect x={640} y={1000} width={250} height={28} rx={6} fill={L(C.white)} />
      <rect x={650} y={1028} width={230} height={22} fill={L(C.greyLight)} />
      <rect x={700} y={1050} width={130} height={260} rx={12} fill={L(C.white)} />
      <ellipse cx={765} cy={996} rx={80} ry={14} fill={L(C.greyLight)} />
      <rect x={758} y={940} width={14} height={60} rx={6} fill={L(C.greyDark)} />
      <rect x={760} y={936} width={40} height={10} rx={5} fill={L(C.greyDark)} />
      {/* toilet at the far right */}
      <rect x={910} y={1050} width={130} height={80} rx={14} fill={L(C.white)} />
      <rect x={930} y={1110} width={100} height={60} rx={18} fill={L(C.white)} />
      <path d="M 920 1170 Q 920 1250 980 1250 Q 1040 1250 1040 1170 Z" fill={L(C.white)} />
      <rect x={922} y={1132} width={116} height={10} rx={5} fill={L(C.greyLight)} />
      {/* bath mat and small plant */}
      <rect x={870} y={1290} width={200} height={34} rx={14} fill={L(C.purple)} opacity={0.85} />
      <path d="M 40 1360 L 50 1290 L 90 1290 L 100 1360 Z" fill={L(C.brown)} />
      {[-25, 0, 25].map((a, i) => <ellipse key={i} cx={70} cy={1220} rx={12} ry={50} fill={L(i === 1 ? C.greenDark : C.green)} transform={`rotate(${a + (drift ? Math.sin(f / 35 + i) * 2 : 0)} 70 1290)`} />)}
    </g>
  );
}

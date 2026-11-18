import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime } from "../backdrop/index";

// Operating theater background (preset of flat-vector/backdrop): green-blue tiled walls, an operating table at the
// back, two big round surgical lights, wall monitors, an instrument trolley and an anaesthesia machine at the sides.
// There are no Windows, so there is no weather; the centre floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const on = p.lightsOn !== false;
  const L = (c: string) => lit(c, time, true);
  const tile = L(p.tiles ?? "#BFE7E0"), grout = shade(tile, 0.12), steel = L("#DDE2EA"), steelD = shade(steel, 0.22), ink = L(C.ink);
  const floorY = 1330;
  const gridV = Array.from({ length: 16 }, (_, i) => <line key={`v${i}`} x1={i * 72} y1={0} x2={i * 72} y2={floorY} stroke={grout} strokeWidth={2} />);
  const gridH = Array.from({ length: 22 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 60} x2={1080} y2={i * 60} stroke={grout} strokeWidth={2} />);
  const glow = on ? 0.3 + (drift ? 0.08 * Math.sin(f / 18) : 0) : 0;
  return (
    <g>
      <Room time={time} wall={tile} floor="#D5F1EC" floorY={floorY} floorKind="tiles" panels={false} />
      {gridV}
      {gridH}
      {/* big round surgical lights hanging on arms */}
      {[330, 750].map((x, i) => (
        <g key={`sl${i}`}>
          <rect x={x - 4} y={0} width={8} height={300} fill={steelD} />
          <circle cx={x} cy={330} r={150} fill={L("#FFFFFF")} opacity={glow} />
          <circle cx={x} cy={330} r={112} fill={steelD} />
          <circle cx={x} cy={330} r={96} fill={on ? L("#FFFFFF") : L("#E8ECF2")} />
          <circle cx={x} cy={330} r={44} fill={on ? L("#FFFDF2") : L("#D5DBE5")} />
        </g>
      ))}
      {/* operating table at the back, with a teal drape */}
      <rect x={516} y={1100} width={48} height={210} fill={steelD} />
      <rect x={470} y={1296} width={140} height={20} rx={8} fill={steelD} />
      <rect x={360} y={1040} width={360} height={46} rx={20} fill={steel} />
      <rect x={400} y={1008} width={280} height={36} rx={14} fill={L(C.teal)} />
      <rect x={400} y={1036} width={280} height={8} fill={shade(L(C.teal), 0.2)} />
      {/* wall monitors left and right */}
      {[[40, 560], [820, 560]].map(([x, y], i) => (
        <g key={`mo${i}`}>
          <rect x={x} y={y} width={220} height={160} rx={10} fill={ink} />
          <rect x={x + 10} y={y + 10} width={200} height={140} rx={6} fill={L(C.navy)} />
          <polyline points={Array.from({ length: 21 }, (_, k) => `${x + 16 + k * 9.5} ${y + 90 + (k % 4 === 1 ? -36 : k % 4 === 2 ? 22 : 0) * (drift ? 1 : 0)}`).join(" ")} fill="none" stroke={L(C.lime)} strokeWidth={4} strokeLinejoin="round" />
          <rect x={x + 96} y={y + 160} width={28} height={80} fill={steelD} />
        </g>
      ))}
      {/* anaesthesia machine at the left */}
      <rect x={30} y={1150} width={170} height={170} rx={12} fill={steel} />
      <rect x={44} y={1164} width={142} height={50} rx={6} fill={ink} />
      <circle cx={70} cy={1240} r={14} fill={L(C.yellow)} />
      <circle cx={110} cy={1240} r={14} fill={L(C.red)} />
      <circle cx={150} cy={1240} r={14} fill={L(C.green)} />
      <rect x={44} y={1270} width={142} height={40} rx={6} fill={shade(steel, 0.08)} />
      <rect x={40} y={1320} width={20} height={20} rx={4} fill={ink} />
      <rect x={170} y={1320} width={20} height={20} rx={4} fill={ink} />
      {/* instrument trolley at the right */}
      <rect x={866} y={1196} width={190} height={16} rx={4} fill={steel} />
      <rect x={866} y={1212} width={190} height={12} fill={steelD} />
      <rect x={880} y={1228} width={10} height={170} fill={steelD} />
      <rect x={1032} y={1228} width={10} height={170} fill={steelD} />
      <rect x={878} y={1398} width={170} height={10} rx={4} fill={steelD} />
      <rect x={886} y={1178} width={26} height={18} rx={3} fill={L(C.greyDark)} />
      <rect x={926} y={1182} width={50} height={14} rx={3} fill={L(C.greyDark)} />
      <rect x={994} y={1176} width={40} height={20} rx={3} fill={L(C.greyDark)} />
    </g>
  );
}

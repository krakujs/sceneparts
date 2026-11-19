import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime } from "../backdrop/index";

// TV studio: big backdrop screen with abstract graphics, a lights rig, studio cameras at the sides and a news desk in the far distance.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const brand = L(p.graphics ?? C.blue), floorY = 1240, live = drift && Math.floor(f / 40) % 2 === 0;
  const camera = (x: number, flip: number) => (
    <g transform={`translate(${x} 0) scale(${flip} 1)`}>
      <rect x={-70} y={1080} width={130} height={110} rx={14} fill={L(C.inkSoft)} />
      <rect x={-40} y={1060} width={110} height={36} rx={10} fill={L(C.ink)} />
      <circle cx={-40} cy={1078} r={24} fill={L(C.greyDark)} />
      <rect x={-6} y={1190} width={12} height={120} fill={L(C.greyDark)} />
      <path d="M -60 1310 L 0 1260 L 60 1310 Z" fill={L(C.ink)} />
      <rect x={-60} y={1310} width={120} height={14} fill={L(C.ink)} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={L("#4A4F66")} floor={L("#7C8190")} floorY={floorY} floorKind="concrete" panels={false} skirting={false} />
      {/* lights rig truss with spots */}
      <rect x={60} y={90} width={960} height={24} rx={12} fill={L(C.greyDark)} />
      {new Array(9).fill(0).map((_, i) => (
        <g key={i}>
          <rect x={110 + i * 105} y={114} width={40} height={30} rx={6} fill={L(C.ink)} />
          <path d={`M ${110 + i * 105 + 20} 144 L ${110 + i * 105 - 40} 360 L ${110 + i * 105 + 80} 360 Z`} fill="#FFF6D8" opacity={time === "night" ? 0.08 : 0.05} />
        </g>
      ))}
      {/* backdrop screen with abstract graphics */}
      <rect x={200} y={300} width={680} height={430} rx={14} fill={L(C.ink)} />
      <rect x={220} y={320} width={640} height={390} rx={8} fill={brand} />
      <path d="M 220 620 Q 400 480 560 560 T 860 500 L 860 710 L 220 710 Z" fill={shade(brand, 0.25)} />
      <circle cx={700} cy={430} r={60} fill={L(C.yellow)} />
      <rect x={250} y={350} width={150} height={16} rx={8} fill={L(C.white)} opacity={0.8} />
      {/* on-air light */}
      <circle cx={880} cy={150} r={14} fill={live ? C.red : L(C.redDark)} />
      {/* news desk in the far distance */}
      <rect x={380} y={900} width={320} height={110} rx={10} fill={L(C.navy)} />
      <rect x={370} y={880} width={340} height={26} rx={8} fill={L(C.greyLight)} />
      <rect x={480} y={800} width={60} height={80} rx={12} fill={L(C.inkSoft)} />
      <circle cx={510} cy={786} r={22} fill={L("#F2C29E")} />
      <rect x={500} y={560} width={20} height={0} fill="none" />
      {camera(150, 1)}
      {camera(930, -1)}
    </g>
  );
}

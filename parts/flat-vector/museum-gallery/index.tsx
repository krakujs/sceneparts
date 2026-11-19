import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime } from "../backdrop/index";

// Museum gallery: framed abstract paintings, a pedestal with a vase, a bench, rope barriers at the sides and spotlights from the ceiling.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1260, wall = L(p.wall ?? "#F1ECE2"), accent = L(p.accent ?? C.teal);
  const frame = (x: number, y: number, w: number, h: number, i: number) => (
    <g key={i}>
      <rect x={x} y={y} width={w} height={h} fill={L(C.brownDark)} />
      <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} fill={L(["#F4E3C1", "#CFE6F5", "#F7D6CC"][i % 3])} />
      {i % 2 === 0
        ? <circle cx={x + w * 0.5} cy={y + h * 0.5} r={Math.min(w, h) * 0.22} fill={L(accent)} />
        : <path d={`M ${x + 40} ${y + h - 40} L ${x + w / 2} ${y + 50} L ${x + w - 40} ${y + h - 40} Z`} fill={L(C.orange)} />}
      <rect x={x + 30} y={y + h - 60} width={w - 60} height={14} fill={L(C.blue)} opacity={0.7} />
    </g>
  );
  const spot = (x: number, i: number) => (
    <g key={i}>
      <rect x={x - 26} y={0} width={52} height={22} rx={6} fill={L(C.inkSoft)} />
      <path d={`M ${x - 20} 22 L ${x + 20} 22 L ${x + 110} 700 L ${x - 110} 700 Z`} fill="#FFF6D8" opacity={time === "night" ? 0.1 : 0.07} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={wall} floor={L("#B98B5E")} floorY={floorY} floorKind="boards" panels={false} skirting={false} />
      {[0, 1, 2].map((i) => spot(180 + i * 360, i))}
      {frame(120, 260, 280, 260, 0)}
      {frame(480, 220, 200, 300, 1)}
      {frame(760, 260, 220, 240, 2)}
      {/* pedestal with a vase on the right */}
      <rect x={850} y={1080} width={160} height={180} fill={L(C.greyLight)} />
      <rect x={840} y={1060} width={180} height={24} fill={L(C.white)} />
      <path d={`M 905 1060 Q 860 1000 890 950 Q 925 920 960 950 Q 990 1000 955 1060 Z`} fill={L(C.teal)} />
      <rect x={920} y={930} width={20} height={20} fill={L(C.teal)} />
      <ellipse cx={930} cy={952} rx={12} ry={4} fill={shade(L(C.teal), 0.2)} />
      {/* bench on the left, clear of the stage */}
      <rect x={30} y={1190} width={230} height={24} rx={8} fill={L(C.brown)} />
      <rect x={50} y={1214} width={16} height={70} fill={L(C.brownDark)} />
      <rect x={224} y={1214} width={16} height={70} fill={L(C.brownDark)} />
      {/* rope barrier posts at the far corners */}
      {[40, 200].map((x, i) => <rect key={i} x={x} y={1330} width={12} height={230} fill={L(C.yellowDark)} />)}
      <path d={`M 46 1340 Q 120 ${1380 + (drift ? Math.sin(f / 40) * 2 : 0)} 206 1340`} stroke={L(C.red)} strokeWidth={8} fill="none" />
      {[860, 1020].map((x, i) => <rect key={i} x={x} y={1330} width={12} height={230} fill={L(C.yellowDark)} />)}
      <path d="M 866 1340 Q 940 1380 1026 1340" stroke={L(C.red)} strokeWidth={8} fill="none" />
    </g>
  );
}

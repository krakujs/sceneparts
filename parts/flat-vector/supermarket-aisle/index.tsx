import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, asTime, rnd } from "../backdrop/index";

// Supermarket aisle (flat-vector background): a long aisle in perspective with shelves of colourful packages
// on both sides, ceiling lights converging on a far point, and a shopping trolley at a corner. The stage stays clear.
const PACK = [C.red, C.yellow, C.blue, C.green, C.orange, C.purple, C.pink, C.teal, C.lime];
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none", seed = p.seed ?? 14;
  const L = (c: string) => lit(c, time, true);
  const vx = 540, vy = 720, floorY = 1320;
  const wall = L(p.wall ?? "#EEF2F7"), floor = L(p.floor ?? "#D6DCE6");
  const shelf = L(C.greyDark);
  const bank = (side: 0 | 1) => {
    const out: React.ReactNode[] = [];
    for (let row = 0; row < 5; row++) {
      const y = 360 + row * 180;
      out.push(<rect key={`s${row}`} x={side ? 880 : 0} y={y + 150} width={200} height={16} fill={shelf} />);
      for (let i = 0; i < 8; i++) {
        const ph = 40 + rnd(seed, side * 100 + row * 10 + i) * 36;
        const px = (side ? 880 : 6) + i * 24 + rnd(seed, side * 300 + row * 10 + i) * 2;
        const col = PACK[(row * 3 + i + side * 4) % PACK.length];
        out.push(<rect key={`p${row}-${i}`} x={f1(px)} y={f1(y + 150 - ph)} width={22} height={ph} rx={4} fill={L(col)} />);
      }
    }
    return out;
  };
  return (
    <g>
      {/* back wall and far end of the aisle */}
      <rect x={0} y={0} width={1080} height={1920} fill={wall} />
      <rect x={vx - 120} y={vy - 80} width={240} height={floorY - vy + 80} fill={shade(wall, 0.05)} />
      {/* ceiling lights converging on the vanishing point */}
      {[0, 1, 2, 3].map((i) => {
        const t = (i + 1) / 5;
        const yy = 40 + t * 200;
        return <rect key={i} x={vx - (240 * (1 - t) + 30 * t)} y={f1(yy - 6 * t)} width={f1(480 * (1 - t) + 60 * t)} height={f1(12 * (1 - t) + 4 * t)} rx={5} fill={time === "night" ? "#FFF6D8" : "#FFFFFF"} />;
      })}
      {/* side bank walls in perspective */}
      <path d={`M 0 0 L 300 ${vy - 120} L 300 ${floorY - 90} L 0 1920 Z`} fill={shade(wall, 0.06)} opacity={0.5} />
      <path d={`M 1080 0 L 780 ${vy - 120} L 780 ${floorY - 90} L 1080 1920 Z`} fill={shade(wall, 0.06)} opacity={0.5} />
      {bank(0)}
      {bank(1)}
      {/* floor with perspective tile lines */}
      <rect x={0} y={floorY} width={1080} height={600} fill={floor} />
      <rect x={0} y={floorY} width={1080} height={12} fill={shade(floor, 0.12)} />
      {[-3, -2, -1, 0, 1, 2, 3].map((k) => <line key={k} x1={vx + k * 60} y1={floorY} x2={vx + k * 260} y2={1920} stroke={shade(floor, 0.14)} strokeWidth={4} />)}
      {/* shopping trolley at the bottom-right corner */}
      <g transform={`translate(${880 + (drift ? Math.sin(f / 90) * 2 : 0)} 1530)`}>
        <path d="M 0 0 L 170 0 L 150 130 L 20 130 Z" fill="none" stroke={L(C.greyDark)} strokeWidth={14} strokeLinejoin="round" />
        <rect x={-10} y={-14} width={190} height={14} rx={6} fill={L(C.greyDark)} />
        <line x1={85} y1={130} x2={85} y2={170} stroke={L(C.greyDark)} strokeWidth={10} />
        {[30, 110].map((x) => <circle key={x} cx={x} cy={186} r={16} fill={L(C.ink)} />)}
        <rect x={30} y={40} width={40} height={60} rx={6} fill={L(C.red)} />
        <rect x={90} y={44} width={44} height={56} rx={6} fill={L(C.green)} />
      </g>
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

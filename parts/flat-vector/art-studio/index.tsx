import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Room, Window, lit, asTime, asWeather, rnd } from "../backdrop/index";

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

// Art studio background: a large Window (skylight style) at the back, two easels with canvases at the sides, a table
// with paint pots and a brushes jar, a shelf of tins and paint splatters on the floor. The stage stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360, paints = [C.red, C.yellow, C.blue, C.teal, C.pink, C.green, C.orange, C.purple];
  const splats = new Array(14).fill(0).map((_, i) => (
    <circle key={i} cx={f1(rnd(31, i) * 1060 + 10)} cy={f1(1420 + rnd(31, i + 40) * 380)} r={f1(8 + rnd(31, i + 80) * 14)} fill={L(paints[i % paints.length])} opacity={0.7} />
  ));
  const easel = (x: number, canvasCol: string, shape: number) => (
    <g>
      <path d={`M ${x + 100} 760 L ${x + 20} 1340 M ${x + 100} 760 L ${x + 180} 1340 M ${x + 100} 760 L ${x + 100} 1340`} stroke={L(C.brownDark)} strokeWidth={14} strokeLinecap="round" fill="none" />
      <rect x={x} y={690} width={200} height={170} rx={6} fill={L(C.brownDark)} />
      <rect x={x + 14} y={704} width={172} height={142} fill={L(canvasCol)} />
      {shape === 0 && <circle cx={x + 100} cy={775} r={44} fill={L(C.yellow)} />}
      {shape === 0 && <path d={`M ${x + 30} 830 L ${x + 100} 740 L ${x + 170} 830 Z`} fill={L(C.teal)} />}
      {shape === 1 && <path d={`M ${x + 30} 830 Q ${x + 100} 700 ${x + 170} 830 Z`} fill={L(C.pink)} />}
      {shape === 1 && <circle cx={x + 70} cy={760} r={16} fill={L(C.orange)} />}
      <rect x={x + 30} y={862} width={140} height={12} rx={4} fill={L(C.brown)} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#F4F1EA"} floor={p.floor ?? "#D9C29A"} floorY={floorY} floorKind="boards" panels={false} skirting={false} />
      {/* big window / skylight at the back */}
      <Window x={320} y={220} w={440} h={280} time={time} weather={weather} f={drift ? f : 0} frame={C.white} view="trees" />
      {/* a shelf of paint tins at the left back */}
      <rect x={20} y={620} width={170} height={12} fill={L(C.brownDark)} />
      {[0, 1, 2].map((i) => <rect key={i} x={36 + i * 52} y={560} width={38} height={60} rx={6} fill={L(paints[i + 2])} />)}
      {/* easels */}
      {easel(40, C.white, 0)}
      {easel(820, C.sand, 1)}
      {/* table with paint pots and a brushes jar, low right */}
      <rect x={560} y={1150} width={200} height={16} rx={4} fill={L(C.brown)} />
      <rect x={570} y={1166} width={12} height={170} fill={L(C.brownDark)} />
      <rect x={738} y={1166} width={12} height={170} fill={L(C.brownDark)} />
      {[[590, C.red], [630, C.blue], [670, C.yellow]].map(([x, c], i) => (
        <g key={i}>
          <rect x={x as number} y={1110} width={30} height={40} rx={4} fill={L(c as string)} />
          <rect x={(x as number) - 2} y={1104} width={34} height={8} rx={3} fill={L(C.greyDark)} />
        </g>
      ))}
      <rect x={700} y={1080} width={50} height={70} rx={6} fill={L("#CFE6F5")} opacity={0.8} />
      {[712, 724, 736].map((x, i) => <rect key={i} x={x - 4} y={1020 - i * 6} width={8} height={68} rx={3} fill={L(paints[(i + 2) % paints.length])} />)}
      {/* paint splatters on the floor */}
      {splats}
    </g>
  );
}

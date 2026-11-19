import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, Lamp, lit, asTime, asWeather } from "../backdrop/index";

// Open-plan office background (preset of flat-vector/backdrop): rows of desks with monitors at the back, glass
// partitions between the desk groups, plants at the corners, ceiling lights and a Window with a city view.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1270, deskC = L(p.desk ?? "#B08A63"), deskD = shade(deskC, 0.2), ink = L(C.ink);
  const glass = L(C.sky);
  const Desk = ({ x, base, w, far }: { x: number; base: number; w: number; far?: boolean }) => {
    const top = base - (far ? 150 : 130);
    const s = far ? 0.8 : 1;
    return (
      <g>
        <rect x={x + 8} y={top + 16} width={10} height={base - top - 16} fill={deskD} />
        <rect x={x + w - 18} y={top + 16} width={10} height={base - top - 16} fill={deskD} />
        <rect x={x} y={top} width={w} height={16} rx={4} fill={deskC} />
        <rect x={x + w * 0.5 - 40 * s} y={top - 60 * s} width={80 * s} height={46 * s} rx={4} fill={ink} />
        <rect x={x + w * 0.5 - 4 * s} y={top - 14 * s} width={8 * s} height={14 * s} fill={ink} />
        <rect x={x + w * 0.5 - 22 * s} y={top - 2} width={44 * s} height={6} rx={3} fill={shade(ink, -0.4)} />
      </g>
    );
  };
  const Plant = ({ x, base }: { x: number; base: number }) => (
    <g transform={`rotate(${drift ? Math.sin(f / 45 + x) * 2 : 0} ${x} ${base - 80})`}>
      <path d={`M ${x - 30} ${base - 80} L ${x - 22} ${base} L ${x + 22} ${base} L ${x + 30} ${base - 80} Z`} fill={L(C.orange)} />
      {[-40, -14, 14, 40].map((dx, i) => <ellipse key={i} cx={x + dx} cy={base - 150} rx={18} ry={62} fill={L(i % 2 ? C.green : C.greenDark)} transform={`rotate(${dx} ${x + dx} ${base - 80})`} />)}
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#E9EEF3"} floor="#B7C4D6" floorY={floorY} floorKind="carpet" panels={false} />
      <Window x={640} y={330} w={340} h={300} time={time} weather={weather} f={drift ? f : 0} view="city" />
      <Lamp x={300} y={200} on />
      <Lamp x={780} y={200} on />
      {/* back row of desks, further away */}
      {[70, 400, 730].map((x, i) => <Desk key={`fa${i}`} x={x} base={floorY + 4} w={220} far />)}
      {/* glass partitions between the desk groups */}
      {[[270, 330], [608, 332]].map(([x, w], i) => (
        <g key={`gl${i}`}>
          <rect x={x} y={580} width={w} height={floorY - 580 + 16} fill={glass} opacity={0.42} />
          <rect x={x - 6} y={570} width={8} height={floorY - 570 + 16} fill={L(C.greyDark)} />
          <rect x={x + w - 2} y={570} width={8} height={floorY - 570 + 16} fill={L(C.greyDark)} />
          <rect x={x - 6} y={570} width={w + 14} height={10} fill={L(C.greyDark)} />
        </g>
      ))}
      {/* front row of desks, nearer, lower on the floor */}
      {[40, 380, 720].map((x, i) => <Desk key={`fb${i}`} x={x} base={floorY + 26} w={250} />)}
      {/* plants at the corners */}
      <Plant x={60} base={floorY + 150} />
      <Plant x={1020} base={floorY + 100} />
      <rect x={0} y={floorY - 18} width={1080} height={22} fill={shade(L(C.greyLight), 0.1)} opacity={0.6} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { WeatherFx, skyColours, lit, asTime, asWeather } from "../backdrop/index";

// Airport gate (flat-vector background): a big glass wall with a plane parked outside on the apron,
// rows of seats, a gate desk at the side and a departure screen with abstract lines. The stage stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const wall = L(p.wall ?? "#E6EBF2"), carpet = L(p.carpet ?? C.blue);
  const [top, , hz] = skyColours(time, weather);
  const gx = 60, gy = 90, gw = 960, gh = 880;
  const planeX = 360 + (drift ? Math.sin(f / 160) * 6 : 0);
  return (
    <g>
      {/* back wall */}
      <rect x={0} y={0} width={1080} height={1920} fill={wall} />
      {/* big glass wall: outside sky, apron and a plane */}
      <rect x={gx - 16} y={gy - 16} width={gw + 32} height={gh + 32} fill={shade(wall, 0.18)} />
      <rect x={gx} y={gy} width={gw} height={gh} fill={hz} />
      <rect x={gx} y={gy} width={gw} height={gh * 0.6} fill={top} />
      <rect x={gx} y={gy + gh * 0.62} width={gw} height={gh * 0.38} fill={lit("#B9C3D0", time)} />
      <rect x={gx} y={gy + gh * 0.72} width={gw} height={8} fill={lit(C.yellow, time)} />
      {/* plane outside, side view */}
      <g transform={`translate(${planeX} 430)`}>
        <path d="M 0 60 Q 0 0 110 0 L 430 0 Q 470 0 470 40 Q 460 70 420 70 L 60 70 Q 0 70 0 60 Z" fill={lit("#FFFFFF", time)} />
        <rect x={0} y={44} width={470} height={12} fill={lit(C.blue, time)} />
        <path d="M 180 0 L 300 -110 L 360 -110 L 330 0 Z" fill={lit("#FFFFFF", time)} />
        <path d="M 40 40 L 0 -40 L 40 -40 L 110 40 Z" fill={lit(shade("#FFFFFF", 0.1), time)} />
        {[120, 220, 320].map((x) => <rect key={x} x={x} y={14} width={50} height={22} rx={6} fill={lit(C.navy, time)} opacity={0.7} />)}
        <circle cx={150} cy={108} r={34} fill={lit(C.ink, time)} />
        <circle cx={330} cy={108} r={34} fill={lit(C.ink, time)} />
      </g>
      {/* glass pane mullions */}
      {[1, 2, 3, 4, 5].map((i) => <rect key={i} x={gx + i * (gw / 6) - 5} y={gy} width={10} height={gh} fill={shade(wall, 0.22)} />)}
      <rect x={gx} y={gy + gh * 0.4} width={gw} height={8} fill={shade(wall, 0.22)} />
      <WeatherFx kind={weather} f={f} seed={7} x={gx} y={gy} w={gw} h={gh} intensity={1.2} />
      {/* ceiling light strip */}
      <rect x={0} y={20} width={1080} height={14} rx={7} fill={time === "night" ? "#FFF6D8" : "#FFFFFF"} />
      {/* departure screen with abstract lines, on the wall above the seats */}
      <rect x={300} y={1000} width={480} height={150} rx={12} fill={C.ink} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={330} y={1028 + i * 30} width={90} height={12} rx={6} fill={C.yellow} opacity={0.8} />
          <rect x={440} y={1028 + i * 30} width={220} height={12} rx={6} fill={C.white} opacity={0.4} />
          <rect x={690} y={1028 + i * 30} width={60} height={12} rx={6} fill={(Math.floor(f / 20) + i) % 2 ? C.green : C.red} />
        </g>
      ))}
      {/* row of seats along the back, left of the desk */}
      <g>
        <rect x={20} y={1200} width={560} height={40} rx={12} fill={L(C.greyDark)} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={36 + i * 110} y={1240} width={90} height={60} rx={14} fill={L(C.teal)} />
            <rect x={36 + i * 110} y={1150} width={90} height={60} rx={14} fill={L(C.tealDark)} />
          </g>
        ))}
      </g>
      {/* gate desk at the right */}
      <rect x={860} y={1240} width={210} height={100} rx={10} fill={L(C.brown)} />
      <rect x={860} y={1230} width={210} height={16} rx={6} fill={L(C.brownDark)} />
      <rect x={900} y={1160} width={130} height={70} rx={8} fill={L(C.greyDark)} />
      <rect x={912} y={1172} width={106} height={46} rx={4} fill={time === "night" ? "#7CD0FF" : L("#CFE6F5")} />
      {/* floor */}
      <rect x={0} y={1340} width={1080} height={580} fill={carpet} />
      <rect x={0} y={1340} width={1080} height={12} fill={shade(carpet, 0.2)} />
      {new Array(10).fill(0).map((_, i) => <rect key={i} x={0} y={1400 + i * 60} width={1080} height={3} fill={shade(carpet, 0.1)} />)}
      <rect x={0} y={1340} width={1080} height={1920 - 1340} fill="none" />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, TreeLine, Ground, WeatherFx, lit, asTime, asWeather } from "../backdrop/index";

// Ancient temple: open-air stone columns, a stepped platform, creeping vines, simple statues and light beams through the roof. Generic, no real site.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time);
  const stone = L(p.stone ?? "#E3D5B8"), leaf = L(C.green), groundY = 1280;
  const column = (x: number, h: number, i: number) => (
    <g key={i}>
      <rect x={x - 46} y={groundY - h} width={92} height={h} fill={stone} />
      <rect x={x - 62} y={groundY - h - 20} width={124} height={22} rx={4} fill={shade(stone, 0.1)} />
      <rect x={x + 22} y={groundY - h} width={24} height={h} fill={shade(stone, 0.12)} />
      {/* vine climbing the column */}
      <path d={`M ${x - 40} ${groundY} Q ${x - 60 + (drift ? Math.sin(f / 30 + i) * 6 : 0)} ${groundY - h / 2} ${x - 30} ${groundY - h}`} stroke={leaf} strokeWidth={12} fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((k) => <ellipse key={k} cx={x - 48 + k * 10} cy={groundY - 120 - k * 180} rx={16} ry={9} fill={L(C.greenDark)} transform={`rotate(-30 ${x - 48} ${groundY - 120})`} />)}
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={820} f={drift ? f : 0} sun clouds={2} />
      <TreeLine y={960} color={L(C.greenDark)} seed={5} size={0.9} kind="mixed" f={drift ? f : 0} />
      {/* light beams from the roof openings */}
      {[260, 800].map((x, i) => <path key={i} d={`M ${x - 40} 0 L ${x + 40} 0 L ${x + 160} ${groundY} L ${x - 160} ${groundY} Z`} fill="#FFF6D8" opacity={time === "night" ? 0.05 : 0.12} />)}
      {/* back row of columns */}
      {[120, 330, 750, 960].map((x, i) => column(x, 620, i))}
      {/* statues on pedestals between the columns */}
      {[220, 860].map((x, i) => (
        <g key={i}>
          <rect x={x - 40} y={groundY - 170} width={80} height={170} fill={shade(stone, 0.06)} />
          <circle cx={x} cy={groundY - 200} r={30} fill={shade(stone, 0.06)} />
          <path d={`M ${x - 46} ${groundY - 180} Q ${x} ${groundY - 150} ${x + 46} ${groundY - 180} L ${x + 30} ${groundY - 60} L ${x - 30} ${groundY - 60} Z`} fill={shade(stone, 0.06)} />
        </g>
      ))}
      {/* stepped platform and floor */}
      <rect x={180} y={1160} width={720} height={40} fill={stone} />
      <rect x={140} y={1200} width={800} height={40} fill={shade(stone, 0.06)} />
      <Ground y={groundY} kind="grass" time={time} f={drift ? f : 0} />
      <rect x={0} y={groundY} width={1080} height={10} fill={shade(stone, 0.2)} />
      <WeatherFx kind={weather} f={drift ? f : 0} />
    </g>
  );
}

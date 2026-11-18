import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, SKIN } from "../style/index";
import { Sky, lit, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Stadium crowd: tiered stands full of small fans in two team colours, floodlight towers and the edge of a pitch.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const teamA = p.teamA ?? C.blue, teamB = p.teamB ?? C.red;
  const pitchY = 1260;
  const tiers = [0, 1, 2, 3, 4];
  return (
    <g>
      <Sky time={time} weather={weather} horizon={700} f={drift ? f : 0} sun={false} clouds={2} />
      {/* floodlight towers */}
      {[120, 960].map((x, i) => (
        <g key={i}>
          <rect x={x - 10} y={120} width={20} height={520} fill={lit(C.greyDark, time)} />
          <rect x={x - 70} y={100} width={140} height={44} rx={8} fill={lit(C.inkSoft, time)} />
          {new Array(6).fill(0).map((_, j) => <circle key={j} cx={x - 55 + j * 22} cy={122} r={8} fill={time === "day" ? "#FFF6D8" : C.yellow} opacity={time === "day" ? 0.5 : 0.9} />)}
        </g>
      ))}
      {/* stands: tiers of seats, each row of tiny fans */}
      {tiers.map((t) => {
        const y = 560 + t * 130, rowH = 110;
        return (
          <g key={t}>
            <path d={`M 0 ${y + rowH} L 1080 ${y + rowH} L 1080 ${y + rowH + 40} L 0 ${y + rowH + 40} Z`} fill={lit(shade(C.greyDark, t * 0.05), time)} />
            {new Array(18).fill(0).map((_, i) => {
              const x = 30 + i * 60 + (t % 2) * 30;
              const col = (i + t) % 2 ? teamA : teamB;
              const jump = drift ? Math.sin(f / 10 + i + t * 3) * (rnd(5, i + t * 9) > 0.8 ? 4 : 0) : 0;
              return (
                <g key={i} transform={`translate(0 ${jump})`}>
                  <rect x={x - 16} y={y + 30} width={32} height={rowH - 30} rx={12} fill={lit(col, time)} />
                  <circle cx={x} cy={y + 18} r={13} fill={SKIN[(["light", "tan", "brown"] as const)[(i + t) % 3]]} />
                </g>
              );
            })}
          </g>
        );
      })}
      {/* pitch edge with the white line */}
      <rect x={0} y={pitchY} width={1080} height={1920 - pitchY} fill={lit("#5DB35E", time)} />
      <rect x={0} y={pitchY} width={1080} height={10} fill={lit("#FFFFFF", time)} />
      <rect x={0} y={pitchY + 220} width={1080} height={8} fill={lit("#FFFFFF", time)} opacity={0.8} />
      <WeatherFx kind={weather} f={f} />
    </g>
  );
}

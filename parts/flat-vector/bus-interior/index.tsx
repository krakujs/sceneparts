import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { skyColours, lit, asTime, asWeather, mix, rnd, WeatherFx } from "../backdrop/index";

// Bus interior (flat-vector background): long glass strip along the top with scenery moving past, seats
// along the sides, grab poles and handles, and a stop-button strip. The stage in the middle stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const [top, , hz] = skyColours(time, weather);
  const seat = L(p.seat ?? C.orange), wall = L(p.wall ?? "#E7EDF5");
  const scroll = drift ? (f * 9) % 1080 : 0;
  const floorY = 1380;
  return (
    <g>
      {/* roof band and ceiling */}
      <rect x={0} y={0} width={1080} height={1920} fill={wall} />
      <rect x={0} y={0} width={1080} height={170} fill={L(C.greyDark)} />
      <rect x={0} y={170} width={1080} height={16} fill={shade(L(C.greyDark), 0.2)} />
      {/* long glass strip showing moving scenery */}
      <rect x={30} y={230} width={1020} height={300} fill={hz} />
      <rect x={30} y={230} width={1020} height={150} fill={top} />
      <clipPath id="bus-glass-strip"><rect x={30} y={230} width={1020} height={300} /></clipPath>
      <g clipPath="url(#bus-glass-strip)">
        {[-1, 0, 1].map((k) => (
          <g key={k} transform={`translate(${k * 1080 - scroll} 0)`}>
            {[[40, 170, 110], [240, 120, 130], [470, 200, 90], [640, 140, 120], [860, 180, 110]].map(([x, h, w], i) => (
              <rect key={i} x={30 + (x as number)} y={530 - (h as number)} width={w as number} height={h as number} fill={L(mix("#8A97B8", "#DCEFF9", 0.15 + (i % 3) * 0.1))} />
            ))}
          </g>
        ))}
      </g>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={30 + i * 204 - 6} y={230} width={12} height={300} fill={L(C.greyDark)} />)}
      <WeatherFx kind={weather} f={f} seed={8} x={30} y={230} w={1020} h={300} />
      {/* stop-button strip above the glass */}
      <rect x={30} y={556} width={1020} height={22} rx={11} fill={L(C.greyLight)} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <circle key={i} cx={90 + i * 130} cy={567} r={7} fill={(Math.floor(f / 12) + i) % 4 === 0 ? C.red : L(C.redDark)} />)}
      {/* grab poles running from ceiling to floor */}
      {[260, 820].map((x) => (
        <g key={x}>
          <rect x={x - 9} y={190} width={18} height={floorY - 190} fill={L(C.greyDark)} />
          <rect x={x - 12} y={580} width={24} height={60} rx={8} fill={L(C.yellow)} />
        </g>
      ))}
      {/* side seat rows at the far back */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={20} y={960} width={190} height={140} rx={26} fill={seat} />
          <rect x={20} y={1060} width={190} height={60} rx={18} fill={shade(seat, 0.2)} />
          <rect x={870} y={960} width={190} height={140} rx={26} fill={seat} />
          <rect x={870} y={1060} width={190} height={60} rx={18} fill={shade(seat, 0.2)} />
        </g>
      ))}
      {/* handrail hanging from ceiling, horizontal */}
      <rect x={0} y={760} width={1080} height={12} fill={L(C.greyDark)} />
      {/* floor */}
      <rect x={0} y={floorY} width={1080} height={540} fill={L("#7D8799")} />
      <rect x={0} y={floorY} width={1080} height={14} fill={shade(L("#7D8799"), 0.2)} />
      {new Array(5).fill(0).map((_, i) => <rect key={i} x={0} y={floorY + 80 + i * 80} width={1080} height={4} fill={shade(L("#7D8799"), 0.12)} />)}
      {new Array(6).fill(0).map((_, i) => <circle key={i} cx={f1(rnd(21, i) * 1080)} cy={f1(floorY + 30 + rnd(21, i + 9) * 60)} r={3} fill={L(C.yellow)} opacity={0.7} />)}
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

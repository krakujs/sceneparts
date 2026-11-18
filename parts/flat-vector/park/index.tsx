import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, TreeLine, Ground, WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Park: lawn, a winding path, a bench, a lamp post, round trees, bushes and a distant pond with a fountain.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const lamp = time === "dusk" || time === "night";
  const round = (x: number, y: number, r: number, k: string) => <g key={k}><circle cx={x} cy={y} r={r} fill={L(C.greenDark)} /><circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.6} fill={L(C.green)} /></g>;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1160} f={t} seed={61} />
      <TreeLine y={1200} color={L(C.green)} seed={61} size={1.1} kind="round" f={t} />
      <Ground y={1240} color={L(C.green)} kind="grass" time={time} f={t} />
      {/* distant pond */}
      <ellipse cx={540} cy={1232} rx={170} ry={34} fill={L("#4E9ED8")} />
      <ellipse cx={520} cy={1226} rx={90} ry={10} fill="#FFFFFF" opacity={0.4} />
      {p.fountain !== false && (
        <g>
          <rect x={537} y={1170} width={6} height={60} fill="#FFFFFF" opacity={0.6} />
          {Array.from({ length: 7 }, (_, i) => {
            const k = (i + t / 14) % 7;
            return <circle key={i} cx={(540 + Math.sin(i * 2.1 + t / 9) * 30 * (k / 7)).toFixed(1)} cy={(1170 - k * 14).toFixed(1)} r={4} fill="#FFFFFF" opacity={0.8} />;
          })}
        </g>
      )}
      {/* path across the lawn */}
      <path d="M 450 1240 L 630 1240 Q 720 1560 800 1920 L 280 1920 Q 360 1560 450 1240 Z" fill={L("#DDE2EA")} />
      {/* big round trees at the corners */}
      <rect x={50} y={880} width={26} height={400} fill={L(C.brownDark)} />
      <rect x={1000} y={900} width={26} height={380} fill={L(C.brownDark)} />
      {round(63, 800, 120, "t1")}
      {round(40, 740, 80, "t2")}
      {round(1012, 820, 130, "t3")}
      {/* bushes along the lawn edges */}
      {round(70, 1290, 44, "b1")}
      {round(170, 1300, 36, "b2")}
      {round(930, 1296, 42, "b3")}
      {round(1030, 1310, 36, "b4")}
      {/* bench at the right */}
      <rect x={880} y={1360} width={160} height={12} rx={4} fill={L(C.brown)} />
      <rect x={880} y={1400} width={160} height={18} rx={4} fill={L(C.brown)} />
      <rect x={892} y={1418} width={12} height={40} fill={L(C.brownDark)} />
      <rect x={1016} y={1418} width={12} height={40} fill={L(C.brownDark)} />
      {/* lamp post at the left */}
      <rect x={150} y={1100} width={10} height={290} fill={L(C.greyDark)} />
      <rect x={133} y={1082} width={44} height={22} rx={6} fill={lamp ? "#FFF3C4" : L(C.greyDark)} />
      {lamp && <circle cx={155} cy={1120} r={64} fill="#FFE9A8" opacity={0.3} />}
      <ellipse cx={155} cy={1392} rx={22} ry={7} fill={L(C.greyDark)} />
      <WeatherFx kind={weather} f={t} seed={61} />
    </g>
  );
}

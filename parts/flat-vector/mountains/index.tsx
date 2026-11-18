import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Mountains, TreeLine, Ground, WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Mountains: layered ranges with snow caps, a pine tree line and an alpine meadow in the foreground.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const snow = p.snowCaps !== false;
  const meadow = L("#8CC66E");
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1040} f={t} seed={21} />
      <Mountains y={1060} color={L("#8E9BC0")} h={520} seed={21} snow={snow} peaks={5} />
      <Mountains y={1150} color={L("#5E6A8E")} h={300} seed={33} snow={snow} peaks={6} />
      <TreeLine y={1262} color={L(C.greenDark)} seed={3} size={0.7} kind="pine" f={t} />
      <Ground y={1270} color={meadow} kind="grass" time={time} f={t} />
      {/* alpine flowers and rocks in the meadow, kept to the sides */}
      {Array.from({ length: 14 }, (_, i) => {
        const x = i < 7 ? 20 + rnd(51, i) * 180 : 880 + rnd(51, i) * 180;
        const y = 1420 + rnd(52, i) * 380;
        return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={6 + rnd(51, i + 9) * 4} fill={L(i % 3 === 0 ? C.pink : i % 3 === 1 ? C.yellow : C.white)} />;
      })}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => <circle key={`d${i}`} cx={(i * 97 + 20) % 1080} cy={1300 + rnd(53, i) * 30} r={8} fill={L(C.purple)} opacity={0.7} />)}
      <ellipse cx={70} cy={1600} rx={70} ry={36} fill={L(C.grey)} />
      <ellipse cx={1010} cy={1580} rx={80} ry={40} fill={L(C.grey)} />
      <WeatherFx kind={weather} f={t} seed={21} />
    </g>
  );
}

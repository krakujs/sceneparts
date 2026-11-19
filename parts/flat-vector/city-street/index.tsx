import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Skyline, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// City street: tall buildings behind, a row of shopfronts with striped awnings, sidewalk, kerb and road.
// Street lamps and a traffic light frame the sides; the stage in the middle stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 41, glow = time === "dusk" || time === "night";
  const awn = lit(p.awning ?? C.red, time);
  const wall = lit("#E9E2D4", time), concrete = lit("#C9CED8", time), road = lit("#5D6578", time);
  const shops = [
    { x: -10, w: 290, col: "#F3E3C7" }, { x: 280, w: 270, col: "#CFE6F5" }, { x: 550, w: 280, col: "#F9D9C4" }, { x: 830, w: 260, col: "#E4E9F2" },
  ];
  const lamp = (x: number, flip = false) => (
    <g>
      <rect x={x - 7} y={900} width={14} height={520} fill={C.greyDark} />
      <path d={`M ${x} 920 Q ${x + (flip ? -40 : 40)} 880 ${x + (flip ? -70 : 70)} 905`} fill="none" stroke={C.greyDark} strokeWidth={10} />
      <rect x={x + (flip ? -95 : 50)} y={895} width={40} height={16} rx={7} fill={C.greyDark} />
      {glow && <ellipse cx={x + (flip ? -75 : 70)} cy={1000} rx={110} ry={90} fill="#FFE9A8" opacity={0.22} />}
      <circle cx={x + (flip ? -75 : 70)} cy={910} r={10} fill={glow ? "#FFF3C4" : C.greyLight} />
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={900} f={ff} seed={seed} sun={false} />
      <Skyline y={1100} color={lit("#8C9AB8", time)} seed={seed} minH={380} maxH={800} lit={glow} />
      {/* shopfronts with awnings */}
      {shops.map((s, i) => {
        const c = lit(s.col, time, true), stripes = 6, sw = s.w / stripes;
        return (
          <g key={i}>
            <rect x={s.x} y={1110} width={s.w} height={190} fill={c} />
            <rect x={s.x} y={1110} width={s.w} height={16} fill={shade(c, 0.15)} />
            <rect x={s.x + 24} y={1190} width={s.w - 48} height={80} rx={6} fill={lit("#3A4157", time)} opacity={0.85} />
            <rect x={s.x + 24} y={1190} width={s.w - 48} height={10} fill={shade(c, 0.2)} />
            {glow && <rect x={s.x + 24} y={1200} width={s.w - 48} height={70} rx={6} fill="#FFD66B" opacity={0.3} />}
            <rect x={s.x + s.w - 70} y={1200} width={40} height={100} fill={shade(c, 0.22)} />
            {new Array(stripes).fill(0).map((_, k) => <rect key={k} x={s.x + k * sw} y={1140} width={sw} height={52} fill={k % 2 ? awn : C.white} />)}
            {new Array(stripes).fill(0).map((_, k) => <circle key={k} cx={s.x + k * sw + sw / 2} cy={1192} r={sw / 2} fill={k % 2 ? awn : C.white} />)}
          </g>
        );
      })}
      {/* sidewalk, kerb and road */}
      <rect x={0} y={1300} width={1080} height={120} fill={concrete} />
      {new Array(9).fill(0).map((_, i) => <rect key={i} x={i * 130 + 60} y={1300} width={4} height={120} fill={shade(concrete, 0.15)} />)}
      <rect x={0} y={1420} width={1080} height={16} fill={lit("#F2F5FA", time)} />
      <rect x={0} y={1436} width={1080} height={484} fill={road} />
      {new Array(7).fill(0).map((_, i) => <rect key={i} x={((i * 220 - ff * 6) % 1320 + 1320) % 1320 - 120} y={1790} width={120} height={14} rx={7} fill={lit("#F4F1EA", time)} />)}
      {/* lamps and traffic light */}
      {lamp(120)}
      {lamp(960, true)}
      <rect x={958} y={1060} width={10} height={240} fill={C.greyDark} />
      <rect x={918} y={1040} width={70} height={130} rx={12} fill={lit("#3A4157", time)} />
      {p.trafficLight !== false && (
        <g>
          <circle cx={953} cy={1066} r={13} fill={Math.floor(ff / 60) % 3 === 0 ? C.red : "#6B2B26"} />
          <circle cx={953} cy={1103} r={13} fill={Math.floor(ff / 60) % 3 === 1 ? C.yellow : "#6B5520"} />
          <circle cx={953} cy={1140} r={13} fill={Math.floor(ff / 60) % 3 === 2 ? C.green : "#2A5E38"} />
        </g>
      )}
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

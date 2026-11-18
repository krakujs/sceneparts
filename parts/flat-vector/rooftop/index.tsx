import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Skyline, lit, mix, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Rooftop: a flat roof with a low parapet along the back edge, a wooden water tank on legs, vents, a roof
// hatch and an antenna, with a city skyline beyond. The roof floor in front stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 85, glow = time === "dusk" || time === "night";
  const tank = lit(p.tank ?? "#8A5A3C", time), roofCol = lit("#8E96A6", time);
  const parapet = 1300;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1100} f={ff} seed={seed} />
      <Skyline y={1290} color={lit("#7F8DB0", time)} seed={seed} minH={200} maxH={560} lit={glow} />
      {/* roof floor */}
      <rect x={0} y={parapet + 60} width={1080} height={620} fill={roofCol} />
      {new Array(7).fill(0).map((_, i) => <rect key={i} x={0} y={parapet + 60 + i * 80} width={1080} height={3} fill={shade(roofCol, 0.12)} />)}
      {new Array(12).fill(0).map((_, i) => <rect key={i} x={i * 100 - (i % 2) * 50} y={parapet + 60} width={3} height={620} fill={shade(roofCol, 0.1)} opacity={0.6} />)}
      {/* parapet wall with coping */}
      <rect x={0} y={parapet} width={1080} height={62} fill={lit("#D9DEE8", time)} />
      <rect x={0} y={parapet} width={1080} height={12} fill={lit("#F4F1EA", time)} />
      {new Array(12).fill(0).map((_, i) => <rect key={i} x={i * 100 + 40} y={parapet + 26} width={20} height={36} fill={shade(lit("#D9DEE8", time), 0.12)} />)}
      {/* water tank on legs, right back */}
      <g>
        {[930, 1010].map((x, i) => <rect key={i} x={x} y={1140} width={10} height={parapet - 1140 + 62} fill={C.greyDark} />)}
        <rect x={905} y={1210} width={150} height={12} fill={C.greyDark} />
        <rect x={912} y={1020} width={136} height={200} rx={18} fill={tank} />
        {[1050, 1100, 1150, 1200].map((y, i) => <rect key={i} x={912} y={y} width={136} height={8} fill={shade(tank, 0.25)} />)}
        <path d="M 900 1030 L 980 950 L 1060 1030 Z" fill={shade(tank, 0.15)} />
      </g>
      {/* vents and roof hatch, left back */}
      <g>
        <rect x={40} y={1190} width={120} height={110} fill={lit("#BFC6D4", time)} />
        <rect x={40} y={1190} width={120} height={14} fill={shade(lit("#BFC6D4", time), 0.12)} />
        <rect x={60} y={1220} width={80} height={6} fill={shade(lit("#BFC6D4", time), 0.25)} />
        <rect x={60} y={1240} width={80} height={6} fill={shade(lit("#BFC6D4", time), 0.25)} />
        <rect x={190} y={1230} width={60} height={70} fill={lit("#BFC6D4", time)} />
        <path d="M 186 1230 L 220 1200 L 254 1230 Z" fill={shade(lit("#BFC6D4", time), 0.12)} />
      </g>
      {/* roof hatch, front-right corner away from the stage */}
      <g>
        <rect x={880} y={1520} width={180} height={150} fill={lit("#A7AFBE", time)} />
        <rect x={880} y={1520} width={180} height={18} fill={shade(lit("#A7AFBE", time), 0.12)} />
        <rect x={930} y={1560} width={80} height={110} rx={4} fill={lit(C.blueDark, time)} />
        <circle cx={1000} cy={1616} r={5} fill={C.yellow} />
      </g>
      {/* antenna with a blinking light */}
      {p.antenna !== false && (
        <g>
          <rect x={148} y={900} width={6} height={290} fill={C.greyDark} />
          <line x1={120} y1={940} x2={182} y2={940} stroke={C.greyDark} strokeWidth={6} />
          <line x1={128} y1={1000} x2={174} y2={1000} stroke={C.greyDark} strokeWidth={5} />
          <circle cx={151} cy={890} r={9} fill={Math.sin(ff / 10) > 0 ? C.red : "#6B2B26"} />
        </g>
      )}
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

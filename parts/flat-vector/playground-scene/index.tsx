import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, TreeLine, Ground, WeatherFx, lit, asTime, asWeather } from "../backdrop/index";

// Playground: swings at the back left, a climbing frame at the front left, a slide at the right and a
// sandpit at the front right, soft grass and round trees behind. The centre of the ground stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 74;
  const slide = lit(p.slide ?? "#F27BA6", time);
  const red = lit(C.red, time), blue = lit(C.blue, time), yellow = lit(C.yellow, time), green = lit(C.green, time);
  const swing = (x: number, i: number) => {
    const sw = Math.sin(ff / 30 + i) * 8;
    return (
      <g transform={`rotate(${f1(sw)} ${x} 1060)`}>
        <line x1={x - 60} y1={1060} x2={x - 60} y2={1210} stroke={C.greyDark} strokeWidth={4} />
        <line x1={x + 60} y1={1060} x2={x + 60} y2={1210} stroke={C.greyDark} strokeWidth={4} />
        <rect x={x - 34} y={1200} width={68} height={14} rx={6} fill={yellow} />
      </g>
    );
  };
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={ff} seed={seed} />
      <TreeLine y={1180} color={lit(C.green, time)} seed={seed} size={1.1} kind="round" f={ff} />
      <Ground y={1230} kind="grass" time={time} f={ff} />
      {/* swing set, back left */}
      {p.swings !== false && (
        <g>
          <line x1={20} y1={1060} x2={260} y2={1060} stroke={red} strokeWidth={14} strokeLinecap="round" />
          <line x1={40} y1={1060} x2={20} y2={1260} stroke={red} strokeWidth={10} />
          <line x1={240} y1={1060} x2={260} y2={1260} stroke={red} strokeWidth={10} />
          {swing(100, 0)}
          {swing(200, 1)}
        </g>
      )}
      {/* climbing frame, front left */}
      <g>
        {[[30, 1380], [170, 1380], [30, 1560], [170, 1560]].map(([x, y], i) => <rect key={i} x={x} y={y} width={12} height={150} fill={blue} />)}
        {[1400, 1480, 1560].map((y, i) => <rect key={i} x={30} y={y} width={152} height={10} fill={green} />)}
        <path d="M 16 1380 Q 100 1310 186 1380 Z" fill={red} />
        <rect x={16} y={1380} width={172} height={10} fill={shade(red, 0.2)} />
        <rect x={60} y={1440} width={60} height={12} rx={6} fill={yellow} />
      </g>
      {/* slide, right side */}
      <g>
        <rect x={880} y={1300} width={160} height={16} fill={yellow} />
        <rect x={1000} y={1200} width={16} height={116} fill={blue} />
        <rect x={880} y={1200} width={160} height={16} rx={6} fill={red} />
        <path d="M 884 1316 L 960 1316 L 1000 1450 L 1010 1560 L 990 1560 L 972 1456 L 884 1340 Z" fill={slide} />
        <path d="M 884 1340 L 972 1456" stroke={shade(slide, 0.2)} strokeWidth={4} fill="none" />
        <rect x={860} y={1300} width={24} height={180} fill={blue} />
      </g>
      {/* sandpit, front right */}
      <g>
        <ellipse cx={980} cy={1640} rx={110} ry={44} fill={shade(lit("#E9D3A9", time), 0.08)} />
        <ellipse cx={980} cy={1628} rx={92} ry={30} fill={lit("#EED9A8", time)} />
        <rect x={870} y={1640} width={220} height={12} rx={6} fill={red} opacity={0.9} />
        <circle cx={952} cy={1624} r={6} fill={lit(C.teal, time)} />
      </g>
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

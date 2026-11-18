import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, WeatherFx, lit, asTime, asWeather, mix, rnd } from "../backdrop/index";

// Ship deck (flat-vector background): wooden deck boards in perspective, a railing with posts, a lifebuoy,
// a funnel and mast, and the sea with waves and a horizon beyond. The stage on the deck stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time);
  const horizon = 1000;
  const sea = L(p.sea ?? "#3D8FD6"), seaDark = L(shade(p.sea ?? "#3D8FD6", 0.2));
  const wood = L(p.deck ?? "#B5814F"), woodDark = shade(wood, 0.22);
  const deckY = 1240;
  const bob = drift ? Math.sin(f / 40) * 6 : 0;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={horizon} f={drift ? f : 0} seed={5} sun={true} />
      {/* sea with waves */}
      <rect x={0} y={horizon} width={1080} height={deckY - horizon + 40} fill={sea} />
      <rect x={0} y={horizon} width={1080} height={10} fill={seaDark} />
      {new Array(9).fill(0).map((_, i) => {
        const y = horizon + 40 + i * 24;
        const x = ((i * 137 + f * (drift ? 2 + i * 0.3 : 0)) % 1200) - 80;
        return <path key={i} d={`M ${f1(x)} ${f1(y)} Q ${f1(x + 40)} ${f1(y - 10)} ${f1(x + 80)} ${f1(y)}`} stroke={mix(sea, "#FFFFFF", 0.35)} strokeWidth={6} fill="none" strokeLinecap="round" />;
      })}
      {/* hull line and distant island */}
      <path d={`M 90 ${horizon + 6} Q 160 ${horizon - 40} 260 ${horizon - 30} Q 310 ${horizon - 16} 330 ${horizon + 6} Z`} fill={L(C.greenDark)} />
      {/* funnel and mast, right side */}
      <rect x={800} y={380} width={20} height={560} fill={L(C.greyDark)} />
      <rect x={740} y={170} width={10} height={210} fill={L(C.greyDark)} />
      <path d="M 740 180 L 900 260 L 740 300 Z" fill={L(C.white)} opacity={0.9} />
      <rect x={838} y={520} width={110} height={300} rx={18} fill={L(C.red)} transform={`translate(0 ${bob * 0.3})`} />
      <rect x={838} y={520} width={110} height={34} rx={14} fill={L(C.yellow)} />
      <rect x={834} y={820} width={118} height={20} rx={6} fill={L(C.ink)} />
      {/* deck boards in perspective */}
      <rect x={0} y={deckY} width={1080} height={1920 - deckY} fill={wood} />
      {new Array(7).fill(0).map((_, i) => <rect key={i} x={0} y={deckY + 40 + i * i * 14} width={1080} height={4} fill={woodDark} />)}
      {new Array(12).fill(0).map((_, i) => <rect key={i} x={i * 96 + (i % 2) * 40} y={deckY} width={4} height={1920 - deckY} fill={woodDark} opacity={0.6} />)}
      <rect x={0} y={deckY} width={1080} height={14} fill={shade(wood, 0.3)} />
      {/* railing along the back of the deck */}
      <rect x={0} y={1080} width={1080} height={14} rx={7} fill={L(C.greyDark)} />
      <rect x={0} y={1140} width={1080} height={10} rx={5} fill={L(C.greyDark)} />
      {new Array(10).fill(0).map((_, i) => <rect key={i} x={i * 116 + 30} y={1080} width={12} height={160} fill={L(C.greyDark)} />)}
      {/* lifebuoy on the railing, left side */}
      <g transform="translate(150 1200)">
        <circle cx={0} cy={0} r={70} fill={L(C.red)} />
        <circle cx={0} cy={0} r={34} fill={horizon > 0 ? mix(sea, "#FFFFFF", 0.6) : sea} />
        <path d="M -70 0 L -34 0 M 34 0 L 70 0 M 0 -70 L 0 -34 M 0 34 L 0 70" stroke={L(C.white)} strokeWidth={14} />
      </g>
      {/* rope coil and bollard on the deck, right side */}
      <ellipse cx={860} cy={1600} rx={60} ry={22} fill={shade(wood, 0.35)} />
      <ellipse cx={860} cy={1596} rx={44} ry={14} fill={L("#D9B27E")} />
      <rect x={960} y={1510} width={50} height={60} rx={14} fill={L(C.greyDark)} />
      <WeatherFx kind={weather} f={f} seed={9} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

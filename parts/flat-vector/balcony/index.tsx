import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Skyline, Hills, lit, mix, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Balcony: a low wall with potted plants at the back, a wooden deck, a chair at the right side and a
// railing across the bottom edge. Beyond the wall the city or the hills. The deck in the centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 96, glow = time === "dusk" || time === "night";
  const deck = lit(p.deck ?? "#C99A6B", time), wall = lit("#F3E3C7", time);
  const wallTop = 1430;
  const Pot = ({ x, y, s = 1, col = C.orange }: { x: number; y: number; s?: number; col?: string }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-50, -20, 10, 40].map((a, i) => <ellipse key={i} cx={0} cy={-120} rx={22} ry={90} fill={lit(i % 2 ? C.green : C.greenDark, time)} transform={`rotate(${a + Math.sin(ff / 35 + i) * (drift ? 2 : 0)} 0 0)`} />)}
      <path d="M -50 0 L -38 110 L 38 110 L 50 0 Z" fill={lit(col, time)} />
      <rect x={-56} y={-12} width={112} height={22} rx={6} fill={shade(lit(col, time), 0.12)} />
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1100} f={ff} seed={seed} />
      {p.view === "hills"
        ? <g><Hills y={1250} color={lit(C.skyDeep, time)} amp={80} seed={seed} waves={1.5} /><Hills y={1330} color={lit(C.green, time)} amp={50} seed={seed + 3} waves={2.2} /></g>
        : <Skyline y={1330} color={lit("#7F8DB0", time)} seed={seed} minH={200} maxH={520} lit={glow} />}
      {/* low wall with a cap */}
      <rect x={0} y={wallTop} width={1080} height={60} fill={wall} />
      <rect x={0} y={wallTop} width={1080} height={14} fill={shade(wall, 0.1)} />
      {/* plants on the wall, back left */}
      <Pot x={90} y={1400} s={0.95} col={C.orange} />
      <Pot x={230} y={1400} s={0.7} col={C.pink} />
      {/* deck */}
      <rect x={0} y={1490} width={1080} height={430} fill={deck} />
      {new Array(8).fill(0).map((_, i) => <rect key={i} x={0} y={1490 + i * 56} width={1080} height={4} fill={shade(deck, 0.16)} />)}
      <rect x={0} y={1490} width={1080} height={10} fill={shade(deck, 0.12)} />
      {/* chair at the right side */}
      <g>
        <rect x={900} y={1420} width={14} height={110} fill={C.brownDark} />
        <rect x={1040} y={1420} width={14} height={110} fill={C.brownDark} />
        <rect x={886} y={1560} width={180} height={18} rx={6} fill={lit(C.brown, time)} />
        <rect x={886} y={1510} width={18} height={60} fill={lit(C.brown, time)} />
        <rect x={886} y={1470} width={180} height={40} rx={10} fill={lit(C.brown, time)} />
        <rect x={905} y={1578} width={10} height={60} fill={C.brownDark} />
        <rect x={1040} y={1578} width={10} height={60} fill={C.brownDark} />
        <rect x={900} y={1640} width={14} height={20} fill={C.brownDark} />
      </g>
      {/* potted plant on the deck, far right corner, in front of the chair */}
      <Pot x={990} y={1740} s={0.9} col={C.teal} />
      {/* railing along the bottom edge */}
      <rect x={0} y={1790} width={1080} height={14} rx={7} fill={lit(C.white, time)} />
      {new Array(13).fill(0).map((_, i) => <rect key={i} x={i * 90} y={1804} width={10} height={116} fill={lit(C.white, time)} />)}
      <rect x={0} y={1868} width={1080} height={8} fill={shade(lit(C.white, time), 0.12)} />
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

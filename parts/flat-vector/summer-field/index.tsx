import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, Ground, WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Summer field: tall grass and wildflowers swaying under a bright sun, rolling hills and a lone tree.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const grass = L(p.grass ?? "#A9D36E"), dark = shade(grass, 0.16);
  const flowers = p.wildflowers !== false;
  const cols = [C.pink, C.yellow, C.white, C.purple, C.orange];
  const blade = (x: number, base: number, h: number, k: number) => {
    const sway = Math.sin(t / 25 + x / 90) * 12 * (h / 80);
    return <path key={`b${k}`} d={`M ${(x - 7).toFixed(1)} ${base} L ${(x + sway).toFixed(1)} ${(base - h).toFixed(1)} L ${(x + 7).toFixed(1)} ${base} Z`} fill={k % 2 ? grass : dark} />;
  };
  const flower = (x: number, base: number, s: number, col: string, k: number) => {
    const sway = Math.sin(t / 25 + x / 90) * 12 * s;
    const hx = x + sway, hy = base - 70 * s;
    return (
      <g key={`f${k}`}>
        <rect x={x - 2 * s} y={hy} width={4 * s} height={base - hy} fill={dark} />
        <circle cx={hx.toFixed(1)} cy={hy.toFixed(1)} r={12 * s} fill={L(col)} />
        <circle cx={hx.toFixed(1)} cy={hy.toFixed(1)} r={4 * s} fill={L(C.yellow)} />
      </g>
    );
  };
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1060} f={t} seed={31} />
      <Hills y={1120} color={L("#9CCB5A")} amp={36} seed={32} waves={2} />
      {/* lone tree on the right */}
      <rect x={770} y={1040} width={18} height={230} fill={L(C.brownDark)} />
      <circle cx={779} cy={1000} r={110} fill={L(C.greenDark)} />
      <circle cx={716} cy={1040} r={70} fill={L(C.green)} />
      <circle cx={842} cy={1050} r={70} fill={L(C.green)} />
      <Ground y={1260} color={grass} kind="grass" time={time} />
      {/* tall grass blades: small ones in the stage, taller at the sides */}
      {Array.from({ length: 120 }, (_, i) => {
        const x = rnd(33, i) * 1080, base = 1280 + rnd(33, i + 200) * 640;
        const inStage = x > 220 && x < 860;
        const h = inStage ? 24 + rnd(33, i + 300) * 16 : 60 + rnd(33, i + 300) * 70;
        return blade(x, base, h, i);
      })}
      {flowers && Array.from({ length: 10 }, (_, i) => flower(20 + rnd(34, i) * 180, 1500 + rnd(34, i + 9) * 380, 1.6 + rnd(34, i + 2) * 0.6, cols[i % cols.length], i))}
      {flowers && Array.from({ length: 10 }, (_, i) => flower(880 + rnd(35, i) * 180, 1480 + rnd(35, i + 9) * 400, 1.6 + rnd(35, i + 2) * 0.6, cols[(i + 2) % cols.length], 20 + i))}
      {flowers && Array.from({ length: 8 }, (_, i) => flower(60 + i * 120, 1290 + rnd(36, i) * 20, 0.7, cols[i % cols.length], 40 + i))}
      <WeatherFx kind={weather} f={t} seed={31} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Ground, WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Spring garden: a blossom tree, a picket fence, rows of flowers in bloom, a watering can, butterflies and falling petals.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const blossom = L(p.blossom ?? C.pink), white = L("#FFFFFF"), teal = L(C.teal);
  const flowerCols = [C.pink, C.yellow, C.red, C.purple, C.white, C.orange];
  const butterfly = (x: number, y: number, col: string, k: number) => {
    const flap = 0.35 + 0.65 * Math.abs(Math.sin(t / 5 + k));
    const bx = x + Math.sin(t / 40 + k) * 60, by = y + Math.cos(t / 50 + k) * 20;
    return (
      <g key={`bf${k}`} transform={`translate(${bx.toFixed(1)} ${by.toFixed(1)}) scale(${flap.toFixed(2)} 1)`}>
        <ellipse cx={-12} cy={-8} rx={14} ry={11} fill={L(col)} />
        <ellipse cx={12} cy={-8} rx={14} ry={11} fill={L(col)} />
        <ellipse cx={-10} cy={8} rx={9} ry={7} fill={shade(L(col), 0.15)} />
        <ellipse cx={10} cy={8} rx={9} ry={7} fill={shade(L(col), 0.15)} />
        <rect x={-2} y={-12} width={4} height={26} rx={2} fill={L(C.inkSoft)} />
      </g>
    );
  };
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={t} seed={44} clouds={3} />
      {/* blossom tree at the back-left */}
      <rect x={130} y={920} width={34} height={340} fill={L(C.brownDark)} />
      <circle cx={150} cy={860} r={150} fill={blossom} />
      <circle cx={60} cy={900} r={100} fill={shade(blossom, 0.1)} />
      <circle cx={250} cy={880} r={110} fill={shade(blossom, 0.1)} />
      <circle cx={150} cy={760} r={110} fill={blossom} />
      {Array.from({ length: 12 }, (_, i) => <circle key={`bl${i}`} cx={(40 + rnd(45, i) * 230).toFixed(1)} cy={(720 + rnd(45, i + 12) * 240).toFixed(1)} r={9} fill={white} opacity={0.8} />)}
      {/* small back-right tree */}
      <rect x={936} y={980} width={22} height={280} fill={L(C.brownDark)} />
      <circle cx={947} cy={930} r={86} fill={L(C.green)} />
      <Ground y={1250} color={L(C.green)} kind="grass" time={time} f={t} />
      {/* picket fence along the back */}
      <rect x={0} y={1200} width={1080} height={14} fill={white} />
      <rect x={0} y={1236} width={1080} height={14} fill={white} />
      {Array.from({ length: 31 }, (_, i) => {
        const x = i * 36;
        return (
          <g key={`pk${i}`}>
            <rect x={x} y={1160} width={22} height={100} fill={white} />
            <path d={`M ${x} 1160 L ${x + 11} 1144 L ${x + 22} 1160 Z`} fill={white} />
          </g>
        );
      })}
      {/* flower beds in bloom along the front of the lawn */}
      <rect x={0} y={1270} width={1080} height={22} rx={10} fill={shade(L(C.green), 0.2)} />
      {Array.from({ length: 24 }, (_, i) => <circle key={`fl${i}`} cx={(i * 46 + 10 + rnd(46, i) * 20).toFixed(1)} cy={(1276 + rnd(46, i + 30) * 8).toFixed(1)} r={13} fill={L(flowerCols[i % flowerCols.length])} />)}
      {/* watering can at the right, on the grass */}
      <g transform="translate(48 0)">
        <path d="M 900 1460 L 840 1400 L 852 1388 L 912 1450 Z" fill={teal} />
        <rect x={826} y={1384} width={22} height={14} rx={4} fill={shade(teal, 0.2)} />
        <rect x={900} y={1420} width={110} height={86} rx={16} fill={teal} />
        <path d="M 1010 1436 Q 1060 1360 1040 1420" stroke={teal} strokeWidth={12} fill="none" strokeLinecap="round" />
        <rect x={900} y={1500} width={110} height={8} rx={4} fill={shade(teal, 0.2)} />
      </g>
      {/* butterflies drifting above the beds */}
      {butterfly(300, 1100, C.yellow, 0)}
      {butterfly(720, 1000, C.pink, 1)}
      {butterfly(560, 760, C.purple, 2)}
      {butterfly(180, 620, C.orange, 3)}
      {/* petals falling */}
      {p.petalFall !== false && Array.from({ length: 22 }, (_, i) => {
        const x = (rnd(47, i) * 1080 + Math.sin(t / 30 + i) * 18 + 1080) % 1080;
        const y = ((rnd(47, i + 30) * 1300 + t * (1.2 + rnd(47, i + 60) * 1.4)) % 1300);
        return <ellipse key={`pt${i}`} cx={x.toFixed(1)} cy={y.toFixed(1)} rx={7} ry={4} fill={L(C.pink)} transform={`rotate(${(i * 37 + t * 3) % 360} ${x.toFixed(1)} ${y.toFixed(1)})`} />;
      })}
      <WeatherFx kind={weather} f={t} seed={44} />
    </g>
  );
}

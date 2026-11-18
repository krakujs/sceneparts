import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, Ground, lit, mix, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Festival ground: a striped big top and a smaller tent at the back left, a ferris wheel at the back right,
// food stalls at the sides, bunting and string lights overhead. Nice at dusk. The centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "dusk"), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 118, glow = time !== "day" && time !== "morning";
  const tent = lit(p.tent ?? C.red, time);
  const bulbs = glow ? "#FFE9A8" : C.yellow;
  const stripes = (x: number, w: number, base: number, h: number, col: string) => {
    const n = 6, sw = w / n;
    return (
      <g>
        {new Array(n).fill(0).map((_, k) => <path key={k} d={`M ${x + k * sw} ${base - h * 0.6} L ${x + (k + 1) * sw} ${base - h * 0.6} L ${x + (k + 1) * sw} ${base} L ${x + k * sw} ${base} Z`} fill={k % 2 ? C.white : col} />)}
        <path d={`M ${x} ${base - h * 0.6} Q ${x + w / 2} ${base - h * 1.25} ${x + w} ${base - h * 0.6} L ${x + w} ${base - h * 0.6 - 6} Q ${x + w / 2} ${base - h * 1.25 - 6} ${x} ${base - h * 0.6 - 6} Z`} fill={shade(col, 0.2)} />
        <rect x={x + w / 2 - 4} y={base - h * 1.25 - 40} width={8} height={40} fill={C.greyDark} />
        <path d={`M ${x + w / 2} ${base - h * 1.25 - 40} L ${x + w / 2 + 30} ${base - h * 1.25 - 20} L ${x + w / 2} ${base - h * 1.25 - 20} Z`} fill={C.yellow} />
      </g>
    );
  };
  const wheelX = 860, wheelY = 620, R = 230;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1050} f={ff} seed={seed} />
      <Hills y={1150} color={lit(C.greenDark, time)} amp={60} seed={seed} waves={2} />
      {/* ferris wheel at the back right */}
      {p.wheel !== false && (
        <g>
          <line x1={wheelX - 180} y1={wheelY + R + 80} x2={wheelX} y2={wheelY} stroke={lit(C.blueDark, time)} strokeWidth={10} />
          <line x1={wheelX + 180} y1={wheelY + R + 80} x2={wheelX} y2={wheelY} stroke={lit(C.blueDark, time)} strokeWidth={10} />
          <line x1={wheelX - 180} y1={1180} x2={wheelX - 120} y2={wheelY + R + 80} stroke={lit(C.blueDark, time)} strokeWidth={8} />
          <line x1={wheelX + 180} y1={1180} x2={wheelX + 120} y2={wheelY + R + 80} stroke={lit(C.blueDark, time)} strokeWidth={8} />
          <g transform={`rotate(${f1((ff * 0.4) % 360)} ${wheelX} ${wheelY})`}>
            <circle cx={wheelX} cy={wheelY} r={R} fill="none" stroke={lit(C.purple, time)} strokeWidth={10} />
            {new Array(8).fill(0).map((_, i) => {
              const a = (i / 8) * Math.PI * 2, x = wheelX + Math.cos(a) * R, y = wheelY + Math.sin(a) * R;
              return (
                <g key={i}>
                  <line x1={wheelX} y1={wheelY} x2={x} y2={y} stroke={lit(C.purple, time)} strokeWidth={4} />
                  <rect x={x - 14} y={y - 4} width={28} height={24} rx={5} fill={lit(i % 2 ? C.yellow : C.teal, time)} />
                </g>
              );
            })}
            <circle cx={wheelX} cy={wheelY} r={16} fill={lit(C.purpleDark, time)} />
          </g>
          {glow && new Array(16).fill(0).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return <circle key={i} cx={wheelX + Math.cos(a) * R} cy={wheelY + Math.sin(a) * R} r={5} fill="#FFF3C4" />;
          })}
        </g>
      )}
      {/* big top and a small tent at the back left */}
      <g>
        {stripes(-40, 380, 1230, 380, tent)}
        {stripes(330, 170, 1190, 220, lit(C.teal, time))}
      </g>
      {/* bunting across the top */}
      <path d="M -20 360 Q 540 470 1100 360" fill="none" stroke={C.ink} strokeWidth={3} opacity={0.6} />
      {new Array(18).fill(0).map((_, i) => {
        const t = i / 17, x = -20 + t * 1120, y = 360 + 220 * t * (1 - t), col = [C.yellow, C.teal, C.pink, C.blue, C.orange][i % 5];
        return <path key={i} d={`M ${x - 22} ${y} L ${x + 22} ${y} L ${x} ${y + 46} Z`} fill={lit(col, time)} />;
      })}
      {/* string lights */}
      {new Array(14).fill(0).map((_, i) => {
        const t = i / 13, x = 40 + t * 1000, y = 560 + 280 * t * (1 - t);
        return (
          <g key={i}>
            {glow && <circle cx={x} cy={y + 12} r={20} fill="#FFD66B" opacity={0.25} />}
            <circle cx={x} cy={y + 12} r={8} fill={bulbs} />
          </g>
        );
      })}
      <path d="M 40 560 Q 540 700 1040 560" fill="none" stroke={C.ink} strokeWidth={2} opacity={0.5} />
      {/* ground */}
      <Ground y={1220} kind="grass" time={time} f={ff} />
      {/* food stalls at the sides */}
      {[[-20, 1300, C.orange], [880, 1330, C.pink]].map(([x, y, col], i) => (
        <g key={i}>
          <rect x={x as number} y={(y as number) - 150} width={200} height={150} fill={lit(C.brown, time, true)} />
          <path d={`M ${(x as number) - 20} ${(y as number) - 150} L ${(x as number) + 100} ${(y as number) - 210} L ${(x as number) + 220} ${(y as number) - 150} Z`} fill={lit(col as string, time)} />
          {new Array(4).fill(0).map((_, k) => <rect key={k} x={(x as number) - 20 + k * 60} y={(y as number) - 150} width={30} height={30} fill={lit(C.white, time)} opacity={0.7} />)}
          <rect x={(x as number) - 10} y={(y as number) - 40} width={220} height={16} rx={6} fill={lit(C.brownDark, time)} />
          <circle cx={(x as number) + 60} cy={(y as number) - 66} r={18} fill={lit(C.yellow, time)} />
          <circle cx={(x as number) + 120} cy={(y as number) - 66} r={18} fill={lit(C.red, time)} />
        </g>
      ))}
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

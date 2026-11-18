import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, WeatherFx, lit, rnd, mix, asTime, asWeather } from "../backdrop/index";

// Open ocean: a flat horizon, rows of waves getting larger towards the viewer, a far sailboat and gulls.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const horizon = 1050;
  const far = L(p.sea ?? "#8FD3F0"), near = L("#2A6DB5");
  const gull = (x: number, y: number, s: number, k: number) => {
    const flap = 0.55 + 0.45 * Math.sin(t / 6 + k);
    return (
      <g key={k} transform={`translate(${x} ${y}) scale(${s} ${s * flap})`}>
        <path d="M -28 0 Q -14 -14 0 0 Q 14 -14 28 0" stroke={L(C.inkSoft)} strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
    );
  };
  return (
    <g>
      <Sky time={time} weather={weather} horizon={horizon} f={t} seed={12} clouds={3} />
      {/* sea bands: fine near the horizon, deeper towards the bottom */}
      {Array.from({ length: 10 }, (_, i) => {
        const y0 = horizon + 870 * Math.pow(i / 10, 1.6), y1 = horizon + 870 * Math.pow((i + 1) / 10, 1.6);
        return <rect key={i} x={0} y={y0.toFixed(1)} width={1080} height={(y1 - y0 + 1).toFixed(1)} fill={mix(far, near, i / 9)} />;
      })}
      {/* far sailboat silhouette on the horizon */}
      <rect x={699} y={958} width={3} height={92} fill={L(C.greyDark)} />
      <path d="M 700 962 L 700 1046 L 742 1046 Z" fill={L("#F4F1EA")} />
      <path d="M 697 980 L 697 1046 L 664 1046 Z" fill={L(C.greyLight)} />
      <path d="M 658 1046 L 748 1046 L 734 1064 L 672 1064 Z" fill={L(C.greyDark)} />
      {/* wave rows: crest dashes moving sideways */}
      {Array.from({ length: 9 }, (_, r) => {
        const y = horizon + 40 + r * r * 9 + r * 22, s = 4 + r * 1.6, sp = 0.6 + r * 0.25;
        return Array.from({ length: 7 }, (_, i) => {
          const x = (((rnd(20 + r, i) * 1300 + t * sp * (r + 1)) % 1300) + 1300) % 1300 - 110;
          return <path key={`${r}-${i}`} d={`M ${x.toFixed(1)} ${y} q ${s * 4} ${-s * 2} ${s * 8} 0`} stroke="#FFFFFF" strokeWidth={2 + r * 0.6} fill="none" strokeLinecap="round" opacity={0.75} />;
        });
      })}
      {/* gulls */}
      {gull(240, 500, 1.1, 0)}
      {gull(330, 430, 0.9, 1)}
      {gull(640, 600, 1.0, 2)}
      {gull(860, 380, 0.8, 3)}
      <WeatherFx kind={weather} f={t} seed={12} />
    </g>
  );
}

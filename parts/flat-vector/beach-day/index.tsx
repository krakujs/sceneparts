import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Ground, WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Beach by day: sea to a horizon with rolling foam lines, sand, a striped umbrella and towel at the sides, a palm at the edge.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const frond = (x: number, y: number, ex: number, ey: number, k: string) => (
    <path key={k} d={`M ${x} ${y} Q ${(x + ex) / 2} ${Math.min(y, ey) - 70} ${ex} ${ey}`} stroke={L(C.green)} strokeWidth={22} fill="none" strokeLinecap="round" />
  );
  const sea = [C.skyDeep, "#5DB5E6", "#4EA8E0", "#3D86C9", "#2F6FB3", "#2A5FA0"];
  // umbrella canopy: six wedges, alternating red and white
  const cx = 154, cy = 1200, r = 130;
  const wedges = Array.from({ length: 6 }, (_, k) => {
    const a0 = Math.PI + (k * Math.PI) / 6, a1 = a0 + Math.PI / 6;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    return <path key={k} d={`M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`} fill={k % 2 ? L("#FFFFFF") : L(p.umbrella ?? C.red)} />;
  });
  return (
    <g>
      <Sky time={time} weather={weather} horizon={980} f={t} seed={2} />
      {/* sea with bands and rolling foam lines */}
      {sea.map((c, i) => <rect key={i} x={0} y={980 + i * 60} width={1080} height={61} fill={L(c)} />)}
      {Array.from({ length: 9 }, (_, i) => {
        const y = 1010 + i * i * 4 + i * 26;
        const x0 = ((rnd(3, i) * 1080 + t * (0.5 + (i % 3) * 0.3)) % 1200) - 60;
        return (
          <g key={`w${i}`} opacity={0.85}>
            <path d={`M ${x0.toFixed(1)} ${y} q 20 -10 40 0 q 20 10 40 0`} stroke="#FFFFFF" strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d={`M ${(x0 + 380).toFixed(1)} ${y + 8} q 24 -10 48 0 q 24 10 48 0`} stroke="#FFFFFF" strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        );
      })}
      {/* sand */}
      <Ground y={1300} color={L(C.sand)} kind="sand" time={time} />
      {/* umbrella and pole at the left */}
      <rect x={150} y={cy} width={8} height={360} fill={L(C.greyDark)} />
      {wedges}
      <circle cx={cx} cy={cy} r={10} fill={L(C.yellow)} />
      {/* towel at the right */}
      <rect x={900} y={1470} width={150} height={60} rx={6} fill={L(C.teal)} />
      <rect x={920} y={1470} width={18} height={60} fill={L("#FFFFFF")} />
      <rect x={980} y={1470} width={18} height={60} fill={L("#FFFFFF")} />
      <rect x={1020} y={1470} width={18} height={60} fill={L("#FFFFFF")} />
      {/* palm at the right edge */}
      <path d="M 1010 1340 Q 960 1100 1010 820" stroke={L(C.brown)} strokeWidth={26} fill="none" strokeLinecap="round" />
      {frond(1010, 820, 860, 790, "p1")}
      {frond(1010, 820, 930, 700, "p2")}
      {frond(1010, 820, 1010, 690, "p3")}
      {frond(1010, 820, 1080, 730, "p4")}
      {frond(1010, 820, 1100, 820, "p5")}
      <circle cx={1000} cy={840} r={16} fill={L(C.brownDark)} />
      <circle cx={1024} cy={844} r={16} fill={L(C.brownDark)} />
      <WeatherFx kind={weather} f={t} seed={2} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Foggy harbour: a grey sea with ripples, a lighthouse and cranes on the far shore, moored boats, a quay
// with bollards and coils of rope. Fog drifts across from p.f. The quay in the middle stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather ?? "fog"), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 140, glow = time === "dusk" || time === "night";
  const sea = lit(p.water ?? "#4E9ED8", time), far = mix(lit("#8FA6BF", time), "#DCE3EC", 0.4);
  const hullCol = lit(C.red, time), hullDark = shade(hullCol, 0.2);
  const shore = 1150;
  const Boat = ({ x, y, s, col, cab }: { x: number; y: number; s: number; col: string; cab: string }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -120 0 L 120 0 L 90 48 L -90 48 Z" fill={lit(col, time)} />
      <rect x={-120} y={-6} width={240} height={10} fill={shade(lit(col, time), 0.2)} />
      <rect x={-50} y={-70} width={90} height={64} fill={lit(cab, time)} />
      <rect x={-36} y={-56} width={24} height={20} fill={shade(lit(cab, time), 0.25)} />
      <rect x={-4} y={-56} width={24} height={20} fill={shade(lit(cab, time), 0.25)} />
      <rect x={-64} y={-80} width={120} height={12} rx={4} fill={lit(C.greyDark, time)} />
      <rect x={30} y={-150} width={6} height={80} fill={lit(C.greyDark, time)} />
    </g>
  );
  const Crane = ({ x, base, h }: { x: number; base: number; h: number }) => (
    <g>
      <rect x={x - 8} y={base - h} width={16} height={h} fill={lit("#4F5A72", time)} />
      <rect x={x - 80} y={base - h - 10} width={260} height={16} fill={lit("#4F5A72", time)} />
      <line x1={x} y1={base - h} x2={x + 150} y2={base - h + 30} stroke={lit("#4F5A72", time)} strokeWidth={6} />
      <line x1={x - 80} y1={base - h} x2={x + 180} y2={base - h} stroke={lit("#4F5A72", time)} strokeWidth={4} />
      {new Array(Math.floor(h / 50)).fill(0).map((_, i) => <line key={i} x1={x - 8} y1={base - i * 50} x2={x + 8} y2={base - i * 50 - 40} stroke={lit("#4F5A72", time)} strokeWidth={4} />)}
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={ff} seed={seed} sun={false} />
      {/* far shore with cranes and a lighthouse */}
      <rect x={0} y={shore - 40} width={1080} height={120} fill={far} />
      <Crane x={120} base={shore - 40} h={320} />
      <Crane x={300} base={shore - 40} h={260} />
      {p.lighthouse !== false && (
        <g>
          <path d="M 770 1110 L 790 880 L 830 880 L 850 1110 Z" fill={lit("#5D6578", time)} />
          <rect x={780} y={840} width={60} height={44} fill={lit("#5D6578", time)} />
          <rect x={768} y={760} width={64} height={80} fill={lit(C.white, time)} />
          <rect x={768} y={790} width={64} height={12} fill={lit(C.red, time)} />
          <path d="M 762 760 L 800 716 L 838 760 Z" fill={lit(C.redDark, time)} />
          <circle cx={800} cy={800} r={glow ? 26 : 14} fill={glow ? "#FFF3C4" : C.yellow} opacity={glow ? 0.9 : 0.5} />
          {glow && <circle cx={800} cy={800} r={90} fill="#FFF3C4" opacity={0.12 + 0.05 * Math.sin(ff / 14)} />}
        </g>
      )}
      <Hills y={shore + 10} color={lit(C.greyDark, time)} amp={40} seed={seed} waves={1.4} />
      {/* sea with ripples */}
      <rect x={0} y={shore + 20} width={1080} height={160} fill={sea} />
      {new Array(10).fill(0).map((_, i) => <rect key={i} x={((i * 190 + Math.sin(ff / 22 + i) * 30) % 1200) - 60} y={shore + 40 + (i % 4) * 36} width={100} height={6} rx={3} fill={lit("#BFE2F7", time)} opacity={0.6} />)}
      <Boat x={170} y={1260} s={0.9} col={C.blue} cab={C.white} />
      <Boat x={900} y={1240} s={0.8} col={C.yellow} cab={C.white} />
      {/* quay */}
      <rect x={0} y={1290} width={1080} height={630} fill={lit("#A9AFBD", time)} />
      <rect x={0} y={1290} width={1080} height={20} fill={lit("#C9CED8", time)} />
      <rect x={0} y={1310} width={1080} height={10} fill={shade(lit("#A9AFBD", time), 0.2)} />
      {new Array(9).fill(0).map((_, i) => <rect key={i} x={i * 130 + 50} y={1320} width={4} height={600} fill={shade(lit("#A9AFBD", time), 0.12)} />)}
      {/* bollards at the quay edge */}
      {[40, 230, 860, 1040].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={1310} rx={22} ry={8} fill={shade(lit(C.greyDark, time), 0.1)} />
          <rect x={x - 22} y={1270} width={44} height={40} rx={10} fill={lit(C.greyDark, time)} />
          <rect x={x - 22} y={1268} width={44} height={8} rx={4} fill={shade(lit(C.greyDark, time), 0.2)} />
        </g>
      ))}
      {/* coil of rope on the quay, right side */}
      <g>
        <ellipse cx={960} cy={1700} rx={60} ry={22} fill={lit(C.sand, time)} />
        <ellipse cx={960} cy={1700} rx={38} ry={12} fill={shade(lit(C.sand, time), 0.15)} />
        <ellipse cx={960} cy={1700} rx={18} ry={6} fill={lit(C.sand, time)} />
      </g>
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

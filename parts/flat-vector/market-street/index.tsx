import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Market street: shuttered shop backs across the top, string lights swung across, two rows of stalls with
// striped awnings and crates of produce at the sides, and a cobbled plaza. The centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 107, glow = time === "dusk" || time === "night";
  const awn = lit(p.awning ?? C.red, time);
  const back = [
    { x: -10, w: 230, h: 620, col: "#F3E3C7" }, { x: 210, w: 200, h: 560, col: "#CFE6F5" }, { x: 400, w: 280, h: 640, col: "#F9D9C4" },
    { x: 670, w: 220, h: 580, col: "#D9EBD0" }, { x: 880, w: 220, h: 610, col: "#E4DDF2" },
  ];
  const Stall = ({ x, w, y, flip = false }: { x: number; w: number; y: number; flip?: boolean }) => {
    const n = 5, sw = w / n;
    return (
      <g>
        <rect x={x} y={y - 230} width={6} height={230} fill={C.brownDark} />
        <rect x={x + w - 6} y={y - 230} width={6} height={230} fill={C.brownDark} />
        {new Array(n).fill(0).map((_, k) => <rect key={k} x={x + k * sw} y={y - 290} width={sw} height={60} fill={k % 2 ? C.white : awn} />)}
        {new Array(n).fill(0).map((_, k) => <circle key={k} cx={x + k * sw + sw / 2} cy={y - 230} r={sw / 2} fill={k % 2 ? C.white : awn} />)}
        <rect x={x - 10} y={y - 60} width={w + 20} height={16} rx={6} fill={lit(C.brown, time)} />
        <rect x={x} y={y - 44} width={w} height={44} fill={lit(C.brownDark, time)} />
        {/* produce crates */}
        {new Array(Math.floor(w / 70)).fill(0).map((_, k) => {
          const cx = x + 36 + k * 70, cols = [C.orange, C.red, C.lime, C.yellow, C.purple, C.pink];
          return (
            <g key={k}>
              <rect x={cx - 30} y={y - 120} width={60} height={60} fill={lit(C.sand, time)} />
              <rect x={cx - 30} y={y - 120} width={60} height={10} fill={shade(lit(C.sand, time), 0.15)} />
              {[-16, 0, 16].map((d, j) => <circle key={j} cx={cx + d * (j === 1 ? 0 : 1)} cy={y - 136 + (j === 1 ? -6 : 0)} r={14} fill={lit(cols[(k + j) % cols.length], time)} />)}
            </g>
          );
        })}
        {flip && null}
      </g>
    );
  };
  return (
    <g>
      <Sky time={time} weather={weather} horizon={900} f={ff} seed={seed} sun={false} />
      {back.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={1000 - b.h + 300} width={b.w} height={b.h} fill={lit(b.col, time, true)} />
          <rect x={b.x} y={1000 - b.h + 300} width={b.w} height={14} fill={shade(lit(b.col, time, true), 0.14)} />
          {/* shutter and sign panel */}
          <rect x={b.x + 30} y={1080} width={b.w - 60} height={120} rx={6} fill={lit(C.greyDark, time)} />
          {new Array(6).fill(0).map((_, k) => <rect key={k} x={b.x + 34} y={1090 + k * 18} width={b.w - 68} height={6} fill={shade(lit(C.greyDark, time), 0.2)} />)}
          <rect x={b.x + 30} y={1030} width={b.w - 60} height={34} rx={6} fill={lit(C.teal, time)} opacity={0.85} />
          {glow && <rect x={b.x + 30} y={1200} width={b.w - 60} height={20} fill="#FFD66B" opacity={0.25} />}
        </g>
      ))}
      {/* string lights swung across the top */}
      <path d="M -10 430 Q 540 560 1090 430" fill="none" stroke={C.greyDark} strokeWidth={4} />
      {new Array(16).fill(0).map((_, i) => {
        const t = i / 15, x = -10 + t * 1100, y = 430 + 260 * t * (1 - t);
        const lamp = p.lights !== false;
        return lamp ? (
          <g key={i}>
            <circle cx={x} cy={y + 14} r={12} fill={glow ? "#FFE9A8" : C.yellow} opacity={glow ? 0.35 : 0.2} />
            <circle cx={x} cy={y + 14} r={7} fill={glow ? "#FFF3C4" : C.yellowDark} />
          </g>
        ) : null;
      })}
      {/* plaza */}
      <rect x={0} y={1300} width={1080} height={620} fill={lit("#C9B79A", time)} />
      {new Array(40).fill(0).map((_, i) => <ellipse key={i} cx={f1(rnd(seed, i) * 1080)} cy={f1(1330 + rnd(seed, i + 60) * 560)} rx={f1(18 + rnd(seed, i + 90) * 16)} ry={8} fill={shade(lit("#C9B79A", time), 0.12)} />)}
      {/* stalls at the sides */}
      <Stall x={-20} w={240} y={1400} />
      <Stall x={860} w={240} y={1420} />
      {/* small stall in the far distance */}
      <Stall x={440} w={170} y={1250} />
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

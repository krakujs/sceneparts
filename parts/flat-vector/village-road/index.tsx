import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Village road: a cobbled road running from the far hills to the front, small cottages with pitched roofs
// on both sides, round trees, picket fences and hills behind. The road in the middle stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 63, glow = time === "dusk" || time === "night";
  const wall = p.wall ?? "#F3E3C7", roof = p.roof ?? "#B53A2E";
  const Cottage = ({ x, base, w, h, c, r }: { x: number; base: number; w: number; h: number; c: string; r: string }) => {
    const top = base - h;
    return (
      <g>
        <rect x={x} y={top} width={w} height={h} fill={lit(c, time, true)} />
        <path d={`M ${x - 22} ${top + 6} L ${x + w / 2} ${top - w * 0.5} L ${x + w + 22} ${top + 6} Z`} fill={lit(r, time)} />
        <path d={`M ${x + w / 2} ${top - w * 0.5} L ${x + w + 22} ${top + 6} L ${x + w / 2 + 30} ${top + 6} Z`} fill={shade(lit(r, time), 0.15)} />
        <rect x={x + w * 0.72} y={top - w * 0.42} width={22} height={50} fill={lit(C.brownDark, time)} />
        <rect x={x + w / 2 - 26} y={base - 96} width={52} height={96} rx={6} fill={lit(C.brownDark, time)} />
        <rect x={x + 22} y={top + 40} width={58} height={50} rx={5} fill={glow ? "#FFD66B" : lit("#CFE6F5", time)} />
        <rect x={x + w - 80} y={top + 40} width={58} height={50} rx={5} fill={glow ? "#FFD66B" : lit("#CFE6F5", time)} />
        <rect x={x + 22} y={top + 40} width={58} height={4} fill={shade(lit(c, time, true), 0.2)} />
        <rect x={x - 12} y={base - 6} width={w + 24} height={12} fill={shade(lit(c, time, true), 0.2)} />
      </g>
    );
  };
  const Tree = ({ x, y, r }: { x: number; y: number; r: number }) => (
    <g>
      <rect x={x - 8} y={y - r * 0.9} width={16} height={r * 0.9} fill={lit(C.brownDark, time)} />
      <circle cx={x} cy={y - r * 1.5} r={r} fill={lit(C.green, time)} />
      <circle cx={x - r * 0.3} cy={y - r * 1.8} r={r * 0.5} fill={lit(C.lime, time)} opacity={0.7} />
    </g>
  );
  const Fence = ({ x, y, n }: { x: number; y: number; n: number }) => (
    <g>
      <rect x={x} y={y - 10} width={n * 26} height={6} fill={lit(C.white, time)} />
      <rect x={x} y={y + 8} width={n * 26} height={6} fill={lit(C.white, time)} />
      {new Array(n).fill(0).map((_, i) => <rect key={i} x={x + i * 26} y={y - 30} width={12} height={60} rx={3} fill={lit(C.white, time)} />)}
    </g>
  );
  const horizon = 1040;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={horizon} f={ff} seed={seed} />
      <Hills y={horizon + 30} color={lit(C.skyDeep, time)} amp={60} seed={seed} waves={1.6} />
      <Hills y={horizon + 110} color={lit(C.green, time)} amp={40} seed={seed + 2} waves={2.4} />
      {/* small far cottage and trees */}
      <Cottage x={400} base={1130} w={120} h={90} c="#F9D9C4" r={shade(roof, 0.1)} />
      <Tree x={340} y={1140} r={40} />
      <Tree x={760} y={1140} r={44} />
      {/* grass verges */}
      <rect x={0} y={1150} width={1080} height={770} fill={lit("#8CC66E", time)} />
      {/* road: a trapezoid from the far end to the bottom of the frame */}
      <path d="M 440 1150 L 640 1150 L 1010 1920 L 70 1920 Z" fill={lit("#D9B98A", time)} />
      <path d="M 440 1150 L 640 1150 L 652 1180 L 428 1180 Z" fill={shade(lit("#D9B98A", time), 0.12)} />
      {new Array(60).fill(0).map((_, i) => {
        const t = rnd(seed, i), y = 1200 + t * 700, half = 100 + (y - 1150) * 0.62, xx = 540 + (rnd(seed, i + 90) - 0.5) * 2 * half * 0.9;
        return <ellipse key={i} cx={f1(xx)} cy={f1(y)} rx={f1(5 + (y - 1150) * 0.02)} ry={f1(3 + (y - 1150) * 0.012)} fill={shade(lit("#D9B98A", time), 0.22)} />;
      })}
      {/* cottages on the left and right */}
      <Cottage x={-30} base={1250} w={300} h={230} c={wall} r={roof} />
      <Cottage x={800} base={1260} w={300} h={250} c="#CFE6F5" r={shade(roof, 0.2)} />
      <Fence x={300} y={1300} n={4} />
      <Fence x={775} y={1360} n={3} />
      <Tree x={1040} y={1400} r={70} />
      <Tree x={20} y={1480} r={60} />
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

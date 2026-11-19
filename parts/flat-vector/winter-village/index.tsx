import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Winter village: snowy cottages with lit panes and snow on the roofs, snowy pines, a snow-covered ground
// with a lane, chimney smoke rising from p.f and snowfall. The lane in the middle stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "dusk"), weather = asWeather(p.weather ?? "snow"), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 151, glow = time !== "day" && time !== "morning";
  const pane = p.pane ?? "#FFD66B", snow = lit("#FFFFFF", time), snowShade = shade(lit("#E4EAF2", time), 0.04);
  const walls = ["#F3E3C7", "#CFE6F5", "#F9D9C4"];
  const Cottage = ({ x, base, w, h, c, k }: { x: number; base: number; w: number; h: number; c: string; k: number }) => {
    const top = base - h, roofY = top - w * 0.45;
    const smoke = p.smoke !== false;
    return (
      <g>
        <rect x={x} y={top} width={w} height={h} fill={lit(c, time, true)} />
        <path d={`M ${x - 18} ${top + 4} L ${x + w / 2} ${roofY} L ${x + w + 18} ${top + 4} Z`} fill={lit("#5D6578", time)} />
        <path d={`M ${x - 18} ${top + 4} L ${x + w / 2} ${roofY} L ${x + w / 2} ${roofY + 14} L ${x - 4} ${top + 16} Z`} fill={snow} />
        <path d={`M ${x + w + 18} ${top + 4} L ${x + w / 2} ${roofY} L ${x + w / 2} ${roofY + 14} L ${x + w + 4} ${top + 16} Z`} fill={snowShade} />
        <rect x={x + w * 0.7} y={roofY + 10} width={22} height={60} fill={lit(C.brownDark, time)} />
        <rect x={x + w * 0.7 - 4} y={roofY + 6} width={30} height={8} fill={snow} />
        {smoke && [0, 1, 2, 3].map((i) => {
          const t = ((ff / 90) + i / 4 + k * 0.3) % 1;
          return <circle key={i} cx={x + w * 0.7 + 11 + Math.sin(t * 6 + i) * 10 * t} cy={roofY - 10 - t * 150} r={10 + t * 22} fill="#F4F6FA" opacity={0.7 * (1 - t)} />;
        })}
        <rect x={x + w / 2 - 22} y={base - 86} width={44} height={86} rx={6} fill={lit(C.brownDark, time, true)} />
        <rect x={x + 16} y={top + 34} width={50} height={44} rx={4} fill={glow ? pane : lit("#CFE6F5", time)} />
        <rect x={x + w - 66} y={top + 34} width={50} height={44} rx={4} fill={glow ? pane : lit("#CFE6F5", time)} />
        <rect x={x + 40} y={top + 34} width={3} height={44} fill={lit(C.white, time)} />
        <rect x={x + 16} y={top + 54} width={50} height={3} fill={lit(C.white, time)} />
        <rect x={x + w - 41} y={top + 34} width={3} height={44} fill={lit(C.white, time)} />
        <rect x={x + w - 66} y={top + 54} width={50} height={3} fill={lit(C.white, time)} />
        <path d={`M ${x - 10} ${base} L ${x - 10} ${base - 10} Q ${x + w / 2} ${base - 26} ${x + w + 10} ${base - 10} L ${x + w + 10} ${base} Z`} fill={snow} />
      </g>
    );
  };
  const Pine = ({ x, y, r }: { x: number; y: number; r: number }) => (
    <g>
      <rect x={x - 8} y={y - r * 0.5} width={16} height={r * 0.6} fill={lit(C.brownDark, time)} />
      {[0, 1, 2].map((i) => {
        const yy = y - r * 0.5 - i * r * 0.85, w = r * (1 - i * 0.22);
        return (
          <g key={i}>
            <path d={`M ${x} ${yy - r * 0.95} L ${x + w} ${yy} L ${x - w} ${yy} Z`} fill={lit(C.greenDark, time)} />
            <path d={`M ${x} ${yy - r * 0.95} L ${x + w * 0.5} ${yy - r * 0.45} L ${x + w * 0.2} ${yy - r * 0.42} L ${x} ${yy - r * 0.52} L ${x - w * 0.2} ${yy - r * 0.42} L ${x - w * 0.5} ${yy - r * 0.45} Z`} fill={snow} />
          </g>
        );
      })}
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={ff} seed={seed} sun={false} />
      <Hills y={1080} color={lit("#A9BCD3", time)} amp={60} seed={seed} waves={1.6} />
      <Hills y={1160} color={lit("#8FA6C0", time)} amp={40} seed={seed + 4} waves={2.6} />
      {/* snowy pines behind */}
      <Pine x={60} y={1200} r={120} />
      <Pine x={210} y={1160} r={90} />
      <Pine x={880} y={1170} r={100} />
      <Pine x={1030} y={1230} r={130} />
      {/* cottages */}
      <Cottage x={330} base={1140} w={150} h={110} c={walls[1]} k={0} />
      <Cottage x={610} base={1130} w={170} h={130} c={walls[2]} k={1} />
      <Cottage x={-40} base={1280} w={250} h={170} c={walls[0]} k={2} />
      <Cottage x={800} base={1290} w={240} h={180} c={walls[1]} k={3} />
      {/* snow-covered ground */}
      <rect x={0} y={1270} width={1080} height={650} fill={snow} />
      <rect x={0} y={1270} width={1080} height={12} fill={snowShade} />
      {new Array(20).fill(0).map((_, i) => <ellipse key={i} cx={f1(rnd(seed, i) * 1080)} cy={f1(1320 + rnd(seed, i + 40) * 560)} rx={f1(20 + rnd(seed, i + 70) * 30)} ry={8} fill={snowShade} />)}
      {/* a lane of packed snow through the middle */}
      <path d="M 430 1270 L 650 1270 L 920 1920 L 160 1920 Z" fill={lit("#DCE3EC", time)} opacity={0.6} />
      {/* a lamp post with a lit lantern, far left */}
      <rect x={20} y={1300} width={10} height={200} fill={lit(C.ink, time)} />
      <rect x={6} y={1290} width={38} height={22} rx={5} fill={glow ? pane : lit(C.greyLight, time)} />
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

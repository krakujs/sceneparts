import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Suburb street: a row of detached houses with pitched roofs, chimneys, doors and lit windows, lawns and
// trees between them, a sidewalk, kerb and road. The middle of the lawn and sidewalk stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 52, glow = time === "dusk" || time === "night";
  const base = 1180;
  const palette = [p.houseColour ?? "#F3E3C7", "#CFE6F5", "#F9D9C4", "#D9EBD0"];
  const roofs = [C.redDark, C.brownDark, C.blueDark, C.greyDark];
  const houses = [
    { x: -20, w: 300, h: 360 }, { x: 290, w: 260, h: 330 }, { x: 560, w: 280, h: 380 }, { x: 850, w: 250, h: 340 },
  ];
  const House = ({ x, w, h, i }: { x: number; w: number; h: number; i: number }) => {
    const wall = lit(palette[i], time, true), roof = lit(roofs[i], time), top = base - h;
    return (
      <g>
        <rect x={x} y={top} width={w} height={h} fill={wall} />
        <path d={`M ${x - 18} ${top + 10} L ${x + w / 2} ${top - 150} L ${x + w + 18} ${top + 10} Z`} fill={roof} />
        <path d={`M ${x + w / 2} ${top - 150} L ${x + w + 18} ${top + 10} L ${x + w / 2 + 50} ${top + 10} Z`} fill={shade(roof, 0.15)} />
        <rect x={x + w * 0.7} y={top - 130} width={34} height={70} fill={lit(C.brownDark, time)} />
        <rect x={x + 30} y={top + 60} width={90} height={80} rx={6} fill={glow ? "#FFD66B" : lit("#CFE6F5", time)} />
        <rect x={x + 73} y={top + 60} width={6} height={80} fill={wall} />
        <rect x={x + w - 130} y={top + 60} width={90} height={80} rx={6} fill={glow ? "#FFD66B" : lit("#CFE6F5", time)} />
        <rect x={x + w - 83} y={top + 60} width={6} height={80} fill={wall} />
        <rect x={x + w / 2 - 36} y={top + 190} width={72} height={base - top - 190} rx={8} fill={lit(C.blueDark, time)} />
        <circle cx={x + w / 2 + 24} cy={top + 240} r={5} fill={C.yellow} />
        <rect x={x + 16} y={top + 150} width={w - 32} height={10} fill={shade(wall, 0.1)} />
      </g>
    );
  };
  return (
    <g>
      <Sky time={time} weather={weather} horizon={900} f={ff} seed={seed} />
      {/* tree between and behind houses */}
      {[[270, 720, 70], [1010, 700, 80]].map(([x, y, r], i) => (
        <g key={i}>
          <rect x={x - 9} y={y} width={18} height={base - y} fill={C.brownDark} />
          <circle cx={x} cy={y - r * 0.2} r={r} fill={lit(C.green, time)} />
        </g>
      ))}
      {houses.map((h, i) => <House key={i} x={h.x} w={h.w} h={h.h} i={i} />)}
      {/* lawns, driveways */}
      <rect x={0} y={base} width={1080} height={200} fill={lit("#8CC66E", time)} />
      {[[70, 1 + 0], [580, 2]].map(([x], i) => <rect key={i} x={x} y={base} width={150} height={150} fill={lit("#D5D9E0", time)} />)}
      {/* hedges along the front of the lawn */}
      {new Array(12).fill(0).map((_, i) => <circle key={i} cx={i * 95 + 20} cy={base + 20} r={34} fill={lit(C.greenDark, time)} />)}
      {/* sidewalk, kerb, road */}
      <rect x={0} y={1380} width={1080} height={50} fill={lit("#E4E9F2", time)} />
      {new Array(9).fill(0).map((_, i) => <rect key={i} x={i * 130 + 60} y={1380} width={4} height={50} fill={shade(lit("#E4E9F2", time), 0.15)} />)}
      <rect x={0} y={1430} width={1080} height={12} fill={lit("#F2F5FA", time)} />
      <rect x={0} y={1442} width={1080} height={478} fill={lit("#5D6578", time)} />
      {new Array(6).fill(0).map((_, i) => <rect key={i} x={((i * 220 - ff * 6) % 1320 + 1320) % 1320 - 120} y={1780} width={120} height={14} rx={7} fill={lit("#F4F1EA", time)} />)}
      {/* mailbox on a post at the right kerb */}
      {p.mailbox !== false && (
        <g>
          <rect x={922} y={1330} width={8} height={70} fill={C.brownDark} />
          <rect x={890} y={1284} width={72} height={52} rx={20} fill={lit(C.blue, time)} />
          <rect x={890} y={1316} width={72} height={8} fill={lit(C.blueDark, time)} />
          <rect x={906} y={1296} width={40} height={6} rx={3} fill={C.yellow} />
        </g>
      )}
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

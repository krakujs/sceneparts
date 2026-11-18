import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, Ground, WeatherFx, lit, asTime, asWeather } from "../backdrop/index";

// Countryside: rolling hills with patchwork fields, hedgerows, a far farmhouse, fences and a dirt path.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), seed = p.seed ?? 3;
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const green = L(p.grass ?? C.green), hedge = L(C.greenDark), sand = L("#E9D3A9");
  const fence = (x0: number, x1: number, k: string) => {
    const posts: React.ReactNode[] = [];
    for (let x = x0; x <= x1; x += 52) posts.push(<rect key={`${k}${x}`} x={x} y={1262} width={12} height={58} fill={L(C.brownDark)} />);
    return (
      <g>
        {posts}
        <rect x={x0} y={1280} width={x1 - x0} height={10} fill={L(C.brown)} />
        <rect x={x0} y={1300} width={x1 - x0} height={10} fill={L(C.brown)} />
      </g>
    );
  };
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1040} f={t} seed={seed} />
      <Hills y={1110} color={L("#6FB077")} amp={46} seed={seed + 2} waves={3} />
      {/* patchwork fields on the far hills */}
      <path d="M 0 1160 L 300 1150 L 262 1218 L 0 1232 Z" fill={L(C.lime)} />
      <path d="M 330 1138 L 620 1128 L 642 1192 L 350 1202 Z" fill={L("#E3C65A")} />
      <path d="M 676 1132 L 1080 1116 L 1080 1200 L 698 1190 Z" fill={L("#7DB75E")} />
      <path d="M 150 1222 L 430 1214 L 404 1262 L 118 1264 Z" fill={L("#A9D36E")} />
      {/* hedgerows along the field edges */}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={44 + i * 58} cy={1212} r={24} fill={hedge} />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={`r${i}`} cx={700 + i * 62} cy={1186} r={22} fill={hedge} />)}
      {/* far farmhouse */}
      <rect x={730} y={1050} width={96} height={64} fill={L("#F4E9D6")} />
      <path d="M 718 1054 L 778 1000 L 838 1054 Z" fill={L(C.red)} />
      <rect x={800} y={1010} width={14} height={30} fill={L(C.greyDark)} />
      <rect x={768} y={1078} width={20} height={36} fill={L(C.brownDark)} />
      <rect x={740} y={1068} width={20} height={20} fill={L(C.skyDeep)} />
      <rect x={800} y={1068} width={20} height={20} fill={L(C.skyDeep)} />
      <rect x={850} y={1060} width={10} height={60} fill={L(C.brownDark)} />
      <circle cx={856} cy={1040} r={34} fill={hedge} />
      {/* ground, path, fences */}
      <Ground y={1262} color={green} kind="grass" time={time} f={t} />
      <path d="M 470 1262 L 606 1262 Q 650 1520 820 1920 L 262 1920 Q 430 1520 470 1262 Z" fill={sand} />
      <rect x={0} y={1352} width={200} height={10} fill={shade(green, 0.12)} />
      <rect x={0} y={1420} width={200} height={10} fill={shade(green, 0.12)} />
      <rect x={880} y={1352} width={200} height={10} fill={shade(green, 0.12)} />
      <rect x={880} y={1420} width={200} height={10} fill={shade(green, 0.12)} />
      {fence(0, 200, "l")}
      {fence(880, 1080, "r")}
      {/* big tree at the right edge */}
      <rect x={994} y={1150} width={12} height={110} fill={L(C.brownDark)} />
      <circle cx={1000} cy={1120} r={70} fill={L(C.greenDark)} />
      <WeatherFx kind={weather} f={t} seed={seed} />
    </g>
  );
}

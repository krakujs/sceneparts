import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather, mix } from "../backdrop/index";

// Haunted house background, cartoon-cute: a purple room with cobwebs, two blank silhouette portraits, creaky stairs,
// candles on a side table, a ghostly moonlit Window and an optional friendly ghost. Stays cute, never gory.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "night"), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const wall = p.wall ?? "#4B4170", frame = L(C.brownDark), floorY = 1360;
  const ghost = p.ghost !== false, cobwebs = p.cobwebs !== false;
  const glow = "#D9FFE8";
  const web = (x: number, y: number, flip: boolean) => (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M 0 0 L 150 0 L 0 150 Z" fill={L(C.white)} opacity={0.12} />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={0} y1={0} x2={150 - i * 36} y2={i * 36 + 0} stroke={L(C.white)} strokeWidth={2} opacity={0.5} />)}
      <path d="M 40 0 Q 40 30 60 40 M 60 40 Q 80 20 100 50 M 20 40 Q 46 56 58 80" stroke={L(C.white)} strokeWidth={2} fill="none" opacity={0.5} />
    </g>
  );
  const portrait = (x: number, y: number, tone: string) => (
    <g>
      <rect x={x} y={y} width={150} height={190} rx={8} fill={frame} />
      <rect x={x + 16} y={y + 16} width={118} height={158} fill={L(tone)} />
      <circle cx={x + 75} cy={y + 90} r={34} fill={shade(L(tone), 0.22)} />
      <path d={`M ${x + 30} ${y + 170} Q ${x + 30} ${y + 124} ${x + 75} ${y + 124} Q ${x + 120} ${y + 124} ${x + 120} ${y + 170} Z`} fill={shade(L(tone), 0.22)} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={wall} floor={p.floor ?? "#6E5A4A"} floorY={floorY} floorKind="boards" panels={false} />
      {/* moonlit window with a faint green ghostly beam on the floor */}
      <Window x={110} y={330} w={240} h={320} time={time} weather={weather} f={drift ? f : 0} view="trees" frame={C.greyLight} curtains={L(C.greyDark)} />
      <path d="M 110 650 L 350 650 L 470 1340 L 0 1340 Z" fill={glow} opacity={0.08 + 0.03 * Math.sin(f / 30)} />
      {/* blank silhouette portraits */}
      {portrait(420, 300, "#BFA9D9")}
      {portrait(600, 360, "#E6C9E0")}
      {/* cobwebs in the top corners */}
      {cobwebs && web(0, 0, false)}
      {cobwebs && web(1080, 0, true)}
      {/* creaky stairs on the right */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={690 + i * 70} y={1360 - 80 - i * 56} width={70} height={80 + i * 56} fill={L(shade(C.brown, 0.2))} />
      ))}
      <rect x={690} y={1380 - 80 - 4 * 56} width={320} height={10} fill={L(C.brownDark)} />
      <rect x={1000} y={1000} width={10} height={300} fill={L(C.brownDark)} />
      <rect x={690} y={1000} width={320} height={10} fill={L(C.brownDark)} />
      {/* candles on a side table, left */}
      <rect x={40} y={1190} width={190} height={18} rx={5} fill={L(C.brown)} />
      <rect x={60} y={1208} width={14} height={150} fill={L(C.brownDark)} />
      <rect x={200} y={1208} width={14} height={150} fill={L(C.brownDark)} />
      {[[80, 1120], [130, 1100], [180, 1130]].map(([x, h], i) => (
        <g key={i}>
          <rect x={x - 12} y={h} width={24} height={1190 - h} rx={4} fill={L("#FFF6D8")} />
          <path d={`M ${x} ${h - 34 + Math.sin(f / 6 + i) * 2} Q ${x + 9} ${h - 10} ${x} ${h - 2} Q ${x - 9} ${h - 10} ${x} ${h - 34 + Math.sin(f / 6 + i) * 2} Z`} fill={L(C.yellow)} />
          <circle cx={x} cy={h - 14} r={30} fill="#FFE9A8" opacity={0.18} />
        </g>
      ))}
      {/* friendly ghost, floating above the stairs */}
      {ghost && (
        <g transform={`translate(0 ${drift ? Math.sin(f / 22) * 8 : 0})`}>
          <path d="M 800 720 Q 800 620 880 620 Q 960 620 960 720 L 960 790 Q 944 772 928 790 Q 912 772 896 790 Q 880 772 864 790 Q 848 772 832 790 Q 816 772 800 790 Z" fill={mix("#FFFFFF", "#D9FFE8", 0.4)} opacity={0.95} />
          <circle cx={848} cy={700} r={7} fill={C.ink} />
          <circle cx={912} cy={700} r={7} fill={C.ink} />
          <ellipse cx={880} cy={740} rx={10} ry={7} fill={C.pink} opacity={0.7} />
        </g>
      )}
    </g>
  );
}

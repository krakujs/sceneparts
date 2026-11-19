import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, Far, Tile, TileRect, Tint, Icon, asTime, snap } from "../backdrop/index";

// Platform level: side-scrolling platformer stage (reference for jump-and-collect levels). Sky, far hills, a grass
// ground with two pits, floating grass / brick / block platforms at different heights and bobbing coins.

const PLATS: { x: number; y: number; w: number; t: "grass" | "block" | "bricks2" }[] = [
  { x: 72, y: 1296, w: 288, t: "grass" },
  { x: 600, y: 1056, w: 288, t: "bricks2" },
  { x: 96, y: 780, w: 192, t: "block" },
  { x: 576, y: 540, w: 288, t: "grass" },
  { x: 288, y: 240, w: 192, t: "bricks2" },
];
const PITS: [number, number][] = [[300, 396], [780, 876]];
const SEGS: [number, number][] = [[0, 300], [396, 780], [876, 1080]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const bob = (p.anim ?? "bob") === "bob";
  const up = (i: number) => (bob ? (Math.floor((p.f + i * 6) / 12) % 2) * 12 : 0);
  let coin = 0;
  return (
    <g>
      <PixSky time={time} to={gy} f={p.f} clouds={3} seed={3} drift={bob} />
      <Far kind="hills" base={gy} time={time} seed={4} maxH={300} />
      {PITS.map(([a, b]) => (
        <rect key={"pit" + a} x={a} y={gy - 48} width={b - a} height={1920 - gy + 48} fill="#23305e" />
      ))}
      {SEGS.map(([a, b]) => (
        <g key={"seg" + a}>
          <TileRect tile="grass" x={a} y={gy} w={b - a} h={96} cell={12} />
          <TileRect tile="dirt" x={a} y={gy + 96} w={b - a} h={1920 - gy - 96} cell={12} />
        </g>
      ))}
      <Tile tile="bush" x={984} y={gy - 96} cell={12} />
      {PLATS.map((pl, i) => (
        <g key={"pl" + i}>
          <TileRect tile={pl.t} x={pl.x} y={pl.y} w={pl.w} h={96} cell={12} />
          {Array.from({ length: Math.floor(pl.w / 96) }).map((_, k) => {
            const c = coin++;
            return <Icon key={k} name="coin" x={pl.x + 36 + k * 96} y={pl.y - 84 - up(c)} cell={6} />;
          })}
        </g>
      ))}
      <Tint time={time} y={gy} />
    </g>
  );
}

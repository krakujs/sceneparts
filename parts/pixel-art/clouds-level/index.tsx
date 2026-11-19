import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf } from "../style/index";
import { PixSky, TileRect, Tint, asTime, snap } from "../backdrop/index";

// Clouds level: sky stage (reference for air levels). Cloud-tile platforms float at different heights over a sea of
// clouds, with a sun, and small pixel birds that flap and fly across the sky. Centre stage above the sea stays open.

const PLATS = [
  { x: 120, y: 1248, w: 288 },
  { x: 600, y: 960, w: 240 },
  { x: 96, y: 672, w: 288 },
  { x: 552, y: 384, w: 192 },
];
const BIRD_A = ["k.....k", ".k...k.", "..kkk.."];
const BIRD_B = ["..k.k..", ".k.k.k.", "k..k..k"];
const BIRDS = [{ x: 180, y: 360 }, { x: 760, y: 280 }, { x: 900, y: 600 }];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const anim = (p.anim ?? "drift") === "drift";
  const flap = anim ? Math.floor(p.f / 10) % 2 : 0;
  return (
    <g>
      <PixSky time={time} to={gy} f={p.f} clouds={3} seed={7} drift={anim} />
      {PLATS.map((pl, i) => (
        <TileRect key={i} tile="cloud" x={pl.x} y={pl.y} w={pl.w} h={96} cell={12} />
      ))}
      <rect x={0} y={gy} width={1080} height={1920 - gy} fill="#dfe9f5" />
      <TileRect tile="cloud" x={0} y={gy - 48} w={1080} h={96} cell={12} />
      {BIRDS.map((b, i) => {
        const x = anim ? ((b.x + p.f * (1 + i * 0.5)) % 1200) - 60 : b.x;
        return <Pixels key={i} grid={gridOf(flap ^ (i % 2) ? BIRD_A : BIRD_B)} px={18} x={x} y={b.y} />;
      })}
      <Tint time={time} y={gy} />
    </g>
  );
}

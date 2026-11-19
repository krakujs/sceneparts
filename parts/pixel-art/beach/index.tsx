import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, PixTree, TileRect, Tint, asTime, snap } from "../backdrop/index";
import { Pixels, gridOf } from "../style/index";

// Beach: a sea with rolling waves under a sky, a foam line, a sandy shore with a striped parasol and a palm.
// anim "waves" swaps the water frames and moves the crests from p.f. The centre stage stays open for sprites.

const PARASOL = gridOf([
  "..rwrwrwr..",
  ".rwrwrwrwr.",
  "rwrwrwrwrwr",
  ".....k.....",
  ".....k.....",
  ".....k.....",
  ".....k.....",
  ".....k.....",
]);
const PARASOL_PAL = { r: "#d2403f", w: "#f5f1e8", k: "#5a3a22" };
const HORIZON = 780;
const SHORE = 1320;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 6;
  const waves = (p.anim ?? "waves") === "waves";
  const f = waves ? p.f : 0;
  const crestY = [880, 1000, 1140, 1240];
  return (
    <g>
      <PixSky time={time} to={HORIZON} f={f} clouds={2} seed={seed} drift={waves} />
      <TileRect tile="water" x={0} y={HORIZON} w={1080} h={SHORE - HORIZON} cell={12} f={f} />
      <TileRect tile="waterTop" x={0} y={HORIZON} w={1080} h={96} cell={12} f={f} />
      {crestY.map((y, i) => (
        <TileRect key={"c" + i} tile="waterTop" x={0} y={y + (i % 2) * 24} w={1080} h={72} cell={12} f={f} />
      ))}
      <TileRect tile="snowTop" x={0} y={SHORE - 48} w={1080} h={60} cell={12} />
      <TileRect tile="sand" x={0} y={SHORE + 12} w={1080} h={1920 - SHORE - 12} cell={12} />
      <Pixels grid={PARASOL} px={18} pal={PARASOL_PAL} x={740} y={gy - 8 * 18 - 36} />
      <PixTree x={96} y={gy + 24} cell={24} kind="palm" />
      <Tint time={time} y={HORIZON} />
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, rnd, snap } from "../backdrop/index";
import { Pixels, PAL, gridOf, outlined } from "../style/index";

// Brick wall: full-frame red brick wall with a few darker and cracked bricks, a stone ground strip from floorY
// down, and wall torches (anim "torch") that flicker from p.f. The centre stage stays clear for sprites.

const CRACK = gridOf(["k....", "kk...", ".kk..", "..kk.", "...kk", "....k"]);
const TORCH = [
  gridOf(["..y...", ".yoy..", ".oyo..", "oryro.", ".ror..", "..r...", "..u...", ".uuu..", "..u...", "..u..."]),
  gridOf(["...y..", "..yo..", ".oyyo.", ".oyro.", "..ror.", "..r...", "..u...", ".uuu..", "..u...", "..u..."]),
];
const DARK = { B: "#6e2a20", R: "#43191a", M: "#4d3f3a" };
const STONE = { U: "#7a8090", S: "#5f6574", T: "#3d4250" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const seed = p.seed ?? 4;
  const torch = (p.anim ?? "torch") === "torch";
  const fr = torch ? Math.floor(p.f / 6) % 2 : 0;
  const glow = torch ? 0.16 + 0.07 * fr : 0.16;
  const darks = Array.from({ length: 5 }, (_, i) => ({
    x: snap(rnd(seed, i) * 900),
    y: snap(rnd(seed, i + 10) * (fy - 200)),
  }));
  const cracks = Array.from({ length: 9 }, (_, i) => ({
    x: snap(rnd(seed, i + 30) * 1000),
    y: snap(rnd(seed, i + 50) * (fy - 60)),
  }));
  const flame = (x: number) => (
    <g key={"t" + x}>
      <circle cx={x + 60} cy={fy - 700} r={220} fill="#f08a3c" opacity={glow} />
      <Pixels grid={outlined(TORCH[fr])} px={20} x={x} y={fy - 800} />
    </g>
  );
  return (
    <g>
      <TileRect tile="brick" x={0} y={0} w={1080} h={fy} cell={12} />
      {darks.map((d, i) => (
        <TileRect key={"d" + i} tile="brick" x={d.x} y={d.y} w={96} h={96} cell={12} pal={DARK} ox={0} oy={0} />
      ))}
      {cracks.map((c, i) => (
        <Pixels key={"c" + i} grid={CRACK} px={12} x={c.x} y={c.y} />
      ))}
      <TileRect tile="stone" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={STONE} />
      <rect x={0} y={fy} width={1080} height={12} fill={PAL.k} />
      {flame(60)}
      {flame(920)}
    </g>
  );
}

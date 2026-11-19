import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { TileRect, TP, snap } from "../backdrop/index";

// Dungeon: pixel-art background preset (reference for indoor scenes). Full-frame dark block wall, a barred arch
// door at the back, two flickering wall torches, hanging chains and a stone floor from floorY down.

const ARCH = [
  "....KKKKKKKK....",
  "..KKHHHHHHHHKK..",
  ".KHHkkkkkkkkHHK.",
  "KHHkkgkkgkkgkHHK",
  "KHkkkgkkgkkgkkHK",
  "KHkkkgkkgkkgkkHK",
  "KHkggggggggggkHK",
  "KHkkkgkkgkkgkkHK",
  "KHkkkgkkgkkgkkHK",
  "KHkkkgkkgkkgkkHK",
  "KHkggggggggggkHK",
  "KHkkkgkkgkkgkkHK",
  "KHkkkgkkgkkgkkHK",
  "KHkkkgkkgkkgkkHK",
];
const TORCH = [
  ["..y...", ".yoy..", ".oyo..", "oryro.", ".ror..", "..r...", "..u...", ".uuu..", "..u...", "..u..."],
  ["...y..", "..yo..", ".oyyo.", ".oyro.", "..ror.", "..r...", "..u...", ".uuu..", "..u...", "..u..."],
];
const CHAIN = ["g.", ".g", "g.", ".g", "g.", ".g", "g.", ".g", "g.", ".g", "gg", "gg"];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "flicker") === "flicker";
  const fr = on ? Math.floor(p.f / 6) % 2 : 0;
  const glow = on ? 0.18 + 0.06 * (Math.floor(p.f / 6) % 2) : 0.2;
  const torch = (x: number) => (
    <g key={x}>
      <circle cx={x + 60} cy={fy - 700} r={200} fill="#f08a3c" opacity={glow} />
      <Pixels grid={outlined(gridOf(TORCH[fr]))} px={20} x={x} y={fy - 800} />
    </g>
  );
  return (
    <g>
      <TileRect tile="dungeon" x={0} y={0} w={1080} h={fy} cell={12} />
      <rect x={0} y={0} width={1080} height={fy} fill="#0d1030" opacity={0.25} />
      <Pixels grid={gridOf(ARCH)} px={30} pal={TP} x={300} y={fy - ARCH.length * 30} />
      {torch(80)}
      {torch(880)}
      <Pixels grid={gridOf(CHAIN)} px={12} x={260} y={0} />
      <Pixels grid={gridOf(CHAIN)} px={12} x={780} y={0} />
      <TileRect tile="stone" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ U: "#7a8090", S: "#5f6574", T: "#3d4250" }} />
      <rect x={0} y={fy} width={1080} height={12} fill={TP.K} />
    </g>
  );
}

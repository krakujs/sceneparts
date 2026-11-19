import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined, makeGrid, fill } from "../style/index";
import type { Grid } from "../style/index";
import { PixSky, Far, TileRect, Tile, PixTree, Tint, TP, asTime, snap, rnd } from "../backdrop/index";

// Temple: pixel-art jungle temple. A generic stepped stone temple with a columned shrine and a dark doorway,
// standing in a grassy clearing with jungle trees around it and flickering torches on the base.

const TORCH = [
  ["..y...", ".yoy..", ".oyo..", "oryro.", ".ror..", "..r...", "..u...", ".uuu..", "..u...", "..u..."],
  ["...y..", "..yo..", ".oyyo.", ".oyro.", "..ror.", "..r...", "..u...", ".uuu..", "..u...", "..u..."],
];

const buildTemple = (seed: number): Grid => {
  const T = makeGrid(36, 30);
  fill(T, 0, 24, 36, 6, "S");
  fill(T, 4, 20, 28, 4, "S");
  fill(T, 8, 16, 20, 4, "S");
  fill(T, 0, 24, 36, 1, "U");
  fill(T, 4, 20, 28, 1, "U");
  fill(T, 8, 16, 20, 1, "U");
  fill(T, 0, 29, 36, 1, "T");
  // moss patches on the tiers
  for (let r = 17; r < 30; r++) for (let q = 0; q < 36; q++) if (T[r][q] === "S" && rnd(seed, r * 40 + q) < 0.06) T[r][q] = "f";
  fill(T, 10, 8, 16, 8, "N");
  // pediment
  for (let r = 0; r < 5; r++) fill(T, Math.round(17.5 - (1 + r * 2.5)), 3 + r, Math.round(2 * (1 + r * 2.5)), 1, "T");
  fill(T, 8, 7, 20, 1, "U");
  // columns (two wide) with a shaded right edge
  for (const c of [10, 14, 20, 24]) {
    fill(T, c, 9, 2, 7, "M");
    fill(T, c + 1, 9, 1, 7, "O");
  }
  fill(T, 16, 11, 4, 5, "k");
  fill(T, 15, 26, 6, 4, "k");
  fill(T, 15, 29, 6, 1, "U");
  return T;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 10;
  const animOn = (p.anim ?? "torches") !== "none";
  const f = animOn ? p.f ?? 0 : 0;
  const hz = gy - 300;
  const tx = 108, px = 24;
  const T = outlined(buildTemple(seed));
  const base = hz;
  const torch = (key: string, x: number) => {
    const fr = animOn ? Math.floor(f / 6) % 2 : 0;
    const glow = animOn ? 0.2 + 0.08 * fr : 0.22;
    return (
      <g key={key}>
        <circle cx={x + 30} cy={base - 420} r={170} fill="#f08a3c" opacity={glow} />
        <Pixels grid={outlined(gridOf(TORCH[fr]))} px={20} pal={TP} x={x} y={base - 400} />
      </g>
    );
  };
  return (
    <g>
      <PixSky time={time} to={hz} f={f} clouds={2} seed={seed} drift={animOn} />
      <Far kind="trees" base={hz + 20} time={time} seed={seed} maxH={420} />
      <TileRect tile="grass" x={0} y={hz} w={1080} h={1920 - hz} f={f} />
      <Pixels grid={T} px={px} pal={TP} x={tx - px} y={base - 30 * px - px} />
      {torch("t1", 40)}
      {torch("t2", 960)}
      <PixTree x={60} y={gy + 40} cell={26} kind="palm" />
      <PixTree x={1030} y={gy + 40} cell={26} kind="round" />
      <Tile tile="bush" x={20} y={hz + 60} cell={12} />
      <Tile tile="bush" x={900} y={hz + 60} cell={12} />
      <Tint time={time} y={0} />
    </g>
  );
}

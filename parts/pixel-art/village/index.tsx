import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined, makeGrid, fill } from "../style/index";
import type { Grid } from "../style/index";
import { PixSky, Far, TileRect, Tint, TP, asTime, snap } from "../backdrop/index";

// Village: pixel-art outdoor background. Sky, far trees, grass fields and a sandy path; small houses with
// pitched roofs at the edges (one with smoking chimney), a well and distant roofs on the horizon.

const house = (w: number, wall: string, roof: string, win: string, chimney: boolean): Grid => {
  const R = Math.ceil(w / 2) + 1;
  const g = makeGrid(w, R + 6);
  const c = (w - 1) / 2;
  for (let r = 0; r < R; r++) {
    const hw = Math.round((r * (w / 2)) / (R - 1));
    for (let q = Math.round(c - hw); q <= Math.round(c + hw); q++) if (q >= 0 && q < w) g[r][q] = roof;
  }
  if (chimney) fill(g, w - 3, 0, 2, R - 2, "S");
  fill(g, 0, R, w, 6, wall);
  fill(g, 1, R + 1, 2, 2, win);
  fill(g, w - 3, R + 1, 2, 2, win);
  fill(g, Math.floor(c) - 1, R + 3, 2, 3, "u");
  return g;
};

const WELL = gridOf([
  "BBBBBBBB",
  "RRRRRRRR",
  ".x....x.",
  ".x....x.",
  ".x....x.",
  "SSSSSSSS",
  "SccccccS",
  "TTTTTTTT",
]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 1;
  const animOn = (p.anim ?? "smoke") !== "none";
  const f = animOn ? p.f ?? 0 : 0;
  const horizon = gy - 420;
  // A house: its bottom edge sits on `base`; the outline adds one cell all round.
  const place = (key: string, x: number, base: number, w: number, px: number, wall: string, roof: string, win: string, chim = false) => {
    const g = house(w, wall, roof, win, chim);
    return <Pixels key={key} grid={outlined(g)} px={px} pal={TP} x={x - px} y={base - g.length * px - px} />;
  };
  const chimTop = gy - 276;
  const smoke = [0, 1, 2, 3].map((i) => {
    const t = (f / 2 + i * 30) % 120;
    return <rect key={"s" + i} x={snap(1002 + (i % 2) * 12 + Math.sin((t + i) / 14) * 12)} y={snap(chimTop - 24 - t * 1.6)} width={24} height={24} fill="#f5f1e8" opacity={0.85 * (1 - t / 120)} />;
  });
  return (
    <g>
      <PixSky time={time} to={horizon} f={f} clouds={2} seed={seed} drift={animOn} />
      <Far kind="trees" base={horizon} time={time} seed={seed + 2} maxH={200} />
      <TileRect tile="grass" x={0} y={horizon} w={1080} h={gy - horizon} f={f} />
      {place("b1", 420, horizon + 24, 9, 12, "M", "R", "c")}
      {place("b2", 580, horizon + 24, 7, 12, "I", "B", "y")}
      <TileRect tile="path" x={0} y={gy} w={1080} h={1920 - gy} f={f} />
      {place("h1", 18, gy - 60, 9, 18, "M", "B", "c")}
      {place("h2", 900, gy - 60, 9, 18, "N", "r", "y", true)}
      {smoke}
      <Pixels grid={outlined(WELL)} px={18} pal={TP} x={850 - 18} y={gy + 40 - 8 * 18 - 18} />
      <Tint time={time} y={0} />
    </g>
  );
}

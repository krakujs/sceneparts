import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined, makeGrid } from "../style/index";
import type { Grid } from "../style/index";
import { TileRect, TP, snap, rnd } from "../backdrop/index";

// Underwater: pixel-art sea floor. Deep blue water tiles, stepped light rays from the surface, sandy floor with
// rocks, swaying seaweed and bubbles rising from p.f. The centre water stays clear for sprites.

/** Rock: a filled ellipse with a lit upper-left edge. */
const rock = (rx: number, ry: number): Grid => {
  const g = makeGrid(rx * 2 + 1, ry * 2 + 1);
  for (let r = 0; r <= 2 * ry; r++)
    for (let q = 0; q <= 2 * rx; q++) {
      const dx = (q - rx) / rx, dy = (r - ry) / ry;
      if (dx * dx + dy * dy <= 1) g[r][q] = dx + dy < -0.5 ? "U" : dx + dy > 0.6 ? "T" : "S";
    }
  return g;
};
const ROCK = rock(4, 3);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 7;
  const animOn = (p.anim ?? "bubbles") !== "none";
  const f = animOn ? p.f ?? 0 : 0;
  const rays = [0, 1, 2, 3, 4].map((k) => {
    const x0 = 80 + k * 200 + (animOn ? Math.round(Math.sin((f + k * 30) / 40) * 1) * 12 : 0);
    return Array.from({ length: Math.floor(gy / 96) }).map((_, j) => (
      <rect key={`r${k}-${j}`} x={x0 + j * 24} y={j * 96} width={120 + k * 24} height={96} fill="#8fd0f8" opacity={0.18 + 0.03 * (j % 3)} />
    ));
  });
  const seaweed = [60, 170, 880, 1000].map((x, i) => {
    const h = 5 + (i % 3);
    return Array.from({ length: h }).map((_, j) => {
      const sway = animOn ? Math.round(Math.sin((f + i * 17 + j * 8) / 22) * 1) * 12 : 0;
      return <rect key={`w${i}-${j}`} x={x + sway} y={gy - 36 - j * 48} width={24} height={48} fill={j % 2 ? "#4caf50" : "#2e6b45"} />;
    });
  });
  const bubbles = Array.from({ length: 14 }).map((_, i) => {
    const y = gy - 60 - ((animOn ? f * 3 : 0) + i * 137) % (gy - 80);
    const x = snap(rnd(seed, i) * 1000);
    const s = i % 3 === 0 ? 24 : 12;
    return <rect key={"b" + i} x={x} y={snap(y)} width={s} height={s} fill="#bfe8f6" opacity={0.75} />;
  });
  return (
    <g>
      <TileRect tile="water" x={0} y={0} w={1080} h={gy} f={f} />
      <rect x={0} y={0} width={1080} height={420} fill="#0b3d6e" opacity={0.25} />
      {rays}
      <TileRect tile="sand" x={0} y={gy} w={1080} h={1920 - gy} f={0} />
      <Pixels grid={outlined(ROCK)} px={24} pal={TP} x={40} y={gy - 96} />
      <Pixels grid={outlined(rock(3, 2))} px={24} pal={TP} x={930} y={gy - 48} />
      {seaweed}
      {bubbles}
    </g>
  );
}

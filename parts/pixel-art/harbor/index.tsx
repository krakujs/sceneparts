import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined, makeGrid, fill } from "../style/index";
import type { Grid } from "../style/index";
import { PixSky, TileRect, Tint, TP, asTime, snap } from "../backdrop/index";

// Harbor: pixel-art sea harbor. Blocky sea with waves, a distant lighthouse on the horizon, moored boats that bob
// from p.f, a wooden pier in front with crates and barrels. The water between pier and horizon stays open.

const lighthouse = (): Grid => {
  const g = makeGrid(7, 18);
  fill(g, 1, 0, 5, 1, "k");
  fill(g, 2, 1, 3, 1, "y");
  fill(g, 1, 2, 5, 1, "k");
  for (let r = 3; r < 16; r++) {
    const w = r < 9 ? 5 : 4;
    const x0 = Math.floor((7 - w) / 2);
    fill(g, x0, r, w, 1, r % 2 ? "w" : "r");
  }
  fill(g, 0, 16, 7, 2, "S");
  return g;
};
const BOAT = gridOf([
  "....w..",
  "....ww.",
  "....www",
  "....www",
  "....ww.",
  "rrrrrrr",
  ".uuuuu.",
]);
const CRATE = gridOf(["QQQQ", "QxxQ", "QxxQ", "QQQQ"]);
const BARREL = gridOf([".uuu.", "uxxxu", "uxxxu", "uxxxu", ".uuu."]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 13;
  const bob = (p.anim ?? "bob") !== "none";
  const f = bob ? p.f ?? 0 : 0;
  const hz = gy - 600;
  const boats = [
    { x: 600, y: hz + 240, s: 18 },
    { x: 120, y: hz + 170, s: 12 },
    { x: 840, y: hz + 320, s: 18 },
  ];
  return (
    <g>
      <PixSky time={time} to={hz} f={f} clouds={3} seed={seed} drift={bob} />
      <TileRect tile="waterTop" x={0} y={hz} w={1080} h={96} f={f} />
      <TileRect tile="water" x={0} y={hz + 96} w={1080} h={gy - hz - 96} f={f} />
      <Pixels grid={outlined(lighthouse())} px={12} pal={TP} x={800 - 12} y={hz - 18 * 12 - 12} />
      <circle cx={812} cy={hz - 18 * 12 + 24} r={80} fill="#f7d154" opacity={bob ? 0.2 + 0.1 * (Math.floor(f / 10) % 2) : 0.25} />
      {boats.map((b, i) => {
        const dy = bob ? Math.round(Math.sin((f + i * 25) / 14)) * 12 : 0;
        return (
          <g key={"boat" + i} transform={`translate(0 ${dy})`}>
            <Pixels grid={outlined(BOAT)} px={b.s} pal={TP} x={b.x - b.s} y={b.y - 7 * b.s - b.s} />
          </g>
        );
      })}
      <TileRect tile="wood" x={0} y={gy - 60} w={1080} h={1920 - gy + 60} f={0} />
      <Pixels grid={outlined(CRATE)} px={24} pal={TP} x={40} y={gy - 60 - 4 * 24 - 24} />
      <Pixels grid={outlined(CRATE)} px={24} pal={TP} x={100} y={gy - 60 - 4 * 24 - 24} />
      <Pixels grid={outlined(BARREL)} px={24} pal={TP} x={930} y={gy - 60 - 5 * 24 - 24} />
      <Pixels grid={outlined(BARREL)} px={24} pal={TP} x={980} y={gy - 60 - 5 * 24 - 24} />
      <Tint time={time} y={0} />
    </g>
  );
}

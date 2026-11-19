import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, Far, GroundBand, TileRect, Tint, asTime, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf } from "../style/index";

// Grass field: open meadow background. Sky, distant hills, a lawn tile ground with flowers and grass tufts.
// Flowers and tufts sit on the lawn below the ground line, so the centre stage stays clear for sprites.

const FLOWER_A = gridOf([".m.", "mym", ".m.", ".f.", ".f."]);
const FLOWER_B = gridOf([".w.", "wyw", ".w.", ".f.", ".f."]);
const TUFT = gridOf(["e.e.e", "eeeee", "fefef"]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 3;
  const drift = (p.anim ?? "drift") === "drift";
  const f = drift ? p.f : 0;
  const flowers = Array.from({ length: 46 }, (_, i) => ({
    x: snap(rnd(seed, i) * 1056),
    y: snap(gy - 200 + rnd(seed, i + 100) * (1800 - gy + 160)),
    a: i % 3 !== 0,
  }));
  const tufts = Array.from({ length: 40 }, (_, i) => ({
    x: snap(rnd(seed, i + 200) * 1056),
    y: snap(gy - 170 + rnd(seed, i + 300) * (1860 - gy + 150)),
  }));
  const sway = (i: number) => (drift ? (Math.floor((p.f + i * 9) / 20) % 2) * 12 : 0);
  return (
    <g>
      <PixSky time={time} to={gy} f={f} clouds={3} seed={seed} drift={drift} />
      <Far kind="hills" base={gy} time={time} seed={seed + 2} maxH={300} />
      <Far kind="hills" base={gy} time={time} seed={seed + 7} maxH={140} />
      <TileRect tile="grass" x={0} y={gy - 216} w={1080} h={24} cell={12} f={f} />
      <TileRect tile="lawn" x={0} y={gy - 192} w={1080} h={192} cell={12} f={f} />
      <GroundBand y={gy} top="lawn" body="lawn" />
      {flowers.map((fl, i) => (
        <Pixels key={"f" + i} grid={fl.a ? FLOWER_A : FLOWER_B} px={12} x={fl.x} y={fl.y} />
      ))}
      {tufts.map((t, i) => (
        <Pixels key={"t" + i} grid={TUFT} px={12} x={t.x + sway(i)} y={t.y} />
      ))}
      <Tint time={time} y={gy} />
    </g>
  );
}

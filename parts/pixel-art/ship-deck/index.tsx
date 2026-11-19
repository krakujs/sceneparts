import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined, makeGrid, fill } from "../style/index";
import type { Grid } from "../style/index";
import { PixSky, TileRect, Tint, TP, asTime, snap } from "../backdrop/index";

// Ship deck: pixel-art wooden deck of a sailing ship. A central mast with two square sails that flutter from p.f,
// stepped rigging ropes, a wooden rail with the sea and sky beyond, and planked deck from groundY down.

/** A square sail as one grid: 'w' cloth, 'g' shaded right edge, 'd' seams; each row shifts by `shift` cells. */
const sailGrid = (W: number, H: number, shifts: number[]): Grid => {
  const g = makeGrid(W + 4, H);
  for (let r = 0; r < H; r++) {
    const x0 = 1 + shifts[r];
    fill(g, x0, r, W, 1, r % 4 === 3 ? "U" : "w");
    fill(g, x0 + W - 2, r, 2, 1, "g");
  }
  return g;
};

const BARREL = gridOf([".QQQQ.", "QxxxxQ", "QxxxxQ", "QQQQQQ", "QxxxxQ", ".QQQQ."]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 14;
  const flap = (p.anim ?? "sail") !== "none";
  const f = flap ? p.f ?? 0 : 0;
  const hz = gy - 560;
  const mastX = 510;
  const sail = (key: string, x: number, y: number, W: number, H: number) => {
    const puff = flap ? Math.round(Math.sin(f / 15)) : 0;
    const shifts = Array.from({ length: H }).map((_, r) => Math.round((2 + puff) * Math.sin((Math.PI * r) / (H - 1))));
    return <Pixels key={key} grid={outlined(sailGrid(W, H, shifts))} px={24} pal={TP} x={x - 24} y={y - 24} />;
  };
  const ropes = Array.from({ length: 36 }).map((_, k) => {
    const t = k / 36;
    return (
      <React.Fragment key={"rope" + k}>
        <rect x={snap(mastX - t * 450)} y={snap(70 + t * (gy - 280 - 70))} width={6} height={6} fill="#c9874f" />
        <rect x={snap(mastX + 36 + t * 470)} y={snap(70 + t * (gy - 280 - 70))} width={6} height={6} fill="#c9874f" />
      </React.Fragment>
    );
  });
  return (
    <g>
      <PixSky time={time} to={hz} f={f} clouds={2} seed={seed} drift={flap} />
      <TileRect tile="waterTop" x={0} y={hz} w={1080} h={72} f={f} />
      <TileRect tile="water" x={0} y={hz + 72} w={1080} h={gy - 200 - hz - 72} f={f} />
      <rect x={mastX} y={70} width={36} height={gy - 40 - 70} fill="#7a4a2b" />
      <rect x={276} y={260} width={528} height={24} fill="#7a4a2b" />
      <rect x={300} y={640} width={480} height={20} fill="#7a4a2b" />
      {sail("s1", 324, 284, 18, 14)}
      {sail("s2", 348, 660, 16, 11)}
      <Pixels grid={outlined(gridOf(["rrr", "rrr"]))} px={24} pal={TP} x={mastX + 6} y={36} />
      {ropes}
      <TileRect tile="wood" x={0} y={gy} w={1080} h={1920 - gy} f={0} />
      <rect x={0} y={gy - 200} width={1080} height={24} fill="#c9874f" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={"post" + i} x={i * 96 + 36} y={gy - 176} width={24} height={176} fill="#a06c44" />
      ))}
      <rect x={0} y={gy - 110} width={1080} height={12} fill="#a06c44" />
      <Pixels grid={outlined(BARREL)} px={24} pal={TP} x={40} y={gy + 40} />
      <Pixels grid={outlined(BARREL)} px={24} pal={TP} x={960} y={gy + 40} />
      <Tint time={time} y={0} />
    </g>
  );
}

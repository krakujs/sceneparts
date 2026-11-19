import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, Pixels, gridOf, outlined } from "../style/index";
import { PixSky, Far, TileRect, TP, rnd, asTime, snap } from "../backdrop/index";

// Ice level: frozen stage (reference for cold levels). A frosted ice ceiling with icicles, snowy and ice platforms,
// ice crystals on the ground and snow falling from p.f. Centre stage stays open above the snowy ground.

const PLATS: { x: number; y: number; w: number; t: "ice" | "snowTop" }[] = [
  { x: 96, y: 1248, w: 288, t: "ice" },
  { x: 600, y: 960, w: 288, t: "snowTop" },
  { x: 120, y: 672, w: 240, t: "ice" },
  { x: 600, y: 384, w: 240, t: "snowTop" },
];
const ICICLES: string[][] = [
  ["IJI", "IJI", "IJ.", "J..", "J.."],
  ["IJI", "IJI", "IJI", "IJ.", "J.."],
  ["IJI", "IJ.", "J.."],
];
const ICE_PAL = { I: "#8fd0f0", J: "#3d8fc4", w: "#e8f7ff", Z: "#ffffff" };
const CRYSTAL = [".V.", "VIV", "VJV", ".J."];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const on = (p.anim ?? "snow") === "snow";
  const ice = { ...TP };
  return (
    <g>
      <PixSky time={time} to={gy} f={p.f} clouds={2} seed={8} drift={on} />
      <Far kind="mountains" base={gy} time={time} seed={9} maxH={560} />
      <TileRect tile="ice" x={0} y={0} w={1080} h={96} cell={12} />
      {Array.from({ length: 11 }).map((_, i) => {
        const x = 24 + i * 96 + (i % 2) * 36;
        const rows = ICICLES[i % ICICLES.length];
        return <Pixels key={i} grid={outlined(gridOf(rows))} px={12} pal={ice} x={x - 12} y={84} />;
      })}
      {PLATS.map((pl, i) => (
        <TileRect key={i} tile={pl.t} x={pl.x} y={pl.y} w={pl.w} h={96} cell={12} pal={pl.t === "ice" ? ICE_PAL : undefined} />
      ))}
      <TileRect tile="snowTop" x={0} y={gy} w={1080} h={96} cell={12} />
      <TileRect tile="snow" x={0} y={gy + 96} w={1080} h={1920 - gy - 96} cell={12} />
      <Pixels grid={outlined(gridOf(CRYSTAL))} px={18} pal={ice} x={300} y={gy - 96} />
      <Pixels grid={outlined(gridOf(CRYSTAL))} px={18} pal={ice} x={780} y={gy - 96} />
      {Array.from({ length: 36 }).map((_, i) => {
        const x = snap(rnd(11, i) * 1068);
        const y0 = rnd(12, i) * 1920;
        const y = (on ? (y0 + p.f * (2 + (i % 3))) % 1920 : y0);
        const big = i % 4 === 0;
        return <rect key={"f" + i} x={x} y={snap(y)} width={big ? 12 : 6} height={big ? 12 : 6} fill={i % 5 ? PAL.w : "#bfe8f6"} />;
      })}
    </g>
  );
}

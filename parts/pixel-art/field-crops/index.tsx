import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, TileRect, Tint, asTime, snap } from "../backdrop/index";
import { Pixels, PAL, gridOf } from "../style/index";

// Field crops: rows of wheat and corn running down the frame, with a farmhouse far away on the horizon.
// Wheat rows use golden crop tiles; corn rows add tall stalks that sway from p.f (anim "sway").

const CORN = gridOf(["..f.", ".ff.", "yfff", "yfe.", ".ee.", "..e.", "..e.", "..e."]);
const CORN_PAL = { ...PAL, f: "#2e6b45", e: "#4caf50", y: "#f7d154" };
const WHEAT_PAL = { e: "#e3b84a", C: "#b8892f", D: "#8a5a36", E: "#6e4528" };
const HOUSE = gridOf([
  "......rr......",
  ".....rrrr.....",
  "....rrrrrr....",
  "...rrrrrrrr...",
  "..rrrrrrrrrr..",
  "wwwwwwwwwwwwww",
  "wcc.wwwwwwcc.w",
  "wcc.wwwwwwcc.w",
  "wwwwwwuuwwwwww",
  "wwwwwwuuwwwwww",
]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const top = snap(p.horizonY ?? 680, 12);
  const seed = p.seed ?? 11;
  const sway = (p.anim ?? "sway") === "sway";
  const bands = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => top + i * 144);
  const stalks = Array.from({ length: 19 }, (_, i) => ({
    x: snap(i * 60 + ((seed * 13 + i * 7) % 5) * 12),
    lean: sway ? (Math.floor((p.f + i * 7) / 20) % 2) * 12 : 0,
  }));
  return (
    <g>
      <PixSky time={time} to={top} f={sway ? p.f : 0} clouds={2} seed={seed} drift={sway} />
      <Tint time={time} y={top - 300} />
      <Pixels grid={HOUSE} px={8} x={760} y={top - 10 * 8 - 40} />
      {bands.map((y, i) => {
        const wheat = i % 2 === 0;
        return (
          <g key={"b" + i}>
            <TileRect tile="crops" x={0} y={y} w={1080} h={96} cell={12} pal={wheat ? WHEAT_PAL : undefined} />
            <TileRect tile="dirt" x={0} y={y + 96} w={1080} h={48} cell={12} />
          </g>
        );
      })}
      {bands.map((y, i) =>
        i % 2 === 1
          ? stalks.map((s, j) => (
              <Pixels key={"s" + i + "-" + j} grid={CORN} px={12} pal={CORN_PAL} x={s.x + s.lean} y={y + 96 - CORN.length * 12} />
            ))
          : null,
      )}
    </g>
  );
}

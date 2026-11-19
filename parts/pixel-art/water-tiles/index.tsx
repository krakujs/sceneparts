import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf } from "../style/index";

// Water tiles: a full-frame animated water surface with no sky. Blue water tiles with pale wave crests and
// twinkling sparkles. anim "waves" swaps the two water frames and blinks the sparkles from p.f.

const SPARK = gridOf(["..w..", ".www.", "wwwww", ".www.", "..w.."]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const seed = p.seed ?? 1;
  const on = (p.anim ?? "waves") === "waves";
  const f = on ? p.f : 0;
  const crests = Array.from({ length: 8 }, (_, i) => snap(96 + i * 240 + rnd(seed, i) * 96));
  const sparks = Array.from({ length: 16 }, (_, i) => ({
    x: snap(rnd(seed, i + 20) * 1056),
    y: snap(rnd(seed, i + 60) * 1860),
    t: i * 11,
  }));
  return (
    <g>
      <TileRect tile="water" x={0} y={0} w={1080} h={1920} cell={12} f={f} />
      {crests.map((y, i) => (
        <TileRect key={"c" + i} tile="waterTop" x={0} y={y} w={1080} h={72} cell={12} f={f} />
      ))}
      {sparks.map((s, i) => {
        if (on && Math.floor((p.f + s.t) / 16) % 3 === 0) return null;
        return <Pixels key={"s" + i} grid={SPARK} px={12} x={s.x} y={s.y} />;
      })}
    </g>
  );
}

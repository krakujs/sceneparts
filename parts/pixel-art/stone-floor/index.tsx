import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf } from "../style/index";

// Stone floor: a full-frame grey stone slab floor seen from above, with moss in the seams and a few cracks.
// anim "sparkle" makes small glints blink across the slabs from p.f.

const MOSS = gridOf([".e.e.", "eefee", ".ffe.", "..e.."]);
const CRACK = gridOf(["k.....", "kk....", ".kk...", "..kk..", "...k.."]);
const GLINT = gridOf(["..w..", "..w..", "wwwww", "..w..", "..w.."]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const seed = p.seed ?? 5;
  const sparkle = (p.anim ?? "sparkle") === "sparkle";
  const moss: { x: number; y: number }[] = [];
  for (let k = 0; k < 12; k++)
    for (let m = 0; m < 20; m++)
      if (rnd(seed, k * 31 + m) < 0.2) moss.push({ x: k * 96 - 24, y: m * 96 - 12 });
  const cracks = Array.from({ length: 12 }, (_, i) => ({
    x: snap(rnd(seed, i + 100) * 1000),
    y: snap(rnd(seed, i + 140) * 1860),
  }));
  const glints = Array.from({ length: 10 }, (_, i) => ({
    x: snap(rnd(seed, i + 200) * 1056),
    y: snap(rnd(seed, i + 240) * 1860),
    t: i * 13,
  }));
  return (
    <g>
      <TileRect tile="stone" x={0} y={0} w={1080} h={1920} cell={12} />
      {moss.map((m, i) => (
        <Pixels key={"m" + i} grid={MOSS} px={12} x={m.x} y={m.y} />
      ))}
      {cracks.map((c, i) => (
        <Pixels key={"c" + i} grid={CRACK} px={12} x={c.x} y={c.y} />
      ))}
      {glints.map((g, i) => {
        if (sparkle && Math.floor((p.f + g.t) / 18) % 4 !== 0) return null;
        return <Pixels key={"g" + i} grid={GLINT} px={12} x={g.x} y={g.y} />;
      })}
    </g>
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf } from "../style/index";

// Lava: a full-frame animated lava field with dark rock islands. The lava tile swaps its two frames, bubbles
// pop and ring out from p.f (anim "bubble") and embers rise from the bottom edge.

const ISLAND = gridOf([
  "..kkkkkkk..",
  ".kddddddddk.",
  "kddTddddddk",
  "kdddddddTdk",
  "kddTdddddk.",
  ".kdddddddk.",
  "..kkkkkkk..",
]);
const ROCK_PAL = { k: "#120d0c", d: "#3a302d", T: "#241c1a" };
const ISLANDS = [
  { x: 60, y: 380, cell: 24 },
  { x: 800, y: 700, cell: 18 },
  { x: 180, y: 1020, cell: 18 },
  { x: 700, y: 1380, cell: 24 },
  { x: 60, y: 1560, cell: 18 },
];
const BUBBLES = [
  { x: 420, y: 540 },
  { x: 260, y: 880 },
  { x: 640, y: 1100 },
  { x: 900, y: 1520 },
  { x: 120, y: 1220 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const seed = p.seed ?? 8;
  const bubbling = (p.anim ?? "bubble") === "bubble";
  const f = bubbling ? p.f : 0;
  const embers = Array.from({ length: 36 }, (_, i) => {
    const x = snap(rnd(seed, i) * 1068);
    const speed = 0.8 + rnd(seed, i + 50) * 1.5;
    const y = snap(1908 - (((rnd(seed, i + 100) * 1920 + f * speed) % 1920) + 1920) % 1920);
    return { x, y, big: i % 3 === 0, hot: i % 2 === 0 };
  });
  return (
    <g>
      <TileRect tile="lava" x={0} y={0} w={1080} h={1920} cell={12} f={f} />
      {ISLANDS.map((s, i) => (
        <Pixels key={"i" + i} grid={ISLAND} px={s.cell} pal={ROCK_PAL} x={s.x} y={s.y} />
      ))}
      {bubbling &&
        BUBBLES.map((b, i) => {
          const ph = (p.f + i * 17) % 48;
          if (ph >= 36) return null;
          const r = 8 + ph;
          const d = ph * 0.5;
          return (
            <g key={"b" + i} fill="#ffd23f" opacity={1 - ph / 40}>
              <rect x={snap(b.x - r)} y={snap(b.y)} width={12} height={12} />
              <rect x={snap(b.x + r)} y={snap(b.y)} width={12} height={12} />
              <rect x={snap(b.x)} y={snap(b.y - d)} width={12} height={12} />
              <rect x={snap(b.x)} y={snap(b.y + d)} width={12} height={12} />
            </g>
          );
        })}
      {embers.map((e, i) => (
        <rect key={"e" + i} x={e.x} y={e.y} width={e.big ? 12 : 6} height={e.big ? 12 : 6} fill={e.hot ? "#ffd23f" : "#f08a3c"} />
      ))}
    </g>
  );
}

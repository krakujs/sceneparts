import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Kingfisher (bird): a pixel-art/sprite preset. Side view facing right, perched on y. Walk cels step the feet,
// fly cels flap the wings. Role chars: a = blue back, A = orange belly, z = navy wing. Palette chars as usual.
const COLS = { a: "#2f7fd0", A: "#f08a3c", z: "#23305e" };
const STAND = [
  ".........bbb...",
  ".......bbkbbddd",
  ".......bbbbbbbb",
  ".....bbbbbbbbbb",
  "....bbbbbbbbbbb",
  "..bbbbbbbbbbbbb",
  "...bbbAAAAAAAAA",
  "....AAAAAAAAAAA",
  ".....AAAAAAAAAA",
  ".......dd.dd...",
  ".......d...d...",
];
const STEP = [...STAND.slice(0, 9), "........d.d....", "......d.....d.."];
const FLYUP = [
  ".zz......bbb...",
  "zzzz...bbkbbddd",
  "zzzzzz.bbbbbbbb",
  ...STAND.slice(3),
];
const FLYDN = [
  ...STAND.slice(0, 4),
  "zzzzzbbbbbbbbbb",
  ...STAND.slice(5),
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = anim === "fly";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : fly ? [FLYUP, FLYDN] : [STAND]}
      fps={fly ? p.fps ?? 6 : anim === "run" ? 4 : p.fps ?? 8}
      anim={walk || fly ? (anim === "run" ? "bob" : "none") : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

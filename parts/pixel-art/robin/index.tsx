import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Robin (bird): a pixel-art/sprite preset. Side view facing right, perched on y. Walk cels step the feet,
// fly cels flap the wings. Role chars: a = brown-grey back, A = orange-red breast, z = wing shade. Palette as usual.
const COLS = { a: "#6b6358", A: "#d2603f", z: "#4a443c" };
const STAND = [
  ".....aaaaa....",
  "....aaaakddd..",
  "....aaaaaaaa..",
  "...aaaaaaaaaa.",
  "...aaAAAAAAAa.",
  "..aaAAAAAAAAa.",
  "..aaAAAAAAAAaa",
  ".aaaaaAAAAAaaa",
  "aaaaaaaaaaaa..",
  "aaaaaaaaaa....",
  "...dd.dd......",
];
const STEP = [...STAND.slice(0, 9), "..d....d......", "..d....d......"];
const FLYUP = [
  ...STAND.slice(0, 4),
  "zz.zzzzzzzzzzz",
  "zzzzzzzzzzzzzz",
  ...STAND.slice(6),
];
const FLYDN = [
  ...STAND.slice(0, 6),
  "zzzzzzzzzzzzz.",
  "zzzzzzzzzzz...",
  ...STAND.slice(8),
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

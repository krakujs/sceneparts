import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Chicken: pixel-art/sprite preset. White hen with a red comb and wattle, short orange beak.
// Role chars: a = white feathers, A = grey shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#f5f1e8","A":"#c9c2b5","z":"#d2403f"};
const STAND = [
  "..........rr........",
  ".........rrrr.......",
  "........aaaaaa......",
  "........aaaakaoo....",
  "........aaaaaooo....",
  ".........aaaaaa.....",
  "........rraaaa......",
  ".......aaaaaaaa.....",
  "....aaaaaaaaaaaaa...",
  "...aaaaaaaaaaaaaaA..",
  "..aaaaaaaaaaaaaaAA..",
  "...AAAAAAAAAAAAAA...",
  "....AAAAAAAAAAAA....",
  "....oo..oo..........",
  "....o....o..........",
  "...oo......o........",
  "....................",
];
const STEP = [
  "..........rr........",
  ".........rrrr.......",
  "........aaaaaa......",
  "........aaaakaoo....",
  "........aaaaaooo....",
  ".........aaaaaa.....",
  "........rraaaa......",
  ".......aaaaaaaa.....",
  "....aaaaaaaaaaaaa...",
  "...aaaaaaaaaaaaaaA..",
  "..aaaaaaaaaaaaaaAA..",
  "...AAAAAAAAAAAAAA...",
  "....AAAAAAAAAAAA....",
  "....oo..oo..........",
  "....o...oo..........",
  "...oo...o...........",
  "....................",
];
const FLY_UP = [
  "..........rr........",
  ".........rrrr.......",
  "........aaaaaa......",
  "........aaaakaoo....",
  "........aaaaaooo....",
  ".........aaaaaa.....",
  "........rraaaa......",
  ".......aaaaaaaa.....",
  "..AAaaaaaaaaaaaaa...",
  "aaaaaaaaaaaaaaaaaA..",
  "AAaaaaaaaaaaaaaaAA..",
  "...AAAAAAAAAAAAAA...",
  "....AAAAAAAAAAAA....",
  "....oo..oo..........",
  "....o....o..........",
  "...oo......o........",
  "....................",
];
const FLY_DOWN = [
  "..........rr........",
  ".........rrrr.......",
  "........aaaaaa......",
  "........aaaakaoo....",
  "........aaaaaooo....",
  ".........aaaaaa.....",
  "........rraaaa......",
  ".......aaaaaaaa.....",
  "....aaaaaaaaaaaaa...",
  "...aaaaaaaaaaaaaaA..",
  "AAaaaaaaaaaaaaaaAAAA",
  "...AAAAAAAAAAAAAA...",
  "....AAAAAAAAAAAA....",
  "....oo..oo..........",
  "....o....o..........",
  "...oo......o........",
  "....................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const fly = anim === "fly";
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={fly ? [FLY_UP, FLY_DOWN] : walk ? [STAND, STEP] : [STAND]}
      fps={anim === "run" ? 4 : p.fps ?? 8} anim={walk ? (anim === "run" ? "bob" : "none") : fly ? "bob" : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

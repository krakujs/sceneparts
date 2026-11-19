import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Goose: pixel-art/sprite preset. Grey-brown goose, black neck, white chin strap, orange bill.
// Role chars: a = grey-brown feathers, A = dark wing shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#8a7560","A":"#5a4a3a","z":"#24202a"};
const STAND = [
  "..........zzz.......",
  ".........zzkzz......",
  ".........zzzzzoooo..",
  ".........wwzzzz.....",
  "..........zzzz......",
  "..........zzzz......",
  ".........zzzz.......",
  ".........zzz........",
  "........zzzz........",
  "......aaaaaaaa......",
  "....aaaaaaaaaaaa....",
  "..aaaaaaaaaaaaaaaA..",
  "..aaaaaaaaaaaaaaAA..",
  "...AAAAAAAAAAAAAA...",
  "....oo..oo..........",
  "....o....o..........",
  "...oo......o........",
  "....................",
];
const STEP = [
  "..........zzz.......",
  ".........zzkzz......",
  ".........zzzzzoooo..",
  ".........wwzzzz.....",
  "..........zzzz......",
  "..........zzzz......",
  ".........zzzz.......",
  ".........zzz........",
  "........zzzz........",
  "......aaaaaaaa......",
  "....aaaaaaaaaaaa....",
  "..aaaaaaaaaaaaaaaA..",
  "..aaaaaaaaaaaaaaAA..",
  "...AAAAAAAAAAAAAA...",
  "....oo..oo..........",
  "....o...oo..........",
  "...oo...o...........",
  "....................",
];
const FLY_UP = [
  "..........zzz.......",
  ".........zzkzz......",
  ".........zzzzzoooo..",
  ".........wwzzzz.....",
  "..........zzzz......",
  "..........zzzz......",
  ".........zzzz.......",
  ".........zzz........",
  "........zzzz........",
  "..AAAAaaaaaaaa......",
  "aaaaaaaaaaaaaaaa....",
  "AAaaaaaaaaaaaaaaAA..",
  "..aaaaaaaaaaaaaaAA..",
  "...AAAAAAAAAAAAAA...",
  "....oo..oo..........",
  "....o....o..........",
  "...oo......o........",
  "....................",
];
const FLY_DOWN = [
  "..........zzz.......",
  ".........zzkzz......",
  ".........zzzzzoooo..",
  ".........wwzzzz.....",
  "..........zzzz......",
  "..........zzzz......",
  ".........zzzz.......",
  ".........zzz........",
  "........zzzz........",
  "......aaaaaaaa......",
  "....aaaaaaaaaaaa....",
  "..aaaaaaaaaaaaaaaA..",
  "AAaaaaaaaaaaaaaaAAAA",
  "...AAAAAAAAAAAAAA...",
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

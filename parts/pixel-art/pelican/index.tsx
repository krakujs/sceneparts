import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pelican: pixel-art/sprite preset. White pelican: long yellow bill, big orange throat pouch under it.
// Role chars: a = white feathers, A = grey wing shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#f5f1e8","A":"#a8b0bd","z":"#f7d154"};
const STAND = [
  "..........aaaa........",
  ".........aaaakaa......",
  ".........aaaaayyyyyy..",
  "........aaaaaayyyyy...",
  "........aaaaa.ooo.....",
  "........aaaa..oooo....",
  ".......aaaa...ooo.....",
  ".......aaaaaaaa.......",
  "..aaaaaaaaaaaaaaa.....",
  ".aaaaaaaaaaaaaaaaa....",
  "AAAaaaaaaaaaaaaaaaa...",
  ".AAAAAAAAAAAAAAAAAA...",
  "...AAAAAAAAAAAAAA.....",
  "........o.............",
  "........o.............",
  "......ooo.............",
  "......................",
];
const STEP = [
  "..........aaaa........",
  ".........aaaakaa......",
  ".........aaaaayyyyyy..",
  "........aaaaaayyyyy...",
  "........aaaaa.ooo.....",
  "........aaaa..oooo....",
  ".......aaaa...ooo.....",
  ".......aaaaaaaa.......",
  "..aaaaaaaaaaaaaaa.....",
  ".aaaaaaaaaaaaaaaaa....",
  "AAAaaaaaaaaaaaaaaaa...",
  ".AAAAAAAAAAAAAAAAAA...",
  "...AAAAAAAAAAAAAA.....",
  "........o.............",
  "......oo..............",
  "......ooo.............",
  "......................",
];
const FLY_UP = [
  "..........aaaa........",
  ".........aaaakaa......",
  ".........aaaaayyyyyy..",
  "........aaaaaayyyyy...",
  "........aaaaa.ooo.....",
  "........aaaa..oooo....",
  ".......aaaa...ooo.....",
  ".......aaaaaaaa.......",
  "AAAAAAAAAAAAAAAA......",
  "AAAAAaaaaaaaaaaaaaa...",
  "AAAaaaaaaaaaaaaaaaa...",
  ".AAAAAAAAAAAAAAAAAA...",
  "...AAAAAAAAAAAAAA.....",
  "........o.............",
  "........o.............",
  "......ooo.............",
  "......................",
];
const FLY_DOWN = [
  "..........aaaa........",
  ".........aaaakaa......",
  ".........aaaaayyyyyy..",
  "........aaaaaayyyyy...",
  "........aaaaa.ooo.....",
  "........aaaa..oooo....",
  ".......aaaa...ooo.....",
  ".......aaaaaaaa.......",
  "..aaaaaaaaaaaaaaa.....",
  ".aaaaaaaaaaaaaaaaa....",
  "AAAaaaaaaaaaaaaaaaa...",
  "AAAAAAAAAAAAAAAAAAAA..",
  "...AAAAAAAAAAAAAA.....",
  "........o.............",
  "........o.............",
  "......ooo.............",
  "......................",
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

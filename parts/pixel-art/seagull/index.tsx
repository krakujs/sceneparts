import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Seagull: pixel-art/sprite preset. White seagull with grey wings and a yellow beak.
// Role chars: a = white body, A = grey wing, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#f5f1e8","A":"#a8b0bd","z":"#f7d154"};
const STAND = [
  "..........aaaa..",
  ".........aaaaak.",
  ".........aaaaayy",
  "........aaaaaaaa",
  "..AAAAAAAAaaaaa.",
  ".AAAAAAAAAAaaaa.",
  "AAAAAAAAAAAAaaa.",
  "AAAAAAAAAAAAaaa.",
  ".AAAAAAAAAAAAaa.",
  "..AAAAAAAAAAaaa.",
  "....aaaaaaaaa...",
  "......yy........",
  "......y.........",
  "......yyy.......",
];
const STEP = [
  "..........aaaa..",
  ".........aaaaak.",
  ".........aaaaayy",
  "........aaaaaaaa",
  "..AAAAAAAAaaaaa.",
  ".AAAAAAAAAAaaaa.",
  "AAAAAAAAAAAAaaa.",
  "AAAAAAAAAAAAaaa.",
  ".AAAAAAAAAAAAaa.",
  "..AAAAAAAAAAaaa.",
  "....aaaaaaaaa...",
  "......yy........",
  "......yy........",
  "......y.........",
];
const FLY_UP = [
  "....AAAAAAA.....",
  "..AAAAAAAAAAA...",
  ".AAAAAAAAAAAAA..",
  ".AAAAAAAAAAaaaa.",
  "AAAAAAAAAAaaaaaa",
  "..........aaaaaa",
  "..........aaaaa.",
  "........aaaaaaaa",
  "..........aaaaaa",
  "..........aaaaa.",
  "....aaaaaaaaa...",
  "......yy........",
  "......y.........",
  "......yyy.......",
];
const FLY_DOWN = [
  "..........aaaa..",
  ".........aaaaak.",
  ".........aaaaayy",
  "........aaaaaaaa",
  "..AAAAAAAAaaaaa.",
  ".AAAAAAAAAAaaaa.",
  "AAAAAAAAAAAAaaa.",
  "AAAAAAAAAAAAaaa.",
  ".AAAAAAAAAAAAaa.",
  "..AAAAAAAAAAaaa.",
  "....aaaaaaaaa...",
  "......yy........",
  "......y.........",
  "......yyy.......",
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

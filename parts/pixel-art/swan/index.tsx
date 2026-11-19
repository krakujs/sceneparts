import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Swan: pixel-art/sprite preset. White swan on the water line, long curved neck, orange beak.
// Role chars: a = white feathers, A = grey shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#f5f1e8","A":"#a8b0bd","z":"#f08a3c"};
const STAND = [
  "...............aaa..",
  "..............aakaa.",
  "..............aaaaoo",
  ".............aaaaaaa",
  "...........aa.aaaaa.",
  "..........aa..aaaa..",
  ".........aa...aaa...",
  "........aa...aaa....",
  "........aa..aaa.....",
  "........aaaaaa......",
  "..aaaaaaaaaaaaaaa...",
  ".aaaaaaaaaaaaaaaaaa.",
  "aaaaaaaaaaaaaaaaaaaa",
  "AAAAAAAAAAAAAAAAAAAA",
  "....................",
];
const STEP = [
  "...............aaa..",
  "..............aakaa.",
  "..............aaaaoo",
  ".............aaaaaaa",
  "...........aa.aaaaa.",
  "..........aa..aaaa..",
  ".........aa...aaa...",
  "........aa...aaa....",
  "........aa..aaa.....",
  "........aaaaaa......",
  "..aaaaaaaaaaaaaaa...",
  ".aaaaaaaaaaaaaaaaaa.",
  "aaaaaaaaaaaaaaaaaaaa",
  "AAAAAAAAAAAAAAAAAAAA",
  "....................",
];
const FLY_UP = [
  "...............aaa..",
  "..............aakaa.",
  "..............aaaaoo",
  ".............aaaaaaa",
  "...........aa.aaaaa.",
  "..........aa..aaaa..",
  ".........aa...aaa...",
  "........aa...aaa....",
  "..AAaa..aaaaaaaaaa..",
  "AaaaaaaaaaaaaaaaaaaA",
  "aaaaaaaaaaaaaaaaaaaa",
  "AAAAAAAAAAAAAAAAAAAA",
  "....................",
];
const FLY_DOWN = [
  "...............aaa..",
  "..............aakaa.",
  "..............aaaaoo",
  ".............aaaaaaa",
  "...........aa.aaaaa.",
  "..........aa..aaaa..",
  ".........aa...aaa...",
  "........aa...aaa....",
  "........aa..aaa.....",
  "........aaaaaa......",
  "..aaaaaaaaaaaaaaa...",
  ".AAAAAAAAAAAAAAAAAA.",
  "aaaaaaaaaaaaaaaaaaaa",
  "AAAAAAAAAAAAAAAAAAAA",
  "....................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "bob";
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

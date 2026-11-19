import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Rooster: pixel-art/sprite preset. Red-brown rooster, big red comb, arching green-black tail.
// Role chars: a = red-brown feathers, A = dark brown shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#b5522a","A":"#7a4a2b","z":"#d2403f"};
const STAND = [
  "...........rr.......",
  "..........rrrr......",
  ".........aaaaaa.....",
  ".........aaaakaoo...",
  ".........aaaaaooo...",
  "..........aaaaa.....",
  ".........rraaaa.....",
  "f.......aaaaaaaa....",
  "ff....aaaaaaaaaaa...",
  "fff..aaaaaaaaaaaaa..",
  "ffff.aaaaaaaaaaaaaA.",
  "f.fffaaaaaaaaaaaaAA.",
  "ff..aaaaaaaaaaaaAA..",
  "fff.AAAAAAAAAAAAA...",
  ".....AAAAAAAAAAA....",
  "....yy...yy.........",
  "....y....y..........",
  "...yy.....y.........",
  "....................",
];
const STEP = [
  "...........rr.......",
  "..........rrrr......",
  ".........aaaaaa.....",
  ".........aaaakaoo...",
  ".........aaaaaooo...",
  "..........aaaaa.....",
  ".........rraaaa.....",
  "f.......aaaaaaaa....",
  "ff....aaaaaaaaaaa...",
  "fff..aaaaaaaaaaaaa..",
  "ffff.aaaaaaaaaaaaaA.",
  "f.fffaaaaaaaaaaaaAA.",
  "ff..aaaaaaaaaaaaAA..",
  "fff.AAAAAAAAAAAAA...",
  ".....AAAAAAAAAAA....",
  "....yy...yy.........",
  "....y...yy..........",
  "...yy....y..........",
  "....................",
];
const FLY_UP = [
  "...........rr.......",
  "..........rrrr......",
  ".........aaaaaa.....",
  ".........aaaakaoo...",
  ".........aaaaaooo...",
  "..........aaaaa.....",
  ".........rraaaa.....",
  "f.......aaaaaaaa....",
  "ff....aaaaaaaaaaa...",
  "fff..aaaaaaaaaaaaa..",
  "ffff.AAaaaaaaaaaaaaa",
  "f.fffaaaaaaaaaaaaAA.",
  "ff..aaaaaaaaaaaaAA..",
  "fff.AAAAAAAAAAAAA...",
  ".....AAAAAAAAAAA....",
  "....yy...yy.........",
  "....y....y..........",
  "...yy.....y.........",
  "....................",
];
const FLY_DOWN = [
  "...........rr........",
  "..........rrrr.......",
  ".........aaaaaa......",
  ".........aaaakaoo....",
  ".........aaaaaooo....",
  "..........aaaaa......",
  ".........rraaaa......",
  "f.......aaaaaaaa.....",
  "ff....aaaaaaaaaaa....",
  "fff..aaaaaaaaaaaaa...",
  "ffff.aaaaaaaaaaaaaA..",
  "f.fffaaaaaaaaaaaaAAAA",
  "ff..aaaaaaaaaaaaAA...",
  "fff.AAAAAAAAAAAAA....",
  ".....AAAAAAAAAAA.....",
  "....yy...yy..........",
  "....y....y...........",
  "...yy.....y..........",
  ".....................",
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

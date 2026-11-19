import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Blue jay (bird): pixel-art/sprite preset, side view facing right, perched on y. Walk cels step the feet, fly cels flap the wing. Role chars: a = blue, A = dark wing bars. Palette as usual.
const COLS = { a: "#3f7fd6", A: "#23305e", z: "#23305e" };
const STAND = [
  ".............a......",
  "............aa......",
  "...........aaaa.....",
  "..........aaaaaa....",
  "..........awwkwadd..",
  "..........awwwwad...",
  ".........akkkkkk....",
  "........aaawwwwww...",
  ".......aAAaAwwwww...",
  "......aaAaAaAwwwww..",
  ".....aaAaAaAaAwwww..",
  "....aaaaaaaaaaawww..",
  "...aaaaaaaaaaaaww...",
  "..aaaa....aaaaa.....",
  ".aaaa......d..d.....",
  "aaaa.......d..d.....",
];
const STEP = [
  ".............a......",
  "............aa......",
  "...........aaaa.....",
  "..........aaaaaa....",
  "..........awwkwadd..",
  "..........awwwwad...",
  ".........akkkkkk....",
  "........aaawwwwww...",
  ".......aAAaAwwwww...",
  "......aaAaAaAwwwww..",
  ".....aaAaAaAaAwwww..",
  "....aaaaaaaaaaawww..",
  "...aaaaaaaaaaaaww...",
  "..aaaa....aaaaa.....",
  ".aaaa......d..d.....",
  ".........d.....d....",
];
const FLYUP = [
  ".............a......",
  "............aa......",
  "...........aaaa.....",
  "..........aaaaaa....",
  "..........awwkwadd..",
  ".....aAa..awwwwad...",
  "...aAaAa.akkkkkk....",
  ".aAaAa..aaawwwwww...",
  "aAaA...aAAaAwwwww...",
  "......aaAaAaAwwwww..",
  ".....aaAaAaAaAwwww..",
  "....aaaaaaaaaaawww..",
  "...aaaaaaaaaaaaww...",
  "..aaaa....aaaaa.....",
  ".aaaa......d..d.....",
  "aaaa.......d..d.....",
];
const FLYDN = [
  ".............a......",
  "............aa......",
  "...........aaaa.....",
  "..........aaaaaa....",
  "..........awwkwadd..",
  "..........awwwwad...",
  ".........akkkkkk....",
  "........aaawwwwww...",
  ".......aAAaAwwwww...",
  "......aaAaAaAwwwww..",
  ".....aaAaAaAaAwwww..",
  "....aaaaaaaaaaawww..",
  "...aaaaaaaaaaaaww...",
  "..aaaaaAaAaaaaa.....",
  ".aaaa..aAaAd..d.....",
  "aaaa....aA.d..d.....",
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

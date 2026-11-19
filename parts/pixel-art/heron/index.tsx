import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Heron: pixel-art/sprite preset. Grey heron: long neck, black head stripe, dagger-like yellow beak.
// Role chars: a = grey feathers, A = dark grey shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#8a9099","A":"#5a6170","z":"#24202a"};
const STAND = [
  "..........aaa.........",
  ".........zzkaa........",
  ".........aaaaayyyyy...",
  "........aaaaa.........",
  ".........aaa..........",
  "........aaa...........",
  ".......aaa............",
  "......aaa.............",
  ".....aaa..............",
  ".....aaaa.............",
  "...aaaaaaaa...........",
  "..aaaaaaaaaaaa........",
  ".AAAAAAAAAAAAAA.......",
  "..AAAAAAAAAAAA........",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "....uuu...............",
  "......................",
];
const STEP = [
  "..........aaa.........",
  ".........zzkaa........",
  ".........aaaaayyyyy...",
  "........aaaaa.........",
  ".........aaa..........",
  "........aaa...........",
  ".......aaa............",
  "......aaa.............",
  ".....aaa..............",
  ".....aaaa.............",
  "...aaaaaaaa...........",
  "..aaaaaaaaaaaa........",
  ".AAAAAAAAAAAAAA.......",
  "..AAAAAAAAAAAA........",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......uu..............",
  "......................",
];
const FLY_UP = [
  "..........aaa.........",
  ".........zzkaa........",
  ".........aaaaayyyyy...",
  "........aaaaa.........",
  ".........aaa..........",
  "........aaa...........",
  ".......aaa............",
  "......aaa.............",
  ".....aaa..............",
  ".....aaaa.............",
  "zzaaaaaaaa............",
  "zzzaaaaaaaaaaaa.......",
  ".AAAAAAAAAAAAAA.......",
  "..AAAAAAAAAAAA........",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "....uuu...............",
  "......................",
];
const FLY_DOWN = [
  "..........aaa.........",
  ".........zzkaa........",
  ".........aaaaayyyyy...",
  "........aaaaa.........",
  ".........aaa..........",
  "........aaa...........",
  ".......aaa............",
  "......aaa.............",
  ".....aaa..............",
  ".....aaaa.............",
  "...aaaaaaaa...........",
  "..aaaaaaaaaaaa........",
  "zzzAAAAAAAAAAAAA......",
  "..AAAAAAAAAAAA........",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "......u...............",
  "....uuu...............",
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

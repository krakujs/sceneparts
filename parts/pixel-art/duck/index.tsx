import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Duck: pixel-art/sprite preset. Mallard-style duck: green head, brown chest, yellow beak.
// Role chars: a = grey body feathers, A = dark wing shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#a8b0bd","A":"#5a6170","z":"#f7d154"};
const STAND = [
  "..........eeeee.....",
  "........eeeeekee....",
  "........eeeeeeeyyy..",
  ".........eeeeeeeyy..",
  "..........uuuuuu....",
  ".........uuuuuuuu...",
  "aaaaaaauuuuuuuuuuu..",
  "aaaaaaaaaaaaaaaaaaa.",
  "AaaaaaaaaaaaaaaaaaaA",
  ".AAAAAAAAAAAAAAAAA..",
  "...aaaaaaaaaaaa.....",
  "......yy............",
  "......y.............",
  "......y.............",
  "....yyy.............",
];
const STEP = [
  "..........eeeee.....",
  "........eeeeekee....",
  "........eeeeeeeyyy..",
  ".........eeeeeeeyy..",
  "..........uuuuuu....",
  ".........uuuuuuuu...",
  "aaaaaaauuuuuuuuuuu..",
  "aaaaaaaaaaaaaaaaaaa.",
  "AaaaaaaaaaaaaaaaaaaA",
  ".AAAAAAAAAAAAAAAAA..",
  "...aaaaaaaaaaaa.....",
  "......yy............",
  "......y.............",
  "......y.............",
  "......yyy...........",
  "....................",
];
const FLY_UP = [
  "..........eeeee.....",
  "........eeeeekee....",
  "........eeeeeeeyyy..",
  ".........eeeeeeeyy..",
  "..........uuuuuu....",
  ".........uuuuuuuu...",
  "aaaaaaauuuuuuuuuuu..",
  "AAAAAAAAAAAAAAAAAAA.",
  "aaaaaaaaaaaaaaaaaaaa",
  ".AAAAAAAAAAAAAAAAA..",
  "...aaaaaaaaaaaa.....",
  "......yy............",
  "......y.............",
  "......y.............",
  "....yyy.............",
];
const FLY_DOWN = [
  "..........eeeee.....",
  "........eeeeekee....",
  "........eeeeeeeyyy..",
  ".........eeeeeeeyy..",
  "..........uuuuuu....",
  ".........uuuuuuuu...",
  "aaaaaaauuuuuuuuuuu..",
  "aaaaaaaaaaaaaaaaaaa.",
  "AAAaaaaaaaaaaaaaaaA.",
  "AAAAAAAAAAAAAAAAAAA.",
  "...aaaaaaaaaaaa.....",
  "......yy............",
  "......y.............",
  "......y.............",
  "....yyy.............",
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

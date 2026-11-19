import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pufferfish: a pixel-art/sprite preset. Round, puffed yellow-brown pufferfish covered in short spikes. Anchored on the centre. Two swim cels fan the tail.
// Role chars: a = yellow-brown puffed body, A = spikes, fins and tail, y = pale yellow belly (palette). Palette chars k w g d r o y e f c b n p m u x are used as-is.
const COLS = { a: "#d9a441", A: "#7a5a1e", y: "#f7d154" };
const SWIM_A = [
  "....................",
  "...........A........",
  ".......A..aaa..A....",
  "........aaaaaaa.....",
  "......aaaaaawwaaa...",
  "....A.aaaaaawkaaa.A.",
  ".....aaaaaaaaaaaaa..",
  "..A..aaaaaaaaaaaaa..",
  ".AAAaaaaaaaaaaaaaaa.",
  ".AAAaaaaaaaaaaaaaaaA",
  ".AAAaaaaaaaaaaaaaka.",
  "..A..aaaaaaaaaaaaa..",
  ".....yyyyyyyyyyyyy..",
  "....A.yyyyyyyyyyy.A.",
  "......yyyyyyyyyyy...",
  "........yyyyyyy.....",
  ".......A.AyAy..A....",
  "..........AA........",
];
const SWIM_B = [
  "....................",
  "...........A........",
  ".......A..aaa..A....",
  "........aaaaaaa.....",
  "......aaaaaawwaaa...",
  "....A.aaaaaawkaaa.A.",
  "..A..aaaaaaaaaaaaa..",
  ".AAA.aaaaaaaaaaaaa..",
  "....aaaaaaaaaaaaaaa.",
  "....aaaaaaaaaaaaaaaA",
  ".AAAaaaaaaaaaaaaaka.",
  ".AAA.aaaaaaaaaaaaa..",
  "..A..yyyyyyyyyyyyy..",
  "....A.yyyyyyyyyyy.A.",
  "......yyyyyyyyyyy...",
  "........yyyyyyy.....",
  ".......A.AyAy..A....",
  "..........AA........",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "swim";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const swim = anim === "swim";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 960} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      centre={p.centre ?? true} frames={swim ? [SWIM_A, SWIM_B] : [SWIM_A]} fps={p.fps ?? 6}
      anim={swim ? "none" : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

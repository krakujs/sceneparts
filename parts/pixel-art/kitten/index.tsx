import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Kitten: pixel-art/sprite preset, side view facing right, standing on y. Small body, big head. Two walk cels swap the legs. Role chars: a = coat, A = tabby stripes and paws. Palette as usual.
const COLS = { a: "#f0a050", A: "#b8652a", z: "#f5f1e8" };
const STAND = [
  "...........A...A..",
  "...........aA.Aa..",
  "..A........aaaaaa.",
  "..aA......aaakaam.",
  "...a......aaaaaaa.",
  "...a......awwwaa..",
  "...aa.aaAaaAaaa...",
  "....aaaAaaAaaaa...",
  "....aaaAaaAaaa....",
  ".....aaaaaaaaa....",
  ".....aA.aA.aA.aA..",
  ".....aA.aA.aA.aA..",
];
const STEP = [
  "...........A...A..",
  "...........aA.Aa..",
  "..A........aaaaaa.",
  "..aA......aaakaam.",
  "...a......aaaaaaa.",
  "...a......awwwaa..",
  "...aa.aaAaaAaaa...",
  "....aaaAaaAaaaa...",
  "....aaaAaaAaaa....",
  ".....aaaaaaaaa....",
  "....aA..aAaA..aA..",
  "...aA....AA....aA.",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = false;
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]}
      fps={fly ? p.fps ?? 6 : anim === "run" ? 4 : p.fps ?? 8}
      anim={walk || fly ? (anim === "run" ? "bob" : "none") : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

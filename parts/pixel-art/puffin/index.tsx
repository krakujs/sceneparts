import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Puffin: pixel-art/sprite preset. Black and white puffin with a big striped orange beak.
// Role chars: a = black back, A = white belly, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#24202a","A":"#f5f1e8","z":"#f08a3c"};
const STAND = [
  "....aaaaaaa.....",
  "...aaaaaaaaa....",
  "..aaaAAkAAaaoo..",
  "..aaAAAAAAAoyo..",
  "..aaAAAAAAAoooo.",
  "..aaaAAAAAAAoo..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  "..aaAAAAAAAaa...",
  "..aaaAAAAAaaa...",
  "...aaaaaaaaa....",
  "....oo..oo......",
  "...oooo..oo.....",
  "................",
];
const STEP = [
  "....aaaaaaa.....",
  "...aaaaaaaaa....",
  "..aaaAAkAAaaoo..",
  "..aaAAAAAAAoyo..",
  "..aaAAAAAAAoooo.",
  "..aaaAAAAAAAoo..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  "..aaAAAAAAAaa...",
  "..aaaAAAAAaaa...",
  "...aaaaaaaaa....",
  "....oo..oo......",
  "....oo.ooo......",
  "................",
];
const FLY_UP = [
  "....aaaaaaa.....",
  "...aaaaaaaaa....",
  "..aaaAAkAAaaoo..",
  "..aaAAAAAAAoyo..",
  "..aaAAAAAAAoooo.",
  "..aaaAAAAAAAoo..",
  "aaaaAAAAAAAAaa..",
  "aaaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  "..aaAAAAAAAaa...",
  "..aaaAAAAAaaa...",
  "...aaaaaaaaa....",
  "....oo..oo......",
  "...oooo..oo.....",
  "................",
];
const FLY_DOWN = [
  "....aaaaaaa.....",
  "...aaaaaaaaa....",
  "..aaaAAkAAaaoo..",
  "..aaAAAAAAAoyo..",
  "..aaAAAAAAAoooo.",
  "..aaaAAAAAAAoo..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  ".aaaAAAAAAAAaa..",
  "..aaAAAAAAAaa...",
  "..aaaAAAAAaaa...",
  "...aaaaaaaaa....",
  "....oo..oo......",
  "...oooo..oo.....",
  "................",
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

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Duckling: pixel-art/sprite preset. Baby duckling: wide flat body, flat orange bill, round head. Walk only.
// Role chars: a = yellow down, A = fluff shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#f7d154","A":"#e0b23a","z":"#f08a3c"};
const STAND = [
  "...yyyyyyy.....",
  "..yyyyyyyyy....",
  "..yykyyyyyyy...",
  ".yyyyyyyyyyoooo",
  ".yyyyyyyyyyoooo",
  "yyyyyyyyyyyyyy.",
  "yyyyyyyyyyyyyyy",
  "yyyyyyyyyyyyyyy",
  "AAAAAAAAAAAAAAA",
  "..oo..oo.......",
  "..o....o.......",
  ".oo....oo......",
  "...............",
];
const STEP = [
  "...yyyyyyy.....",
  "..yyyyyyyyy....",
  "..yykyyyyyyy...",
  ".yyyyyyyyyyoooo",
  ".yyyyyyyyyyoooo",
  "yyyyyyyyyyyyyy.",
  "yyyyyyyyyyyyyyy",
  "yyyyyyyyyyyyyyy",
  "AAAAAAAAAAAAAAA",
  "..oo..oo.......",
  "..oo...o.......",
  "..o....oo......",
  "...............",
];


/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const fly = false;
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]}
      fps={anim === "run" ? 4 : p.fps ?? 8} anim={walk ? (anim === "run" ? "bob" : "none") : fly ? "bob" : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

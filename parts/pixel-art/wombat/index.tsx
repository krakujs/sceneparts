import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Wombat: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = brown-grey fur, A = shade, legs and ear, z = unused light tone; nose uses palette k. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#8d7d6b", A: "#5f5448", z: "#f0e0c0" };
const STAND = [
  "..............AA....",
  "..............AAA...",
  "..............AAA...",
  ".....aaaaaa....aaaa.",
  "...aaaaaaaaaaAaaakaa",
  "..aaaaaaaaaaaAaaaaaa",
  ".aaaaaaaaaaaaAaaaaak",
  ".aaaaaaaaaaaaAaaaaak",
  ".aaaaaaaaaaaaAaaaaaa",
  ".aaaaaaaaaaaaAaaaaaa",
  "..aaaaaaaaaaaa.aaa..",
  "..aaAAAAAAAAaa.AA...",
  "..AAAAAAAAAAAA.AA...",
  "....AA.AA...AA.AA...",
  ".....d..d....d..d...",
  "....................",
];
const STEP = [
  "..............AA....",
  "..............AAA...",
  "..............AAA...",
  ".....aaaaaa....aaaa.",
  "...aaaaaaaaaaAaaakaa",
  "..aaaaaaaaaaaAaaaaaa",
  ".aaaaaaaaaaaaAaaaaak",
  ".aaaaaaaaaaaaAaaaaak",
  ".aaaaaaaaaaaaAaaaaaa",
  ".aaaaaaaaaaaaAaaaaaa",
  "..aaaaaaaaaaaa.aaa..",
  "..aaAAAAAAAAaa.AA...",
  "..AAAAAAAAAAAAAAA...",
  "...AA...AA...AAA....",
  "....d....d....dd....",
  "....................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.accent ? { z: p.accent } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]} fps={anim === "run" ? 4 : p.fps ?? 8}
      anim={walk ? (anim === "run" ? "bob" : "none") : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

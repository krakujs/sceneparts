import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Rat: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = brown fur, A = legs and shade, z = pink tail and ear. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#8a5a36", A: "#5c3a22", z: "#e6a0a8" };
const STAND = [
  "................AA....",
  "...............AzzA...",
  "............aaaaaaaa..",
  "...........aaaaaakaa..",
  "......aaaaaaaaaaaaaa..",
  "zzzzzzaaaaaaaaaaaaaaa.",
  "zzzzaaaaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaaaa...",
  "....aaaaaaaaaaaaa.....",
  "....AA.....AA.........",
  "....AAA....AAA........",
];
const STEP = [
  "................AA....",
  "...............AzzA...",
  "............aaaaaaaa..",
  "...........aaaaaakaa..",
  "......aaaaaaaaaaaaaa..",
  "zzzzzzaaaaaaaaaaaaaaa.",
  "zzzzaaaaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaaaa...",
  "....aaaaaaaaaaaaa.....",
  "...AA......A.A........",
  "..AAA......AAA........",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]} fps={anim === "run" ? 4 : p.fps ?? 8}
      anim={walk ? (anim === "run" ? "bob" : "none") : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Donkey: a grey donkey with very long upright ears, a pale muzzle, a dark mane stripe and thin legs. Side view facing right.
// Role chars: a = coat (grey), A = ears, mane, hooves and leg shade (dark), z = pale muzzle. k = eye.
const COLS = { a: "#9a9590", A: "#4f4b48", z: "#e7e1d6" };
const STAND = [
  "..................A.A....",
  "..................AaA....",
  ".................AaaaaA..",
  ".................aaakaaA.",
  "..................aaaaz..",
  "..................azzzz..",
  ".............AAaaaaaaa...",
  "..........AAaaaaaaaaaaa..",
  "...AA...AAaaaaaaaaaaaaa..",
  "..AAaaaaaaaaaaaaaaaaaa...",
  "..AaaaaaaaaaaaaaaaaaaA...",
  "...aaaaaaaaaaaaaaaaaa....",
  "....aa..........aa.......",
  "....aa..........aa.......",
  "....aa..........aa.......",
  "....AA..........AA.......",
  "....AA..........AA.......",
];
const STEP = [
  "..................A.A....",
  "..................AaA....",
  ".................AaaaaA..",
  ".................aaakaaA.",
  "..................aaaaz..",
  "..................azzzz..",
  ".............AAaaaaaaa...",
  "..........AAaaaaaaaaaaa..",
  "...AA...AAaaaaaaaaaaaaa..",
  "..AAaaaaaaaaaaaaaaaaaa...",
  "..AaaaaaaaaaaaaaaaaaaA...",
  "...aaaaaaaaaaaaaaaaaa....",
  "...aa...........aa.......",
  "...aa...........aa.......",
  "...aa...........aa.......",
  "...AA...........AA.......",
  "...AA...........AA.......",
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

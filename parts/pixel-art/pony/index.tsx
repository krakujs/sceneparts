import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pony: a short, stocky pony with a shaggy mane, a short thick neck and short legs. Side view facing right.
// Role chars: a = coat (chestnut), A = shaggy mane, tail and hooves (dark), z = pale muzzle. k = eye.
const COLS = { a: "#c2824e", A: "#4a2e1b", z: "#e5d3b3" };
const STAND = [
  ".................AA.....",
  "................aaaaaa..",
  "..............AAaaakaa..",
  "..............AAaaaaaz..",
  ".............AAaaaaaaa..",
  "............AAaaaaaaaaa.",
  "...........AAaaaaaaaaaa.",
  "..AAAaaaaaaaaaaaaaaaa...",
  ".AAAAaaaaaaaaaaaaaaaaa..",
  ".AAAaaaaaaaaaaaaaaaaaa..",
  "..AaaaaaaaaaaaaaaaaaA...",
  "...aaaaaaaaaaaaaaaaa....",
  "....aa.........aa.......",
  "....aa.........aa.......",
  "....AA.........AA.......",
  "....AA.........AA.......",
];
const STEP = [
  ".................AA.....",
  "................aaaaaa..",
  "..............AAaaakaa..",
  "..............AAaaaaaz..",
  ".............AAaaaaaaa..",
  "............AAaaaaaaaaa.",
  "...........AAaaaaaaaaaa.",
  "..AAAaaaaaaaaaaaaaaaa...",
  ".AAAAaaaaaaaaaaaaaaaaa..",
  ".AAAaaaaaaaaaaaaaaaaaa..",
  "..AaaaaaaaaaaaaaaaaaA...",
  "...aaaaaaaaaaaaaaaaa....",
  "...aa..........aa.......",
  "...aa..........aa.......",
  "...AA..........AA.......",
  "...AA..........AA.......",
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

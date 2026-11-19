import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Cat: a grey tabby cat, side view facing right, pointed ears and an upright tail. Standing on y, two walk cels.
// Role chars: a = fur (grey), A = tabby stripes and legs, z = pink inner ear and nose. k = eye.
const COLS = { a: "#8f96a3", A: "#4d5361", z: "#ef8fb4" };
const STAND = [
  ".............A...A..",
  "............AzA.AzA.",
  "..A.........aaaakaaa",
  "..A.........aaaaaaaz",
  "..AAaaaaaaaaaaaaaaaa",
  "...aAaaaaaaaaaaaaaa.",
  "...aaaaaaaaaaaaaaa..",
  "...aAaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaa...",
  "...AA........AA.....",
  "...AA........AA.....",
];
const STEP = [
  ".............A...A..",
  "............AzA.AzA.",
  "..A.........aaaakaaa",
  "..A.........aaaaaaaz",
  "..AAaaaaaaaaaaaaaaaa",
  "...aAaaaaaaaaaaaaaa.",
  "...aaaaaaaaaaaaaaa..",
  "...aAaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaa...",
  "..AA.......AA.......",
  ".A.........A........",
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

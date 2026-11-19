import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Puppy: a baby dog. Small, round, big head, floppy ears, stubby legs. Side view facing right, standing on y.
// Role chars: a = fur, A = ear and leg shade, z = blue collar. k = eye and nose.
const COLS = { a: "#e9b872", A: "#b5783a", z: "#2f5fb8" };
const STAND = [
  "........aaaa..",
  ".......Aaaaaa.",
  ".......AAaakaa",
  ".......AAaaaak",
  ".aaaaaaaaaaaaa",
  ".aaaaaaaazzzaa",
  ".aaaaaaaaaaaaa",
  "..aaaaaaaaaaaa",
  "..AA.....AA...",
  "..AA.....AA...",
];
const STEP = [
  "........aaaa..",
  ".......Aaaaaa.",
  ".......AAaakaa",
  ".......AAaaaak",
  ".aaaaaaaaaaaaa",
  ".aaaaaaaazzzaa",
  ".aaaaaaaaaaaaa",
  "..aaaaaaaaaaaa",
  ".AA......AA...",
  ".A.......A....",
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

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pig: a round pink pig with a flat snout, small ears and a curly tail. Side view facing right.
// Role chars: a = skin (pink), A = shade (legs, ear), z = snout. k = eye and nostril.
const COLS = { a: "#f4a6b8", A: "#d9768d", z: "#e27d97" };
const STAND = [
  "..........AA........",
  "........aaaaaa......",
  "........aaaaaaa.....",
  ".......aaaaaaak.....",
  "..aaaaaaaaaaaaazz...",
  ".aaaaaaaaaaaaaazzz..",
  ".aaaaaaaaaaaaaaaa...",
  ".aaaaaaaaaaaaaaaa...",
  "..aaaaaaaaaaaaaaa...",
  "..AA.....AA.....A...",
  "..AA.....AA.........",
  "..AA.....AA.........",
];
const STEP = [
  "..........AA........",
  "........aaaaaa......",
  "........aaaaaaa.....",
  ".......aaaaaaak.....",
  "..aaaaaaaaaaaaazz...",
  ".aaaaaaaaaaaaaazzz..",
  ".aaaaaaaaaaaaaaaa...",
  ".aaaaaaaaaaaaaaaa...",
  "..aaaaaaaaaaaaaaa...",
  "...AA....AA.....A...",
  "..A.......A.........",
  "..A.......A.........",
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

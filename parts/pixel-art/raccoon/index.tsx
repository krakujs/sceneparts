import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Raccoon: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = grey fur, A = mask, ears, legs and rings, z = pale muzzle. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#8d939c", A: "#2f333c", z: "#e8e4dc" };
const STAND = [
  "......................",
  "................A.....",
  "...............AAA....",
  "...............AAAa...",
  "...............aaaaAa.",
  ".......aaaaaa..aaAAAwk",
  ".....aaaaaaaaaaaaAAAwk",
  "....aaaaaaaaaaaaaaaAzz",
  "..aAaaaaaaaaaaaaaaaa.z",
  ".aaAaaaaaaaaaaaa......",
  "aAaAaAAaaaaAAaa.......",
  "aAaA.AAaaaaAA.........",
  "aA...AA....AA.........",
  ".....AA....AA.........",
  ".....AA....AA.........",
];
const STEP = [
  "......................",
  "................A.....",
  "...............AAA....",
  "...............AAAa...",
  "...............aaaaAa.",
  ".......aaaaaa..aaAAAwk",
  ".....aaaaaaaaaaaaAAAwk",
  "....aaaaaaaaaaaaaaaAzz",
  "..aAaaaaaaaaaaaaaaaa.z",
  ".aaAaaaaaaaaaaaa......",
  "aAaAaAAaaaaAAaa.......",
  "aAaA.AAaaaaAA.........",
  "aA..AA.....AAA........",
  "....AA......AA........",
  "....A.......AA........",
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

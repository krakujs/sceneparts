import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Coyote: pixel-art sprite, side view facing right, standing on y.
// Role chars: a = main fur (char a); A = ears, legs, tail shade (char A); z = pale chest. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#b8a48a", A: "#6e6256", z: "#efe6d4" };
const BODY = [
  ".............A.A.....",
  ".............AaA.....",
  "............aaakaaa..",
  "...........aaaaaaaak.",
  "..aaaaaaaaaaaaaaa....",
  ".aaaaaaaaaaaaaaaa....",
  "Aaaaaaaaaaaaaaaa.....",
  "Azzzzzzzzzzzzzzaa....",
  "AAAAAAAAAAAAAAAA.....",
  "..aaaaaaaaaaaaaa.....",
];
const LEG_A = [
  "..aA..aA...aA..aA....",
  "..aA..aA...aA..aA....",
  "..AA..AA...AA..AA....",
];
const LEG_B = [
  "..aA...aA.aA...aA....",
  "..aA...aA.aA...aA....",
  "..AA...AA.AA...AA....",
];
const STAND = [...BODY, ...LEG_A];
const STEP = [...BODY, ...LEG_B];

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

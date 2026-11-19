import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Platypus: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = brown fur, A = dark brown feet and beaver tail, z = pale belly; bill and eye use palette d and k. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#7b5a3c", A: "#4f3a26", z: "#c7a57c" };
const STAND = [
  "......................",
  "......................",
  "..............aakaa...",
  "..............aaaaa...",
  ".............aaaaadddd",
  ".....aaaaaaa..aaaadddd",
  ".AAAaaaaaaaaaAaaaaa...",
  "AAAAaaaaaaaaaAA.......",
  "AAAAaaaaaaaaaaA.......",
  ".AAAazzzzzzzaaA.AA....",
  "...zzzzzzzzzzz........",
  "......d...d...d..d....",
  "...AAAA.....AAAA......",
  "......................",
];
const STEP = [
  "......................",
  "......................",
  "..............aakaa...",
  "..............aaaaa...",
  ".............aaaaadddd",
  ".....aaaaaaa..aaaadddd",
  ".AAAaaaaaaaaaAaaaaa...",
  "AAAAaaaaaaaaaAA.......",
  "AAAAaaaaaaaaaaA.......",
  ".AAAazzzzzzzaaA.A.....",
  "...zzzzzzzzzzz........",
  ".....d.....d...dd.....",
  "...AAAA.....AAAA......",
  "......................",
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

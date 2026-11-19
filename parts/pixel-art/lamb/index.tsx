import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Lamb: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = white wool, A = wool shade and ear, z = pink face. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#f5f1e8", A: "#cfc8bb", z: "#f2c4b4" };
const STAND = [
  "....................",
  "....................",
  "......aa..aaa.......",
  ".....aaaa.aaaaa.....",
  "...a.aaaaaaaaaAa....",
  "..aaaaaaaaaaaaAaz...",
  "..aaaaaaaaaaaAAzzzz.",
  "..aaaaaaaaaaaAAzzkz.",
  "..aaaaaaaaaaaAzzzzz.",
  "..aaaaaaaaaaaAzzzzA.",
  "..aaaAAAAAAaaaa.z...",
  "...AAAAAAAAAAaa.....",
  "....AAAAAAAAaadd....",
  "....ddddaaaadddd....",
  "....dddd....dddd....",
  "....................",
  ".....k.k.....k.k....",
  "....................",
];
const STEP = [
  "....................",
  "....................",
  "......aa..aaa.......",
  ".....aaaa.aaaaa.....",
  "...a.aaaaaaaaaAa....",
  "..aaaaaaaaaaaaAaz...",
  "..aaaaaaaaaaaAAzzzz.",
  "..aaaaaaaaaaaAAzzkz.",
  "..aaaaaaaaaaaAzzzzz.",
  "..aaaaaaaaaaaAzzzzA.",
  "..aaaAAAAAAaaaa.z...",
  "...AAAAAAAAAAaa.....",
  "....AAAAAAAAaad.....",
  "....d..daaaa.dd.....",
  "...d....d....dd.....",
  "...d....d....dd.....",
  "....k...k.....k.....",
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

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Peacock: pixel-art/sprite preset. Blue body, long green train with eye spots fanned out behind.
// Role chars: a = body feathers, A = shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#2f5fb8","A":"#23305e","z":"#4caf50","e":"#2e6b45","y":"#f7d154","c":"#5ab4f0"};
const STAND = [
  "......e.e.e..aaa.......",
  ".....ecyce..aakaa......",
  "..e.ecybyce.aaaazz.....",
  ".ecycyeyceyc.aaaaa.....",
  ".eyeceyceyce..aaaa.....",
  "..ecycyeyce..eaaa......",
  "....eceyce...eaa.......",
  "......eeee...aa........",
  ".........aaaaaaaa......",
  "....eeeeaaaaaaaaaaa....",
  "..eeeaaaaaaaaaaaaaAa...",
  "..eeaaaaaaaaaaaaaAAA...",
  "...eaaaaaaaaaaaaaAA....",
  "....AAAAAAAAAAAAA......",
  "......aa...............",
  ".......a...............",
  ".......a...............",
  ".......a...............",
  ".....aaa...............",
  ".......................",
];
const STEP = [
  "......e.e.e..aaa.......",
  ".....ecyce..aakaa......",
  "..e.ecybyce.aaaazz.....",
  ".ecycyeyceyc.aaaaa.....",
  ".eyeceyceyce..aaaa.....",
  "..ecycyeyce..eaaa......",
  "....eceyce...eaa.......",
  "......eeee...aa........",
  ".........aaaaaaaa......",
  "....eeeeaaaaaaaaaaa....",
  "..eeeaaaaaaaaaaaaaAa...",
  "..eeaaaaaaaaaaaaaAAA...",
  "...eaaaaaaaaaaaaaAA....",
  "....AAAAAAAAAAAAA......",
  "......aa...............",
  "......a................",
  "......a................",
  "......a................",
  "....aaa................",
  ".......................",
];
const FLY_UP = [
  "......e.e.e..aaa.......",
  ".....ecyce..aakaa......",
  "..e.ecybyce.aaaazz.....",
  ".ecycyeyceyc.aaaaa.....",
  ".eyeceyceyce..aaaa.....",
  "..ecycyeyce..eaaa......",
  "....eceyce...eaa.......",
  "......eeee...AAAAAA....",
  "..eeaaaaaaaaaaaaaa.....",
  "..eeeeeaaaaaaaaaaaa....",
  "..eeeaaaaaaaaaaaaaAa...",
  "..eeaaaaaaaaaaaaaAAA...",
  "...eaaaaaaaaaaaaaAA....",
  "....AAAAAAAAAAAAA......",
  "......aa...............",
  ".......a...............",
  ".......a...............",
  ".......a...............",
  ".....aaa...............",
  ".......................",
];
const FLY_DOWN = [
  "......e.e.e..aaa........",
  ".....ecyce..aakaa.......",
  "..e.ecybyce.aaaazz......",
  ".ecycyeyceyc.aaaaa......",
  ".eyeceyceyce..aaaa......",
  "..ecycyeyce..eaaa.......",
  "....eceyce...eaa........",
  "......eeee...aa.........",
  ".........aaaaaaaa.......",
  "..eeeeeeeeaaaaaaaaaaa...",
  "..eeeaaaaaaaaaaaaaAa....",
  "..eeaaaaaaaaaaaaaAAA....",
  "...eaaaaaaaaaaaaaAAA....",
  "....AAAAAAAAAAAAA.......",
  "......aa................",
  ".......a................",
  ".......a................",
  ".......a................",
  ".....aaa................",
  "........................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const fly = anim === "fly";
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={fly ? [FLY_UP, FLY_DOWN] : walk ? [STAND, STEP] : [STAND]}
      fps={anim === "run" ? 4 : p.fps ?? 8} anim={walk ? (anim === "run" ? "bob" : "none") : fly ? "bob" : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

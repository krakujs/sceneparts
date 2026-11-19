import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Sheep: a fluffy white wool cloud body with a black face and black legs. Side view facing right.
// Role chars: a = wool (white), A = wool shade, z = black face and legs. k = eye.
const COLS = { a: "#f5f1e8", A: "#d9d4c7", z: "#2a2a33" };
const STAND = [
  "....................",
  "....aaaa............",
  "..aaaaaaaa.......zz.",
  ".aaaaaaaaaa.....zzz.",
  ".aaaaaaaaaaaaaaazzzz",
  "aaaaaaaaaaaaaaaaakzz",
  "aaaaaaaaaaaaaaaaazzz",
  "aaaaaaaaaaaaaaaaaaz.",
  ".aaaaaaaaaaaaaaaaaa.",
  "..aaaaaaaaaaaaaaaa..",
  "..aaaaaaaaaaaaaaaa..",
  "..aAa....zz.....zz..",
  "..zz......zz...zz...",
  "..zz.......zz..z....",
];
const STEP = [
  "....................",
  "....aaaa............",
  "..aaaaaaaa.......zz.",
  ".aaaaaaaaaa.....zzz.",
  ".aaaaaaaaaaaaaaazzzz",
  "aaaaaaaaaaaaaaaaakzz",
  "aaaaaaaaaaaaaaaaazzz",
  "aaaaaaaaaaaaaaaaaaz.",
  ".aaaaaaaaaaaaaaaaaa.",
  "..aaaaaaaaaaaaaaaa..",
  "..aaaaaaaaaaaaaaaa..",
  "..zz.....zz.....zz..",
  "..zz.....zz.....zz..",
  "...z.....z..........",
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

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Wallaby: pixel-art sprite, side view facing right, standing on y.
// Role chars: a = grey fur (char a); A = legs, feet and tail (char A); z = pale chest. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#8b8680", A: "#4f4a46", z: "#c9c3ba" };
const BODY = [
  "........AA...",
  ".......AaaA..",
  ".......aaaa..",
  ".......aakaa.",
  "......aaaaaa.",
  ".....azzzzzaa",
  ".....azzzzza.",
  ".....aaaaaaa.",
  "....aaaaaaa..",
  "....aaaaaaa..",
  "...aaaaaaa...",
  "AA.aaaaaaa...",
  "AAAaaaaaa....",
  ".AAAAAAAA....",
];
const A_FRAME = [
  "..AAAAAAAA...",
  ".AAAAAA.AAA..",
  "AAAA...AAAA..",
];
const B_FRAME = [
  "..AAAAAAAA...",
  "..AAAAAAAAA..",
  "...AAA.AAAA..",
];
const POSE_A = [...BODY, ...A_FRAME];
const POSE_B = [...BODY, ...B_FRAME];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "hop";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const hop = anim === "hop";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={hop ? [POSE_A, POSE_B] : [POSE_A]} fps={p.fps ?? 6}
      anim={hop ? "bounce" : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

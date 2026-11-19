import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Kangaroo: pixel-art sprite, side view facing right, standing on y.
// Role chars: a = tan-brown fur (char a); A = legs, feet and tail (char A); z = cream chest. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#b07a48", A: "#6b4628", z: "#e8c9a0" };
const BODY = [
  "...........AA....",
  "..........AaaA...",
  "..........aaaa...",
  "..........aakaa..",
  ".........aaaaaa..",
  "........aaaaaaa..",
  "........azzzzzzaa",
  "........azzzzzza.",
  "........aaaaaaa..",
  ".......aaaaaaaa..",
  "......aaaaaaaa...",
  "......aaaaaaa....",
  "AAA...aaaaaaa....",
  "AAAA..aaaaaaa....",
  "..AAA.aaaaaaa....",
  "...AAAAAAAAA.....",
];
const A_FRAME = [
  "....AAAAAAA......",
  "..AAAAAAAAAAA....",
  ".AAAAAAA..AAAA...",
  "AAAAA......AAAA..",
  "AA..........AAAA.",
];
const B_FRAME = [
  "....AAAAAAA......",
  "...AAAAAAAAAA....",
  "...AAAAAAAAAAA...",
  "....AAA...AAAA...",
  "..........AAAA...",
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

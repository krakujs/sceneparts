import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Koala: pixel-art sprite, side view facing right, standing on y.
// Role chars: a = grey fur (char a); A = inner ears and chest (char A); z = nose. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#9aa0a8", A: "#d5d8dc", z: "#1b1b2e" };
const FRAME = [
  "..aaaaaaaa....",
  ".aaaaaaaaaaa..",
  "aaaAAaaaaaakaa",
  "aAAAAaaaaaaaak",
  "aaAAAaaaaaaaaa",
  ".aaaaaaaaaaa..",
  "..aaaaaaaaa...",
  "..aaaAAAaaa...",
  ".aaaAAAAAaaa..",
  ".aaAAAAAAAaa..",
  ".aaAAAAAAAaa..",
  ".aaaAAAAAaaa..",
  "..aaaaaaaaa...",
  "..aaa...aaa...",
  "..aaa...aaa...",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "none";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={[FRAME]} fps={p.fps ?? 8} anim={anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

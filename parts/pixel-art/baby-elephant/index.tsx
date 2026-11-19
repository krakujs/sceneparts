import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Baby elephant: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = #a7adb5, A = #737a84. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#a7adb5", A: "#737a84" };
const STAND = [
  "....................",
  "....................",
  "..........A..aaaa...",
  ".........AAAaaaaaaa.",
  "........AAAAAaakaaaa",
  "......aaAAAAAaaaaaaa",
  "....aaaAAAAAAAaaaaaa",
  "...aaaaaAAAAAaaaaaaa",
  ".AAaaaaaAAAAAaaaaaaa",
  ".AAaaaaaaAAAaaaaaaa.",
  "..aaaaaaaaAaaaaaa.aa",
  "..aaaaaaaaaaaaaa..a.",
  "...aaaaaaaaaaaa...a.",
  "..aaaAAAAAAAaaa.....",
  "..aaaAAAAAAAaaa.....",
  "..aaaAA..AA.aaa.....",
  "..aaaAA..AA.aaa.....",
];
const STEP = [
  "....................",
  "....................",
  "..........A..aaaa...",
  ".........AAAaaaaaaa.",
  "........AAAAAaakaaaa",
  "......aaAAAAAaaaaaaa",
  "....aaaAAAAAAAaaaaaa",
  "...aaaaaAAAAAaaaaaaa",
  ".AAaaaaaAAAAAaaaaaaa",
  ".AAaaaaaaAAAaaaaaaa.",
  "..aaaaaaaaAaaaaaa.aa",
  "..aaaaaaaaaaaaaa..a.",
  "...aaaaaaaaaaaa...a.",
  "...AaAaaaaaAAa......",
  "...AAAaaaaaAAA......",
  "...AA.aaaaaAA.......",
  "...AA.aaaaaAA.......",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const frames = walk ? [STAND, STEP] : [STAND];
  const fps = anim === "run" ? 4 : p.fps ?? 8;
  const motion = walk ? (anim === "run" ? "bob" : "none") : anim;
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={frames} fps={fps} anim={motion}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

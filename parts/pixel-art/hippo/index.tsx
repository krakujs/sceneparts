import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Hippopotamus: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = #8c7fa0, A = #5f5470. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#8c7fa0", A: "#5f5470" };
const STAND = [
  "..................................",
  "..................................",
  "......................AA.a........",
  ".....................aAAaaaaaa....",
  ".......aaaaaaaaaaaaaaaaaaaaaaaa...",
  ".....aaaaaaaaaaaaaaaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaaaaaaaaakaaaaaaAA.",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
  "AAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "AAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "AAaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAA",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaaaaa...",
  "..aaaaAAAAAAAAAAAAAAAAaaaa........",
  "...AAaaaAAAAAAAAAAAAAAAaaa........",
  "...AAaaaAAAAAAAAAAAAAAAaaa........",
  ".....aaaAAAAAAAAAAAAAA.aaa........",
  ".....aaa.AAA.......AAA.aaa........",
  ".....aaa.AAA.......AAA.aaa........",
  ".....aaa.AAA.......AAA.aaa........",
];
const STEP = [
  "..................................",
  "..................................",
  "......................AA.a........",
  ".....................aAAaaaaaa....",
  ".......aaaaaaaaaaaaaaaaaaaaaaaa...",
  ".....aaaaaaaaaaaaaaaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaaaaaaaaakaaaaaaAA.",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
  "AAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "AAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "AAaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAA",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaaaaa...",
  "..aaaaAAAAAAAAAAAAAAAAaaaa........",
  "...AAAAAAaaaAAAAAAAaaaAAA.........",
  "...AAAAAAaaaAAAAAAAaaaAAA.........",
  ".....AAAAaaaAAAAAAAaaaAAA.........",
  ".....AAA.aaa.......aaaAAA.........",
  ".....AAA.aaa.......aaaAAA.........",
  ".....AAA.aaa.......aaaAAA.........",
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

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Giant panda: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = white fur, A = black ears, eye patches, shoulder band and legs, k = nose and feet, w = eye shine. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#f5f1e8", A: "#1b1b2e" };
const STAND = [
  "..............AAA.....AAA.",
  "..............AAAAaaaaAAA.",
  "..............AAAAaaaaAAA.",
  "...............aaaaAAAAaa.",
  "..............aaaaaAAAAAaa",
  "..............AaaaaAAwkAaa",
  "..............AAaaaAAAAAaa",
  ".......aaaaaAAAAAaaaaaaakk",
  ".....aaaaaaaAAAAAaaaaaaakk",
  "..a.aaaaaaaaAAAAAaaaaaaa..",
  ".aaaaaaaaaaaAAAAAaaaaaa...",
  "..aaaaaaaaaaAAAAAa........",
  "...aaaaaaaaaaAAAaa........",
  "....aaaaaaaaaaAaa.........",
  ".....aAAAaaaaAAA..........",
  "......AAAaaaaAAA..........",
  "......AAA....AAA..........",
  "......kkk....kkk..........",
];
const STEP = [
  "..............AAA.....AAA.",
  "..............AAAAaaaaAAA.",
  "..............AAAAaaaaAAA.",
  "...............aaaaAAAAaa.",
  "..............aaaaaAAAAAaa",
  "..............AaaaaAAwkAaa",
  "..............AAaaaAAAAAaa",
  ".......aaaaaAAAAAaaaaaaakk",
  ".....aaaaaaaAAAAAaaaaaaakk",
  "..a.aaaaaaaaAAAAAaaaaaaa..",
  ".aaaaaaaaaaaAAAAAaaaaaa...",
  "..aaaaaaaaaaAAAAAa........",
  "...aaaaaaaaaaAAAaa........",
  "....aaaaaaaaaaAaa.........",
  ".....AAAaaaaaaAAA.........",
  ".....AAAaaaaaaAAA.........",
  ".....AAA......AAA.........",
  ".....kkk......kkk.........",
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

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Wolf: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = grey fur, A = ears, legs and shade, z = pale chest and muzzle. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#8a9098", A: "#3c4048", z: "#f1ede4" };
const STAND = [
  "............................",
  ".....................a......",
  "....................aA......",
  "....................aAA.....",
  "...................aaaaaa...",
  "...................aaaaka...",
  "...aaa..aaaaaaaaaa.aaaaaaakk",
  "..aaaaaaaaaaaaaaaaaaaaaaa...",
  ".aaaaaaaaaaaaaaaaaaaaaaa....",
  ".aaaaaaaaaaaaaaaaaazzz......",
  "aaaaaaaaaaaaaaaaaazzzzz.....",
  "aaaaaaaaaAaaaaaaaAzzzzz.....",
  "AAaaaaAAAAAaaaaaAAAAAzz.....",
  "AAAaa.AAAAA.....AAAAAz......",
  "AAAa..AAAAA.....AAAAA.......",
  "AAAa..AAAAA.....AAAAA.......",
  "AAa...AAAAA.....AAAAA.......",
  "......AAAAA.....AAAAA.......",
  "......AA.A.......A.AA.......",
];
const STEP = [
  "............................",
  ".....................a......",
  "....................aA......",
  "....................aAA.....",
  "...................aaaaaa...",
  "...................aaaaka...",
  "...aaa..aaaaaaaaaa.aaaaaaakk",
  "..aaaaaaaaaaaaaaaaaaaaaaa...",
  ".aaaaaaaaaaaaaaaaaaaaaaa....",
  ".aaaaaaaaaaaaaaaaaazzz......",
  "aaaaaaaaaaaaaaaaaazzzzz.....",
  "aaaaaaaaaAaaaaaaaAzzzzz.....",
  "AAaaaaAAAAAaaaaaAAAAAzz.....",
  "AAAaa.AA.AA.....AA.AAz......",
  "AAAa.AAA.AA.....AA.AA.......",
  "AAAa.AA..AA.....AA.AAA......",
  "AAa..AA..AA.....AA..AA......",
  "....AAA..AAA...AAA..AA......",
  ".....A....A.....A...AA......",
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

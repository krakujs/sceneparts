import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Rabbit: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = grey-white fur, A = ears, legs and shade, z = fluffy white tail. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#d3d6dc", A: "#8e939e", z: "#f7f4ee", m: "#ef8fb4" };
const STAND = [
  "............AAaaa...",
  "............AAama...",
  "............AAama...",
  "............aaaaa...",
  "............aaaaa...",
  ".....aaaaaaaaaaaka..",
  ".zz.aaaaaaaaaaaakm..",
  ".zzzaaaaaaaaaaaaam..",
  ".zzaaaaaaaaaaa......",
  "...aaaaaaaaaaa......",
  "....aaaaaaAaa.......",
  ".....AAaaaAa........",
  ".....A....A.........",
  ".....A....A.........",
  ".....A....A.........",
];
const STEP = [
  "............AAama...",
  "............AAama...",
  "............aaaaa...",
  "............aaaaa...",
  ".....aaaaaaaaaaaka..",
  ".zz.aaaaaaaaaaaakm..",
  ".zzzaaaaaaaaaaaaam..",
  ".zzaaaaaaaaaaa......",
  "...aaaaaaaaaaa......",
  "....aaaaaaaaa.......",
  "....AAaaaAAa........",
  "...AA.....A.........",
  "..AA......AA........",
  ".AA.................",
  ".A..................",
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

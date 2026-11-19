import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Yak: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = dark brown shaggy fur, A = darker fringe and ear, h = pale horns, g = pale muzzle, d = hooves, k = eye. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#4a3426", A: "#2a1c14", h: "#e8dcc0" };
const STAND = [
  "..............................",
  "..............................",
  ".....................h........",
  "..............aaaa...h........",
  ".............aaaaaa...hh......",
  "............aaaaaaaa..hh......",
  "........aaaaaaaaaaaa..hhh.....",
  ".....aaaaaaaaaaaaaaaa..hha....",
  ".A..aaaaaaaaaaaaaaaaaa.Ahhaa..",
  ".A..aaaaaaaaaaaaaaaaaaaahkaaa.",
  "AAAaaaaaaaaaaaaaaaaaaaaaaaaaa.",
  ".A.aaaaaaaaaaaaaaaaaaaaaaaagg.",
  ".A.aaaaaaaaaaaaaaaaaaaaaaagggg",
  "...aaaaaaaaaaaaaaaaaaaa..a.ggg",
  "...aaaaaaaaaaaaaaaaaaaa.......",
  "...aAaaaAaaaAaaaAaaaAaa.......",
  "...A.aaA.aaA.aaA.aaA.aa.......",
  ".....aA..aA..aA..aA..aA.......",
  ".....A...A...A...A...A........",
  "......AA..AA......AA...AA.....",
  "......AA..AA......AA...AA.....",
  "......dd..dd......dd...dd.....",
];
const STEP = [
  "..............................",
  "..............................",
  ".....................h........",
  "..............aaaa...h........",
  ".............aaaaaa...hh......",
  "............aaaaaaaa..hh......",
  "........aaaaaaaaaaaa..hhh.....",
  ".....aaaaaaaaaaaaaaaa..hha....",
  ".A..aaaaaaaaaaaaaaaaaa.Ahhaa..",
  ".A..aaaaaaaaaaaaaaaaaaaahkaaa.",
  "AAAaaaaaaaaaaaaaaaaaaaaaaaaaa.",
  ".A.aaaaaaaaaaaaaaaaaaaaaaaagg.",
  ".A.aaaaaaaaaaaaaaaaaaaaaaagggg",
  "...aaaaaaaaaaaaaaaaaaaa..a.ggg",
  "...aaaaaaaaaaaaaaaaaaaa.......",
  "...aAaaaAaaaAaaaAaaaAaa.......",
  "...A.aaA.aaA.aaA.aaA.aa.......",
  ".....aA..aA..aA..aA..aA.......",
  ".....A...A...A...A...A........",
  ".......AA..AA....AA...AA......",
  ".......AA..AA....AA...AA......",
  ".......dd..dd....dd...dd......",
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

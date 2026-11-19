import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Catfish: a pixel-art/sprite preset. Long grey-brown catfish with a flat head and four long whiskers. Anchored on the centre. Two swim cels fan the tail.
// Role chars: a = grey-brown body, A = dark back, fins, tail and whiskers, s = pale belly. Palette chars k w g d r o y e f c b n p m u x are used as-is.
const COLS = { a: "#7d6650", A: "#4f3f33", s: "#d9cbb0" };
const SWIM_A = [
  "..........AA................",
  ".........AaaA...............",
  ".....aaaaaaaaaaaaa..........",
  "AA.aaaaaaaaaaaaaaaaaaaaa....",
  "AAAaaaaaaaaaaaaaaaaaakaaaaa.",
  ".AAaaaaaaaaaaaaaaaaaaaaaa...",
  ".Aaaassssssssssssssssssss...",
  "..Aassssssssssssssssss......",
  "AA.ssssssssssssssA.A.A.A....",
  "AA.sssssssss.....A.A.A..A...",
  ".A.ssss.........A..A..A..A..",
  "...............A...A...A..A.",
  "...............A..A....A..A.",
];
const SWIM_B = [
  "..........AA................",
  ".........AaaA...............",
  "AA...aaaaaaaaaaaaa..........",
  "AAAaaaaaaaaaaaaaaaaaaaaa....",
  ".AAaaaaaaaaaaaaaaaaaakaaaaa.",
  "...aaaaaaaaaaaaaaaaaaaaaa...",
  "..aaassssssssssssssssssss...",
  ".A.assssssssssssssssss......",
  "..AssssssssssssssA.A.A.A....",
  "AA.sssssssss.....A.A.A..A...",
  "AA.ssss.........A..A..A..A..",
  ".A.............A...A...A..A.",
  "...............A..A....A..A.",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "swim";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const swim = anim === "swim";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 960} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      centre={p.centre ?? true} frames={swim ? [SWIM_A, SWIM_B] : [SWIM_A]} fps={p.fps ?? 6}
      anim={swim ? "none" : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

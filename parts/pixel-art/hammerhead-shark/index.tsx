import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Hammerhead shark: a pixel-art/sprite preset. Grey hammerhead shark with a wide T-shaped head, tall dorsal fin and white belly. Anchored on the centre. Two swim cels fan the tail.
// Role chars: a = grey back and hammer head, A = dark fins and tail, w = white belly (palette), k = eyes. Palette chars k w g d r o y e f c b n p m u x are used as-is.
const COLS = { a: "#6f7c8a", A: "#4a5563" };
const SWIM_A = [
  "...............A..............",
  "..............AA.........aaa..",
  "AA..........AAaaA........aka..",
  "AAA.........AAaaaA.......aaa..",
  "AAA.aaaaaaaaaaaaaaaaaaaaaaaa..",
  ".AA.aaaaaaaaaaaaaaaaaaaaaaaa..",
  "..A.aaaaaaaaaaaaaaaaaaaaaaaa..",
  "....aaaaaaaaaaaawwwwwwwwwwww..",
  "....aawwwwwwwwwwwwwwwwwwwwww..",
  "AA..wwwwwwwwwwwwwwwwwwwwwwww..",
  "AAA.wwwwwwwwwwwwwwwwwwwwwwww..",
  "AA............AA.........www..",
  ".........................wkw..",
  ".........................www..",
];
const SWIM_B = [
  "...............A..............",
  "AA............AA.........aaa..",
  "AAA.........AAaaA........aka..",
  "AAA.........AAaaaA.......aaa..",
  ".AA.aaaaaaaaaaaaaaaaaaaaaaaa..",
  "..A.aaaaaaaaaaaaaaaaaaaaaaaa..",
  "....aaaaaaaaaaaaaaaaaaaaaaaa..",
  "....aaaaaaaaaaaawwwwwwwwwwww..",
  "....aawwwwwwwwwwwwwwwwwwwwww..",
  "....wwwwwwwwwwwwwwwwwwwwwwww..",
  "AA..wwwwwwwwwwwwwwwwwwwwwwww..",
  "AAA...........AA.........www..",
  "AA.......................wkw..",
  ".........................www..",
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

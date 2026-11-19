import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Swordfish: a pixel-art/sprite preset. Dark-blue swordfish with a long sword bill, tall sail fin and silver belly. Anchored on the centre. Two swim cels fan the tail.
// Role chars: a = dark-blue back, bill and body, A = dark sail, fins and tail, s = silver belly. Palette chars k w g d r o y e f c b n p m u x are used as-is.
const COLS = { a: "#23477a", A: "#16294d", s: "#c9d3dc" };
const SWIM_A = [
  "..........AA..........................",
  ".........AaaA.........................",
  "........AAaaaA........................",
  ".......AaaaaaaA.......................",
  "AAA.aaaaaaaaaaaaaaaaaaaaaa............",
  ".AA.aaaaaaaaaaaaaaaaaaakaaaa..........",
  "..A.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "..A.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..",
  "AA..aaaaaaaaaaaassssssssssss..........",
  "AAA.ssssssssssssssssssss..............",
  "AA..ssssssssssssssss..................",
  "A.....................................",
];
const SWIM_B = [
  "..........AA..........................",
  ".........AaaA.........................",
  "........AAaaaA........................",
  "AAA....AaaaaaaA.......................",
  ".AA.aaaaaaaaaaaaaaaaaaaaaa............",
  "....aaaaaaaaaaaaaaaaaaakaaaa..........",
  "....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "..A.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..",
  "..A.aaaaaaaaaaaassssssssssss..........",
  "AA..ssssssssssssssssssss..............",
  "AAA.ssssssssssssssss..................",
  "AA....................................",
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

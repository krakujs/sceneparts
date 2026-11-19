import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Tuna: a pixel-art/sprite preset. Torpedo-shaped side view facing right, anchored on the centre. Two swim cels swing
// the forked tail. Role chars: a = dark blue back, A = blue-grey tail, g = silver belly (palette), k = eye.
const COLS = { a: "#1f4e8c", A: "#2e6b8c" };
const BODY = [
  "......aaaaaaaa......",
  "....aaaaaaaaaaaa....",
  "..aaaaaaaaaaaaakaa..",
  ".aaaaaaaaaaaaaaaaaaa",
  "aaaaaaaaaaaaaaaaaaaa",
  "aaaagggggggggggggggg",
  "..gggggggggggggggggg",
  "....gggggggggggggg..",
  "......gggggggg......",
];
const TAIL_A = ["...", "..A", ".AA", "AA.", "AAA", "AA.", ".AA", "..A", "..."];
const TAIL_B = ["...", "...", "..A", "A..", "AAA", "..A", "..A", "...", "..."];
const join = (t: string[], b: string[]) => b.map((row, i) => t[i] + row);
const SWIM_A = join(TAIL_A, BODY);
const SWIM_B = join(TAIL_B, BODY);

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

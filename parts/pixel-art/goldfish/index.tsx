import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Goldfish: a pixel-art/sprite preset. Side view facing right, anchored on the centre (y = middle of the fish).
// Two swim cels swing the flowing tail. Role chars: a = orange body, A = darker orange tail fins, z = white highlight.
const COLS = { a: "#f08a3c", A: "#d2603f", z: "#f5f1e8" };
const BODY = [
  "....aaaaaaaa....",
  "..aaaaaaaaaaaa..",
  ".aaaaaaaaaaaaaa.",
  "aaaaaaaaaaaazkaa",
  "aaaaaaaaaaaaaaaa",
  "aaaaaaaaaaaaaaaa",
  ".aaaaaaaaaaaaaa.",
  "..aaaaaaaaaaaa..",
  "...aaaaaaaaaa...",
];
const TAIL_A = [".AA", "AAA", "AAA", "AA.", "...", "...", "...", "...", "..."];
const TAIL_B = ["...", "...", "...", "...", "AA.", "AAA", "AAA", "AAA", ".AA"];
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

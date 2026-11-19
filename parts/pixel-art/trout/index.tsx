import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Trout: a pixel-art/sprite preset. Side view facing right, anchored on the centre. Two swim cels swing the tail.
// Role chars: a = olive-green back and sides, A = pink side stripe, z = pale belly (palette w), d = dark spots, k = eye.
const COLS = { a: "#6f7d3a", A: "#e0799b", z: "#e9e4d0" };
const BODY = [
  "......aaaaaaaa......",
  "....aadaaaadaaa.....",
  "..aaaadaaaaaaaakaa..",
  ".aaaaaaaaadaaaaaaaa.",
  "aaaaaaaaaaaaaaaaaaaa",
  "AAAAAAAAAAAAAAAAAAAA",
  "zzzzzzzzzzzzzzzzzzzz",
  "..zzzzzzzzzzzzzzzz..",
  "....zzzzzzzzzzzz....",
  "......zzzzzzzz......",
];
const TAIL_A = ["...", "..a", ".aa", "aa.", "aaa", "aa.", ".aa", "..a", "...", "..."];
const TAIL_B = ["...", "...", "..a", "a..", "aaa", "..a", "..a", "...", "...", "..."];
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

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Alpaca: a small, fluffy, round woolly body with a shorter neck and a pompom head of wool. Side view facing right.
// Role chars: a = fleece (cream), A = shade (legs and wool edge), z = pale face. k = eye and nose.
const COLS = { a: "#efe6d6", A: "#d8cbb3", z: "#c9a57a" };
const STAND = [
  "..........aaaa..",
  "........aaaaaaa.",
  "........aaaaakaa",
  "........aaaaaaaz",
  "..zz...aaaaaaaa.",
  ".zaaaaaaaaaaaa..",
  "zaaaaaaaaaaaaaa.",
  "zaaaaaaaaaaaaaa.",
  ".aaaaaaaaaaaaa..",
  ".aaaaaaaaaaaaa..",
  "..aaaaaaaaaaaa..",
  "...AA.....AA....",
  "...AA.....AA....",
  "...AA.....AA....",
];
const STEP = [
  "..........aaaa..",
  "........aaaaaaa.",
  "........aaaaakaa",
  "........aaaaaaaz",
  "..zz...aaaaaaaa.",
  ".zaaaaaaaaaaaa..",
  "zaaaaaaaaaaaaaa.",
  "zaaaaaaaaaaaaaa.",
  ".aaaaaaaaaaaaa..",
  ".aaaaaaaaaaaaa..",
  "..aaaaaaaaaaaa..",
  "..AA.....AA.....",
  "..AA.....AA.....",
  "..A.......A.....",
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

import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Fox: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = orange fur, A = ear backs, socks and shade, z = white chest and tail tip. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#e0712d", A: "#3b2a22", z: "#f5efe2" };
const STAND = [
  "........................",
  "................A.a.....",
  "................A.a.....",
  "................AAaa....",
  "...............AAaaaaa..",
  "................aaakka..",
  "aaaaaaa.aaaaaa.aaaakkaak",
  "aaaaaaaaaaaaaaaaaaaaaaak",
  "zzaaaaaaaaaaaaaaaaaaaa..",
  "zzzaaaaaaaaaaaaaazzz....",
  "zzaaaaaaaaaaaaaaazzz....",
  "......AAaAaaaaaAzAzzz...",
  "......AAaAaaaa.A.Azz....",
  "......AA.A.....A.Azz....",
  "......AA.A.....A.A......",
  "......AA.A.....A.A......",
  "......AA.A.....A.A......",
];
const STEP = [
  "........................",
  "................A.a.....",
  "................A.a.....",
  "................AAaa....",
  "...............AAaaaaa..",
  "................aaakka..",
  "aaaaaaa.aaaaaa.aaaakkaak",
  "aaaaaaaaaaaaaaaaaaaaaaak",
  "zzaaaaaaaaaaaaaaaaaaaa..",
  "zzzaaaaaaaaaaaaaazzz....",
  "zzaaaaaaaaaaaaaaazzz....",
  "......AAaAaaaaaAzAzzz...",
  "......AAaAaaaaAA.Azz....",
  "......A..A....AA.AAz....",
  ".....AA..A....A..AA.....",
  ".....AA..A...AA...A.....",
  ".....A...A...AA...A.....",
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

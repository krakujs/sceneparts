import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Jaguar: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = deep gold fur, A = shade and ears, z = large black rosettes, k = eye and nose. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#d9a03a", A: "#7a5220", z: "#1b1b2e" };
const STAND = [
  "................A...AA..",
  "...............AAAaaAA..",
  "................Aaaaaa..",
  "................aakaaaa.",
  ".......aaaaaaaaazaaaaakk",
  "...zzzaazzzaaaaazaaaaa..",
  "...zazaazazaazzzaaaaaa..",
  "...zzzaazzzaazazaaa.....",
  ".aaaaaaaaaaaazzzaaa.....",
  "aaaaaazzzzazzzzaaa......",
  "aaazzAzzazAzzazAa.......",
  "zazaz.zzzzAzzzz.........",
  "zazza.a.........a.a.....",
  "....a.a.........a.a.....",
  "....AAAA........AAAA....",
  "........................",
];
const STEP = [
  "................A...AA..",
  "...............AAAaaAA..",
  "................Aaaaaa..",
  "................aakaaaa.",
  ".......aaaaaaaaazaaaaakk",
  "...zzzaazzzaaaaazaaaaa..",
  "...zazaazazaazzzaaaaaa..",
  "...zzzaazzzaazazaaa.....",
  ".aaaaaaaaaaaazzzaaa.....",
  "aaaaaazzzzazzzzaaa......",
  "aaazzAzzazAzzazAa.......",
  "zazaz.zzzzAzzzz.........",
  "zazzaaa.........aaa.....",
  "....aa..........aa......",
  "....AAA.........AAA.....",
  "........................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.spots ? { z: p.spots } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]} fps={anim === "run" ? 4 : p.fps ?? 8}
      anim={walk ? (anim === "run" ? "bob" : "none") : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

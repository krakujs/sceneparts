import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Goat: a white-and-brown goat with a beard under the chin, short backward-curving horns and slim legs. Side view facing right.
// Role chars: a = coat (white), A = brown patches, beard and hooves, z = ear. Extra: h = horns. k = eye.
const COLS = { a: "#f3eee4", A: "#8b5e3c", z: "#e0d6c2", h: "#cbbfa6" };
const STAND = [
  "..............hh....",
  "...........hhh......",
  "..........hh..h.....",
  "..........h...aaa...",
  ".........AAaaaaakaa.",
  "..zz...AAaaaaaaaaaa.",
  "...zzAAaaaaaaaaaaaa.",
  "....AaaaaaaaaaaaaaA.",
  "...AaaaaaaaaaaaaaaA.",
  "..AaaaaaaaaaaaaaaaA.",
  "..aaaaaaaaaaaaaaaa..",
  "..aaaaaaaaaaaaaaa...",
  "...AA.........AA....",
  "...AA.........AA....",
  "...AA.........AA....",
  "...AA.........AA....",
  "...AA.........AA....",
];
const STEP = [
  "..............hh........",
  "...........hhh..........",
  "..........hh..h.........",
  "..........h...aaa.......",
  ".........AAaaaaakaa.....",
  "..zz...AAaaaaaaaaaa.....",
  "...zzAAaaaaaaaaaaaa.....",
  "....AaaaaaaaaaaaaaA.....",
  "...AaaaaaaaaaaaaaaA.....",
  "..AaaaaaaaaaaaaaaaA.....",
  "..aaaaaaaaaaaaaaaa......",
  "..aaaaaaaaaaaaaaa.......",
  "..AA..........AA........",
  "..AA..........AA........",
  "..AA..........AA........",
  "...A...........A........",
  "........................",
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

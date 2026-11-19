import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Water buffalo: a dark grey, heavy-bodied buffalo with wide horns that sweep back over the neck. Side view facing right.
// Role chars: a = coat (dark grey), A = shade and hooves, z = muzzle. Extra: h = horns. k = eye.
const COLS = { a: "#4e5257", A: "#2b2e33", z: "#6e7379", h: "#d9d2bf" };
const STAND = [
  "....................hhhhhh.....",
  "..................hhh....hh....",
  ".................hh.....hh.....",
  ".........hhh.....h..........z..",
  "........haaaaaaaaaaaaaaaaaazzz.",
  ".......haaaaaaaaaaaaaaaaaaaaaa.",
  "........aaaaaaaaaaaaaaaaaaaaa..",
  "......aaaaaaaaaaaaaaaaaaaaaaa..",
  ".....aaaaaaaaaaaaaaaaaaaaaaaa..",
  "....aaaaaaaaaaaaaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaaaaaaaaaaaaa...",
  "..aaaaaaaaaaaaaaaaaaaaaaaaa....",
  "..AaaaaaaaaaaaaaaaaaaaaaaaA....",
  "...aaaaaaaaaaaaaaaaaaaaaaa.....",
  "...aaaaaaaaaaaaaaaaaaaaaa......",
  "...aaa........aaa.....aaa......",
  "...aaa........aaa.....aaa......",
  "...aaa........aaa.....aaa......",
  "...AAA........AAA.....AAA......",
  "...AAA........AAA.....AAA......",
];
const STEP = [
  "....................hhhhhh.....",
  "..................hhh....hh....",
  ".................hh.....hh.....",
  ".........hhh.....h..........z..",
  "........haaaaaaaaaaaaaaaaaazzz.",
  ".......haaaaaaaaaaaaaaaaaaaaaa.",
  "........aaaaaaaaaaaaaaaaaaaaa..",
  "......aaaaaaaaaaaaaaaaaaaaaaa..",
  ".....aaaaaaaaaaaaaaaaaaaaaaaa..",
  "....aaaaaaaaaaaaaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaaaaaaaaaaaaa...",
  "..aaaaaaaaaaaaaaaaaaaaaaaaa....",
  "..AaaaaaaaaaaaaaaaaaaaaaaaA....",
  "...aaaaaaaaaaaaaaaaaaaaaaa.....",
  "...aaaaaaaaaaaaaaaaaaaaaa......",
  "..aaa.........aaa......aaa.....",
  "..aaa.........aaa......aaa.....",
  "..aaa.........aaa......aaa.....",
  "..AAA.........AAA......AAA.....",
  "..AAA.........AAA......AAA.....",
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

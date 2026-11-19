import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Hare: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = fur, A = ears, legs and shade, z = cream chest. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#a0673b", A: "#6e4224", z: "#f1e6d2", k: "#1b1b2e" };
const STAND = [
  "...........kk.......",
  "..........AaA.......",
  "..........AaA.......",
  "..........AaA.......",
  "..........AaA.......",
  "..........aaaaaaaa..",
  "....aaaaaaaaaaakaaz.",
  "..aaaaaaaaaaaaaaaaa.",
  "..aaaaaazzzzzaaaaa..",
  "...aaaaazzzzzzaaa...",
  "....aaaaaaaaaaaa....",
  "...AA........AA.....",
  "...AA........AA.....",
  "..AAAA......AAAA....",
];
const STEP = [
  "...........kk.......",
  "..........AaA.......",
  "..........AaA.......",
  "..........AaA.......",
  "..........AaA.......",
  "..........aaaaaaaa..",
  "....aaaaaaaaaaakaaz.",
  "..aaaaaaaaaaaaaaaaa.",
  "..aaaaaazzzzzaaaaa..",
  "...aaaaazzzzzzaaa...",
  "....aaaaaaaaaaaa....",
  "..AA..........AA....",
  "..AAA.........AAA...",
  ".AAAA........AAAA...",
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

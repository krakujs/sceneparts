import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Guinea pig: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = brown patches, A = ears, legs and shade, z = white patches. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#c98a4b", A: "#7a4a2b", z: "#f5f1e8" };
const STAND = [
  ".........AA...",
  "...aaaaaaaaa..",
  "..aazzzaaaaaa.",
  "..aazzaaaaakaA",
  "..aaaaaaaaaaaa",
  ".aaaaazzzaaaa.",
  "..aaaaaaaaaaa.",
  "...aaaaaaaaa..",
  "..AA.....AA...",
  "..AA.....AA...",
];
const STEP = [
  ".........AA...",
  "...aaaaaaaaa..",
  "..aazzzaaaaaa.",
  "..aazzaaaaakaA",
  "..aaaaaaaaaaaa",
  ".aaaaazzzaaaa.",
  "..aaaaaaaaaaa.",
  "...aaaaaaaaa..",
  "..A.A....AA...",
  "...A.....A.A..",
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

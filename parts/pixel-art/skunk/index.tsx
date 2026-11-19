import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Skunk: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = black fur, A = legs and shade, z = white back stripe. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#22212a", A: "#0c0c12", z: "#f5f1e8" };
const STAND = [
  "........................",
  "........................",
  ".aaaaa..................",
  "azzzzza.................",
  "zzzzzzzzzzzzzzzzzzzza...",
  "aaaaaaaaaaaaaaaa.azzwa..",
  "aaaaaaaaaaaaaaaaaaaawAA.",
  "aaaaaaaaaaaaaaaaaaaaaa..",
  "aaaaaaaaaaaaaaaaaaaaa...",
  "aaaaaaaaaaaaaaaaaa......",
  ".aaaaaaaaaaaaaaaa.......",
  ".......AAaaaaa.AA.......",
  ".......AA......AA.......",
  ".......AA......AA.......",
];
const STEP = [
  "........................",
  "........................",
  ".aaaaa..................",
  "azzzzza.................",
  "zzzzzzzzzzzzzzzzzzzza...",
  "aaaaaaaaaaaaaaaa.azzwa..",
  "aaaaaaaaaaaaaaaaaaaawAA.",
  "aaaaaaaaaaaaaaaaaaaaaa..",
  "aaaaaaaaaaaaaaaaaaaaa...",
  "aaaaaaaaaaaaaaaaaa......",
  ".aaaaaaaaaaaaaaaa.......",
  ".......AAaaaaa.AA.......",
  ".......AA......AAA......",
  "......AAA.......AA......",
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

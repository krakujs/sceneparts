import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pigeon: a pixel-art/sprite preset. Side view facing right, standing on y. Birds: feet walk cels and wing up/down fly cels.
// Role chars: a = #9aa3ad, A = #6b7480, z = #3f9a8a. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#9aa3ad", A: "#6b7480", z: "#3f9a8a" };
const STAND = [
  "................",
  "...........aa...",
  "..........aaoa..",
  "..........aaaad.",
  "....aaaaazaaaa..",
  "..aAAAAAAzzzz...",
  "AAAkAAAAAAzzz...",
  "AaAAAAAAAAzza...",
  "AAaAAAAAAaaa....",
  "AAaaakaakaaa....",
  "AAAAaaaaaa......",
  "AAAA..r..r......",
  "......r..r......",
];
const STEP = [
  "................",
  "...........aa...",
  "..........aaoa..",
  "..........aaaad.",
  "....aaaaazaaaa..",
  "..aAAAAAAzzzz...",
  "AAAkAAAAAAzzz...",
  "AaAAAAAAAAzza...",
  "AAaAAAAAAaaa....",
  "AAaaakaakaaa....",
  "AAAAaaaaaa......",
  "AAAA.r..........",
  ".....r...r......",
];
const FLY_UP = [
  "....AAAA........",
  "..AAAAAAAA.aa...",
  "..AAAAAAAAaaoa..",
  "....AAAA..aaaad.",
  "....aaaaazaaaa..",
  "..aAAAAAAzzzz...",
  "AAAkAAAAAAzzz...",
  "AaAAAAAAAAzza...",
  "AAaAAAAAAaaa....",
  "AAaaakaakaaa....",
  "AAAAaaaaaa......",
  "AAAA............",
  "................",
];
const FLY_DOWN = [
  "................",
  "...........aa...",
  "..........aaoa..",
  "..........aaaad.",
  "....aaaaazaaaa..",
  "..aAAAAAAzzzz...",
  "AAAkAAAAAAzzz...",
  "AaAAAAAAAAzza...",
  "AAaAAAAAAaaa....",
  "AAaaakaakaaa....",
  "AAAAAAAAAA......",
  "AAAAAAAAAA......",
  "................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.accent ? { z: p.accent } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = anim === "fly";
  const frames = fly ? [FLY_UP, FLY_DOWN] : walk ? [STAND, STEP] : [STAND];
  const fps = anim === "run" ? 4 : p.fps ?? (fly ? 6 : 8);
  const motion = walk ? (anim === "run" ? "bob" : "none") : fly ? "none" : anim;
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={frames} fps={fps} anim={motion}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

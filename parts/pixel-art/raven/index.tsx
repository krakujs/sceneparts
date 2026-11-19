import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Raven: a pixel-art/sprite preset. Side view facing right, standing on y. Birds: feet walk cels and wing up/down fly cels.
// Role chars: a = #23232e, A = #111118. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#23232e", A: "#111118" };
const STAND = [
  "......................",
  "......................",
  "..............aaaa....",
  ".............aaaaadd..",
  ".............aaawadddd",
  "..........aaaaaaaaaa.d",
  ".......aaaaaaaaaaaa...",
  ".....AAAAAAAAaaaaaa...",
  "....AAAAAAAAAAAAaa....",
  "...AAAAAAAAAAAAAa.....",
  "..AAAAAAAAAAAAAaa.....",
  ".AAaAAAAAAAAAAaaa.....",
  ".AAaaAAAAAAAAaaa......",
  ".AAaaaaaaaaaaaa.......",
  "AAA.aaaaaaaaa.........",
  "AA....aaad..d.........",
  "A........d..d.........",
  ".........d..d.........",
];
const STEP = [
  "......................",
  "......................",
  "..............aaaa....",
  ".............aaaaadd..",
  ".............aaawadddd",
  "..........aaaaaaaaaa.d",
  ".......aaaaaaaaaaaa...",
  ".....AAAAAAAAaaaaaa...",
  "....AAAAAAAAAAAAaa....",
  "...AAAAAAAAAAAAAa.....",
  "..AAAAAAAAAAAAAaa.....",
  ".AAaAAAAAAAAAAaaa.....",
  ".AAaaAAAAAAAAaaa......",
  ".AAaaaaaaaaaaaa.......",
  "AAA.aaaaaaaaa.........",
  "AA....aada............",
  "A.......d.............",
  "........d...d.........",
];
const FLY_UP = [
  "........AAA...........",
  ".......AAAA...........",
  "......AAAAA...aaaa....",
  ".....AAAAAAA.aaaaadd..",
  "....AAAAAAAA.aaawadddd",
  ".....AAAAAAAAaaaaaaa.d",
  ".......AAAaaaaaaaaa...",
  ".....AAAAAAAAaaaaaa...",
  "....AAAAAAAAAAAAaa....",
  "...AAAAAAAAAAAAAa.....",
  "..AAAAAAAAAAAAAaa.....",
  ".AAaAAAAAAAAAAaaa.....",
  ".AAaaAAAAAAAAaaa......",
  ".AAaaaaaaaaaaaa.......",
  "AAA.aaaaaaaaa.........",
  "AA....aaaa............",
  "A.....................",
  "......................",
];
const FLY_DOWN = [
  "......................",
  "......................",
  "..............aaaa....",
  ".............aaaaadd..",
  ".............aaawadddd",
  "..........aaaaaaaaaa.d",
  ".......aaaaaaaaaaaa...",
  ".....AAAAAAAAaaaaaa...",
  "....AAAAAAAAAAAAaa....",
  "...AAAAAAAAAAAAAa.....",
  "..AAAAAAAAAAAAAaa.....",
  ".AAaAAAAAAAAAAaaa.....",
  ".AAaaAAAAAAAAaaa......",
  ".AAaaaaAAAAAaaa.......",
  "AAA.aaaaAAAaa.........",
  "AA....aaaAA...........",
  "A.....................",
  "......................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
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

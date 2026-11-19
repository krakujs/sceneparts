import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Crane (bird): a pixel-art/sprite preset. Side view facing right, standing on y. Walk cels step the legs,
// fly cels flap the wings. Role chars: a = feathers, A = shade (tail, legs), z = accent (red crown). Palette chars as usual.
const COLS = { a: "#9aa3ad", A: "#5a6170", z: "#d2403f" };
const STAND = [
  "............zz..",
  "............aakd",
  "...........aaaa.",
  "..........aaa...",
  "..........aa....",
  "..........aa....",
  "..........aa....",
  "..........aa....",
  "........aaaaaa..",
  ".......aaaaaaaa.",
  "AAaaaaaaaaaaaaa.",
  "AAAaaaaaaaaaaa..",
  "...aaaaaaaaaa...",
  "......AA.AA.....",
  "......AA.AA.....",
  "......AA.AA.....",
  "......dd.dd.....",
];
const STEP = [...STAND.slice(0, 13), ".....AA..AA.....", "....AA....AA....", "....dd.....dd..."];
const FLYUP = [
  ...STAND.slice(0, 4),
  "...aaaa...aa....",
  "..aaaaa...aa....",
  ".aaaaaa...aa....",
  "..aaaaa...aa....",
  ...STAND.slice(8),
];
const FLYDN = [
  ...STAND.slice(0, 8),
  "........aaaaaa..",
  ".AAAaaaaaaaaaaa.",
  "AAAAAaaaaaaaaaaa",
  "AAAaaaaaaaaaaaa.",
  "...aaaaaaaaaa...",
  "......AA.AA.....",
  "......AA.AA.....",
  "......AA.AA.....",
  "......dd.dd.....",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = anim === "fly";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : fly ? [FLYUP, FLYDN] : [STAND]}
      fps={fly ? p.fps ?? 6 : anim === "run" ? 4 : p.fps ?? 8}
      anim={walk || fly ? (anim === "run" ? "bob" : "none") : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}

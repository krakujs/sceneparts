import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Magpie (bird): pixel-art/sprite preset, side view facing right, standing on y. Walk cels step the feet, fly cels flap the wing. Role chars: a = black plumage (slightly lighter than the outline), A = blue-green tail. Palette as usual.
const COLS = { a: "#2e3142", A: "#2f7f8a", z: "#2f7f8a" };
const STAND = [
  ".................aaa.....",
  "................aaaaa....",
  "...............aawaaadd..",
  "...............aaaaaa....",
  "..............aaaaaa.....",
  ".............aaaaawww....",
  "............aaaawwwwww...",
  "...........aawwaawwwww...",
  "..........aawwwaawwwww...",
  ".........aaaawwaawwwww...",
  "........AAaaaaaaawwww....",
  ".....AAAAAaaaaaaaaww.....",
  "..AAAAAAA..aaaaaaaa......",
  "AAAAAAA.........d..d.....",
  "AAAA............d..d.....",
];
const STEP = [
  ".................aaa.....",
  "................aaaaa....",
  "...............aawaaadd..",
  "...............aaaaaa....",
  "..............aaaaaa.....",
  ".............aaaaawww....",
  "............aaaawwwwww...",
  "...........aawwaawwwww...",
  "..........aawwwaawwwww...",
  ".........aaaawwaawwwww...",
  "........AAaaaaaaawwww....",
  ".....AAAAAaaaaaaaaww.....",
  "..AAAAAAA..aaaaaaaa......",
  "AAAAAAA.........d..d.....",
  "...............d....d....",
];
const FLYUP = [
  ".................aaa.....",
  "................aaaaa....",
  "...............aawaaadd..",
  "...............aaaaaa....",
  "..........AAA.aaaaaa.....",
  "........AAAAAaaaaawww....",
  "......AAAAAAaaaawwwwww...",
  ".....AAAAA.aawwaawwwww...",
  "..........aawwwaawwwww...",
  ".........aaaawwaawwwww...",
  "........AAaaaaaaawwww....",
  ".....AAAAAaaaaaaaaww.....",
  "..AAAAAAA..aaaaaaaa......",
  "AAAAAAA.........d..d.....",
  "AAAA............d..d.....",
];
const FLYDN = [
  ".................aaa.....",
  "................aaaaa....",
  "...............aawaaadd..",
  "...............aaaaaa....",
  "..............aaaaaa.....",
  ".............aaaaawww....",
  "............aaaawwwwww...",
  "...........aawwaawwwww...",
  "..........aawwwaawwwww...",
  ".........aaaawwaawwwww...",
  "........AAaaaaaaawwww....",
  ".....AAAAAaaaaaaaaww.....",
  "..AAAAAAA..aaaaaaaa......",
  "AAAAAAA.....aaawwa.d.....",
  "AAAA.........aawwa.d.....",
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

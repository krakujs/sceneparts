import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Hummingbird (bird): pixel-art/sprite preset, side view facing right, hovering on y. fly (default) flaps pale blurred wings fast. Role chars: a = green body, A = dark tail, z = wing blur. Palette as usual.
const COLS = { a: "#3f9a5a", A: "#2e6b45", z: "#bfe3f5" };
const STAND = [
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  "............aaa......",
  "...........aaaaa.....",
  "...........aakaagggg.",
  ".........aaaaarr.....",
  "........aaaaaar......",
  ".......aaAAaaww......",
  "......aaaAaaww.......",
  ".....aaaaaaww........",
  "....AAaaaaww.........",
  "...AAA..ww...........",
  "..AAA................",
  ".AA..................",
];
const STEP = [
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  "............aaa......",
  "...........aaaaa.....",
  "...........aakaagggg.",
  ".........aaaaarr.....",
  "........aaaaaar......",
  ".......aaAAaaww......",
  "......aaaAaaww.......",
  ".....aaaaaaww........",
  "....AAaaaaww.........",
  "...AAA..ww...........",
  "..AAA................",
  ".AA..................",
];
const FLYUP = [
  ".......zz............",
  "......zzz............",
  ".....zzzz............",
  ".....zzzz............",
  "......zzz...aaa......",
  ".......zzz.aaaaa.....",
  "........zzzaakaagggg.",
  ".........aaaaarr.....",
  "........aaaaaar......",
  ".......aaAAaaww......",
  "......aaaAaaww.......",
  ".....aaaaaaww........",
  "....AAaaaaww.........",
  "...AAA..ww...........",
  "..AAA................",
  ".AA..................",
];
const FLYDN = [
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  "............aaa......",
  "...........aaaaa.....",
  "...........aakaagggg.",
  ".........aaaaarr.....",
  ".....zzzaaaaaar......",
  "..zzzzzaaAAaaww......",
  ".zzzzzaaaAaaww.......",
  "zzzz.aaaaaaww........",
  "....AAaaaaww.........",
  "...AAA..ww...........",
  "..AAA................",
  ".AA..................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "fly";
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
